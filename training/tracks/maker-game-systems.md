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

## Read before you repair · iFixit

Start with [Device Safety](https://www.ifixit.com/Info/Device_Safety), then
[Identifying Major Electronic Components](https://www.ifixit.com/Guide/Identifying+Major+Electronic+Components/27244)
as a diagram-reading activity. Name three components and their functions without
opening or powering the instrument. Record the external model/condition, the
manufacturer’s exact-model manual, revision and unanswered compatibility questions.
A general iFixit guide does not verify a synthesizer or firmware retrofit.

Unplugging is not proof that stored electrical energy is gone. Mains circuits,
capacitors, CRTs, damaged batteries and unknown electrical faults require a
qualified technician; minors also need appropriate adult supervision. An adult
without technical competence is not a substitute. No soldering, discharging,
bypassing protections or flashing is part of this exercise.

[Community Repair](https://www.ifixit.com/Wiki/Community_Repair) is a starting
point for supervised learning, not a verified local session, mentor or paid role.
Confirm age rules, accessibility, costs and safeguarding with the actual host.
Keep a private sketch, spoken note or text with the source, three component
explanations, one uncertainty and one safe next step; there is no public posting.

Reading is free; parts, tools, supervision and travel may cost money. EDU has
institutional terms; Loptr Lab’s eligibility, kit allocation or staff support is
not established. [Made-Sick’s resource records](https://made-sick.org/directory.html#resource-ifixit-repair-learning)
own the dated external descriptions. No endorsement, sponsorship, grant or
iFixit affiliation is claimed.
