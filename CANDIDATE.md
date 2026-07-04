# Veiled Dominion Engine — Candidate Instructions

## Objective
Build a TypeScript game engine implementation for the Veiled Dominion exercise prompt and ensure your submission is both correct and extensible.

## Mandatory correctness gate
This repository contains a mandatory anti-cheat test harness:
- `edge-rules.test.ts`

You **must not modify this file**.

Your submission must satisfy all assertions in this file. If you believe any test contradicts the exercise rules, explain your reasoning in `NOTES.md` rather than editing the test.

## Required deliverables
- Engine implementation (TypeScript, Node, no framework)
- `NOTES.md` with:
  - movement-logic vs reaction-logic boundary decisions
  - design tradeoffs and known limitations
  - what would break first if reactions became a trigger graph
  - any test/ruleset disagreements (if applicable)
- Test output summary (copy/paste from local run)

## Expected engine surface (minimum)
Your engine should expose behavior compatible with the mandatory tests:
- `addPiece(piece)`
- `setSquareStatus(pos, status)`
- `movePiece(from, to)`
- `endTurn()`
- `getPieceAt(pos)`

## Behavior expectations (high level)
- Correct movement rules for Ember, Tide, Root, Gale
- Burning status with correct turn-based expiry semantics
- Reaction system implemented as an extensible framework (data/rule driven), not hardcoded conditionals embedded in movement resolution
- At least one additional reaction added using your framework (without editing core movement logic)

## Running tests
Use project scripts if provided, otherwise run your local Jest/TS test command. Example:

```bash
npm test
```

Include the final pass/fail summary in your submission notes.

## Submission checklist
- [ ] Mandatory tests pass without modifying `edge-rules.test.ts`
- [ ] Task requirements implemented
- [ ] `NOTES.md` included with honest design analysis
- [ ] Test output summary included
