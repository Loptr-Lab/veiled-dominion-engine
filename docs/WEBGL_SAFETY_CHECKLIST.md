# WebGL Safety Checklist

## Purpose

This checklist defines the minimum rendering-safety validation steps required
before a WebGL-facing Veiled Dominion build should be considered safe enough
for accessibility-sensitive playtesting.

It complements:
- `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md`
- `docs/ACCESSIBILITY_GRANT_POSITIONING.md`
- `ARCHITECTURE_OVERVIEW.md`

This checklist is focused on temporal safety, frame pacing, contrast behavior,
and Safe Mode verification.

---

## Required Validation Scope

The following visual event categories must be reviewed in WebGL builds:

- turn start transition
- turn end / resolution transition
- Veiled-state application
- Veiled-state clearing
- capture resolution
- Rebirth aura presentation changes
- Death proximity / Sanctuary presentation changes
- any Safe Mode toggle or accessibility-mode swap

If a rendering change can alter luminance, motion intensity, contrast rhythm,
or animation pacing, it belongs in this checklist.

---

## Baseline Rules

### 1. No abrupt flash behavior
- no full-screen flash
- no high-contrast inversion burst
- no sudden bloom spike tied to aura activation or resolution
- no repeated pulse sequence below the project’s approved temporal safety threshold

### 2. Transition timing constraints
- transitions should be either:
  - instant with no animation, or
  - slow/eased and long enough to avoid abrupt perceptual spikes
- avoid ambiguous mid-speed transitions that can feel like visual snapping

### 3. Non-color indicators required
- state changes must not rely on color alone
- Veiled-state indication must remain interpretable using shape, iconography, outline, pattern, or labeling
- Safe Mode must preserve state legibility without glow-based signaling

### 4. Safe Mode must be complete
- Safe Mode must disable all non-essential animation
- Safe Mode must flatten shader behavior where needed
- Safe Mode must preserve contrast and clarity without temporal effects
- Safe Mode must apply consistently across turn transitions, aura events, and piece-state changes

---

## Frame Pacing Validation

### Measure these conditions
For every required validation event:
- capture average frame time
- capture worst frame spike
- capture visible pacing irregularities during the transition window
- compare normal mode vs Safe Mode

### Minimum review questions
- does this event produce a visible stutter?
- does this event produce a sudden contrast pulse?
- does this event create motion that is stronger than the game-state importance warrants?
- does Safe Mode fully suppress the risky behavior?

### Required documentation per event
For each reviewed event, record:
- event name
- build target
- browser / platform used
- observed frame pacing result
- observed contrast/motion risk
- Safe Mode result
- pass / fail
- reviewer notes

---

## Event Review Matrix

| Event | Visual risk reviewed | Safe Mode verified | Pass/Fail | Notes |
|---|---|---|---|---|
| Turn start transition |  |  |  |  |
| Turn end / resolution transition |  |  |  |  |
| Veiled-state application |  |  |  |  |
| Veiled-state clearing |  |  |  |  |
| Capture resolution |  |  |  |  |
| Rebirth aura presentation changes |  |  |  |  |
| Death proximity / Sanctuary presentation changes |  |  |  |  |
| Accessibility toggle / Safe Mode swap |  |  |  |  |

---

## WebGL Test Conditions

Review at minimum under:
- one Chromium-based browser
- one Firefox-based browser if supported
- one lower-power device profile if available
- one reduced-motion / accessibility-oriented settings pass

If WebGL export behavior differs by browser or GPU profile, note the variance explicitly.

---

## Merge Gate Recommendation

A rendering-related pull request should not be considered ready if:
- any reviewed event fails Safe Mode suppression
- any reviewed event introduces abrupt flash-like behavior
- a state change is only understandable through color
- frame pacing instability is visible during core gameplay transitions
- reviewers cannot explain the visual event in plain language accessibility terms

---

## Contributor Requirement

Any contributor touching:
- shaders
- post-processing
- aura rendering
- state-transition visuals
- WebGL export behavior
- animation timing

should review this checklist before opening a pull request.
