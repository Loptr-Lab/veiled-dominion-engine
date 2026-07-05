# Accessibility Engineering Brief
## Veiled Dominion Engine — Loptr Lab

> Veiled Dominion is an open-source strategy game engine prototype exploring
> how visually dark, high-contrast game aesthetics can be implemented without
> excluding players with photosensitive, vestibular, cognitive, or visual
> accessibility needs. This document describes the technical problem, the
> engineering constraints we've defined, and the current build status of
> each piece of work — clearly separating what's implemented from what's
> planned.

**Status key used throughout this document:**
- ✅ **Implemented** — built, in the codebase, testable today
- 🛠 **In progress** — actively being worked on
- 📋 **Planned** — designed/specified, not yet started
- ❓ **Needs confirmation** — claim below needs verification before this document is shared externally

---

## Problem Statement

Most competitive digital games are built for speed, contrast, and visual
intensity. Dark themes, high-contrast UI, rapid state transitions, and
glowing effects are standard design language in the strategy and chess
variant genre.

These same design choices create measurable risk for players with:
- photosensitive epilepsy and seizure disorders
- vestibular disorders (motion-triggered dizziness, nausea, disorientation)
- visual processing differences (contrast sensitivity, figure-ground separation)
- cognitive load sensitivities (rapid state change, simultaneous visual events)

Veiled Dominion's two highest-profile pieces — Death and Rebirth — require
visual treatments that sit squarely in this risk zone: Death uses a void/dark
shader, and Rebirth uses a glow/refraction effect paired with a field-wide
status change (the Veiled state) that must register for all players. The
project is testing whether these effects can be implemented within
documented accessibility constraints without losing their thematic intent.

---

## Engineering Constraints — Status

The following constraints have been specified. Their implementation status
is tracked here, not implied by the fact that they're documented.

| Constraint | Status |
|---|---|
| Veiled-state transitions use no abrupt flash or hard on/off toggle (0ms or ≥400ms eased) | 📋 Planned |
| Aura pulsing uses sine-wave function, not square-wave/stepped | 📋 Planned |
| Visual indicators don't rely on color as sole differentiator | 📋 Planned |
| Safe Mode suppresses all transition animation | 📋 Planned |
| WebGL frame pacing validated at each visual event trigger | 📋 Planned |
| Death/Rebirth shaders meet WCAG 2.1 AA contrast minimums | 📋 Planned |
| Proximity-to-pitch audio mapping for Radius of Ruin | 📋 Planned |
| Independent audio channel/volume slider for aura signal | 📋 Planned |
| Automated transition-safety test suite running on PRs | 📋 Planned |

This repo is a representation of what I understand needs to happen for this project to be viable

Full technical specifications:
- [Visual/rendering safety rules](./ENGINE_ACCESSIBILITY_A11Y_PARADOX.md)
- [Audio accessibility for Radius of Ruin / Veiled / Sanctuary](./ENGINE_ACCESSIBILITY_AUDIO_AURA.md)

---

## Current Project State

The engine is an early open prototype (v0.1). The accessibility constraint
framework described above has been designed and documented. Implementation
has not yet begun / is in early stages — the constraints exist as
specifications and open issues with acceptance criteria, not as shipped code.

---

## Claims Needing Confirmation Before This Document Is Used Externally

The following statements should not appear in any external-facing or
funder-facing material until confirmed true:

- ❓ **"Led by a disabled creator."** Only include this if accurate and if
  you're comfortable disclosing it in this context — this is a personal
  disclosure, not a project fact, and should be your call to make explicitly
  each time it's used, not carried forward by default from one document to
  the next.
- ❓ **"Built with a disabled/unemployed contributor pipeline."** Only
  include if this pipeline currently exists (active contributors, an open
  recruitment process) rather than being an intention for the future. If
  it's a goal rather than a current state, say so directly: "designed to
  support a disabled/unemployed contributor pipeline" reads very differently
  from "built with" one.

---

## Why This Work Matters

Accessibility work in games disproportionately focuses on input
accommodation (remapping, switch access) and captions/audio description.
Visual safety — temporal contrast, motion, seizure risk — and non-visual
play for blind/low-vision players both receive comparatively little
structured engineering attention, particularly in the strategy/chess-variant
genre where dark, high-contrast aesthetics are common.

If completed as specified, this project's outputs would be:
1. A documented constraint framework for dark-theme, high-contrast game
   rendering, reusable by other developers
2. A concrete Safe Mode architecture
3. A proximity-based audio design for non-visual play of a specific
   mechanic (not full blind playability — see the audio spec's own
   limitations section)

These are worth pursuing and worth documenting honestly as they're built.
The value of this work does not depend on overstating how much of it exists
yet — a reviewer evaluating this for funding or compliance purposes will
weigh a clear, honest account of "here's what's specified and here's what's
built" far more credibly than language implying completion ahead of the
code.

---

## Contact

Loptr Lab
GitHub: https://github.com/Loptr-Lab/veiled-dominion-engine
