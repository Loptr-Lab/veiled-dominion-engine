import {
  PriorAcceptedState,
  RawAtprotoRecordEnvelope,
  SyncMode,
  validateAndNormalizeRecord,
  ValidationErrorCode,
  NormalizedProfile,
} from './validator';

/**
 * Integration boundaries:
 * - IdentityResolver: handle -> DID (or passthrough DID)
 * - RecordFetcher: DID -> ATproto record envelope
 * - SnapshotStore: last-known-good cache + ranked replay state persistence
 * - Logger/Metrics: observability hooks
 */

export type SyncErrorCode =
  | 'IDENTITY_RESOLUTION_FAILED'
  | 'PROFILE_NOT_FOUND'
  | 'PROFILE_STALE'
  | ValidationErrorCode;

export type SyncResult =
  | {
      ok: true;
      source: 'network' | 'cache' | 'default';
      profile: NormalizedProfile;
    }
  | {
      ok: false;
      code: SyncErrorCode;
      message: string;
    };

export interface SyncInput {
  handleOrDid: string;
  rkey?: string; // default: veiled-dominion
}

export interface SyncContext {
  mode: SyncMode;
  nowIso?: string;
  cacheTtlMinutes: number;
  allowedSchemaVersions?: number[];
}

export interface CachedSnapshot {
  did: string;
  profile: NormalizedProfile;
  cachedAtIso: string;
}

export interface IdentityResolver {
  resolveDid(handleOrDid: string): Promise<string>;
}

export interface RecordFetcher {
  getRecord(args: {
    did: string;
    collection: 'actor.rpg.stats';
    rkey: string;
  }): Promise<RawAtprotoRecordEnvelope | null>; // null => not found
}

export interface SnapshotStore {
  getLastKnownGood(did: string): Promise<CachedSnapshot | null>;
  upsertLastKnownGood(snapshot: CachedSnapshot): Promise<void>;

  getPriorAcceptedState(did: string): Promise<PriorAcceptedState | null>;
  upsertPriorAcceptedState(did: string, state: PriorAcceptedState): Promise<void>;
}

export interface Logger {
  info(event: string, data?: Record<string, unknown>): void;
  warn(event: string, data?: Record<string, unknown>): void;
  error(event: string, data?: Record<string, unknown>): void;
}

export interface Metrics {
  inc(name: string, labels?: Record<string, string>): void;
}

export interface SyncDeps {
  identityResolver: IdentityResolver;
  recordFetcher: RecordFetcher;
  snapshotStore: SnapshotStore;
  logger?: Logger;
  metrics?: Metrics;
}

const DEFAULT_RKEY = 'veiled-dominion';

function isDid(input: string): boolean {
  return input.startsWith('did:');
}

function minutesBetween(olderIso: string, newerIso: string): number {
  const older = Date.parse(olderIso);
  const newer = Date.parse(newerIso);
  if (!Number.isFinite(older) || !Number.isFinite(newer)) return Number.POSITIVE_INFINITY;
  return Math.max(0, (newer - older) / 60000);
}

function makeDefaultProfile(did: string, nowIso: string): NormalizedProfile {
  return {
    did,
    system: 'veiled-dominion',
    schemaVersion: 1,
    stats: {
      restraintMetric: 0,
      egoAnnihilationCount: 0,
      matchesPlayed: 0,
    },
    sourceCid: 'local-default',
    sourceUri: `at://${did}/actor.rpg.stats/${DEFAULT_RKEY}`,
    fetchedAt: nowIso,
    marker: undefined,
  };
}

function toError(code: SyncErrorCode, message: string): SyncResult {
  return { ok: false, code, message };
}

/**
 * Main sync path:
 *   resolve DID -> fetch record -> validate+normalize -> persist cache/replay state
 *   with deterministic fallbacks by mode.
 */
export async function syncProfile(input: SyncInput, ctx: SyncContext, deps: SyncDeps): Promise<SyncResult> {
  const nowIso = ctx.nowIso ?? new Date().toISOString();
  const rkey = input.rkey ?? DEFAULT_RKEY;
  const collection: 'actor.rpg.stats' = 'actor.rpg.stats';

  let did: string;

  // 1) Resolve DID
  try {
    did = isDid(input.handleOrDid)
      ? input.handleOrDid
      : await deps.identityResolver.resolveDid(input.handleOrDid);

    if (!did || !isDid(did)) {
      deps.metrics?.inc('profile_sync_failure_total', { code: 'IDENTITY_RESOLUTION_FAILED' });
      return toError('IDENTITY_RESOLUTION_FAILED', 'Failed to resolve identity to DID.');
    }
  } catch (err) {
    deps.logger?.error('rpg_actor_identity_resolution_failed', {
      handleOrDid: input.handleOrDid,
      error: err instanceof Error ? err.message : String(err),
    });
    deps.metrics?.inc('profile_sync_failure_total', { code: 'IDENTITY_RESOLUTION_FAILED' });
    return toError('IDENTITY_RESOLUTION_FAILED', 'Failed to resolve identity to DID.');
  }

  // 2) Fetch record
  let envelope: RawAtprotoRecordEnvelope | null = null;
  let fetchFailed = false;

  try {
    envelope = await deps.recordFetcher.getRecord({ did, collection, rkey });
  } catch (err) {
    fetchFailed = true;
    deps.logger?.warn('rpg_actor_record_fetch_failed', {
      did,
      collection,
      rkey,
      error: err instanceof Error ? err.message : String(err),
    });
  }

  // 3) Handle fetch not found / failure with cache fallback
  if (!envelope) {
    const cached = await deps.snapshotStore.getLastKnownGood(did);

    if (cached) {
      const ageMin = minutesBetween(cached.cachedAtIso, nowIso);
      const freshEnough = ageMin <= ctx.cacheTtlMinutes;

      if (freshEnough) {
        deps.logger?.info('rpg_actor_profile_cache_used', { did, ageMin, mode: ctx.mode });
        deps.metrics?.inc('profile_cache_fallback_total', { mode: ctx.mode });
        return { ok: true, source: 'cache', profile: cached.profile };
      }

      if (ctx.mode === 'ranked') {
        deps.metrics?.inc('profile_sync_failure_total', { code: 'PROFILE_STALE' });
        return toError(
          'PROFILE_STALE',
          `Cached profile is stale (${Math.floor(ageMin)} min > TTL ${ctx.cacheTtlMinutes} min) in ranked mode.`
        );
      }

      // casual stale cache -> deterministic default
      const profile = makeDefaultProfile(did, nowIso);
      deps.metrics?.inc('profile_sync_success_total', { source: 'default', mode: 'casual' });
      return { ok: true, source: 'default', profile };
    }

    // no cache
    if (fetchFailed) {
      if (ctx.mode === 'ranked') {
        deps.metrics?.inc('profile_sync_failure_total', { code: 'PROFILE_STALE' });
        return toError('PROFILE_STALE', 'No network profile and no cache available in ranked mode.');
      }

      const profile = makeDefaultProfile(did, nowIso);
      deps.metrics?.inc('profile_sync_success_total', { source: 'default', mode: 'casual' });
      return { ok: true, source: 'default', profile };
    }

    // explicit not-found
    if (ctx.mode === 'ranked') {
      deps.metrics?.inc('profile_sync_failure_total', { code: 'PROFILE_NOT_FOUND' });
      return toError('PROFILE_NOT_FOUND', 'No veiled-dominion profile found for this DID.');
    }

    const profile = makeDefaultProfile(did, nowIso);
    deps.metrics?.inc('profile_sync_success_total', { source: 'default', mode: 'casual' });
    return { ok: true, source: 'default', profile };
  }

  // 4) Validate + normalize (+ replay checks)
  const prior = (await deps.snapshotStore.getPriorAcceptedState(did)) ?? undefined;

  const validated = validateAndNormalizeRecord(
    envelope,
    {
      mode: ctx.mode,
      nowIso,
      allowedSchemaVersions: ctx.allowedSchemaVersions ?? [1],
    },
    prior
  );

  if (!validated.ok) {
    deps.logger?.warn('rpg_actor_profile_rejected', {
      did,
      cid: envelope.cid,
      uri: envelope.uri,
      code: validated.code,
      mode: ctx.mode,
    });

    deps.metrics?.inc('profile_sync_failure_total', { code: validated.code, mode: ctx.mode });
    if (validated.code === 'SCHEMA_INVALID_TYPE' || validated.code === 'SCHEMA_INVALID_BOUNDS') {
      deps.metrics?.inc('profile_schema_invalid_total', { mode: ctx.mode });
    }
    if (validated.code === 'REPLAY_DETECTED') {
      deps.metrics?.inc('profile_replay_reject_total', { mode: ctx.mode });
    }

    // casual fallback path
    if (ctx.mode === 'casual') {
      const cached = await deps.snapshotStore.getLastKnownGood(did);
      if (cached) {
        deps.metrics?.inc('profile_cache_fallback_total', { mode: ctx.mode });
        return { ok: true, source: 'cache', profile: cached.profile };
      }
      return { ok: true, source: 'default', profile: makeDefaultProfile(did, nowIso) };
    }

    // ranked hard fail
    return toError(validated.code, validated.message);
  }

  // 5) Persist accepted snapshot + replay state
  await deps.snapshotStore.upsertLastKnownGood({
    did,
    profile: validated.profile,
    cachedAtIso: nowIso,
  });

  await deps.snapshotStore.upsertPriorAcceptedState(did, {
    marker: validated.profile.marker,
    cid: validated.profile.sourceCid,
  });

  deps.logger?.info('rpg_actor_profile_accepted', {
    did,
    cid: validated.profile.sourceCid,
    uri: validated.profile.sourceUri,
    marker: validated.profile.marker,
    mode: ctx.mode,
  });

  deps.metrics?.inc('profile_sync_success_total', { source: 'network', mode: ctx.mode });

  return {
    ok: true,
    source: 'network',
    profile: validated.profile,
  };
}
