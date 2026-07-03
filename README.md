# ♟️ Veiled Dominion

> *"Every game teaches you to become more powerful. What if the lesson was the opposite?"*

## About This Project

Veiled Dominion is an open-source strategy game engine prototype exploring how
visually dark, high-contrast game aesthetics can be implemented without excluding
players with photosensitive, vestibular, or cognitive accessibility needs. The
project combines deterministic engine architecture, explicit accessibility
constraints, WebGL safety review, and plain-language contributor documentation
so that accessibility work is visible, testable, and funding-legible. Current
milestones include safe state-transition behavior, shader/accessibility
constraints for key pieces, a WebGL safety checklist, and contributor-ready
issue tracks for engineering, testing, technical art, and documentation.

**Veiled Dominion** is an asymmetrical, 4-player chess variant serving as the mechanical and narrative anchor of the **Daddy's Little Mortis (DLM)** universe. It reimagines the traditional board game not as an arena of conquest, but as an exercise in structural restraint.

One player assumes control of **Rebirth**—an entity of immense, terrifying power who must win by learning mechanical restraint. The remaining three players command standard **Mortal Factions** attempting to survive her proximity, exploit her tactical inexperience, or achieve checkmate before she masters her aura.

---

## Current Status

This repository is in an **early public prototype** stage, with the strongest current focus on:
- rules and systems documentation
- contributor scaffolding
- architecture planning
- early engine and tooling groundwork

Active contributors are especially welcome for:
- documentation improvements
- CI / developer experience
- architecture validation
- gameplay systems prototyping

## Funding and Sustainability

Loptr Lab is building toward a recurring sponsorship model that supports
infrastructure, maintenance, accessibility engineering, and long-term open
prototype development.

If you want to support this work, review:
- `docs/ACCESSIBILITY_GRANT_POSITIONING.md`
- `docs/FELLOWSHIP.md`
- `docs/SPONSORSHIP_STRATEGY.md`
- `docs/GITHUB_SPONSORS_PROFILE.md`
- `docs/FUNDING_PLATFORM_COPY.md`
- `docs/SPONSORS.md`

Our goal is to move from one-time donations to a predictable monthly structure
that supports contributors, maintenance, and accessibility-first engine work.

## Start Here

If you're new to the project:

1. Read this `README.md`
2. Review `CONTRIBUTING.md`
3. Review `docs/CONTRIBUTOR_SKILLSET_AND_RESOURCES.md` if you plan to contribute to the engine or Unity prototype
4. Review `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md` if you plan to touch rendering, shaders, post-processing, animation timing, or WebGL export settings
5. Check open issues, especially those labeled `good first issue`
6. Use the GitHub issue templates for bugs, feature requests, and variant proposals
7. Open a pull request with the built-in PR template

If you're reporting a security issue, do **not** open a public issue. Email **security@loptrlab.com** instead.

## Where Should I Start?

Use this quick routing guide:

- **I found a bug**
  - Open the bug report issue template

- **I want to improve the engine, docs, or workflow**
  - Open the feature request issue template

- **I want to propose a new gameplay variant**
  - Start with `docs/VARIANT_SUBMISSION_GUIDE.md`
  - Review existing variant docs such as `docs/variants/BACK_IN_DERRY.md` and `docs/variants/SICKBOI_EXE.md`
  - If your variant uses thematic source material, also review `docs/PUBLIC_DOMAIN_PROVENANCE.md`
  - Open the variant proposal issue template

- **I want to contribute code right away**
  - Review `CONTRIBUTING.md`
  - Review `docs/CONTRIBUTOR_SKILLSET_AND_RESOURCES.md`
  - Review `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md` if your work touches visuals, rendering, shaders, or export behavior
  - Pick a scoped open issue
  - Follow the PR template and documentation requirements

- **I want to work on Back in Derry**
  - Review `docs/variants/BACK_IN_DERRY.md`
  - Check the open issue for the first deterministic pressure rule implementation pass

## Ways to Contribute Right Now

We are currently most ready for contributions in these areas:

- **Documentation**
  - clarify rules
  - improve onboarding
  - expand architecture and setup docs

- **CI / Tooling**
  - docs validation
  - link-checking
  - build/test automation
  - contributor workflow polish

- **Gameplay / Systems Design**
  - edge-case validation
  - rules consistency review
  - balance proposals with clear acceptance criteria

- **Prototype Engineering**
  - deterministic grid logic
  - state-machine implementation
  - test scaffolding for movement and aura interactions

## Contributor Expectations

Before starting work:
- look for an existing issue or open one with the appropriate template
- prefer scoped, reviewable changes
- follow branch naming and PR guidance in `CONTRIBUTING.md`
- review `docs/CONTRIBUTOR_SKILLSET_AND_RESOURCES.md` before writing engine or prototype code
- review `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md` before changing rendering, shader, animation, or export behavior
- update docs when mechanics or workflows change

Please keep contributions aligned with the repository's licensing and IP boundaries described in `CONTRIBUTING.md` and `LICENSE.md`.

---

## 🌒 The Core Thesis: The Restraint Fantasy

Traditional games follow a standard power escalation loop:

$$\text{Start Weak} \longrightarrow \text{Gain Power} \longrightarrow \text{Win by Dominance}$$

**Veiled Dominion** flips this paradigm into a **Restraint Fantasy**:

$$\text{Start Overpowered} \longrightarrow \text{Suppress Power} \longrightarrow \text{Win by Coexistence}$$

The signature mechanical engine is the **Radius of Ruin**—an area-of-effect (AoE) debuff field constantly projecting from the Rebirth piece. She does not merely threaten enemies; she inadvertently suppresses her own units. Victory is achieved not through aggressive capture, but through **Merciful Maneuvers**.

---

## 📜 The Official Playtest Rulebook (v0.1)

### 1. Setup & Components

* **The Board:** A 14x14 cross-shaped 4-player topology featuring a $2\times2$ neutral zone at the absolute center.
* **Player Count:** 4 Players (Asymmetrical Free-For-All by default).
* **Factions & Army Composition:**
  * **3x Mortal Armies:** Standard chess loadouts (1 Leader, 1 Queen, 2 Rooks, 2 Bishops, 2 Knights, 8 Pawns).
  * **1x Rebirth Army:** Modified loadout consisting of:
    * `1x Leader` (Standard King logic)
    * `1x Rebirth` (Replaces standard Queen)
    * `1x Death` (Replaces left-side Rook)
    * `1x Rook` / `2x Bishops` / `2x Knights` / `8x Pawns`
* **Resources:** Boon Tokens (Rebirth exclusive), Leadership Point (LP) Tracker.

### 2. Unique Piece Logic

#### `REBIRTH` (The Daughter)

* **Locomotion:** Infinite horizontal, vertical, and diagonal movement (Standard Queen pathing).
* **Capture:** Displacement rules.
* **Passive — Radius of Ruin:** Continuously emits a 1-square AoE aura (all 8 adjacent tiles). Any piece (friendly or enemy, excluding *Death* and *Rebirth*) that ends its turn inside this aura enters the **Veiled State**.

#### `DEATH` (The Mentor)

* **Locomotion:** 1 square in any direction (Standard King pathing).
* **Passive — The Void:** Invulnerable. Cannot be captured. Enemy movement into Death's coordinate is registered as an illegal move (identical to moving into check). Death may freely move into attacked squares.
* **Passive — Passable:** Friendly units can move *through* Death's coordinate, but cannot end their movement phase on his tile.
* **Passive — Sanctuary:** Friendly units situated within 1 square of Death are completely immune to the *Radius of Ruin*.

#### `THE VEILED STATE` (System Debuff)

* **Trigger:** Ending a turn within Rebirth’s 1-square radius.
* **Duration:** 1 game round (cleared instantly at the start of the affected piece-owner's next turn).
* **Effects:** The affected unit loses all unique class movement, can only move 1 tile forward, and is strictly prohibited from capturing enemy pieces.

---

### 3. Rebirth Player Abilities

| Ability | Type | Resource Cost / Trigger | Mechanical Effect |
| --- | --- | --- | --- |
| **Martyr’s Boon** | Active Action | **Cost:** Consumes Turn <br><br>**Target:** 1 Friendly Unit | Permanently sacrifices a friendly piece to the Graveyard to generate **1 Boon Token**. |
| **Aura Suppression** | Active Action | **Cost:** 1 Boon Token <br><br>**Trigger:** Turn Start | Disables the *Radius of Ruin* completely for the duration of the current turn. |
| **Soul Reservoir** | Passive | **Trigger:** Passive threshold at every 3 units in Graveyard (3, 6, 9...) | Unlocks **Rebirth Dash**. Rebirth can phase through occupied tiles as if empty. Passed units are unaffected by the *Radius of Ruin*. |

---

### 4. Turn Loop Architecture

Play transitions sequentially clockwise. Each player's turn executes across three distinct phases:

```text
[PHASE 1: START PHASE]
  └── Rebirth declares Aura Suppression (Optional Token Spend)
  └── Clear "Veiled" status from the active player's pieces
            │
            ▼
[PHASE 2: ACTION PHASE]
  └── Execute one standard piece movement OR cast Martyr's Boon
            │
            ▼
[PHASE 3: RESOLUTION PHASE]
  └── Evaluate Radius of Ruin spatial coordinates
  └── Apply "Veiled" states to valid adjacent targets
  └── Check End-State / Victory Conditions
```

---

### 5. Victory Conditions (End States)

#### Path A: Standard Checkmate (Mortal Victory)

* If any player's **Leader** is checkmated, that player is eliminated; their remaining units turn into immovable, capturable neutral obstacles.
* If **Rebirth's Leader** is checkmated, the Mortal Factions share a collective victory.

#### Path B: Leadership & Mercy (Rebirth Victory)

* Rebirth wins immediately upon accumulating **10 Leadership Points (LP)**.
* **LP Acquisition** (+1 per action; maximum of 1 Coexistence LP per turn loop):
  * **Withdrawal:** Moving your unit out of an active enemy threat vector without capturing.
  * **Shielding:** Interposing a unit directly between an enemy attack line and your Leader or Rebirth piece.
  * **Coexistence:** Settling a movement phase on a tile directly adjacent to an enemy unit without capturing it.

#### Path C: The Fall (Mortal Structural Victory)

* If Rebirth accidentally applies the **Veiled State** to **5 of her own friendly units** over the course of a match, she loses systemic control. The Mortal Factions win collectively.

---

### 6. Edge Cases & Engine Logic

* **Capturing the Veiled:** While Veiled units cannot capture other pieces, they remain fully targetable and capturable by standard rules.
* **Stacking Rules:** The Veiled state does not stack linearly. Re-entering or remaining within the *Radius of Ruin* simply refreshes the 1-turn duration.
* **Collision Detection:** Rebirth's *Soul Reservoir* dash evaluates spatial proximity and triggers the *Radius of Ruin* **only** at her final landing destination tile, not on the units phased through.

---

## 🛠️ Repository Structure & Tech Stack

This repository serves as the digital prototyping sandbox, system state-machine engine, and foundational transmedia manifest for the *Daddy's Little Mortis* ecosystem.

```text
veiled-dominion-engine/
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   ├── variant_proposal.yml
│   │   └── config.yml
│   ├── workflows/
│   │   └── repo-hygiene.yml
│   └── pull_request_template.md
│
├── docs/
│   ├── CONTRIBUTOR_SKILLSET_AND_RESOURCES.md
│   ├── DEVELOPMENT_ENVIRONMENT.md
│   ├── ENGINE_ACCESSIBILITY_A11Y_PARADOX.md
│   ├── PUBLIC_DOMAIN_PROVENANCE.md
│   ├── VARIANT_SUBMISSION_GUIDE.md
│   └── variants/
│       ├── BACK_IN_DERRY.md
│       ├── SICKBOI_EXE.md
│       └── VARIANT_TEMPLATE.md
│
├── CONTRIBUTING.md
├── LICENSE.md
└── README.md
```

---

## 📖 For Contributors

Veiled Dominion is an open prototype. Contributions are welcome across engine, systems design, and technical art.

| Document | Purpose |
|---|---|
| [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md) | Runtime sequencing, engine pipeline, snapshot contract |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | PR workflow, licensing boundaries, contributor checklist |
| [docs/DEVELOPMENT_ENVIRONMENT.md](./docs/DEVELOPMENT_ENVIRONMENT.md) | Local setup and Codespaces quickstart |
| [docs/CONTRIBUTOR_SKILLSET_AND_RESOURCES.md](./docs/CONTRIBUTOR_SKILLSET_AND_RESOURCES.md) | Role descriptions and recommended background reading |
| [docs/ACCESSIBILITY_GRANT_POSITIONING.md](./docs/ACCESSIBILITY_GRANT_POSITIONING.md) | Plain-language brief for accessibility-minded contributors, grant reviewers, and funding partners |
| [docs/FELLOWSHIP.md](./docs/FELLOWSHIP.md) | Engineering Fellowship — open tracks, problems, and how to apply |
| [docs/SPONSORSHIP_STRATEGY.md](./docs/SPONSORSHIP_STRATEGY.md) | Recurring support model, sponsorship ladder, and sustainability targets |
| [docs/GITHUB_SPONSORS_PROFILE.md](./docs/GITHUB_SPONSORS_PROFILE.md) | Paste-ready GitHub Sponsors profile and tier copy |
| [docs/FUNDING_PLATFORM_COPY.md](./docs/FUNDING_PLATFORM_COPY.md) | Funding-page copy for Buy Me a Coffee, Patreon, and similar platforms |
| [docs/SPONSORS.md](./docs/SPONSORS.md) | Sponsor recognition structure and acknowledgment page |

**Open roles:** See issues labeled `help wanted` or `good first issue`.

If `README.md` and `ARCHITECTURE_OVERVIEW.md` ever disagree, treat it as a bug and flag it in an issue.

---

## 🤝 Open Seats (How to Contribute)

We welcome contributors who enjoy deterministic systems, spatial logic, state-machine design, documentation, and contributor tooling.

### Immediate Focus Areas:

1. **Prototype Engineer:** Implementation of the 14x14 cross-grid coordinate transformations and the `RadiusOfRuin` spatial check scripts.
2. **Technical Artist:** Shader pipeline engineering for **Death** (100% light-absorbent, zero-sheen matte void shader) and **Rebirth** (dynamic internal refraction glow).
3. **Systems Designer:** Mathematical balancing of the "Martyr's Boon" economy curve and 4-player asymmetrical LP scaling.

### Contribution Guidelines

1. Fork this repository.
2. Spin up an explicit feature branch (`git checkout -b feature/radius-logic`).
3. Write clean, deterministic, well-documented code. **Crucial:** If your code alters game-loop mechanics, update *this* rules section in the `README.md` within the same commit.
4. Open a PR detailing exactly how your code hooks into the core *Turn Structure Loop*.

---

## 📬 Contact

Direct pull requests, design manifestos, or structural inquiries to:

**questions@loptrlab.com** *(Include links to your portfolio or repository footprints. We respect the craft.)*

---

*© 2026 Daddy's Little Mortis. The universe is a delicate cycle.*
