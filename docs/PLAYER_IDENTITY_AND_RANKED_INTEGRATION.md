### rpg.actor integration scope for Veiled Dominion

**Status:** 📋 Planned — design/integration scope, not yet implemented. Ranked play, matchmaking, and player profile systems do not yet exist in the engine.

We should integrate **valid, portable parts** of rpg.actor as a profile interoperability layer, while keeping Veiled Dominion server-authoritative for competitive integrity.

#### Best use case
Use rpg.actor to import:
- player identity linkage (DID/handle),
- profile stats relevant to progression/meta,
- cosmetic/asset references (sprites, items).

Do **not** treat remote profile data as authoritative for ranked match outcomes.

#### Why this is the right fit
- rpg.actor is plugin-oriented and designed for engine interoperability.
- ATproto gives decentralized identity/data portability.
- Veiled Dominion still needs strict anti-cheat boundaries for ranked play.

#### Implementation boundary (must-have)
1. Build an adapter: resolve DID -> fetch `actor.rpg.stats` (`rkey=veiled-dominion`) -> validate -> normalize.
2. Enforce schema contract:
   - `$type === actor.rpg.stats`
   - `system === veiled-dominion`
   - supported `schemaVersion`
   - bounded numeric fields
3. Add trust tiers:
   - Casual mode: accept validated remote profile.
   - Ranked mode: require freshness/anti-replay and server-side authority.
4. Treat sprites/items as non-authoritative metadata unless explicitly whitelisted.
5. Cache last-known-good profile for resilience and deterministic fallback.

#### Security/authority policy
- Remote profile data may influence UX, cosmetics, and pre-match metadata.
- Only server-validated game events influence ranked MMR, season standings, and anti-cheat decisions.
- Reject stale/rollbacked profile versions in ranked paths.

#### Outcome
This gives us ecosystem interoperability and player-owned identity benefits **without compromising competitive integrity**.
