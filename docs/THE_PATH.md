# THE PATH

## Purpose

**THE PATH** is the implementation path from the canonical Veiled Dominion rules to a living, testable game.

It is a production and engineering roadmap, not a replacement for the rulebook and not a source of gameplay authority.

The governing question is:

> How do we walk from the canonical rulebook to a living, testable game?

## Authority boundary

Use the repository documents in this order of responsibility:

- **[RULEBOOK_v0.1](./RULEBOOK_v0.1)** — what the game rules say.
- **[GDD](./design/GDD.md)** — the broader design surrounding those rules.
- **[CANON_AND_CONTINUITY](./CANON_AND_CONTINUITY.md)** — what has authority, what is experimental, and how contradictions are handled.
- **THE PATH** — the sequence for turning that specification into implementation and verification.
- **[DEVELOPER_STATUS](../DEVELOPER_STATUS.md)** — what is actually implemented, planned, specified, or unresolved.

THE PATH does not promote experimental or historical mechanics into canon.

## The Path

### 1. THE FOUNDATION

Establish the canonical engine boundary.

**Target**

- 4-player game model
- Canonical 14×14 cross-board
- 1 Rebirth player + 3 Mortal factions
- Engine-independent state representation
- Deterministic state serialization

**Acceptance**

The canonical engine has an explicit source boundary and does not depend on the TypeScript exercise harness.

→ [Developer Status](../DEVELOPER_STATUS.md)

### 2. THE BOARD

Manifest the canonical 14×14 world.

**Target**

- Cross-shaped board geometry
- Four-player starting positions
- Piece ownership and identity
- Board coordinates
- Legal occupancy/state representation

**Acceptance**

A canonical starting position can be initialized and serialized deterministically.

→ [Rulebook](./RULEBOOK_v0.1)

### 3. THE MOVEMENT

Make the pieces move according to the canonical rules.

**Target**

- Piece movement
- Occupancy validation
- Turn ownership
- Legal and illegal move handling
- No renderer-owned rules

**Acceptance**

A legal move can be validated and applied without ambiguity.

→ [Rulebook](./RULEBOOK_v0.1)

### 4. THE TURN

Make consequence happen in the defined order.

**Runtime sequence**

`PlayerIntent → Validate → Apply → Resolve Capture → Resolve Systems → Check End State → Snapshot`

**Acceptance**

The engine executes the sequence deterministically and exposes the resulting state without requiring presentation code.

→ [Architecture Overview](../ARCHITECTURE_OVERVIEW.md)

### 5. THE REBIRTH

Introduce Rebirth's asymmetric power.

**Target**

- Rebirth identity and state
- Asymmetric capabilities
- Leadership/Mercy scoring
- Soul Reservoir / Rebirth Dash
- Canonical victory interaction

**Acceptance**

Rebirth's special systems are represented as explicit engine state and are covered by headless tests.

→ [Rulebook](./RULEBOOK_v0.1)

### 6. THE VEIL

Implement the Radius of Ruin and Veiled lifecycle.

**Target**

- One-square Radius of Ruin
- Veiling eligibility
- Veiled movement restriction
- Expiration at the start of the affected owner's next turn
- Deterministic reapplication behavior

**Acceptance**

Canonical Veiling scenarios produce the same state transition every run.

The unresolved question of whether Rebirth herself can become Veiled remains an authoritative design decision; do not resolve it by copying experimental Duet behavior.

→ [Canon & Continuity](./CANON_AND_CONTINUITY.md)

### 7. THE SANCTUARY

Implement Death's protective boundary.

**Target**

- Death as uncapturable mentor/anchor
- Sanctuary range
- Protection from Radius of Ruin
- Interaction with Veiling

**Acceptance**

Sanctuary precedence is deterministic and regression-tested.

→ [Rulebook](./RULEBOOK_v0.1)

### 8. THE MEMORY

Make the game state observable and replayable.

**Target**

- Deterministic snapshots
- Stable serialization
- State transition inspection
- Replay/test fixtures
- Clear separation between engine state and presentation

**Acceptance**

A test can assert an exact before/after state for a canonical scenario.

→ [Architecture Overview](../ARCHITECTURE_OVERVIEW.md)

### 9. THE TRIALS

Turn the rules into canonical scenario tests.

**Target**

Cover at minimum:

- 14×14 board initialization
- Legal movement
- Turn order
- Capture resolution
- Radius of Ruin
- Veiled timing
- Sanctuary
- Martyr's Boon
- Soul Reservoir / Rebirth Dash
- Leadership/Mercy victory
- Standard checkmate/elimination
- Mortal collective self-veil victory

**Acceptance**

Each canonical mechanic has deterministic headless coverage in the canonical engine.

The root TypeScript exercise harness is not the destination for these tests.

→ [Developer Status](../DEVELOPER_STATUS.md)

### 10. THE GATE

Reach a developer-ready vertical slice.

The first meaningful vertical slice is:

1. Initialize canonical 14×14 state.
2. Validate a legal move.
3. Apply the move.
4. Resolve capture.
5. Resolve canonical systems.
6. Check end state.
7. Emit a deterministic snapshot.
8. Assert the expected state.

**Acceptance**

A contributor can clone the repository, run the canonical test path, inspect the state transition, and determine exactly which authoritative document defines the behavior under test.

→ [Developer Status](../DEVELOPER_STATUS.md)

## What THE PATH is not

THE PATH is not:

- a second rulebook;
- a replacement for the GDD;
- a canon document;
- a promotion mechanism for experimental variants;
- a claim that the canonical engine already exists;
- a claim that the current TypeScript exercise harness is the production runtime.

Implementation status remains governed by [DEVELOPER_STATUS.md](../DEVELOPER_STATUS.md).

## The principle

> **Power becomes mastery through restraint.**

The Path is the engineering expression of that principle: each new capability must become something the engine can state, validate, test, and reproduce before it is treated as implemented.
