# Veiled Dominion Architecture Overview

## Purpose

This document defines the first-pass architecture contract for the Veiled Dominion engine.

It exists to help contributors understand:
- how game-state transitions should flow
- where piece logic is validated and applied
- how variant-specific behaviors can hook into the engine
- how deterministic replay and snapshotting should work
- how planned player identity, matchmaking, and ranked-play systems should preserve competitive integrity

This file is intentionally implementation-facing. It complements the rulebook in `docs/RULEBOOK_v0.1` and the contribution standards in `CONTRIBUTING.md`.

---

## Core Engine Principles

The engine should preserve the following constraints:

1. **Determinism first**
   - identical input sequences must produce identical game states

2. **State transitions over ad hoc mutation**
   - move validation, move application, aura resolution, and end-state checks should occur in a predictable order

3. **Variant extensibility**
   - baseline Veiled Dominion rules must remain clear, but variant hooks should be possible without rewriting the entire runtime loop

4. **Headless testability**
   - board geometry, movement validation, aura logic, and state transitions must be testable without rendering dependencies

5. **Server authority for competitive systems**
   - planned ranked play, matchmaking, and player-profile integration must preserve server-side authority for outcomes that affect standings, progression, or anti-cheat decisions

---

## The Movement Calculation Pipeline

All locomotion and stateful move behavior should pass through a canonical validation pipeline.

```text
1. Calculate Base Movement Vectors
   ↓
2. Evaluate Spatial State Modifiers
   ↓
3. Apply Resource / Aura Overrides
   ↓
4. Filter Illegal Moves
   ↓
5. Return Validated Coordinate Set
```

### Phase meanings

- **Calculate Base Movement Vectors**
  - derive the piece’s baseline legal movement pattern from its type

- **Evaluate Spatial State Modifiers**
  - apply restrictions such as `Veiled`, Sanctuary immunity, or variant-specific positional constraints

- **Apply Resource / Aura Overrides**
  - apply effects from systems such as `RadiusOfRuin`, `Aura Suppression`, or future resource-driven mechanics

- **Filter Illegal Moves**
  - remove moves that violate occupancy, invulnerability, protected coordinates, or engine-level legality rules

- **Return Validated Coordinate Set**
  - expose only the final legal move list to the caller, UI layer, AI layer, or replay system

---

## Turn Lifecycle Overview

The runtime game loop should model the baseline rules as three explicit phases:

```text
[START PHASE]
  ├── Set active player
  ├── Clear active player's expired Veiled states
  ├── Apply start-of-turn effects
  └── Declare optional effects (e.g. Aura Suppression)

[ACTION PHASE]
  ├── Receive PlayerIntent
  ├── Validate intent against board state and rules
  ├── Apply move or action
  └── Resolve immediate capture/displacement results

[RESOLUTION PHASE]
  ├── Recalculate Radius of Ruin
  ├── Apply Veiled states
  ├── Update LP / self-veil counters / other tracked state
  ├── Evaluate victory and loss conditions
  └── Emit canonical snapshot
```

---

## Ordered Engine Sequence

The baseline engine sequence should be treated as:

```text
PlayerIntent
  ↓
OnValidateIntent
  ↓
OnApplyMove
  ↓
OnResolveCapture
  ↓
OnResolveSystems
  ↓
OnCheckEndState
  ↓
Snapshot
  ↓
Replay / Persistence / UI Refresh
```

### Sequence definitions

- **PlayerIntent**
  - an action request from a player or test harness
  - examples: move piece, trigger Aura Suppression, use Martyr’s Boon

- **OnValidateIntent**
  - confirm the action is legal in the current state
  - validate turn ownership, piece restrictions, destination legality, and protected-state rules

- **OnApplyMove**
  - mutate board state in a controlled way
  - move the piece, update occupancy, and apply immediate local changes

- **OnResolveCapture**
  - resolve capture, displacement, graveyard updates, or invulnerability conflicts

- **OnResolveSystems**
  - run stateful global systems such as `RadiusOfRuinSystem`
  - apply delayed status effects and update counters

- **OnCheckEndState**
  - evaluate victory, elimination, loss-of-control, or other terminal conditions

- **Snapshot**
  - persist a canonical representation of the game state for test comparison, replay, persistence, or multiplayer sync

- **Replay / Persistence / UI Refresh**
  - consumers should react to snapshots rather than reconstruct engine state from partial events

---

## Planned Online Systems & Player Identity

**Status:** 📋 Planned — design direction only. Ranked play, matchmaking, and player profile systems do not yet exist in the engine.

If online systems are added, they should use portable identity only where it does not compromise deterministic play or competitive integrity.

### Design direction

- portable player identity may be linked through AT Protocol / `rpg.actor`
- remote profile data may inform UX, cosmetics, and pre-match metadata
- ranked outcomes, standings, progression, and anti-cheat decisions must remain server-authoritative
- any imported profile payload must be validated, normalized, versioned, and bounded before use
- stale, replayed, or rollbacked remote profile data must be rejected in competitive paths

### Integration boundary

A future adapter may:
- resolve a DID
- fetch `actor.rpg.stats` for the Veiled Dominion namespace
- validate `$type`, `system`, and supported `schemaVersion`
- normalize allowed fields into a local engine-facing contract
- cache a last-known-good profile for resilience and deterministic fallback

This integration direction is described in more detail in `docs/PLAYER_IDENTITY_AND_RANKED_INTEGRATION.md`.

---

## Veiled State Lifecycle

The `Veiled` state must be modeled as an explicit engine lifecycle, not as an ad hoc visual flag.

### Trigger
A non-immune piece ends a resolution phase within Rebirth’s active 1-square aura.

### Duration
The state lasts until the start of that piece owner’s next turn, where it is cleared during the Start Phase.

### Effects
A Veiled unit:
- loses normal class locomotion
- is restricted to 1-square-forward movement
- cannot capture

### Refresh behavior
If a piece re-enters or remains in the aura, the duration refreshes rather than stacking.

### Immunity behavior
The following pieces are not affected:
- Rebirth
- Death
- any unit protected by Sanctuary or other future immunity systems

---

## GhostPiece Variant Hook Model

Variants may require pieces with extra runtime behavior that should not be hardcoded into the baseline piece hierarchy.

A lightweight extension model can be represented as a `GhostPiece`-style component or data wrapper.

```csharp
[Serializable]
public class GhostPiece
{
    public string Id;
    public Vector2Int Position;
    public MovementPattern BaseMovement;
    public List<VariantModifier> VariantModifiers;

    // Lifecycle hooks invoked by the engine:
    public void OnValidateIntent(Intent intent) { /* variant checks */ }
    public void OnApplyMove(Move move) { /* movement-time mutation */ }
    public void OnResolveCapture(CaptureInfo capture) { /* capture hooks */ }
}
```

### Intent of this model

This example is not a final class contract. It demonstrates the minimum expectations for variant-aware piece behavior:

- **serialized identity**
  - stable identifier for replay, debugging, and persistence

- **position**
  - canonical board coordinate or engine-adapter equivalent

- **base movement**
  - normal locomotion pattern before variant modifiers

- **variant modifiers**
  - attachable mechanics that alter validation, movement, or resolution behavior

- **lifecycle hooks**
  - controlled points where variant logic can run without bypassing the engine’s main sequencing

### Constraint
Variant hooks must never bypass deterministic engine ordering. They extend the pipeline; they do not replace it.

---

## Determinism & Snapshot Contract

Determinism is a hard requirement for the engine.

The engine should produce a canonical snapshot:
- after each fully resolved action
- before any replay serialization
- before any network synchronization
- at any point where tests need exact state comparison

### Snapshot timing

Minimum recommendation:
1. optional **pre-action snapshot** before `OnApplyMove`
2. required **post-resolution snapshot** after:
   - capture resolution
   - aura recalculation
   - state updates
   - victory checks

### Canonical snapshot fields

A baseline snapshot should include:

- `turnNumber`
- `activePlayer`
- `phase`
- `rngSeed` or deterministic random state, if randomness is ever introduced
- full piece list
  - piece id
  - type
  - owner
  - coordinate
  - veiled state
  - immunity state, if applicable
- graveyard / removed pieces
- Leadership Point totals
- Rebirth self-veil count
- active toggles such as Aura Suppression
- end-state flags
  - eliminated players
  - victory state
  - loss-of-control state

### Snapshot rule

A snapshot must be sufficient to:
- reconstruct the entire board state
- replay the game forward deterministically
- compare expected and actual test outcomes without hidden state

If a runtime value affects legal play, it belongs in the snapshot.

---

## Board and State Responsibilities

### `BoardCoordinate`
Responsible for:
- coordinate identity
- cross-board validity checks
- adjacency queries
- zone classification

### `BoardState`
Responsible for:
- occupancy tracking
- piece lookup by coordinate
- controlled piece placement, movement, and removal

### `Piece`
Responsible for:
- piece identity
- owner
- current position
- immunity flags
- legal-move generation contract

### `RadiusOfRuinSystem`
Responsible for:
- adjacency-based aura evaluation
- Veiled-state application
- self-veil tracking for Rebirth loss condition

### Future turn-loop controller
Responsible for:
- turn order
- phase progression
- intent sequencing
- timing of system resolution
- end-state checks
- snapshot emission

---

## Extension Strategy

Future systems should be added as explicit runtime systems rather than buried inside UI code or piece subclasses.

Good candidates for system-level isolation:
- turn loop controller
- LP tracker
- victory-condition evaluator
- graveyard manager
- variant modifier resolver
- replay serializer
- matchmaking/session orchestrator for future online play
- profile-integration adapter boundary for future player identity systems

This keeps the engine:
- deterministic
- testable
- easier to port between Unity, browser, or headless simulation targets

---

## Minimum Next Implementation Targets

To move from scaffold to playable prototype, the highest-priority engine additions are:

1. **Turn loop controller**
   - explicit 4-player clockwise progression
   - start/action/resolution phases

2. **Leadership Point tracker**
   - baseline LP scoring model from `docs/RULEBOOK_v0.1`

3. **Validated move execution path**
   - intent → validation → apply → resolution

4. **Snapshot serializer**
   - canonical state export for replay and tests

5. **Baseline tests**
   - board geometry
   - aura application
   - Veiled clearing timing
   - self-veil loss threshold

6. **Defer online/ranked systems until core local determinism exists**
   - do not implement matchmaking, rankings, or remote profile authority before the single-engine snapshot contract is stable

---

## Final Note

If this file and `RULEBOOK_v0.1` ever disagree, treat that as a repository bug and fix both together.

The rulebook defines gameplay truth.
This file defines runtime sequencing truth.

Both must remain aligned.
