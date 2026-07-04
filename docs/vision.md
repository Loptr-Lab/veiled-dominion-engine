# Vision & Scope

## Project
**Veiled Dominion Engine**  
Open prototype for *Veiled Dominion*: a 4-player chess variant where you win by mastering restraint, not conquest.

## Product intent

Create a playable, inspectable, and extensible prototype that proves:
1. The core game loop is coherent and fun.
2. Rule enforcement is deterministic and testable.
3. The web-based presentation can iterate quickly without destabilizing core logic.

## Core principles

- **Restraint over conquest**: game systems should reward measured play and positional intention.
- **Deterministic rules**: same input state + action always yields same result.
- **Separation of concerns**: game engine logic isolated from presentation/runtime concerns.
- **Incremental complexity**: add advanced mechanics only after baseline clarity.

## In-scope (prototype phase)

- Canonical game state model.
- Turn progression and legal-action validation.
- Core win-condition evaluation.
- Web UI to render board/state and submit actions.
- Developer tooling sufficient for local iteration and debugging.

## Out-of-scope (for now)

- Full matchmaking/lobby system.
- Economy/monetization systems.
- Advanced persistence/analytics stack.
- Mobile-native clients.

## Success criteria

- A new contributor can run and understand the prototype in <30 minutes.
- Core rules are documented and backed by deterministic tests.
- Cross-layer contracts between C# and TypeScript are explicit.
- Build and runtime behavior are documented enough to debug bundle/load failures.

## Milestones (suggested)

1. **M1 — Rules foundation**
   - Stable board model, move validation, turn progression.
2. **M2 — Playable vertical slice**
   - End-to-end local play loop via web UI.
3. **M3 — Robustness**
   - Improved error handling, replayability hooks, test coverage, docs hardening.
