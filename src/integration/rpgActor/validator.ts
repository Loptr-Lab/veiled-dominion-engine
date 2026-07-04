/**
 * rpg.actor validator + normalizer starter
 * Target: veiled-dominion-engine
 *
 * This module is intentionally framework-agnostic and can be used by both
 * client tooling and authoritative server code.
 */

export type SyncMode = 'casual' | 'ranked';

export type ValidationErrorCode =
  | 'SCHEMA_INVALID_TYPE'
  | 'SCHEMA_INVALID_BOUNDS'
  | 'SYSTEM_MISMATCH'
  | 'SCHEMA_VERSION_UNSUPPORTED'
  | 'FRESHNESS_REQUIRED'
  | 'REPLAY_DETECTED'
  | 'CID_CONFLICT';

export interface RawAtprotoRecordEnvelope {
  uri: string;
  cid: string;
  value: unknown;
}

export interface VeiledDominionStatsV1 {
  $type: 'actor.rpg.stats';
  system: 'veiled-dominion';
  schemaVersion: 1;
  // At least one should exist in ranked mode.
  updatedAt?: string; // ISO8601 preferred
  version?: number; // monotonic integer fallback
  data: {
    restraintMetric: number;
    egoAnnihilationCount: number;
    matchesPlayed: number;
  };
  // tolerate unknown extra fields
  [k: string]: unknown;
}

export interface PriorAcceptedState {
  marker?: number; // normalized monotonic marker (epoch ms or version)
  cid?: string;
}

export interface ValidatorOptions {
  mode: SyncMode;
  nowIso?: string;
  allowedSchemaVersions?: number[];
  bounds?: {
    restraintMetric: { min: number; max: number };
    egoAnnihilationCount: { min: number; max: number };
    matchesPlayed: { min: number; max: number };
  };
}

export interface NormalizedProfile {
  did: string;
  system: 'veiled-dominion';
  schemaVersion: number;
  stats: {
    restraintMetric: number;
    egoAnnihilationCount: number;
    matchesPlayed: number;
  };
  sourceCid: string;
  sourceUri: string;
  fetchedAt: string;
  marker?: number;
}

export type ValidationResult =
  | { ok: true; profile: NormalizedProfile }
  | { ok: false; code: ValidationErrorCode; message: string };

const DEFAULT_BOUNDS = {
  restraintMetric: { min: 0, max: 1000 },
  egoAnnihilationCount: { min: 0, max: 1_000_000 },
  matchesPlayed: { min: 0, max: 1_000_000 },
} as const;

const DEFAULT_SCHEMA_VERSIONS = [1];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFiniteInteger(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n) && Number.isInteger(n);
}

function inRange(n: number, min: number, max: number): boolean {
  return n >= min && n <= max;
}

function parseIsoToEpochMs(iso: string): number | null {
  const ms = Date.parse(iso);
  return Number.isFinite(ms) ? ms : null;
}

function extractDidFromAtUri(uri: string): string | null {
  // expected: at://did:plc:xxxx/collection/rkey
  const prefix = 'at://';
  if (!uri.startsWith(prefix)) return null;
  const rest = uri.slice(prefix.length);
  const slash = rest.indexOf('/');
  if (slash <= 0) return null;
  const did = rest.slice(0, slash);
  return did || null;
}

/**
 * Create a monotonic marker from record freshness fields.
 * Preference:
 *   1) version (integer)
 *   2) updatedAt (ISO timestamp -> epoch ms)
 */
export function computeMarker(value: VeiledDominionStatsV1): number | undefined {
  if (isFiniteInteger(value.version)) return value.version;
  if (typeof value.updatedAt === 'string') {
    const ms = parseIsoToEpochMs(value.updatedAt);
    if (ms !== null) return ms;
  }
  return undefined;
}

/**
 * Structural parse into typed stats schema with strict checks.
 */
export function parseVeiledDominionStats(
  input: unknown,
  allowedSchemaVersions: number[] = DEFAULT_SCHEMA_VERSIONS,
  bounds: ValidatorOptions['bounds'] = DEFAULT_BOUNDS
): { ok: true; value: VeiledDominionStatsV1 } | { ok: false; code: ValidationErrorCode; message: string } {
  if (!isObject(input)) {
    return { ok: false, code: 'SCHEMA_INVALID_TYPE', message: 'Record value must be an object.' };
  }

  const $type = input.$type;
  const system = input.system;
  const schemaVersion = input.schemaVersion;
  const data = input.data;

  if ($type !== 'actor.rpg.stats') {
    return { ok: false, code: 'SCHEMA_INVALID_TYPE', message: 'Invalid $type, expected actor.rpg.stats.' };
  }

  if (system !== 'veiled-dominion') {
    return { ok: false, code: 'SYSTEM_MISMATCH', message: 'Record system does not match veiled-dominion.' };
  }

  if (!isFiniteInteger(schemaVersion)) {
    return { ok: false, code: 'SCHEMA_INVALID_TYPE', message: 'schemaVersion must be an integer.' };
  }

  if (!allowedSchemaVersions.includes(schemaVersion)) {
    return { ok: false, code: 'SCHEMA_VERSION_UNSUPPORTED', message: `Unsupported schemaVersion: ${schemaVersion}` };
  }

  if (!isObject(data)) {
    return { ok: false, code: 'SCHEMA_INVALID_TYPE', message: 'data must be an object.' };
  }

  const restraintMetric = data.restraintMetric;
  const egoAnnihilationCount = data.egoAnnihilationCount;
  const matchesPlayed = data.matchesPlayed;

  if (!isFiniteInteger(restraintMetric) || !isFiniteInteger(egoAnnihilationCount) || !isFiniteInteger(matchesPlayed)) {
    return {
      ok: false,
      code: 'SCHEMA_INVALID_TYPE',
      message: 'All stats fields must be finite integers.',
    };
  }

  if (
    !inRange(restraintMetric, bounds!.restraintMetric.min, bounds!.restraintMetric.max) ||
    !inRange(egoAnnihilationCount, bounds!.egoAnnihilationCount.min, bounds!.egoAnnihilationCount.max) ||
    !inRange(matchesPlayed, bounds!.matchesPlayed.min, bounds!.matchesPlayed.max)
  ) {
    return {
      ok: false,
      code: 'SCHEMA_INVALID_BOUNDS',
      message: 'One or more stats fields are out of allowed bounds.',
    };
  }

  const candidate: VeiledDominionStatsV1 = {
    $type: 'actor.rpg.stats',
    system: 'veiled-dominion',
    schemaVersion: schemaVersion as 1,
    data: {
      restraintMetric,
      egoAnnihilationCount,
      matchesPlayed,
    },
  };

  if (typeof input.updatedAt === 'string') candidate.updatedAt = input.updatedAt;
  if (isFiniteInteger(input.version)) candidate.version = input.version;

  return { ok: true, value: candidate };
}

/**
 * Ranked-mode anti-replay checks.
 */
export function validateFreshness(
  mode: SyncMode,
  currentMarker: number | undefined,
  currentCid: string,
  prior?: PriorAcceptedState
): { ok: true } | { ok: false; code: ValidationErrorCode; message: string } {
  if (mode !== 'ranked') return { ok: true };

  if (currentMarker === undefined) {
    return {
      ok: false,
      code: 'FRESHNESS_REQUIRED',
      message: 'Ranked mode requires version or updatedAt freshness marker.',
    };
  }

  if (prior?.marker !== undefined) {
    if (currentMarker < prior.marker) {
      return {
        ok: false,
        code: 'REPLAY_DETECTED',
        message: 'Incoming record marker is older than previously accepted marker.',
      };
    }

    if (currentMarker === prior.marker && prior.cid && prior.cid !== currentCid) {
      return {
        ok: false,
        code: 'CID_CONFLICT',
        message: 'Equal freshness marker with different CID detected.',
      };
    }
  }

  return { ok: true };
}

/**
 * End-to-end envelope validation + normalization.
 */
export function validateAndNormalizeRecord(
  envelope: RawAtprotoRecordEnvelope,
  options: ValidatorOptions,
  prior?: PriorAcceptedState
): ValidationResult {
  const nowIso = options.nowIso ?? new Date().toISOString();
  const allowedSchemaVersions = options.allowedSchemaVersions ?? DEFAULT_SCHEMA_VERSIONS;
  const bounds = options.bounds ?? DEFAULT_BOUNDS;

  if (!envelope || typeof envelope.uri !== 'string' || typeof envelope.cid !== 'string') {
    return {
      ok: false,
      code: 'SCHEMA_INVALID_TYPE',
      message: 'Envelope must contain string uri and cid.',
    };
  }

  const parsed = parseVeiledDominionStats(envelope.value, allowedSchemaVersions, bounds);
  if (!parsed.ok) return parsed;

  const marker = computeMarker(parsed.value);
  const freshness = validateFreshness(options.mode, marker, envelope.cid, prior);
  if (!freshness.ok) return freshness;

  const did = extractDidFromAtUri(envelope.uri);
  if (!did) {
    return {
      ok: false,
      code: 'SCHEMA_INVALID_TYPE',
      message: 'Could not extract DID from record URI.',
    };
  }

  return {
    ok: true,
    profile: {
      did,
      system: 'veiled-dominion',
      schemaVersion: parsed.value.schemaVersion,
      stats: {
        restraintMetric: parsed.value.data.restraintMetric,
        egoAnnihilationCount: parsed.value.data.egoAnnihilationCount,
        matchesPlayed: parsed.value.data.matchesPlayed,
      },
      sourceCid: envelope.cid,
      sourceUri: envelope.uri,
      fetchedAt: nowIso,
      marker,
    },
  };
}
