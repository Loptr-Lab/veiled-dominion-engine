# Gameplay Rules (Canonical Spec)

> This document is the canonical human-readable rules reference for the prototype.
> If implementation diverges, update code or this spec in the same PR.

## Status

- **Spec maturity**: Draft
- **Last updated**: 2026-07-04

## Goals of this spec

- Define invariant rules clearly enough for deterministic tests.
- Eliminate ambiguity in turn order, legal actions, and win evaluation.
- Provide shared language for design and engineering.

## Rule domains

1. **Board model**
   - Coordinate system
   - Initial setup
   - Player orientation/ownership

2. **Turn lifecycle**
   - Active player determination
   - Action windows/phases
   - End-turn transitions

3. **Action legality**
   - Piece-specific movement constraints
   - Occupancy/collision rules
   - Restriction mechanics tied to “restraint”

4. **State transitions**
   - Capture/disable/lock semantics (as applicable)
   - Status effects and durations
   - Resolution ordering when multiple effects apply

5. **Victory and elimination**
   - Win conditions
   - Draw/stalemate handling
   - Player elimination and continuation rules in 4-player context

## Invariants (must always hold)

- Game state is internally consistent after every accepted action.
- Illegal actions never mutate canonical state.
- Transition ordering is deterministic and test-backed.

## Open questions (track here until resolved)

- [ ] Exact tie-break hierarchy when multiple win triggers occur simultaneously.
- [ ] Whether elimination changes turn order immediately or at phase boundary.
- [ ] Formal definition of “restraint mastery” scoring/evaluation criteria.

## Test mapping guidance

For each finalized rule, add at least:
- One happy-path test.
- One edge-case test.
- One invalid-input test.
