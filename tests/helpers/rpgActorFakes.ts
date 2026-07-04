import type {
  CachedSnapshot,
  IdentityResolver,
  RecordFetcher,
  SnapshotStore,
  SyncDeps,
} from '../../src/integration/rpgActor/syncProfile';
import type { PriorAcceptedState, RawAtprotoRecordEnvelope } from '../../src/integration/rpgActor/validator';

/**
 * In-memory fakes for fast unit/integration tests.
 * Use these to wire syncProfile() in tests without network/db dependencies.
 */

export class InMemoryIdentityResolver implements IdentityResolver {
  private readonly map = new Map<string, string>();
  private readonly failures = new Set<string>();

  set(input: string, did: string): void {
    this.map.set(input, did);
  }

  fail(input: string): void {
    this.failures.add(input);
  }

  clear(): void {
    this.map.clear();
    this.failures.clear();
  }

  async resolveDid(handleOrDid: string): Promise<string> {
    if (this.failures.has(handleOrDid)) {
      throw new Error(`Forced resolver failure for ${handleOrDid}`);
    }

    if (handleOrDid.startsWith('did:')) return handleOrDid;

    const resolved = this.map.get(handleOrDid);
    if (!resolved) throw new Error(`No mapping for ${handleOrDid}`);
    return resolved;
  }
}

type FetchKey = `${string}|${string}|${string}`; // did|collection|rkey

export class InMemoryRecordFetcher implements RecordFetcher {
  private readonly records = new Map<FetchKey, RawAtprotoRecordEnvelope | null>();
  private readonly failures = new Set<FetchKey>();

  private key(did: string, collection: string, rkey: string): FetchKey {
    return `${did}|${collection}|${rkey}`;
  }

  setRecord(
    args: { did: string; collection?: 'actor.rpg.stats'; rkey?: string },
    envelope: RawAtprotoRecordEnvelope | null
  ): void {
    const collection = args.collection ?? 'actor.rpg.stats';
    const rkey = args.rkey ?? 'veiled-dominion';
    this.records.set(this.key(args.did, collection, rkey), envelope);
  }

  setFailure(args: { did: string; collection?: 'actor.rpg.stats'; rkey?: string }): void {
    const collection = args.collection ?? 'actor.rpg.stats';
    const rkey = args.rkey ?? 'veiled-dominion';
    this.failures.add(this.key(args.did, collection, rkey));
  }

  clear(): void {
    this.records.clear();
    this.failures.clear();
  }

  async getRecord(args: {
    did: string;
    collection: 'actor.rpg.stats';
    rkey: string;
  }): Promise<RawAtprotoRecordEnvelope | null> {
    const k = this.key(args.did, args.collection, args.rkey);
    if (this.failures.has(k)) throw new Error(`Forced fetch failure for ${k}`);
    return this.records.has(k) ? this.records.get(k)! : null;
  }
}

export class InMemorySnapshotStore implements SnapshotStore {
  private readonly snapshots = new Map<string, CachedSnapshot>();
  private readonly priorStates = new Map<string, PriorAcceptedState>();

  async getLastKnownGood(did: string): Promise<CachedSnapshot | null> {
    return this.snapshots.get(did) ?? null;
  }

  async upsertLastKnownGood(snapshot: CachedSnapshot): Promise<void> {
    this.snapshots.set(snapshot.did, snapshot);
  }

  async getPriorAcceptedState(did: string): Promise<PriorAcceptedState | null> {
    return this.priorStates.get(did) ?? null;
  }

  async upsertPriorAcceptedState(did: string, state: PriorAcceptedState): Promise<void> {
    this.priorStates.set(did, state);
  }

  seedSnapshot(snapshot: CachedSnapshot): void {
    this.snapshots.set(snapshot.did, snapshot);
  }

  seedPriorState(did: string, state: PriorAcceptedState): void {
    this.priorStates.set(did, state);
  }

  clear(): void {
    this.snapshots.clear();
    this.priorStates.clear();
  }
}

export class InMemoryLogger {
  public infos: Array<{ event: string; data?: Record<string, unknown> }> = [];
  public warns: Array<{ event: string; data?: Record<string, unknown> }> = [];
  public errors: Array<{ event: string; data?: Record<string, unknown> }> = [];

  info(event: string, data?: Record<string, unknown>): void {
    this.infos.push({ event, data });
  }

  warn(event: string, data?: Record<string, unknown>): void {
    this.warns.push({ event, data });
  }

  error(event: string, data?: Record<string, unknown>): void {
    this.errors.push({ event, data });
  }

  clear(): void {
    this.infos = [];
    this.warns = [];
    this.errors = [];
  }
}

export class InMemoryMetrics {
  public counters = new Map<string, number>();

  inc(name: string, labels?: Record<string, string>): void {
    const key = labels ? `${name}|${stableLabelString(labels)}` : name;
    this.counters.set(key, (this.counters.get(key) ?? 0) + 1);
  }

  get(name: string, labels?: Record<string, string>): number {
    const key = labels ? `${name}|${stableLabelString(labels)}` : name;
    return this.counters.get(key) ?? 0;
  }

  clear(): void {
    this.counters.clear();
  }
}

function stableLabelString(labels: Record<string, string>): string {
  return Object.keys(labels)
    .sort()
    .map((k) => `${k}=${labels[k]}`)
    .join(',');
}

export function createRpgActorTestDeps(): {
  deps: SyncDeps;
  identity: InMemoryIdentityResolver;
  fetcher: InMemoryRecordFetcher;
  store: InMemorySnapshotStore;
  logger: InMemoryLogger;
  metrics: InMemoryMetrics;
} {
  const identity = new InMemoryIdentityResolver();
  const fetcher = new InMemoryRecordFetcher();
  const store = new InMemorySnapshotStore();
  const logger = new InMemoryLogger();
  const metrics = new InMemoryMetrics();

  const deps: SyncDeps = {
    identityResolver: identity,
    recordFetcher: fetcher,
    snapshotStore: store,
    logger,
    metrics,
  };

  return { deps, identity, fetcher, store, logger, metrics };
}

/** Small fixture helper for valid envelopes. */
export function makeValidEnvelope(args?: Partial<RawAtprotoRecordEnvelope>): RawAtprotoRecordEnvelope {
  const base: RawAtprotoRecordEnvelope = {
    uri: 'at://did:plc:test123/actor.rpg.stats/veiled-dominion',
    cid: 'bafy-valid-cid-1',
    value: {
      $type: 'actor.rpg.stats',
      system: 'veiled-dominion',
      schemaVersion: 1,
      version: 1,
      updatedAt: '2026-07-04T09:00:00.000Z',
      data: {
        restraintMetric: 84,
        egoAnnihilationCount: 3,
        matchesPlayed: 42,
      },
    },
  };

  return {
    ...base,
    ...args,
    value: {
      ...(base.value as Record<string, unknown>),
      ...((args?.value as Record<string, unknown>) ?? {}),
    },
  };
}
