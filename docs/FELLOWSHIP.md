# Veiled Dominion Engineering Fellowship
## Loptr Lab — Open Prototype Program

---

## What This Is

The Veiled Dominion Engineering Fellowship is a structured contribution track
for engineers, technical artists, and systems designers who want to work on a
problem that does not exist anywhere else in the industry.

This is not a volunteer program.
This is not a beginner-friendly open source project.
This is a technically demanding, IP-connected engineering engagement with a
small, serious team building something original.

Fellows are credited contributors on an open-source engine that is the
mechanical and architectural foundation of the Daddy's Little Mortis (DLM)
transmedia universe.

---

## The Problem

Most competitive games are built on a single design axiom: more power wins.

Veiled Dominion inverts that axiom. The most powerful entity on the board —
Rebirth — wins only by suppressing her own power. Her passive aura (the
Radius of Ruin) continuously debuffs every piece in her vicinity, including
her own. Victory requires restraint, not conquest.

This is not a design metaphor. It is an engine architecture problem.

Building it correctly requires:

- a deterministic 4-player state machine that models three distinct turn phases
- a spatial evaluation system (`RadiusOfRuin`) running after every resolved action
- a `Veiled` state lifecycle with precise trigger, duration, refresh, and clear timing
- a snapshot serializer sufficient to reconstruct full game state for replay and testing
- WebGL rendering constraints that make dark, high-contrast visuals safe for
  players with photosensitive, vestibular, and cognitive accessibility needs
- shader implementations for two visually extreme pieces — Death (void) and
  Rebirth (refraction glow) — that meet WCAG 2.1 AA minimums without
  compromising their thematic intent

None of these problems are solved by reaching for a tutorial.

---

## The A11Y Engineering Track

The engine carries an explicit accessibility engineering constraint that is
unusual in the strategy game space and technically interesting in its own right.

The aesthetic language of Veiled Dominion — dark, high-contrast, luminance-
heavy — is the same aesthetic language that creates photosensitive risk. The
engineering challenge is to implement that aesthetic within documented safety
constraints without diluting it.

This is documented in `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md` and
`docs/WEBGL_SAFETY_CHECKLIST.md`. The constraint framework is not aspirational
policy. It is tied to open issues with acceptance criteria and test targets.

Fellows working the A11Y track are solving a problem the industry largely
retrofits. This engine is building it in from the start.

---

## Open Fellowship Tracks

### Track 1 — Engine Engineering
**Relevant issues:** #12 (Veiled-state transitions), #11 (baseline tests),
engine issues #[turn loop], #[LP tracker], #[move execution path],
#[snapshot serializer]

You are a systems engineer comfortable with deterministic state machines,
spatial math, and headless testability. You understand why snapshot
correctness matters before UI exists. You write heavily commented,
architecture-aware C#.

Core problems:
- 4-player clockwise turn loop with explicit phase progression
- `RadiusOfRuin` spatial evaluation running on every resolved action
- `Veiled` state lifecycle: trigger, refresh, clear, immunity
- Leadership Point tracker with snapshot stability
- Canonical snapshot serializer for replay and test comparison

Reference: `ARCHITECTURE_OVERVIEW.md`, `src/systems/`, `src/pieces/`

---

### Track 2 — Technical Art / Shader Engineering
**Relevant issues:** #14 (Death/Rebirth rendering)

You are a technical artist or shader engineer who can build visually extreme
effects within documented accessibility constraints. You do not treat
accessibility as a limiter on craft — you treat it as a harder, more
interesting version of the same problem.

Core problems:
- Death: void shader, zero sheen, no luminance flicker, WCAG 2.1 AA contrast
- Rebirth: refraction glow with no temporal contrast spike on aura activation
- Safe Mode fallbacks: flat color, no animation, full legibility
- Aura boundary visibility without color as the sole differentiator

Reference: `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md`,
`docs/WEBGL_SAFETY_CHECKLIST.md`

---

### Track 3 — Systems Design
**Relevant issues:** open seats in README

You are a systems designer with experience in asymmetric multiplayer balance.
You think in feedback loops, not individual mechanics.

Core problems:
- Martyr's Boon economy curve (sacrifice → token → suppression)
- 4-player asymmetric LP scaling across match length
- Self-veil loss threshold tuning for Rebirth
- Coexistence LP cap interaction with 4-player dynamics

Reference: `README.md` rulebook, `ARCHITECTURE_OVERVIEW.md`

---

### Track 4 — WebGL / Frame Safety Engineering
**Relevant issues:** #13 (frame pacing and WebGL safety checklist)

You understand what happens to frame pacing when game-state transitions hit
the browser render loop. You can instrument a WebGL build, identify spike
events, and document thresholds.

Core problems:
- Frame delta validation at every visual state-change trigger
- Safe Mode render suppression at the WebGL layer
- Checklist implementation in `docs/WEBGL_SAFETY_CHECKLIST.md`

Reference: `index.html`, `docs/WEBGL_SAFETY_CHECKLIST.md`,
`docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md`

---

## What Fellows Get

- Named contributor credit on the engine and in the DLM universe documentation
- Authorship on a technically documented, IP-connected open-source prototype
- Direct engagement with the Loptr Lab team on architecture decisions
- Work that is visible, testable, and legible to future employers,
  collaborators, and grant reviewers

This is not paid employment. Fellows are not employees of Loptr Lab.
Contribution terms, IP boundaries, and licensing are defined in `CONTRIBUTING.md`
and `LICENSE.md`. Read both before opening a PR.

---

## How to Apply

Review the open issues labeled `help wanted` or `good first issue`.

If you have a specific track in mind, open an issue comment or send a direct
inquiry to:

**questions@loptrlab.com**

Include links to your portfolio, relevant repositories, or prior work.
We respect the craft. Lead with it.

---

## Repository

[github.com/Loptr-Lab/veiled-dominion-engine](https://github.com/Loptr-Lab/veiled-dominion-engine)

---

*© 2026 Daddy's Little Mortis. The universe is a delicate cycle.*
