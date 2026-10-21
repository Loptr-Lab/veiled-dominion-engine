# Optional maker pathway: game rules and physical interaction

**Status:** proposed, source-based learning pathway. The case studies are at different stages; neither is a verified hardware build or a demonstrated learner outcome.

Study two directions of translation: a pinball machine **simulated in software**, and turn-based Duet software **considered for a physical LED chessboard**. They differ in feedback tempo and access needs. Pinball demands real-time motor input and immediate state feedback; chess allows deliberate turns but must replace browser screen-reader feedback when moved to a standalone board.

| Case study | Role | Exercise and evidence | Current status |
| --- | --- | --- | --- |
| [Break the Grid Pinball](https://github.com/ibloud/inpatient-corridors-review/blob/main/PINBALL-MAKER-PILOT.md) | Proposed hands-on digital exercise | Sketch a table, implement and test one original digital mode, log motor and sensory access findings | Corridors pilot scoped; no verified playable table, learner test, or physical hardware commitment |
| [Duet LED chessboard](https://github.com/Loptr-Lab/duet-solo-hackathon/blob/main/docs/design/LED-CHESSBOARD-DESIGN-STUDY.md) | Design-analysis exercise | Map one rules transition to square selection, LED state, spoken feedback, and a parity test against the Duet multiplayer app | Unbuilt concept from founder-supplied text of a [Loptr Lab Patreon post](https://www.patreon.com/LoptrLab/posts/hackaday-build-163694370); post not publicly retrievable and video unaudited |

## Suggested sequence

1. Read each project's provenance and boundaries. Observe an existing table or review the digital reference with permission where needed.
2. For pinball, draft a shot/state/feedback map and test one accessible software interaction. Record what players actually understand; do not assert learning outcomes before playtests.
3. For Duet, draw the software-to-board boundary and an audio-first state/announcement table. Compare a sample move against the `duet-solo-hackathon` multiplayer app's server-authoritative state and its M1 test plan before selecting hardware.
4. Document an access check for both: controls, recovery from errors, non-color cues, and nonvisual state. Contrast real-time versus turn-based demands.
5. Scope physical components, budget, maintenance, and maker supervision only after the relevant software and accessibility questions are answered.

This index is a pointer, not approval to build, a partnership with a venue or artist, a funding promise, or a transfer of project ownership. Corridors and Duet keep their own rules and release decisions. Generalized lessons can inform the [game development](./game-development.md) and [hybrid creative technology](./hybrid-creative-technology.md) tracks; Veiled Dominion changes require its own engine review.
