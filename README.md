# Veiled Dominion Engine Exercise — Starter Harness

## Setup
```
npm install
npm test
```
All tests in `engine.test.ts` will fail with "Not implemented" until you implement `engine.ts`.

## Rules
- **You may edit:** `types.ts` (internals only — keep the exported shape stable) and `engine.ts`.
- **You may NOT edit:** `engine.test.ts`. It's the scoring contract. If you think a test is wrong, say so in `NOTES.md` — don't change it.
- All four mandatory test suites must pass for a submission to be eligible for a "Correctness" score above the minimum. Everything else in the exercise (architecture, extensibility, clarity) is graded separately and can still be strong even if you're debugging one of these to the wire.

## Errata (read this before you start)
The original Gale rule ("cannot end on the same row/column it started on") was written for a single straight diagonal slide, which can **never** land back on its starting row or column — the rule was unenforceable as originally stated. Gale has been corrected to include a **one-time diagonal pivot**: it may change diagonal direction once during its move. This is what makes the row/column constraint meaningful (e.g., moving up-right then pivoting down-right can bring you back to your starting row). See `engine.test.ts`'s Gale suite for the exact expected behavior — the test cases are the specification here, not just a check.

## Exact contracts the tests assume

**Tide alternation:** a Tide piece's `lastMoveAxis` is undefined until it moves once. Its first move is unrestricted. Every move after that must be along a different axis (horizontal vs. vertical) than its immediately preceding move — not "different from any prior move," just the most recent one.

**Ember midpoint / Steam:** an Ember jump is illegal if (a) the midpoint square is occupied by any piece, (b) the midpoint square is currently Steam, or (c) the landing square is currently Steam. Steam does not affect any other element's movement.

**Burning expiry:** if a piece becomes Burning as a result of a move made during turn T, it remains Burning during turns T, T+1, and T+2, and is no longer Burning from turn T+3 onward. `advanceTurn()` is the only function that increments the turn counter and performs expiry — `applyMove()` should not do either.

These contracts are deliberately spelled out in full here so that "my interpretation of the rule was reasonable" isn't a valid defense for a failing test — the test file already encodes the one true interpretation.

## Accessibility Docs

- [ENGINE_ACCESSIBILITY_A11Y_PARADOX.md](docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md)
- [ENGINE_ACCESSIBILITY_AUDIO_AURA.md](docs/ENGINE_ACCESSIBILITY_AUDIO_AURA.md)
- [ACCESSIBILITY_GRANT_POSITIONING.md](docs/ACCESSIBILITY_GRANT_POSITIONING.md)
