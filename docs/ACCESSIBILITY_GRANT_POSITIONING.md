# Accessibility Grant Positioning Brief
## Veiled Dominion Engine — Loptr Lab

> Veiled Dominion is an open-source strategy game engine prototype exploring how
> visually dark, high-contrast game aesthetics can be implemented without excluding
> players with photosensitive, vestibular, or cognitive accessibility needs. The
> project combines deterministic engine architecture, explicit accessibility
> constraints, WebGL safety review, and plain-language contributor documentation
> so that accessibility work is visible, testable, and funding-legible.

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

The games most likely to attract players who identify with darkness, restraint,
and non-violent victory conditions — the exact thematic space Veiled Dominion
occupies — are also the games most likely to exclude those same players on
accessibility grounds.

This is the A11Y Paradox the Veiled Dominion engine is designed to resolve.

---

## What Veiled Dominion Is Testing Technically

Veiled Dominion is a 4-player chess variant where victory is achieved through
restraint, not conquest. Its two highest-profile pieces — Death and Rebirth —
require visual treatments that are inherently high-risk:

- **Death** requires a void or dark shader — a visually striking absence of light
- **Rebirth** requires a glow or refraction effect, and applies a field-wide
  status change (the Veiled state) that must visually register for all players

The engine is being built to prove that these effects can be implemented within
documented accessibility constraints without compromising their thematic intent.

This is not a trivial problem. It requires:
- separating visual representation from engine state (headless testability)
- defining transition timing rules that are safe for vestibular and
  photosensitive users
- implementing a Safe Mode that suppresses animation without losing legibility
- validating WebGL frame pacing at each game-state transition point

The documented constraint framework lives in
`docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md`.

---

## Implementation Constraints Already Documented

The following constraints are already in the repository:

- Veiled-state transitions must use no abrupt flash or high-contrast inversion
- Transition duration must be either instant (0ms) or ≥400ms eased
- Visual indicators must not rely on color as the sole differentiator
- Safe Mode must suppress all transition animation entirely
- WebGL frame pacing must be validated against a documented threshold at each
  visual event trigger
- Death and Rebirth shaders must meet WCAG 2.1 AA contrast minimums
- All Safe Mode fallbacks use flat color, no animation, and high contrast

These are implementation requirements, not aspirational goals. They are tied
to open GitHub issues with acceptance criteria and test targets.

---

## Why This Matters to Funders

Accessibility in games is an active and underfunded area. Most accessibility
work in the industry focuses on input accommodations (remapping, switch access)
or caption/audio description. Visual safety — particularly around temporal
contrast and motion — receives far less structured engineering attention.

Veiled Dominion is building:
1. A documented constraint framework for dark-theme, high-contrast game rendering
2. A replicable Safe Mode architecture others can adapt
3. An open-source engine where the accessibility work is visible, testable,
   and contributor-ready

This makes it relevant to:
- **Disability arts and culture funders** — the project is led by a disabled
  creator and built with a disabled/unemployed contributor pipeline in mind
- **Inclusive design programs** — the A11Y paradox framing and open constraint
  docs are directly reusable by other indie developers
- **Accessible technology grants** — the WebGL safety checklist and Safe Mode
  architecture are concrete technical outputs, not just policy statements
- **Game accessibility orgs** — the engine provides a case study in building
  accessibility constraints into a game's architecture from the ground up,
  rather than retrofitting them

---

## Near-Term Milestones and Measurable Outcomes

| Milestone | Measurable Outcome |
|---|---|
| Veiled-state transition implemented | Transition timing documented and headless-testable |
| WebGL safety checklist complete | All visual event triggers validated against frame threshold |
| Death/Rebirth shaders prototyped | WCAG 2.1 AA contrast verified, Safe Mode fallback confirmed |
| Safe Mode implemented | Full playthrough possible with zero animation, high contrast only |
| Baseline accessibility test suite | Automated checks for transition safety run on every PR |

---

## Current Status

The engine is in active open prototype (v0.1). The accessibility constraint
framework is documented. Implementation issues are open and labeled for
contributors. The contributor pipeline explicitly targets disabled and
unemployed workers in flexible, remote, async roles.

The next phase is implementation: turning documented constraints into tested,
mergeable engine code.

---

## Contact

Loptr Lab
GitHub: https://github.com/Loptr-Lab/veiled-dominion-engine
