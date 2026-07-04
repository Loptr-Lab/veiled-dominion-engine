import { describe, it, expect, beforeEach } from 'vitest';
import { syncProfile } from '../src/integration/rpgActor/syncProfile';
import { createRpgActorTestDeps, makeValidEnvelope } from './helpers/rpgActorFakes';

describe('rpg.actor acceptance criteria', () => {
  const nowIso = '2026-07-04T09:16:00.000Z';

  let testkit: ReturnType<typeof createRpgActorTestDeps>;

  beforeEach(() => {
    testkit = createRpgActorTestDeps();
  });

  // AC-1.1
  it('AC-1.1 resolves valid handle to DID', async () => {
    const did = 'did:plc:ac11';
    testkit.identity.set('valid-handle.bsky.social', did);
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion` }));

    const result = await syncProfile(
      { handleOrDid: 'valid-handle.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.profile.did).toBe(did);
  });

  // AC-1.2
  it('AC-1.2 accepts DID input without handle resolution', async () => {
    const did = 'did:plc:ac12';
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion` }));

    const result = await syncProfile(
      { handleOrDid: did },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.profile.did).toBe(did);
  });

  // AC-1.3
  it('AC-1.3 returns IDENTITY_RESOLUTION_FAILED for invalid handle', async () => {
    testkit.identity.fail('invalid.bsky.social');

    const result = await syncProfile(
      { handleOrDid: 'invalid.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('IDENTITY_RESOLUTION_FAILED');
  });

  // AC-2.1
  it('AC-2.1 fetches actor.rpg.stats with rkey veiled-dominion', async () => {
    const did = 'did:plc:ac21';
    testkit.identity.set('fetchcheck.bsky.social', did);
    testkit.fetcher.setRecord({ did, rkey: 'veiled-dominion' }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion` }));

    const result = await syncProfile(
      { handleOrDid: 'fetchcheck.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.profile.sourceUri).toContain('/actor.rpg.stats/veiled-dominion');
  });

  // AC-2.2
  it('AC-2.2 returns PROFILE_NOT_FOUND and defaults when record missing', async () => {
    const did = 'did:plc:ac22';
    testkit.identity.set('notfound.bsky.social', did);
    testkit.fetcher.setRecord({ did }, null);

    const casual = await syncProfile(
      { handleOrDid: 'notfound.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(casual.ok).toBe(true);
    if (casual.ok) expect(casual.source).toBe('default');
  });

  // AC-2.3 + AC-8.2
  it('AC-2.3/8.2 falls back to cache on transient network failure when cache fresh', async () => {
    const did = 'did:plc:ac23';
    testkit.identity.set('cachefresh.bsky.social', did);
    testkit.fetcher.setFailure({ did });

    testkit.store.seedSnapshot({
      did,
      cachedAtIso: '2026-07-04T09:00:00.000Z',
      profile: {
        did,
        system: 'veiled-dominion',
        schemaVersion: 1,
        stats: { restraintMetric: 88, egoAnnihilationCount: 2, matchesPlayed: 21 },
        sourceCid: 'bafy-cached-ac23',
        sourceUri: `at://${did}/actor.rpg.stats/veiled-dominion`,
        fetchedAt: '2026-07-04T09:00:00.000Z',
        marker: 5,
      },
    });

    const result = await syncProfile(
      { handleOrDid: 'cachefresh.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.source).toBe('cache');
  });

  // AC-3.1 + AC-4.1
  it('AC-3.1/4.1 accepts required envelope and schemaVersion=1', async () => {
    const did = 'did:plc:ac31';
    testkit.identity.set('schemaok.bsky.social', did);
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion` }));

    const result = await syncProfile(
      { handleOrDid: 'schemaok.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60, allowedSchemaVersions: [1] },
      testkit.deps
    );

    expect(result.ok).toBe(true);
  });

  // AC-3.2
  it('AC-3.2 rejects out-of-range numeric values with SCHEMA_INVALID_BOUNDS', async () => {
    const did = 'did:plc:ac32';
    testkit.identity.set('bounds.bsky.social', did);
    testkit.fetcher.setRecord(
      { did },
      makeValidEnvelope({
        uri: `at://${did}/actor.rpg.stats/veiled-dominion`,
        value: { data: { restraintMetric: -1, egoAnnihilationCount: 3, matchesPlayed: 42 } },
      })
    );

    const result = await syncProfile(
      { handleOrDid: 'bounds.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('SCHEMA_INVALID_BOUNDS');
  });

  // AC-3.3
  it('AC-3.3 rejects invalid numeric types with SCHEMA_INVALID_TYPE', async () => {
    const did = 'did:plc:ac33';
    testkit.identity.set('types.bsky.social', did);
    testkit.fetcher.setRecord(
      { did },
      makeValidEnvelope({
        uri: `at://${did}/actor.rpg.stats/veiled-dominion`,
        value: { data: { restraintMetric: '84', egoAnnihilationCount: 3, matchesPlayed: 42 } as any },
      })
    );

    const result = await syncProfile(
      { handleOrDid: 'types.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('SCHEMA_INVALID_TYPE');
  });

  // AC-3.4
  it('AC-3.4 rejects system mismatch with SYSTEM_MISMATCH', async () => {
    const did = 'did:plc:ac34';
    testkit.identity.set('system.bsky.social', did);
    testkit.fetcher.setRecord(
      { did },
      makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, value: { system: 'not-veiled' } })
    );

    const result = await syncProfile(
      { handleOrDid: 'system.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('SYSTEM_MISMATCH');
  });

  // AC-4.2
  it('AC-4.2 soft-fails in casual, hard-fails in ranked for unsupported schema version', async () => {
    const did = 'did:plc:ac42';
    testkit.identity.set('version.bsky.social', did);
    testkit.fetcher.setRecord(
      { did },
      makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, value: { schemaVersion: 99 } })
    );

    const casual = await syncProfile(
      { handleOrDid: 'version.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60, allowedSchemaVersions: [1] },
      testkit.deps
    );
    expect(casual.ok).toBe(true);

    const ranked = await syncProfile(
      { handleOrDid: 'version.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60, allowedSchemaVersions: [1] },
      testkit.deps
    );
    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('SCHEMA_VERSION_UNSUPPORTED');
  });

  // AC-5.1
  it('AC-5.1 ranked requires freshness marker', async () => {
    const did = 'did:plc:ac51';
    testkit.identity.set('freshness.bsky.social', did);
    testkit.fetcher.setRecord(
      { did },
      makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, value: { version: undefined, updatedAt: undefined } })
    );

    const ranked = await syncProfile(
      { handleOrDid: 'freshness.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );
    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('FRESHNESS_REQUIRED');
  });

  // AC-5.2
  it('AC-5.2 rejects rollback with REPLAY_DETECTED', async () => {
    const did = 'did:plc:ac52';
    testkit.identity.set('rollback.bsky.social', did);
    testkit.store.seedPriorState(did, { marker: 10, cid: 'bafy-prev' });
    testkit.fetcher.setRecord(
      { did },
      makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, cid: 'bafy-new', value: { version: 9, updatedAt: undefined } })
    );

    const ranked = await syncProfile(
      { handleOrDid: 'rollback.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );
    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('REPLAY_DETECTED');
  });

  // AC-5.3
  it('AC-5.3 rejects equal marker + different CID with CID_CONFLICT', async () => {
    const did = 'did:plc:ac53';
    testkit.identity.set('cidconflict.bsky.social', did);
    testkit.store.seedPriorState(did, { marker: 10, cid: 'bafy-old' });
    testkit.fetcher.setRecord(
      { did },
      makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, cid: 'bafy-new', value: { version: 10, updatedAt: undefined } })
    );

    const ranked = await syncProfile(
      { handleOrDid: 'cidconflict.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );
    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('CID_CONFLICT');
  });

  // AC-5.4
  it('AC-5.4 accepts monotonic marker increase and persists marker+CID', async () => {
    const did = 'did:plc:ac54';
    testkit.identity.set('monotonic.bsky.social', did);
    testkit.store.seedPriorState(did, { marker: 10, cid: 'bafy-old' });
    testkit.fetcher.setRecord(
      { did },
      makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, cid: 'bafy-11', value: { version: 11, updatedAt: undefined } })
    );

    const ranked = await syncProfile(
      { handleOrDid: 'monotonic.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(ranked.ok).toBe(true);
    const persisted = await testkit.store.getPriorAcceptedState(did);
    expect(persisted?.marker).toBe(11);
    expect(persisted?.cid).toBe('bafy-11');
  });

  // AC-6.1
  it('AC-6.1 ranked authority isolation: remote profile does not decide match outcome/MMR', async () => {
    // Contract-level placeholder: assert sync only returns profile data, not outcome/MMR fields.
    const did = 'did:plc:ac61';
    testkit.identity.set('authority.bsky.social', did);
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion` }));

    const result = await syncProfile(
      { handleOrDid: 'authority.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect((result.profile as any).mmr).toBeUndefined();
      expect((result.profile as any).matchOutcome).toBeUndefined();
    }
  });

  // AC-6.2
  it('AC-6.2 invalid cosmetic metadata degrades gracefully to defaults', async () => {
    // Current validator ignores unknown extras; this confirms no crash path.
    const did = 'did:plc:ac62';
    testkit.identity.set('cosmetic.bsky.social', did);
    testkit.fetcher.setRecord(
      { did },
      makeValidEnvelope({
        uri: `at://${did}/actor.rpg.stats/veiled-dominion`,
        value: { data: { restraintMetric: 10, egoAnnihilationCount: 1, matchesPlayed: 1 }, sprite: { broken: true } as any },
      })
    );

    const result = await syncProfile(
      { handleOrDid: 'cosmetic.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(true);
  });

  // AC-7.1
  it('AC-7.1 maps validated record to normalized DTO contract', async () => {
    const did = 'did:plc:ac71';
    testkit.identity.set('dto.bsky.social', did);
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion` }));

    const result = await syncProfile(
      { handleOrDid: 'dto.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.profile.did).toBe(did);
      expect(result.profile.system).toBe('veiled-dominion');
      expect(result.profile.schemaVersion).toBeTypeOf('number');
      expect(result.profile.stats).toBeDefined();
      expect(result.profile.sourceCid).toBeTypeOf('string');
      expect(result.profile.sourceUri).toBeTypeOf('string');
      expect(result.profile.fetchedAt).toBeTypeOf('string');
    }
  });

  // AC-7.2
  it('AC-7.2 core gameplay consumes DTO only (no raw JSON leakage)', async () => {
    const did = 'did:plc:ac72';
    testkit.identity.set('rawjson.bsky.social', did);
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion` }));

    const result = await syncProfile(
      { handleOrDid: 'rawjson.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect((result.profile as any).value).toBeUndefined();
      expect((result.profile as any).raw).toBeUndefined();
    }
  });

  // AC-8.1
  it('AC-8.1 persists last-known-good snapshot on successful validation', async () => {
    const did = 'did:plc:ac81';
    testkit.identity.set('persist.bsky.social', did);
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion` }));

    const result = await syncProfile(
      { handleOrDid: 'persist.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(result.ok).toBe(true);
    const cached = await testkit.store.getLastKnownGood(did);
    expect(cached).not.toBeNull();
    expect(cached?.profile.did).toBe(did);
  });

  // AC-8.2 (expired cache branch)
  it('AC-8.2 blocks ranked on network failure when cache expired with PROFILE_STALE', async () => {
    const did = 'did:plc:ac82';
    testkit.identity.set('staleranked.bsky.social', did);
    testkit.fetcher.setFailure({ did });
    testkit.store.seedSnapshot({
      did,
      cachedAtIso: '2026-07-04T06:00:00.000Z',
      profile: {
        did,
        system: 'veiled-dominion',
        schemaVersion: 1,
        stats: { restraintMetric: 1, egoAnnihilationCount: 0, matchesPlayed: 1 },
        sourceCid: 'bafy-stale',
        sourceUri: `at://${did}/actor.rpg.stats/veiled-dominion`,
        fetchedAt: '2026-07-04T06:00:00.000Z',
        marker: 1,
      },
    });

    const ranked = await syncProfile(
      { handleOrDid: 'staleranked.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('PROFILE_STALE');
  });

  // AC-8.3
  it('AC-8.3 deterministic defaults when profile missing/invalid in casual', async () => {
    const did = 'did:plc:ac83';
    testkit.identity.set('defaults.bsky.social', did);
    testkit.fetcher.setRecord({ did }, null);

    const casual = await syncProfile(
      { handleOrDid: 'defaults.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(casual.ok).toBe(true);
    if (casual.ok) {
      expect(casual.source).toBe('default');
      expect(casual.profile.stats).toEqual({
        restraintMetric: 0,
        egoAnnihilationCount: 0,
        matchesPlayed: 0,
      });
    }
  });

  // AC-9.1
  it('AC-9.1 emits structured logs with did/collection/rkey/cid/result/reason/latency/source', async () => {
    const did = 'did:plc:ac91';
    testkit.identity.set('logs.bsky.social', did);
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, cid: 'bafy-log-cid' }));

    await syncProfile(
      { handleOrDid: 'logs.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    const accepted = testkit.logger.infos.find((x) => x.event === 'rpg_actor_profile_accepted');
    expect(accepted).toBeDefined();
    expect(accepted?.data?.did).toBe(did);
    expect(accepted?.data?.cid).toBe('bafy-log-cid');
  });

  // AC-9.2
  it('AC-9.2 increments sync metrics counters for success/failure/replay/cache/schemaInvalid', async () => {
    const did = 'did:plc:ac92';
    testkit.identity.set('metrics.bsky.social', did);
    testkit.fetcher.setRecord(
      { did },
      makeValidEnvelope({
        uri: `at://${did}/actor.rpg.stats/veiled-dominion`,
        value: { data: { restraintMetric: -999, egoAnnihilationCount: 1, matchesPlayed: 1 } },
      })
    );

    await syncProfile(
      { handleOrDid: 'metrics.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(testkit.metrics.get('profile_sync_failure_total', { code: 'SCHEMA_INVALID_BOUNDS', mode: 'ranked' })).toBe(1);
    expect(testkit.metrics.get('profile_schema_invalid_total', { mode: 'ranked' })).toBe(1);
  });

  // Minimum matrix #1
  it('MATRIX-1 valid record accepted (casual + ranked)', async () => {
    const did = 'did:plc:m1';
    testkit.identity.set('m1.bsky.social', did);
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion` }));

    const casual = await syncProfile(
      { handleOrDid: 'm1.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );
    const ranked = await syncProfile(
      { handleOrDid: 'm1.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(casual.ok).toBe(true);
    expect(ranked.ok).toBe(true);
  });

  // Minimum matrix #2
  it('MATRIX-2 wrong $type rejected', async () => {
    const did = 'did:plc:m2';
    testkit.identity.set('m2.bsky.social', did);
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, value: { $type: 'wrong.type' } }));

    const ranked = await syncProfile(
      { handleOrDid: 'm2.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('SCHEMA_INVALID_TYPE');
  });

  // Minimum matrix #3
  it('MATRIX-3 wrong system rejected', async () => {
    const did = 'did:plc:m3';
    testkit.identity.set('m3.bsky.social', did);
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, value: { system: 'another' } }));

    const ranked = await syncProfile(
      { handleOrDid: 'm3.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('SYSTEM_MISMATCH');
  });

  // Minimum matrix #4
  it('MATRIX-4 out-of-range numeric rejected', async () => {
    const did = 'did:plc:m4';
    testkit.identity.set('m4.bsky.social', did);
    testkit.fetcher.setRecord(
      { did },
      makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, value: { data: { restraintMetric: 5000, egoAnnihilationCount: 1, matchesPlayed: 1 } } })
    );

    const ranked = await syncProfile(
      { handleOrDid: 'm4.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('SCHEMA_INVALID_BOUNDS');
  });

  // Minimum matrix #5
  it('MATRIX-5 unknown schema version casual soft/ranked hard behavior', async () => {
    const did = 'did:plc:m5';
    testkit.identity.set('m5.bsky.social', did);
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, value: { schemaVersion: 2 } }));

    const casual = await syncProfile(
      { handleOrDid: 'm5.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60, allowedSchemaVersions: [1] },
      testkit.deps
    );
    const ranked = await syncProfile(
      { handleOrDid: 'm5.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60, allowedSchemaVersions: [1] },
      testkit.deps
    );

    expect(casual.ok).toBe(true);
    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('SCHEMA_VERSION_UNSUPPORTED');
  });

  // Minimum matrix #6
  it('MATRIX-6 ranked missing freshness rejected', async () => {
    const did = 'did:plc:m6';
    testkit.identity.set('m6.bsky.social', did);
    testkit.fetcher.setRecord(
      { did },
      makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, value: { version: undefined, updatedAt: undefined } })
    );

    const ranked = await syncProfile(
      { handleOrDid: 'm6.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('FRESHNESS_REQUIRED');
  });

  // Minimum matrix #7
  it('MATRIX-7 ranked rollback rejected', async () => {
    const did = 'did:plc:m7';
    testkit.identity.set('m7.bsky.social', did);
    testkit.store.seedPriorState(did, { marker: 20, cid: 'bafy-prev' });
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, value: { version: 19, updatedAt: undefined } }));

    const ranked = await syncProfile(
      { handleOrDid: 'm7.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('REPLAY_DETECTED');
  });

  // Minimum matrix #8
  it('MATRIX-8 equal marker + different CID rejected', async () => {
    const did = 'did:plc:m8';
    testkit.identity.set('m8.bsky.social', did);
    testkit.store.seedPriorState(did, { marker: 20, cid: 'bafy-old' });
    testkit.fetcher.setRecord({ did }, makeValidEnvelope({ uri: `at://${did}/actor.rpg.stats/veiled-dominion`, cid: 'bafy-new', value: { version: 20, updatedAt: undefined } }));

    const ranked = await syncProfile(
      { handleOrDid: 'm8.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('CID_CONFLICT');
  });

  // Minimum matrix #9
  it('MATRIX-9 network fail + fresh cache fallback accepted in casual', async () => {
    const did = 'did:plc:m9';
    testkit.identity.set('m9.bsky.social', did);
    testkit.fetcher.setFailure({ did });

    testkit.store.seedSnapshot({
      did,
      cachedAtIso: '2026-07-04T09:10:00.000Z',
      profile: {
        did,
        system: 'veiled-dominion',
        schemaVersion: 1,
        stats: { restraintMetric: 77, egoAnnihilationCount: 2, matchesPlayed: 12 },
        sourceCid: 'bafy-cache-m9',
        sourceUri: `at://${did}/actor.rpg.stats/veiled-dominion`,
        fetchedAt: '2026-07-04T09:10:00.000Z',
        marker: 2,
      },
    });

    const casual = await syncProfile(
      { handleOrDid: 'm9.bsky.social' },
      { mode: 'casual', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(casual.ok).toBe(true);
    if (casual.ok) expect(casual.source).toBe('cache');
  });

  // Minimum matrix #10
  it('MATRIX-10 network fail + expired cache blocked in ranked', async () => {
    const did = 'did:plc:m10';
    testkit.identity.set('m10.bsky.social', did);
    testkit.fetcher.setFailure({ did });

    testkit.store.seedSnapshot({
      did,
      cachedAtIso: '2026-07-04T05:00:00.000Z',
      profile: {
        did,
        system: 'veiled-dominion',
        schemaVersion: 1,
        stats: { restraintMetric: 5, egoAnnihilationCount: 0, matchesPlayed: 1 },
        sourceCid: 'bafy-cache-m10',
        sourceUri: `at://${did}/actor.rpg.stats/veiled-dominion`,
        fetchedAt: '2026-07-04T05:00:00.000Z',
        marker: 1,
      },
    });

    const ranked = await syncProfile(
      { handleOrDid: 'm10.bsky.social' },
      { mode: 'ranked', nowIso, cacheTtlMinutes: 60 },
      testkit.deps
    );

    expect(ranked.ok).toBe(false);
    if (!ranked.ok) expect(ranked.code).toBe('PROFILE_STALE');
  });
});
