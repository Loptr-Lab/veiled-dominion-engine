# rpg.actor Integration Acceptance Criteria (Veiled Dominion)

Date: July 4, 2026  
Scope: `actor.rpg.stats` interoperability for `veiled-dominion-engine`

## 1) Identity Resolution

### AC-1.1 Handle resolution succeeds
- **Given** a valid handle (e.g. `dominique.bsky.social`)
- **When** the adapter resolves identity
- **Then** it returns a non-empty DID string in `did:plc:*` or supported DID format.

### AC-1.2 DID passthrough
- **Given** a DID input
- **When** the adapter is called
- **Then** it skips handle resolution and uses DID directly.

### AC-1.3 Resolution failure handling
- **Given** an invalid/unresolvable handle
- **When** resolution fails
- **Then** adapter returns a typed error (`IDENTITY_RESOLUTION_FAILED`) and does not crash.

---

## 2) Record Fetching

### AC-2.1 Correct collection/rkey query
- **Given** a resolved DID
- **When** fetching profile
- **Then** request uses:
  - `collection = actor.rpg.stats`
  - `rkey = veiled-dominion` (or configured season key)

### AC-2.2 Not-found behavior
- **Given** no matching record exists
- **When** fetch returns not found
- **Then** system returns `PROFILE_NOT_FOUND` and creates/uses default local profile (non-ranked eligible until synced).

### AC-2.3 Network fault tolerance
- **Given** transient network failure
- **When** fetch fails
- **Then** system uses last-known-good cache (if available) and emits `PROFILE_FALLBACK_CACHE_USED`.

---

## 3) Schema Validation

### AC-3.1 Required envelope fields
- **Given** fetched JSON
- **Then** it must contain:
  - `$type === "actor.rpg.stats"`
  - `system === "veiled-dominion"`
  - `schemaVersion` supported
  - `data` object present

### AC-3.2 Numeric field bounds
- **Then** enforce:
  - `restraintMetric` integer `0..1000`
  - `egoAnnihilationCount` integer `0..1_000_000`
  - `matchesPlayed` integer `0..1_000_000`
- **And** invalid values return `SCHEMA_INVALID_BOUNDS`.

### AC-3.3 Type strictness
- **Then** non-integer numerics, NaN, strings-for-numbers are rejected with `SCHEMA_INVALID_TYPE`.

### AC-3.4 System mismatch rejection
- **Given** `system != veiled-dominion`
- **Then** reject with `SYSTEM_MISMATCH`.

---

## 4) Version Compatibility

### AC-4.1 Supported version accepted
- **Given** `schemaVersion = 1`
- **Then** record
