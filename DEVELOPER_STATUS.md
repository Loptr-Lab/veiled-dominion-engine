# Veiled Dominion — Developer Status

Status: PROTOTYPE
Canonical rules target: 4-player, 14×14 cross-board
Current executable surface: TypeScript/Jest exercise harness only
Production runtime: PLANNED — C#/.NET/Unity architecture is specified in documentation but is not currently a runnable Unity client in this repository.

## What is authoritative?

| Concern | Authority | Status |
|---|---|---|
| Four-player game rules | docs/RULEBOOK_v0.1 + docs/design/GDD.md | SPECIFIED |
| Canon / continuity | docs/CANON_AND_CONTINUITY.md | SPECIFIED |
| Runtime sequencing | ARCHITECTURE_OVERVIEW.md | SPECIFIED |
| Gameplay draft | docs/gameplay/rules.md | DRAFT / RECONCILIATION REQUIRED |
| Canonical 14×14 engine | Not yet implemented | PLANNED |
| Unity/C# production client | Architecture/setup documentation | PLANNED |
| Root TypeScript engine | engine.ts, types.ts, related tests | LIVE — EXERCISE HARNESS |
| Duet 8×8 experiment | Loptr-Lab/duet-solo-hackathon | EXPERIMENTAL |
| Variant classification | docs/variants/VARIANT_REGISTRY.yml | SPECIFIED |

## Implementation-status vocabulary

- LIVE — exists and is runnable/testable in the repository.
- PROTOTYPE — partial working implementation or review surface; not production-complete.
- SPECIFIED — defined by approved documentation/contracts but not necessarily implemented.
- PLANNED — intended future work; no implementation should be implied.
- RESEARCH — investigation/provenance/reference material.
- DEFERRED — intentionally postponed.
- REVIEW_REQUIRED — identity, authority, rights, or scope must be resolved before promotion.
- UNRESOLVED — an authoritative design decision is still pending.

Do not use “implemented,” “working,” or “production” language when the evidence supports only SPECIFIED or PLANNED.

## Current executable reality

The root TypeScript package is an exercise harness. engine.ts currently exposes unimplemented exercise functions, and types.ts defines a 6×6, two-owner Ember/Tide/Root/Gale model. This is not the canonical four-player Veiled Dominion engine.

Do not extend the exercise harness into the canonical game. Canonical Veiled Dominion regression tests belong to the future canonical engine once its implementation boundary is established.

## Canonical engine target

- 4 players
- 14×14 cross-shaped board
- 1 Rebirth player + 3 Mortal factions
- clockwise turn order
- Radius of Ruin
- Veiled lifecycle tied to the affected owner's next turn
- Sanctuary
- Martyr’s Boon
- Soul Reservoir / Rebirth Dash
- Leadership/Mercy victory
- standard checkmate/elimination
- Mortal collective self-veil victory condition

The rules baseline is docs/RULEBOOK_v0.1. Any implementation must be tested against that contract rather than inferred from Duet, historical variants, or the exercise harness.

## Current blockers before a canonical vertical slice

1. Establish the canonical engine source tree.
2. Resolve the uppercase/lowercase C# architecture families documented in the GDD.
3. Reconcile docs/UNITY_INIT.md and docs/UNITY_PROJECT_SETUP.md.
4. Resolve open questions in docs/gameplay/rules.md against the rulebook.
5. Make the authoritative four-player decision on Rebirth immunity.
6. Build headless canonical tests for board geometry, legal moves, Veiling timing, Sanctuary, Boon, Soul Reservoir, LP scoring, and victory conditions.
7. Deliver a vertical slice: initialize canonical 14×14 state → validate legal move → apply move → resolve systems → emit deterministic snapshot → assert expected state.

## Architecture boundary

The intended runtime sequence is:

PlayerIntent → Validate → Apply → Resolve Capture → Resolve Systems → Check End State → Snapshot

The renderer/UI must consume canonical state rather than own game rules.

## Contributor rule

Before changing a mechanic:
1. Identify its authority class: Canonical, Narrative canon, Adaptation, Experimental, Historical/archive, or Unresolved.
2. Identify its implementation status using the vocabulary above.
3. Change authoritative specification and implementation together when both exist.
4. Add regression coverage only to the canonical engine, not the TypeScript exercise harness.
5. If existing authority cannot resolve a contradiction, document it as UNRESOLVED rather than silently choosing a behavior.

## Definition of developer-ready

A developer-ready milestone means a contributor can answer from the repository itself:

- What game am I implementing?
- Which document wins when rules disagree?
- What code is actually runnable?
- What is merely planned?
- Where does canonical engine code live?
- How do I run the tests?
- What exact state transition should a test assert?

Until those answers are executable and unambiguous, treat the project as an open prototype rather than a production-ready game codebase.