# Exercise Harness Files — Status Notice

## These files do not belong to the engine

The following files at the repository root are **exercise and hiring materials**
from an earlier phase of this project, when the engine repo also served as a
TypeScript take-home exercise harness. They are **not part of the production
engine codebase.**

| File | Purpose |
|------|---------|
| `CANDIDATE.md` | Candidate instructions for the TypeScript exercise |
| `REVIEWER_SCORECARD.md` | Reviewer scoring rubric |
| `veiled-dominion-engine-exercise-v2-hard.md` | Exercise prompt (hard mode v2) |
| `rpg-actor-acceptance-criteria.md` | RPG actor integration exercise criteria |
| `engine.ts` | TypeScript exercise scaffold |
| `engine.test.ts` | TypeScript exercise test suite |
| `edge-rules.test.ts` | TypeScript edge-rule tests |
| `types.ts` | TypeScript types for the exercise harness |
| `rpgActorCompat.ts` | RPG actor TypeScript scaffold |
| `package.json` | Node/npm config for the TypeScript exercise harness |
| `tsconfig.json` | TypeScript config for the exercise harness |
| `index.html` | Exercise harness HTML entry point |

## Where these materials belong

The canonical home for training and exercise materials is the separate
**[Loptr-Lab/training](https://github.com/Loptr-Lab/training)** repository.

These files remain here temporarily until a formal migration is completed.
They should **not** be treated as part of the engine architecture or
referenced in engine-facing documentation.

## For contributors

Ignore these files when working on the engine. Do not extend or depend on
`engine.ts`, `types.ts`, or any of the TypeScript harness files in production
engine code — they are exercise stubs, not production APIs.
