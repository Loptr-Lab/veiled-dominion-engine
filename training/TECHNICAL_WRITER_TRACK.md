# Track E — Technical Writer / Character Development Path

## Purpose

Track E teaches technical writers to document a character as a **working production object**, not as an isolated piece of lore.

The writer follows the character's development path, learns enough of the game system to describe what the character actually does, records the decisions and evidence that accumulate at each milestone, and develops lore from the character that exists in play.

This is not a lore-only track.

> **If the designer cannot play the character, the character is not ready for production.**

The technical writer therefore works alongside the trainee through the development cycle and documents the transition from concept to playable character to production handoff.

## Core loop

```
CHARACTER CONCEPT
      ↓
PROTOTYPE
      ↓
FUNCTIONAL CHARACTER
      ↓
GAME-GRID PLAY
      ↓
PLAYABILITY CARD
      ↓
GRADUATION
      ↓
PRODUCTION HANDOFF
```

At each stage:

```
BUILD → PLAY → OBSERVE → DOCUMENT → TEST → REVISE
```

The writer does not declare a character production-ready. The playability evidence and receiving production authority determine that.

## Milestone-based matching

Technical writers and game-production trainees should be matched according to where they are on the path.

| Milestone | Character trainee focus | Technical writer focus |
| --- | --- | --- |
| M1 — Concept | character purpose, fantasy, initial mechanics | concept brief, terminology, open questions |
| M2 — Prototype | first functional systems | implementation notes, mechanic descriptions, change log |
| M3 — Functional Character | movement, abilities, resources, targeting | system reference, state/event documentation |
| M4 — Game-Grid Play | character participates in the actual grid | play-session record, observed behavior, issue log |
| M5 — Playability Card | designer plays and validates their own character | evidence packet, known limitations, final documentation |
| M6 — Graduation | playability requirements passed | production handoff package and lore consolidation |

A writer may join at any milestone. A more advanced writer may follow a character across multiple milestones.

The matching system should expose **current milestone and collaboration needs**, not infer skill or suitability from unrelated personal information.

## What the technical writer produces

### 1. Character technical brief

Documents:

- character identity and purpose;
- gameplay role;
- movement;
- abilities;
- resources;
- cooldowns;
- targeting;
- state transitions;
- dependencies;
- known limitations;
- accessibility considerations.

### 2. Development record

Maintain a concise history of:

- what was proposed;
- what was built;
- what changed;
- why it changed;
- what playtesting revealed;
- what remains unresolved.

Documentation should distinguish **observed evidence** from design intent and interpretation.

### 3. Character lore

Lore development happens alongside the playable object.

The writer can document:

- history;
- relationships;
- motivations;
- terminology;
- voice;
- visual/narrative motifs;
- character-facing world context.

Lore must not silently override the actual game contract.

If the mechanics change, the writer checks whether the lore or terminology needs to change with them.

### 4. Playability-card documentation

The writer records evidence against the training card rather than simply declaring “pass.”

A playability packet should identify:

- required test;
- expected behavior;
- observed result;
- evidence/source;
- pass/fail status;
- known limitation;
- follow-up owner.

The designer's ability to play their own character is an explicit part of the gate.

### 5. Production handoff

A graduated character can leave training with a package containing:

```
CHARACTER
├── Technical brief
├── Lore / voice material
├── Development history
├── Playability card
├── Play-test evidence
├── Telemetry requirements
├── Accessibility notes
├── Known limitations
└── Open production questions
```

Graduation demonstrates the trainee's capability and the character's training evidence. **Production acceptance remains a separate decision by the receiving project.**

## Data and telemetry

The writer should learn to document the difference between:

- authoritative game state;
- player input;
- system response;
- telemetry;
- interpretation;
- narrative presentation.

For systems such as aim assistance, the training sandbox may capture controlled variables and outcomes for balancing, accessibility, and data-science exercises.

Example:

```
ASSIST PROFILE
     ↓
PLAYER INPUT
     ↓
TARGETING / AIM RESPONSE
     ↓
GAME OUTCOME
     ↓
TELEMETRY
     ↓
PLAYTEST OBSERVATION
     ↓
DOCUMENTED FINDING
```

Telemetry is evidence about observable behavior. It is not automatically an explanation of player intent.

The technical writer's job is to preserve that distinction in documentation.

## Collaboration protocol

A writer working with a trainee should ask:

1. What milestone are we at?
2. What is actually implemented?
3. Can the designer play it in the game grid?
4. What does the current playability card require?
5. What evidence exists?
6. What changed since the previous milestone?
7. What is known versus assumed?
8. What still needs testing?
9. What needs to be documented for the next handoff?

The writer should play the character whenever access permits. Documentation should be informed by direct interaction rather than secondhand description alone.

## Training exercises

### E1 — Concept to brief

Take a character concept and produce a technical character brief.

**Evidence:** brief + terminology glossary + open-question list.

### E2 — Follow the build

Follow a trainee from prototype through functional character implementation.

**Evidence:** milestone log + change record + updated technical brief.

### E3 — Play the character

Play the trainee's character in the game grid and document the experience.

**Evidence:** play-session record + observed issues + questions for the designer.

### E4 — Playability card

Create or complete the documentation packet for the playability card.

**Evidence:** test matrix + evidence references + known limitations.

### E5 — Lore from the playable object

Develop character lore from the character that actually exists after playtesting.

**Evidence:** lore brief + mechanics-to-lore traceability notes + terminology review.

### E6 — Production handoff

Prepare a production-facing handoff for a graduated character.

**Evidence:** complete character packet + unresolved-question register + receiving-team checklist.

## Sandbox-to-production boundary

The game-development sandbox is a **proving ground**, not the canonical home of production characters.

A trainee can demonstrate:

- character production skills;
- gameplay implementation;
- technical art;
- documentation;
- telemetry;
- accessibility;
- playtesting;
- collaboration.

Those demonstrated skills may qualify the trainee for production work.

A sandbox character does **not** automatically become a canonical Veiled Dominion character.

The receiving production project decides what is accepted, modified, rejected, or made canonical.

## Graduation relationship

Technical Writer graduation and character-builder graduation are complementary.

A character builder graduates when they can successfully rebuild a character that:

1. functions in the game grid;
2. can be played by the designer;
3. passes the defined playability card;
4. has the required evidence and documentation.

A technical writer graduates when they can:

1. accurately document the character's implementation and development;
2. follow milestone evidence without inventing missing facts;
3. produce useful play-test and playability documentation;
4. develop lore without contradicting the working game contract;
5. prepare a production-ready documentation handoff.

Neither track grants automatic canon, employment, production assignment, or authorship rights.

## Success condition

> **I can document what was actually built, understand it well enough to play it, help its story grow from its working form, and hand it to production without confusing training evidence with canonical authority.**
