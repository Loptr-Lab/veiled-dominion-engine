# Audio Accessibility: The Sound of the Aura

## Purpose

This document defines an audio design layer for the Radius of Ruin and related
status effects (Veiled, Sanctuary), intended to make Rebirth's presence and
danger zone perceivable by players who are blind or have low vision — not just
players who can see the screen but need it to be visually safer.

It is a companion to `ENGINE_ACCESSIBILITY_A11Y_PARADOX.md`, not a replacement
for it. That document addresses photosensitivity, vestibular, and contrast
risk for sighted players. This document addresses a different axis entirely:
players for whom the visual channel isn't available at all.

## The Problem

Veiled Dominion's core mechanic — the Radius of Ruin — is currently
communicated entirely visually: a glow, an aura ring, a status change on a
piece's model. A player who cannot see the board has no way to know how close
they are to being Veiled, where Rebirth currently is, or when Death's
Sanctuary is protecting them.

This is a gap the existing accessibility framework doesn't cover. The grant
positioning brief already stakes out "accessibility built in from the ground
up, not retrofitted" as the project's core technical claim — an audio-only
channel for the game's signature mechanic is a direct, concrete extension of
that claim, not a nice-to-have.

## Design Principle: Diegetic, Not Bolted-On

The lore already supports this without inventing new mechanics. Rebirth is
established as overpowered — "born too bright" — and her power currently only
overflows in one sensory channel (light). There's no lore reason that
overflow stays confined to sight. Treating her aura as something that can be
*heard*, not just seen, is consistent with the character concept rather than
an accessibility feature awkwardly grafted onto it.

This framing matters for tone: the audio should extend the sonic identity
already established for Veiled Dominion's pitch material — low drone, cello /
sine-wave register, no beat, no melody (see the Video Script's music
direction) — rather than introduce a new, disconnected "accessibility beep"
aesthetic.

## Strict Engineering Rules for VD (Audio)

Contributors implementing audio for Rebirth, Death, or the Veiled state MUST
adhere to the following:

### 1. No Hard Transients

Mirrors the visual rule in `A11Y_PARADOX.md` (no hard-cut flickering). Audio
cues tied to entering/exiting the Radius of Ruin MUST use a soft attack/decay
envelope, never a sudden spike. A sharp, loud, unanticipated sound is its own
accessibility hazard — the auditory equivalent of a seizure-triggering flash
is a startle-inducing transient.

### 2. Proximity-to-Pitch Mapping Is Mandatory, Not Optional

The core informational content of this system is a continuous mapping from
"distance to Rebirth" to pitch and/or volume. This is not a flavor detail —
it is the mechanism by which a blind player perceives the danger zone at all.
Any variant or reskin that removes this mapping without replacing it with an
equivalent non-visual signal breaks accessibility parity with the base game.

### 3. Independent Volume Channel

The aura's audio signal must be controllable on its own volume slider,
separate from music and general SFX. A blind player needs this channel
reliably audible even if they've turned other audio down or off.

### 4. Directional / Binaural Panning Where Supported

Where the output device supports it (headphones), the aura signal should pan
and vary in level to indicate direction as well as distance. This matters
more here than in most games: the board is a 14x14, four-player cross
formation, not a grid simple enough for a screen reader to narrate cell by
cell in real time. Direction-from-sound is doing real work here, not just
adding immersion.

### 5. Silence as a Signal (Sanctuary)

Death's Sanctuary should be represented as a dampening zone — ambient sound
recedes near Death — rather than an inverse tone or a different color of
beep. This mirrors the existing visual logic for Death (absence, not
opposite-color glow) instead of inventing a new metaphor for the same idea.

### 6. Variant Reskins Preserve the Mapping, Not Just the Timbre

Thematic variants (Sickboi.EXE, Back in Derry, etc.) may reskin the *timbre*
of the aura sound — a dial-up modem whine, a more menacing drone, whatever
fits the variant's palette — but MUST preserve the underlying proximity-to-
pitch/volume mapping. The accessibility function must survive every reskin,
not just the default presentation.

### 7. No Aesthetic Mismatch with Established Sonic Identity

Note for anyone drawing on external reference material (e.g. research notes
referencing rapid, percussive "drumline"-style sound-to-power conversion):
that palette is tonally inconsistent with Veiled Dominion's established
identity of a slow cello/sine-wave drone with no beat. If adapting ideas from
such references, modulate pitch, harmonic density, or volume of the existing
drone rather than introducing a rhythmic/percussive layer, unless it's
explicitly scoped to a variant whose palette calls for it.

## What This Does Not Solve

This system solves "sense Rebirth's danger zone and Death's safe zone
non-visually." It does not solve the larger problem of representing full
board state — piece positions, legal moves, whose turn it is — to a player
who cannot see the board at all. That is a separate, larger accessibility
project. This document should not be cited as evidence the game is fully
playable blind; it's one coherent, lore-justified piece of that picture.

## Why This Matters Strategically

The existing grant positioning brief lists "visual safety — particularly
around temporal contrast and motion" as an underfunded area the project
addresses. Blindness/low-vision accessibility in strategy games is at least
as underfunded, and almost entirely unaddressed by the photosensitivity/
vestibular framing already documented. Adding a concrete, engineering-backed
proposal for non-visual play — tied to a signature mechanic rather than a
generic screen-reader afterthought — strengthens the same funding case
`ACCESSIBILITY_GRANT_POSITIONING.md` already makes, and closes an obvious gap
a reviewer familiar with accessibility work would otherwise notice.

## Contributor Requirement

If you touch audio implementation, status-effect triggers, or the mixing/
volume architecture, you are responsible for checking your changes against
this document before opening a pull request, in the same way rendering
changes are checked against `ENGINE_ACCESSIBILITY_A11Y_PARADOX.md`.
