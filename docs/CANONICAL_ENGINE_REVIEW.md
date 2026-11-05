# Canonical C# engine review

Status: **partial implementation, draft review only**. No merge, production deployment, presentation redesign, or experimental rule promotion.

Repository: `Loptr-Lab/veiled-dominion-engine`.
Baseline and fetched main: `ff3d29f97eeaa64792b0e3daa5b1ab132d0febbf`.
Review branch: `feature/canonical-csharp-review`.

## Inspection and ownership

No AGENTS.md was present in the checked-out tree. Read CONTRIBUTING.md, the contributor engine guide, the requested source hierarchy, design/rule documents, and accessibility requirements. Open PRs #53, #44, #37, #36, #29, #6 and #4 did not cover this core repair. Inspected the remote heads and fetched `mechanics/shared-layer-extraction`, `copilot/implement-veiled-dominion-artifacts`, and `copilot/fix-development-environment`. The first two have no differences from main in the eight requested core files; neither contains a replacement gameplay core to continue. Their shared-layer and UI experiments are not promoted into canon here. No unrelated project or Violet PR was modified.

`src/VeiledDominion.Core.csproj` explicitly compiles only:

- `src/Board/*.cs`: existing coordinate and occupancy models, repaired and extended;
- `src/Pieces/*.cs`: existing Piece/Faction/PieceType model plus concrete ChessPiece;
- `src/Systems/*.cs`: existing RadiusOfRuinSystem, now owner-turn-based, plus movement pipeline;
- `src/Match/*.cs`: new setup and transactional ReviewMatch controller.

Default recursive compile globbing is disabled. The lowercase `src/board`, `src/pieces`, `src/systems` family is **retained in place as superseded provenance, excluded from the canonical build**. Its duplicate PieceType, narrow GridTopology, missing import, incorrect named argument, Y-only forward movement, unchecked sliding, unconnected Veil registry, wall-clock audit records, and per-turn suppression reset are not active dependencies. Do not import that family into Unity alongside the canonical assembly. No history or useful source was deleted. The new movement pipeline reuses its intended vectors → status → resources → occupancy ordering, while the new lifecycle carries forward its correct owner-Start expiration concept without its disconnected registry.

The uppercase family compiled first, before gameplay changes, using an explicit project boundary. It no longer leaves provisional four-wide geometry or proximity-cleared Veils in the active implementation.

## Confirmed mechanics implemented

- Standard 14x14 cross: four excluded 3x3 corners, 160 geometric tiles, eight-wide arms; exhaustive square and rotation tests.
- Four 16-piece armies; Rebirth replaces Queen and Death replaces the chosen Rook; orientation rotates the entire north-local layout. Coordinates use top-left origin. Clockwise seats are North, East, South, West. Faction and seat are distinct.
- All standard piece movement patterns, pawn first double-step and diagonal capture, intermediate blockers, bounded straight-ray traversal, knight jumps, non-mutating validation.
- Rebirth queen movement and preserved Veil immunity. Death one-square movement into attacked squares, immunity, uncapturable landing, allied pass-through.
- Explicit Rebirth-friendly Sanctuary eligibility, not protection for nearby Mortal factions.
- Aura evaluated after every accepted movement/sacrifice resolution, including enemy entry; owner-only Veil expiration at Start; repeated inspection never applies rules.
- Veiled one-forward/no-capture restrictions for all orientations. Owner-Start expiration means normal active pieces often clear before they can move; the pipeline restriction remains tested directly, not replaced by a longer timer.
- BeginMovement phase intent, ownership validation, one movement or sacrifice, capture/graveyard, Boon earning, Soul Reservoir checked at Rebirth Start, Dash traversal with empty landing.
- Withdrawal, Shielding, Coexistence LP for noncapturing Rebirth moves, one award per applicable category per accepted maneuver; Coexistence capped at one per turn. Counter changes occur only after a fully accepted action. Victory at 10 LP.
- First-time friendly Veil tracking and The Fall at five. A second application to a previously cleared friendly piece rejects with an explicit decision boundary rather than silently choosing unique or repeat counting.
- Atomic clone/validate/resolve/commit for actions; exact snapshot preservation on rejection, deterministic event order, terminal action rejection, restart, deterministic replay.
- Attack queries and self-check prevention. **Not complete checkmate/elimination:** check-delivering actions are conservatively rejected at a named review boundary rather than allowed to bypass missing adjudication.

Resolution is internal and synchronous, not a UI-callable mutation phase. Public snapshots and aura inspection are read-only consumers. Board mutation and status setters are internal. `Piece.GetLegalMoves` and `MovementRejection` are movement-stage candidates, **not final legal-action lists**; the match may still reject an action on Leader safety or a review boundary. No UI should reconstruct final legality from those candidates.

## Exact source conflicts and decisions

| Topic | Sources and conflict | Handling in this review |
| --- | --- | --- |
| Cross width | Rulebook §1 standard four-player geometry/8 pawns vs lowercase GridTopology.IsValidCoordinate two-wide and uppercase BoardGeometry.ArmWidth four-wide | Canonical rulebook wins: eight-wide cross. |
| Central 2x2 | Design Evolution §4 Components calls it neutral; lowercase GridTopology.IsNeutralZone comment says unoccupiable void and AddSlidingMoves stops there; current Rulebook §§1–3 does not specify special traversal/occupancy | Geometry includes the four tiles; movement using them rejects `DecisionRequired`, not a new void rule. Center-dependent Leader/mercy attack adjudication also stops. |
| Aura timing | Rulebook §6 says “If Rebirth moved”; §5.1 says end-turn for any occupant; §8 explicitly covers enemy entry; GDD §3 and architecture Resolution apply aura each turn | §8 clarifies enemy-entry behavior. Evaluate on every accepted end-phase, never on rendering. |
| Veil duration | Uppercase old Recalculate cleared on leaving radius; Rulebook §5.1, §6 and Canon/Continuity “Canonical Veiled lifecycle” specify affected owner Start | Owner Start wins. No fixed Duet timer. |
| Sanctuary eligibility | Lowercase IsImmuneToPiece protected any nearby piece; Rulebook §5.2 explicitly says friendly Rebirth pieces | Only Rebirth-owned allies qualify. |
| Boon suppression | Rulebook §5.3 says “entire turn cycle”; historical Design Evolution §4 Core Mechanics C says “whole turn”; old manager resets every player's Start | Spending is not implemented until the exact resume boundary is approved. A token is never consumed on rejection. Recommended boundary: next Rebirth Start. |
| Repeated self-Veil | Rulebook §7.3 says “5 of her own friendly pieces over the course of the game”; §8 nonstacking; lower implementation counted every recalculation; upper counted each false→true application | No recalculation inflation. First applications count. A repeat after clearing is blocked pending unique-vs-event decision. |
| Opening self-Veil | Rulebook §2 Queen-square setup + §5.1 radius + §7.3 five-friendly threshold | An unrelated first move can immediately lose: see scenario below. No undocumented first-turn grace period or starting Boons were added. |
| Death capture | Current Rulebook §4.2 specifies King-like movement but only explicitly forbids being captured; historical Design Evolution §4 Edge Cases expressly forbids Death capturing | Death capture attempts reject pending explicit current-canon confirmation. Potential Death attacks affecting Leader/mercy safety also stop. |
| Promotion | Rulebook §3 Rebirth pawns reach “far edge of their starting quadrant or an adjacent quadrant”; historical Design Evolution §4 Piece Movements A applies related wording to Mortals; no coordinate definition | Outer-edge pawn arrivals reject; exact internal/adjacent promotion geometry is not implemented and not claimed. |
| Simultaneous wins | Rulebook §7 gives multiple paths, no precedence; gameplay/rules.md “Open questions” explicitly leaves tie hierarchy open | Simultaneous LP/The Fall threshold action rejects atomically. |
| Elimination | Rulebook §7.1 neutral obstacles; gameplay/rules.md open timing question; historical Design Evolution §4 Win Conditions adds collective Mortal victory on Rebirth Leader mate | Checkmate detection, neutralization timing, turn skipping, all-Mortals-eliminated outcome and stalemate need completion/decision. No fake checkmate playthrough. |
| Immunity | Canon/Continuity “Unresolved design decision: Rebirth immunity” vs experimental Duet | Preserve current Rebirth immunity and The Fall, never Veiled-Rebirth terminal logic. |
| Rendering | docs/RENDERING_CONTRACT.md inputs are 6x6 Ember/Tide/Root/Gale | Marked exercise-only. Not used as canonical browser runtime contract. |

The geometry and pipeline tests do **not** establish that the restricted review engine is a fully playable standard chess implementation. Castling and en passant are still engineering work, not excuses for changing their standard rules. Promotion may occur before the outer edge under an eventual quadrant definition; current non-edge pawn moves cannot be certified against that unresolved geometry. Likewise center-dependent check, neutral pieces, and terminal elimination remain blocked or unimplemented.

## Verification and reproducible commands

Requires .NET SDK 8.0.x (8.0.427 used here). No Unity, npm packages, database or NuGet test package is needed for the headless runner.

```sh
dotnet build src/VeiledDominion.Core.csproj
dotnet run --project tests/canonical/VeiledDominion.Regression.csproj
```

The regression executable prints named PASS/FAIL groups and exits nonzero on any failure. It is intentionally a dependency-free executable; **`dotnet test` is not the test command**. Dedicated canonical-only CI uses the same runner, independent of the TypeScript exercises.

Actual local results: 36 canonical C# regression groups passed; core build succeeded with zero warnings/errors; `git diff --check` passed. Coverage includes every geometric square, rotations and setup choices, movement/status/blocker behavior, owner lifecycle, resources, immutable rejection, both supported victory paths, replay and restart. Boon spending/resumption and full checkmate/elimination have **no passing gameplay tests** because those paths are not implemented. Tests only verify Boon-spend rejection at the decision boundary.

Repository-required unrelated baseline checks were also run: `npm run typecheck` passed; `npm test -- --runInBand` reported 24 passed, 24 failed across three suites (two failed, one passed), caused by the untouched exercise stubs. These results are not canonical gameplay evidence and those stubs were not filled in. The pre-existing workspace modification to package-lock.json was preserved and excluded from this review commit.

### Supported victory playthroughs

All exact fixture definitions and accepted intents are executable in `tests/canonical/Program.cs`.

1. **The Fall, standard setup:** `Setup.Standard()`; North BeginMovement; move `Rebirth-pawn-0` from (3,1) to (3,2). Rebirth remains at (6,0); adjacent bishop (5,0), Leader (7,0), and pawns (5,1), (6,1), (7,1) become Veiled. Death at (3,0) protects none of them. Five first applications produce collective Mortal victory. This is a source-interaction warning, not an invented opening rule.
2. **The Fall, isolated fixture:** Rebirth (5,4), Death (10,0), five friendly pawns at (4,3),(5,3),(6,3),(4,4),(6,4), and a sacrificial pawn (3,1), plus the four fixture Leaders. BeginMovement, sacrifice `s`; five first applications produce The Fall. Later ordinary actions reject.
3. **Leadership, scenario fixture (not standard-start balance proof):** Rebirth (5,4), Death (10,0), friendly pawn (9,6), enemy pawn (10,6), four fixture Leaders. Each Rebirth turn moves Death between (10,0) and (10,1), keeping the adjacent pair. Between those turns, Mortal Leaders move along the explicitly tested safe edges. Ten Coexistence awards give 10 LP. The runner executes 74 accepted intents, replays them into a fresh fixture, compares complete snapshots, tests terminal rejection, then restarts.
4. **Resource progression:** sacrifice `s1`, `s2`, `s3` on consecutive Rebirth turns, with tested Mortal moves between them; next Rebirth Start unlocks Dash; Rebirth (5,4) crosses blocker (7,4) to empty (10,4). Boon spend at Start remains an explicit unresolved-boundary rejection.

A nonterminal standard opening is also exercised: each faction moves its local pawn-2 from local (5,1) to (5,2). This reduces North's initial aura exposure to four; it does not waive later repeat-counting decisions.

## Runtime and presentation boundary

Available and verified: Linux .NET 8 headless C# assembly and regression executable. The SDK was installed outside the repository at `/tmp/vd-dotnet` for this session. CI installs its own SDK. No Unity editor/runtime or browser/WASM/HTTP bridge was verified.

There is **no canonical gameplay review URL** and no fixture UI was added. Existing website/game presentation files, archived v0.1, and visual direction are untouched. Opening the current website would not demonstrate this C# engine, so no browser gameplay claim is made.

A future Unity renderer must reference only the canonical assembly; browser presentation needs a real .NET/WASM build or a server adapter accepting PlayerAction and returning authoritative results/snapshots. Snapshot fields include active owner, phase, pieces with textual owner/type/Veiled/Sanctuary status, graveyard, Boons, LP, friendly-Veil count, outcome and event history. A complete adapter still needs final legal-action queries, snapshot restoration/versioning, and resolved rule boundaries. It must not implement aura, scoring or adjudication in JavaScript.

Any future review UI must preserve text/shape identification, keyboard/touch parity, reduced motion, and the existing accessibility/visual-readability requirements. No visual or audio accessibility compliance is claimed by this headless change.
