---
title: Veiled Dominion Engine — Game Development Training Curriculum
description: A structured technical training program in game design and development, offered by Loptr Lab
permalink: /training/
---

# Veiled Dominion Engine: Game Development Training Curriculum #

**Offered by:** Loptr Lab
**Program type:** Applied technical training in game design, software engineering, and digital art
**Format:** Self-paced, project-based, with milestone checkpoints
**Sponsoring project:** [Veiled Dominion Engine](https://github.com/Loptr-Lab/veiled-dominion-engine) — an open-source 4-player asymmetric strategy game
**Hands-on exercise:** [Veiled Dominion Training](https://github.com/Loptr-Lab/training) — the graded TypeScript coding exercise this curriculum's Track A milestones are based on
---

## Repository Distinction

This curriculum references two related but different repositories:

- **Engine project:** the real Veiled Dominion game/engine repository, used for architecture, design, systems, and production-facing development.
- **Training repo:** a separate, self-contained repository for training materials, milestone-based exercises, and candidate evaluation.

Participants following Track A may use the training repo for structured programming practice before contributing to the full engine project.

**Canonical location note:** For now, this curriculum page remains in the engine repository as the public program overview, while the hands-on exercise materials live in the separate training repository.

---

## Program Overview

This curriculum trains participants in professional game development skills — programming, systems design, and technical art — through structured, hands-on contribution to a real, in-development project.

The program was developed by Loptr Lab, a creative studio building game design and IP development work, with a founding focus on accessibility within creative and maker industries. This curriculum is intended to support both independent learners and participants whose training activity must be documented for vocational rehabilitation, grant, or workforce-development purposes.

**This program is intended for participants who are:**
- Pursuing self-directed technical skills training as part of a vocational rehabilitation plan
- Seeking documented training hours and competency milestones for benefit or grant compliance purposes
- Interested in game development, software engineering, or digital art as a career or self-employment path
- Working with a Vocational Rehabilitation Services (VRS) counselor to identify qualifying training activities

---

## Program Structure

The curriculum consists of a shared foundational phase, followed by three specialized tracks. Participants may complete one track or progress through multiple, depending on their training plan and prior experience.

| Component | Estimated Duration | Format |
|---|---|---|
| Phase 0: Foundations (all tracks) | 1 week / ~10–15 hours | Reading, rules analysis, tabletop prototyping |
| Track A: Prototype Engineer | 4 weeks / ~80–100 hours | Applied C# / game engine programming |
| Track B: Systems Designer | 3 weeks / ~40–60 hours | Game economy modeling, playtesting, balance analysis |
| Track C: Technical Artist | 2–3 weeks / ~40–60 hours | Shader programming, real-time rendering |

*Hours are estimates for a participant with no prior programming background progressing at a moderate, sustainable pace; actual duration will vary by individual and should be adjusted in coordination with a counselor, case manager, or training supervisor where applicable.*

---

## Phase 0: Foundations (Required for All Tracks)

**Objective:** Participants understand the underlying rule system and codebase architecture well enough to explain it independently, before writing production code.

**Activities:**
1. Study the project rulebook and design documentation in full.
2. Facilitate or participate in a physical/tabletop playtest of the core ruleset with 3–4 people.
3. Complete a guided orientation of the codebase repository structure (`board/`, `input/`, `pieces/`, `systems/`) and map each module to its corresponding design rule.
4. Diagram the core game-turn architecture (state/phase loop) from the technical documentation.

**Completion checkpoint:** Participant can, without reference materials, verbally or in writing explain the core game rules and correctly diagram the turn/phase loop architecture.

---

## Track A: Prototype Engineer
*Focus: applied programming, spatial/mathematical logic, software architecture*

### Module 1 — Programming Fundamentals
- Object-oriented programming in C# (classes, structs, interfaces, enums)
- Game engine fundamentals (component lifecycle, event-driven execution)
- Finite state machine design and implementation

### Module 2 — Spatial & Coordinate Systems
- Coordinate-grid mathematics and movement validation on a standard grid
- Extension to non-standard/irregular board topologies
- Adjacency and area-of-effect detection algorithms

### Module 3 — Object-Oriented Game Entity Design
- Base-class and component-based architecture for interactive game pieces
- Implementation of standard entity behaviors
- Implementation of custom entity behaviors and special-case rule logic

### Module 4 — Systems Integration
- Timed status-effect logic (apply, track, expire)
- Resource economy systems (token/currency tracking, spend/gain logic)
- Win-condition and end-state evaluation logic

**Completion checkpoint / competency demonstrated:** Participant independently implements and integrates a functioning, rules-accurate reduced-scope version of the core game loop.

---

## Track B: Systems Designer
*Focus: game economy modeling, quantitative balance, structured playtesting*

- Foundational game economy and probability modeling
- Resource-system modeling using spreadsheet/quantitative tools prior to implementation
- Asymmetric multi-participant balance analysis
- Structured playtesting methodology, including outcome tracking and iteration
- Applied reading fluency in a software codebase sufficient to propose and validate balance changes

**Completion checkpoint / competency demonstrated:** Participant produces a documented balance analysis and a structured playtest report with data-supported design recommendations.

---

## Track C: Technical Artist
*Focus: real-time shader programming, visual systems design*

- Shader programming fundamentals in a real-time game engine
- Implementation of a material/lighting-based shader from a design specification
- Implementation of a more advanced procedural or physically-inspired shader effect
- Designing visual feedback systems that communicate game-state changes to players

**Completion checkpoint / competency demonstrated:** Participant delivers at least two functioning custom shaders integrated into the working project, meeting a written visual specification.

---

## Documentation & Verification of Training Hours

For participants using this curriculum to satisfy training-hour or activity documentation requirements:

- Each module includes a defined completion checkpoint that can be independently verified (e.g., working code committed to the relevant repository, a written or recorded explanation, a playtest report, or a reviewed visual deliverable).
- Participants are encouraged to log hours and dated deliverables against each module as they progress.
- Loptr Lab can provide a signed verification of completed modules and estimated training hours upon request.

---

## Accessibility

This training program is designed and administered by Loptr Lab with attention to accessible training practices, including:
- Self-paced progression with no fixed weekly deadlines
- Modular structure allowing entry at any track based on prior experience
- Written, checkpoint-based assessment (rather than timed testing) to accommodate varied working styles and needs

Participants with specific accommodation needs are encouraged to contact Loptr Lab directly to discuss adjustments to pacing, format, or checkpoint structure.

---

## Contact

## Contact
**Program sponsor:** Loptr Lab
**Engine project:** [github.com/Loptr-Lab/veiled-dominion-engine](https://github.com/Loptr-Lab/veiled-dominion-engine)
**Candidate exercise repo:** [github.com/Loptr-Lab/training](https://github.com/Loptr-Lab/training)
