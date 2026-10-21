# Track D — Narrative Interface / Announcer Systems

## Purpose

Track D teaches how to develop PIXIE as a recurring narrative interface that can move between creator tools, accessibility experiments, networked social play, and a game without quietly becoming a second rules engine.

The deeper story hypothesis is:

> **PIXIE is what remains of Loptr Lab when she leaves the Other Side and returns to the flip side.**

That is a narrative development hypothesis, not a statement that every repository should literally contain Loptr Lab or that Paragon/Veiled Dominion should become the home of the story.

PIXIE can therefore be developed as the **replacement/interface presence** rather than as a mascot pasted into every project.

This track is training and prototyping. It does **not** make PIXIE, Duet behavior, or any proposed Keeper variant Veiled Dominion canon.

## The negative development path: do not turn PIXIE into the Story Lab

Do **not** develop PIXIE by making her progressively more dependent on the story-lab repository, Veiled Dominion lore, or the Keeper concept until she can only exist inside that narrative.

The direction is the reverse:

```text
LOPTR LAB / OTHER SIDE
        ↓
   PIXIE DEPARTS
        ↓
 PIXIE CARRIES THE CONTINUITY
        ↓
 FLIP SIDE / CREATOR NETWORK
        ↓
 ┌──────────────┬───────────────┐
 ↓              ↓               ↓
CREATOR OS     DUET       PARAGON-REBORN
```

Veiled Dominion can provide a **presentation language and experimental narrative mirror**. It must not become PIXIE's sole ontology.

In particular:

- do not make the Keeper the source of PIXIE's identity;
- do not make Veiled Dominion rules determine PIXIE behavior;
- do not make Paragon-Reborn the repository that owns PIXIE;
- do not move Creator OS/network functionality into the story-lab repo merely to make the fiction look continuous;
- do not turn a training abstraction into canon by repetition;
- preserve the ability for PIXIE to exist in creator tooling, social/network contexts, Duet, and other future projects without Veiled Dominion.

## Core boundary

```text
AUTHORITATIVE EXPERIENCE / NETWORK STATE
                 ↓
          PRESENTATION CONTRACT
                 ↓
          PIXIE INTERFACE LAYER
           ↙        ↓        ↘
       CREATOR     DUET    PARAGON
          OS
```

PIXIE may observe, interpret, announce, route, or present a contracted event.

PIXIE must not invent authoritative game state, resolve canonical rules, silently infer private state, or become the authority simply because she narrates it.

## MCP skills are part of the development track

PIXIE development should use the available MCP/skill layer as an **orchestration and evidence workflow**, not as hidden lore authority.

Use the relevant skill for the work being done. In particular:

- **build-scope** — narrow a PIXIE experiment before implementation;
- **build-prd** — turn an accepted PIXIE behavior into user-facing requirements;
- **build-spec** — translate the requirements into a technical contract;
- **build-checklist** — sequence implementation and verification;
- **build-project** — execute scoped build work while preserving verification pauses;
- **resources** — record relevant references and anti-patterns.

When MCP tools touch external systems, record what the tool actually supplied. Do not treat tool output, generated copy, or an inferred relationship as canon.

The same rule applies to GitHub/connector work: repository state is evidence of implementation state, not evidence that a fictional relationship is true.

## The development loop

**OBSERVE → CONTRACT → VOICE → PRESENT → ACCESS → TEST → INTEGRATE → REVIEW**

### 1. OBSERVE

Identify the events PIXIE is allowed to see.

Examples:

- match/round begins;
- meaningful state transition;
- new actor or threat becomes known;
- player decision resolves;
- failure/success condition resolves;
- party/network state changes;
- accessibility-relevant information becomes available.

Record whether each signal is authoritative, derived, private, or presentation-only.

### 2. CONTRACT

Define a small event schema before writing dialogue or animation.

Minimum fields:

- event name;
- source of truth;
- audience;
- visibility/privacy;
- timing;
- allowed presentation;
- accessibility equivalent;
- unresolved questions.

### 3. VOICE

Develop PIXIE as a communication system before treating her as a conventional character.

The key questions are:

> What does PIXIE know?  
> What is she permitted to say?  
> What does she deliberately leave unsaid?  
> What survives when the story-lab context is removed?

Voice should remain stable across contexts while allowing different presentation skins.

For the Paragon/Veiled Dominion experiment, the proposed **corrupted Keeper** is a *variant presentation/persona*, not yet a canon character. Corruption should be expressed through contradiction, damaged ritual language, missing context, or unstable framing—not by giving the announcer unauthorized control over rules.

## PIXIE app / network scope

The PIXIE app should be treated as a **network-facing creator/social layer**, not automatically as part of every game's matchmaking system.

### Recommended boundary

```text
PIXIE APP
  │
  ├── one chosen network / identity layer
  │
  ├── presence
  ├── rooms / circles
  ├── invitations
  ├── creator collaboration
  └── PIXIE announcements / context
             │
             ├──────────────→ DUET
             └──────────────→ PARAGON-REBORN
```

**Matchmaking and party rooms are separate concepts.**

- **Party room:** a PIXIE-network space for people who have intentionally gathered. This can be the first social primitive.
- **Matchmaking:** a game/runtime concern that pairs eligible players for a particular game or mode. It should consume an explicit party/presence contract rather than making PIXIE the game server.

This makes it possible to build the app around **one network first**.

A single-network architecture is not only possible; it is the cleaner development boundary for this track:

> **PIXIE has one home network. Games and experiments are guests of that network.**

The app can expose one network's identity, presence, room, invite, and notification primitives without becoming a universal matchmaking layer.

If later work requires multiple networks, add an explicit adapter boundary rather than designing for federation prematurely.

## 4. PRESENT

Choose the channel appropriate to context:

- spoken line;
- text/subtitle;
- screen-reader announcement;
- UI state;
- visual/audio cue;
- room/presence notification;
- silence.

The same important event should have an accessible non-audio representation.

### 5. ACCESS

Test:

- screen-reader discoverability;
- captions/transcripts;
- reduced motion;
- non-color-only state communication;
- cognitive load;
- timing windows;
- interruption/replay behavior;
- room/invite discoverability;
- presence privacy.

Duet is the primary accessibility laboratory for this track.

### 6. TEST

Separate tests for:

1. event contract;
2. announcer eligibility;
3. message selection;
4. presentation;
5. accessibility fallback;
6. privacy/visibility;
7. network/room behavior;
8. regression against authoritative state.

A presentation test must never become the rule test.

### 7. INTEGRATE

**Duet:** prototype one announcer event and, where useful, one room/party handoff through the accessible interaction model. Treat the result as Duet-specific unless explicitly promoted elsewhere.

**Paragon-Reborn:** use the same documented event/presentation contract as a production-facing prototype. Keep gameplay authority in the future canonical/runtime systems and use the announcer only downstream.

**PIXIE app:** own the network-facing presence, room, invitation, and notification contract. Do not silently become the authoritative game matchmaking service.

### 8. REVIEW

Every cross-repository handoff records:

- source repository;
- exact event contract;
- presentation variant;
- accessibility behavior;
- network scope;
- asset/provenance status;
- canon status;
- open questions;
- next decision owner.

## Portfolio-sized exercises

### Exercise D1 — Event contract

Write five event contracts and produce a text-only announcement set.

**Evidence:** Markdown specification + fixtures/examples.

### Exercise D2 — PIXIE voice bible

Define:

- role;
- knowledge boundary;
- vocabulary;
- sentence rhythm;
- humor/restraint boundary;
- what she never claims to know;
- escalation behavior;
- silence behavior;
- how the voice survives outside the story-lab context.

**Evidence:** voice bible + 10–20 example lines.

### Exercise D3 — Corrupted Keeper study

Create a noncanonical Veiled Dominion presentation study in which PIXIE's announcer layer is rendered as a corrupted Keeper.

Constraints:

- no new canonical rules;
- no gameplay authority;
- no implication that training abstractions are canon;
- corruption is a presentation/narrative treatment;
- all important gameplay information remains available through accessible channels;
- the study must still make sense if the Veiled Dominion repository is removed from PIXIE's architecture.

**Evidence:** character/voice brief, state-to-line matrix, visual/audio treatment notes, accessibility notes, and a short “what remains when Veiled Dominion is removed?” test.

### Exercise D4 — Duet prototype

Implement one announcer event in Duet and expose it through the accessible interaction model.

**Evidence:** focused branch/PR, tests, accessibility notes, and a short before/after explanation.

### Exercise D5 — PIXIE network prototype

Define a single-network party-room flow:

```text
IDENTITY → PRESENCE → INVITE → ROOM → READY → HANDOFF
```

Do not implement matchmaking yet.

**Evidence:** event contract, room-state diagram, privacy/accessibility notes, and a deterministic fixture set.

### Exercise D6 — Paragon-Reborn handoff

Translate the same contract into a Paragon-Reborn presentation brief.

**Evidence:** production-facing integration note identifying:

- authoritative input;
- presentation contract;
- PIXIE variant;
- asset/provenance requirements;
- accessibility behavior;
- unresolved canon questions;
- whether the feature belongs in the game runtime, PIXIE network, or both.

## Governance

This track does not create a partnership, production assignment, employment promise, or canon promotion.

Training work remains noncanonical. Duet remains an experimental accessibility artifact. Paragon-Reborn remains the coordination hub for its own roadmap and future production implementation. Veiled Dominion's canonical rules authority remains the engine repository.

PIXIE is developed as a cross-project interface identity, not owned by the story-lab repository.

A proposed character, voice, visual treatment, network feature, or mechanic moves into canon only through the receiving project's documented governance process.

## Success condition

The contributor should be able to demonstrate:

> **I can make a narrative interface feel alive without letting it become the authority for what is true — and I can move that interface between worlds without making any one world own it.**

That is the core skill this track is intended to teach.
