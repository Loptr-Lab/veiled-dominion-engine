# Narrative Continuity Under Code Change — Ink Lore Exercise

## Purpose

This exercise teaches narrative/technical writers to preserve a scene's **story continuity while its underlying interactive structure changes**.

The historical **Battle the Beast** record is used as an origin case for the exercise: a Wattpad narrative was later explored through Ink, Twine, and Unity3D as part of a broader transmedia/interactive-narrative development path. The historical material is evidence of a development process; it is **not a license to reuse The Magicians franchise material**.

The transferable skill is:

```
PROSE / SCENE
    ↓
INTERACTIVE SCENE STRUCTURE
    ↓
PROGRAMMING CHANGE
    ↓
CONTINUITY REPAIR
    ↓
PLAYTEST
    ↓
DOCUMENTED RESULT
```

## Where it belongs

This is a **Track E: Technical Writer / Character Development** exercise, with optional collaboration with narrative-interface and engineering trainees.

It belongs after a trainee can document a playable character or scene and before production handoff.

### Track E relationship

```
CHARACTER / SCENE CONCEPT
        ↓
PROTOTYPE
        ↓
FUNCTIONAL IMPLEMENTATION
        ↓
INK SCENE / STATE STRUCTURE
        ↓
NARRATIVE CONTINUITY UNDER CODE CHANGE
        ↓
PLAYTEST / PLAYABILITY EVIDENCE
        ↓
PLAYABILITY CARD
        ↓
GRADUATION / HANDOFF
```

The writer's job is not to become the authoritative game-state system. The writer observes the contracted state, documents what the player experiences, identifies continuity failures, and proposes narrative repairs.

## Exercise IC1 — Scene decomposition

Take a short original scene and identify:

- scene entry condition;
- character state;
- player-visible information;
- choices;
- variables/state changes;
- scene exit conditions;
- reachable next scenes;
- required continuity facts.

Represent the result as a simple scene graph before changing the implementation.

**Pass condition:** another trainee can understand the scene's reachable flow without relying on undocumented assumptions.

## Exercise IC2 — Controlled programming change

Introduce one deliberate structural change, such as:

- inserting a new choice;
- splitting one scene into two;
- adding a state variable;
- changing a conditional branch;
- moving a scene;
- adding a new return path.

Do not rewrite the entire narrative to hide the change.

**Pass condition:** the changed Ink structure compiles and the trainee can identify every affected narrative path.

## Exercise IC3 — Continuity repair

Repair the narrative so that the player's experience remains coherent after the programming change.

Check:

- character knowledge;
- causal sequence;
- choice consequences;
- variable/state continuity;
- scene entry and exit context;
- unreachable or contradictory states;
- duplicated exposition;
- abrupt tonal or temporal jumps;
- accessibility of the resulting flow.

**Pass condition:** the implementation change is technically real, but the resulting story flow remains intelligible to a playtester.

## Exercise IC4 — Playtest and evidence

Play the changed paths and record:

1. what the player actually encountered;
2. where continuity held;
3. where continuity broke;
4. what was changed;
5. why the change was made;
6. what remains unresolved.

The writer must distinguish **observed behavior** from interpretation.

## Exercise IC5 — Handoff

Produce a short narrative continuity note containing:

- original scene contract;
- changed implementation;
- affected paths;
- continuity risks;
- repairs;
- playtest evidence;
- known limitations;
- questions for the receiving project.

A successful handoff does not claim that a narrative change is canonical merely because it exists in Ink.

## Historical case boundary — Battle the Beast

The supplied private/contemporaneous project record identifies:

- an official 2016–2017 Wattpad competition associated with Syfy's *The Magicians*;
- a three-part **My Name is Luna** submission under the pseudonym Loptr Sigyn;
- later 2018 experimentation with Ink, Twine, and Unity3D;
- a later interactive-narrative document titled **The Magicians: Graduation**;
- a documented account of permission from Lev Grossman for adaptation of fan-universe material for interactive Ink design.

These points establish a useful **historical development case**, but they do not establish a general franchise license.

For training, the preferred implementation path is therefore:

```
HISTORICAL CASE
    ↓
EXTRACT TECHNICAL LESSON
    ↓
SEPARATE FRANCHISE MATERIAL
    ↓
ORIGINAL / CLEARED TRAINING SCENE
    ↓
INK CONTINUITY EXERCISE
```

The historical case should not be copied into a training exercise as though repository presence, contest participation, or documented permission automatically grants present-day reuse rights.

## Relationship to Legacy Project Validation

This exercise is a narrative-specific application of the cross-track validation lifecycle:

```
OLD / EXISTING PROJECT
        ↓
INVENTORY
        ↓
PROVENANCE
        ↓
RIGHTS / LICENSE
        ↓
DEPENDENCY
        ↓
CURRENT-STANDARD GAP
        ↓
CONTROLLED REBUILD
        ↓
PLAYABILITY / ACCESSIBILITY / DATA TEST
        ↓
DOCUMENTATION
        ↓
PRODUCTION DECISION
```

For narrative work, **Ink is the controlled rebuild/testing environment**, not the authority for rights, canon, or production acceptance.

## Relationship to 50 Ways

**50 Ways to Leave Another** supplies the rights/provenance case-study model:

```
SOURCE
  ↓
PROVENANCE
  ↓
RIGHTS
  ↓
DOCUMENTED TRANSFORMATION
  ↓
CLEARANCE / DECISION
  ↓
PUBLIC OR RELEASED WORK
```

Battle the Beast is useful here as a historical example of why those layers must remain separate. The project can document an actual progression from prose to interactive narrative without treating the later technical form as proof that every inherited story element is reusable.

The transferable lesson is:

> Preserve the history. Extract the technique. Verify the rights. Rebuild the technique in a controlled environment. Document what changed.

## Boundary with PIXIE

PIXIE may explain or present a contracted narrative event, but it does not:

- invent hidden story state;
- decide canon;
- infer authoritative state from prose presentation;
- determine rights clearance;
- approve production.

The same boundary used elsewhere in the training program applies here:

```
AUTHORITATIVE STATE / CONTRACT
        ↓
INK / NARRATIVE STRUCTURE
        ↓
PLAYER EXPERIENCE
        ↓
DOCUMENTATION
```

Narrative presentation does not become authority merely because it is executable.

## Status

`PROPOSED`

This is an educational exercise specification, not legal advice and not a grant of rights to any third-party franchise.
