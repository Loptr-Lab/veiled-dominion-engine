# Engine Accessibility: The #A11y Paradox

## Purpose

This document defines rendering safety rules for Veiled Dominion and related variants whose visual identity depends on extreme luminance contrast, void materials, glow emission, and stylized post-processing.

The goal is simple: preserve the visual thesis of the game without introducing rendering behavior that creates avoidable accessibility or medical risk.

## The Problem

Veiled Dominion relies on extreme luminance contrast (Musou Black vs. Amber Emission). While this may pass static colorblind contrast checks such as WCAG AAA, it creates a severe risk of Photosensitive Epilepsy (PSE) if the rendering pipeline introduces temporal artifacts such as:

- frame drops
- screen tearing
- Z-fighting
- rapid opacity flickers
- harsh on/off visual state changes

Static contrast compliance is not enough. Temporal safety is an engine-level requirement.

## Strict Engineering Rules for VD

Contributors MUST adhere to the following rendering rules:

### 1. No Hard-Cut Flickering

The "Veiled" state (losing abilities) MUST NOT be implemented as a sudden on/off toggle.

It must be a smooth, 0.5-second ease-in/ease-out transition (lerp). A piece must never pop from fully lit to black in a single frame.

### 2. Sine-Wave Pulsing Only

If the Daughter's aura "breathes" or pulses, it MUST use a smooth sine wave function such as `Mathf.Sin`, never a harsh square wave or abrupt stepped pulse.

### 3. Z-Fighting Prevention

The Musou Black material (0.0 specular, 1.0 roughness) is highly susceptible to Z-fighting with other dark materials.

You MUST use offset shadow bias, stable mesh separation, or camera near-clip tuning to ensure the Death piece never flickers against the board.

### 4. Frame Pacing Is Mandatory

The WebGL export MUST lock its framerate or implement robust V-Sync.

A dropped frame during aura movement, screen-space post-processing, or state transition can become a seizure trigger.

## The Sickboi.EXE Exception

The Sickboi.EXE variant intentionally explores screen tearing, Z-fighting, harsh glitch effects, and corrupted-render aesthetics.

This creates a strict design split:

- the main game must be medically safer by default
- the Sickboi.EXE variant is intentionally unstable in presentation

### Mandatory Rule for Sickboi.EXE

The Sickboi.EXE variant cannot be shipped without all of the following:

1. a mandatory, unskippable **Photosensitivity Warning** screen at startup
2. a hard-coded **Safe Mode** toggle in settings
3. a Safe Mode implementation that replaces VHS glitches, tearing, and flicker behaviors with static, solid-color grey-screen equivalents while preserving gameplay logic

## Why This Matters Strategically

This is not just a compliance note. It is an R&D position.

Organizations such as AbleGamers Charity and Epic MegaGrants may be interested in projects that explore accessibility-aware rendering pipelines for visually extreme games.

A proposal framed as:

**"Solving the #A11y Paradox: Building a High-Contrast Rendering Pipeline that Prevents Photosensitive Epilepsy in Dark-Mode Games"**

positions Veiled Dominion as more than a game pitch. It becomes a reusable engine and accessibility research problem with broader industry relevance.

## Contributor Requirement

If you touch rendering, shaders, post-processing, animation timing, status-effect visuals, or WebGL export settings, you are responsible for checking your changes against this document before opening a pull request.
