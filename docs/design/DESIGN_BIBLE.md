# Loptr Lab — Design Bible

Source of truth for the visual and motion language shared across Loptr Lab
properties (loptrlab.com, the about page, Duet, and the Obsidian Realm splash).
When in doubt, match what's already live in `index.html` / `about.html` —
this doc explains the *why*, not a separate spec to drift from the code.

## Palette & Type

```css
:root {
    --void: #050505;
    --text-primary: #e0e0e0;
    --text-muted: #666666;
    --the-light: #d4a853;
    --font-main: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
```

`--the-light` (amber/gold) is the one accent color. It's used sparingly —
links, section labels, glow text, and the breathing accents below — never as
a fill or background. Everything else stays near-black and muted grey so the
accent reads as a signal, not decoration.

## The Breathing Technique

A slow, ease-in-out opacity pulse. It's the studio's signature motion
pattern — first built for Mortis's Pulsr profile page, then reused for the
Obsidian Realm splash screen on Duet, and again for the live Ruin/Sanctuary
board auras. Anywhere the design wants to suggest something is *alive* rather
than static, this is the technique to reach for.

**Two verified live implementations** (pulled directly from
`Loptr-Lab/duet-solo-hackathon` `public/index.html`):

### 1. Fixed-rhythm pulse — splash accent bar + sigil core

Used on the Duet "Enter the Obsidian Realm" splash. A vertical accent bar
and the sigil's core diamond both breathe on a slow, unchanging 7s cycle.

```css
.crack {
    animation: realm-pulse 7s ease-in-out infinite;
}
@keyframes realm-pulse {
    0%, 100% { opacity: 0.45; }
    50% { opacity: 1; }
}

.sigil .ep {
    animation: realm-eye-pulse 7s ease-in-out infinite;
}
@keyframes realm-eye-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@media (prefers-reduced-motion: reduce) {
    .crack { animation: none; opacity: 0.8; }
    .sigil .ep { animation: none; }
}
```

Use this variant for static, decorative moments — hero accents, section
dividers, anything that should feel alive but isn't tied to live state.

### 2. Data-driven pulse — board aura tiles

Used on the live board for the Ruin/Sanctuary auras. Same technique, but the
duration and peak intensity are exposed as CSS custom properties so the
animation's rhythm can be driven by real, current game state rather than a
fixed rate.

```css
.sq.ruin {
    animation: ruin-breathe var(--ruin-duration, 3.2s) ease-in-out infinite;
}
.sq.sanctuary {
    animation: sanctuary-breathe var(--sanctuary-duration, 4.5s) ease-in-out infinite;
}
@keyframes ruin-breathe {
    0%, 100% { background-color: var(--amber-glow-10); }
    50% { background-color: rgba(212,168,83, var(--ruin-peak, 0.18)); }
}
@keyframes sanctuary-breathe {
    0%, 100% { background-color: rgba(102,102,102,0.10); }
    50% { background-color: rgba(102,102,102, var(--sanctuary-peak, 0.14)); }
}

@media (prefers-reduced-motion: reduce) {
    .sq.ruin { animation: none; background: var(--amber-glow-10); }
    .sq.sanctuary { animation: none; background: rgba(102,102,102,0.10); }
}
```

Use this variant only when the pulse rate/intensity should reflect something
real and changing — not for purely decorative accents.

### Non-negotiable rule

**Every breathing element ships with a `prefers-reduced-motion: reduce`
fallback that turns the animation off and settles on a static, still-visible
opacity/color.** This has held across all three implementations so far and
is not optional for new ones.

## Where it's been applied

- Mortis's Pulsr profile page (origin)
- Duet's "Obsidian Realm" splash — accent bar + sigil core (fixed-rhythm)
- Duet's live board — Ruin/Sanctuary tile auras (data-driven)
- `about.html` on loptrlab.com — hero accent bar (fixed-rhythm, see below)
- Loptr Lab and ibloud property sigils (below)

## Property Sigils

Following the same construction as the Duet "Obsidian Realm" sigil — nested
line-art strokes, no fill except a single breathing accent point. First pass
traced the dolphin/dragon reference marks literally and it didn't work; both
are rebuilt below from the lore itself instead.

### Loptr Lab — three properties, one signal

`sigil-loptr-lab.svg`. Three nodes — one per property line the lab carries —
connected by spokes to a single shared breathing core at center. No node
outranks another; the light they're all wired to is the point. Fixed-rhythm
pulse (7s, same as the splash sigil).

### ibloud — the fractured array

`sigil-ibloud.svg`. Same nested-diamond eye as the Obsidian Realm sigil, but
cut across by a fracture line, with one of the four signal lines to the core
broken (dashed) instead of solid — IVXX's damaged communication array, drawn
directly into the sigil's structure rather than illustrated as a creature.
The breathing core is the same "the-light" accent used everywhere else.

Both use `var(--the-light, #d4a853)` / `var(--text-muted, #666666)` /
`var(--border-hairline, #333333)` with local fallback values, so they render
correctly standalone or inherit the page palette when inlined directly in
`index.html` / `about.html`. Both respect `prefers-reduced-motion` per the
non-negotiable rule above.

### Where each mark lives

- **Loptr Lab sigil** — `index.html` footer, `about.html` footer, and the
  hero-meta corner on the Duet gameplay page (all link to loptrlab.com).
- **ibloud sigil** — beside the "I.B. Loud IVXX" heading on `about.html`,
  and as a signature mark in the Duet gameplay page footer.
- The existing Obsidian Realm sigil on the Duet splash is unchanged — it
  represents Veiled Dominion specifically, not the studio or the handle.
