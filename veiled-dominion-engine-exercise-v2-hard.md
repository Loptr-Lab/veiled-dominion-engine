# Veiled Dominion Engine — Take-Home Exercise (Hard Mode / v2)

**Time expectation:** 2–3 hours (tightened — this version rewards judgment over volume of code)
**Format:** TypeScript (Node, no framework)
**Submission:** repo/zip + `NOTES.md`

## Why this version exists

v1 was structurally "modified chess pieces" — which means a sharp candidate could half-solve it by pattern-matching to open-source chess-variant engines. This version uses **movement and interaction rules that don't map onto any standard chess piece**, so there's nothing to copy-paste from GitHub or an LLM's training data that solves it directly. It also adds a **reaction system** — two elements combining produces a third effect — which is closer to what suit-to-element combo design in Veiled Dominion probably needs eventually.

---

## Background (fictional ruleset, original mechanics)

6x6 board. Each piece has an **element**: Ember, Tide, Root, or Gale. No element moves like a standard chess piece.

| Element | Movement | Notes |
|---|---|---|
| **Ember** | Moves exactly 2 squares in any straight or diagonal direction, but only if the square it passes over (the midpoint) is empty | Cannot capture — instead, landing adjacent to an enemy piece marks it **Burning** for 2 turns |
| **Tide** | Moves any number of squares in a straight line (not diagonal), but each move must alternate direction from its *previous* move (e.g., moved horizontally last turn → must move vertically this turn) | Standard capture rules |
| **Root** | Moves 1 square in any direction, but may instead choose to **not move** and "anchor" — while anchored, it blocks all pieces (friend or foe) from passing through its 8 adjacent squares until it moves again | No capture; a piece moving into a Root's square is simply blocked |
| **Gale** | Moves like Tide's opposite: any number of squares diagonally, direction need not alternate, but Gale **cannot end its move on the same row or column it started on** | Standard capture rules |

### Reaction system (the actual point of this exercise)

If, after a move, a piece marked **Burning** (from Ember) ends up on a square adjacent to a **Tide** piece, trigger a reaction: the Burning status is removed and the square the Burning piece is on becomes **Steam** for 1 turn. Steam squares block Ember movement (their 2-square jump can't path through or land on Steam) but don't block anyone else.

You are not told every possible future reaction in advance — the point is to build this so a second reaction pair (say, Root + Gale → something) could be added by someone who is *not you*, without them needing to understand your whole codebase first.

---

## Task 1 — State & movement (35%)
Implement the board, the four movement rules, and the Burning status as a piece-level tag with a turn-based expiry.

## Task 2 — Reaction system (35%)
Implement the Ember+Tide → Steam reaction as a **general reaction framework**, not a hardcoded `if (burning && adjacentToTide)` special case buried in move resolution. Structure it so reactions are declared as data/rules, not woven into the movement code.

## Task 3 — Extend without touching the core (20%)
Add a second reaction of your invention (any two elements/statuses, any effect) using only your Task 2 framework. If you have to edit your Task 1 movement functions to make this work, that's a signal your framework wasn't general enough — say so honestly in `NOTES.md` rather than hiding it.

## Task 4 — Write-up (10%)
In `NOTES.md`:
- Where did you draw the line between "movement logic" and "reaction logic," and why there?
- If Veiled Dominion eventually wants a reaction *graph* (reactions that trigger other reactions), what in your design would break first?

---

## Evaluation rubric

| Criterion | Weight | Signal |
|---|---|---|
| Correctness of movement rules | 25% | Handles the "alternating direction" and "no same row/col" constraints correctly — these are easy to get subtly wrong |
| Reaction framework design | 35% | Reactions are data-declared/dispatched generically, not `if` chains inside movement code |
| Task 3 extension cleanliness | 20% | New reaction added with near-zero edits to Task 1/2 code |
| Honesty & reasoning in write-up | 10% | Candidate can name their own design's limits, not just defend it |
| Code clarity | 10% | Readable without a walkthrough |

**Pass bar:** same as v1 — 3.5/5 weighted average, no criterion below 2/5, reaction-framework score below 3 is a hard no.

## Anti-cheat note
Because these mechanics are original rather than chess derivatives, an LLM asked to "solve this" will produce plausible-looking but usually subtly wrong movement logic (especially the Tide alternation and Gale row/column constraints) — candidates who use AI assistance will still need to actually understand and debug the rules, which is itself informative if you review their process.

## Mandatory starter harness

Candidates are given a starter harness (`types.ts`, `engine.ts` stub, `engine.test.ts`, plus config) instead of writing tests from scratch. This removes the biggest source of scoring subjectivity: previously a submission could "look" correct — clean code, sensible structure — while quietly getting an edge case wrong that a grader might not think to check by hand.

Four edge-case rules are covered by mandatory, non-editable tests in `engine.test.ts`:
- **Tide alternation across turns** — a Tide piece's move axis must differ from its immediately preceding move, but its very first move is unrestricted (an easy off-by-one to miss).
- **Gale "cannot end on same row/column"** — note the errata in the harness's `README.md`: the original single-diagonal-slide version of this rule was literally unenforceable (a straight diagonal move can never return to its starting row or column), so Gale now includes a one-time diagonal pivot, which is what makes the constraint meaningful and testable.
- **Ember midpoint/Steam blocking** — covers both "midpoint occupied by a piece" and "midpoint or landing square is Steam," which are easy to conflate into a single check when they're actually two separate conditions.
- **Burning expiry timing** — the classic off-by-one: a piece burning as of turn T must remain burning through T+2 and clear exactly at T+3, not T+2.

Candidates must not edit `engine.test.ts`; if they disagree with a test's interpretation of a rule, that goes in `NOTES.md`, not a silent edit. All four suites (12 individual test cases) must pass for a submission to be eligible for anything above the minimum Correctness score — this is a floor, not a substitute for the Task 3 extensibility evaluation, which still has to be judged by a human.

The harness has been verified two ways before being sent to candidates: all 12 tests fail cleanly (not via crash) against the unimplemented stub, and all 12 pass against a working reference implementation — so a candidate failing a test is diagnosing their own code, not a bug in the harness.
