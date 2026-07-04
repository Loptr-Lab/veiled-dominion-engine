# Veiled Dominion — Asset Pipeline

This document defines a practical, low-friction art pipeline for the Veiled Dominion frontend.

## Goals
- Maximize **readability at small sizes** (64x64 and below).
- Keep MVP implementation fast.
- Preserve a path to higher production value later.
- Maintain licensing hygiene.

## Tiered sourcing strategy

### Tier 1 (recommended for MVP): Game-Icons.net
- Source: https://game-icons.net/
- Why: clean top-down silhouettes, fast to adopt, SVG-first, broad coverage.
- Candidate mappings:
  - Ember: fire/flame icon
  - Tide: wave/water icon
  - Root: root/tree icon
  - Gale: wind/tornado icon
  - Burning: flame aura / burning mark
  - Steam: cloud/mist icon
  - Anchored: anchor/vine-lock icon

### Tier 2 (style exploration): AI generation
- Midjourney v6 / Leonardo.ai for mood exploration and style concepts.
- Use only if output stays silhouette-readable and consistent across all elements.

### Tier 3 (premium packs)
- Itch.io top-down board/token packs
- Kenney board/UI assets
- Use when visual polish is prioritized over speed.

### Tier 4 (board texture)
- Poly Haven textures + subtle treatment.
- Keep board low-contrast to avoid overpowering piece/status legibility.

## File formats and export specs
- Source of truth: **SVG**
- Runtime raster fallback: PNG
- Export sizes:
  - 64x64 (minimum readability target)
  - 128x128 (high-DPI fallback)
- Transparent background for all piece/status tokens.

## Directory convention
- `assets/pieces/*.svg`
- `assets/status/*.svg`
- `assets/ui/*.svg`

## Naming convention
- Pieces:
  - `piece-ember.svg`
  - `piece-tide.svg`
  - `piece-root.svg`
  - `piece-gale.svg`
- Status:
  - `status-burning.svg`
  - `status-steam.svg`
  - `status-anchored.svg`
- UI:
  - `ui-axis-horizontal.svg`
  - `ui-axis-vertical.svg`

## Color strategy
- Keep base icons monochrome or neutral.
- Apply player ownership tint in UI layer.
- Status overlays should use distinct color language:
  - Burning: warm glow/high contrast
  - Steam: pale, semi-transparent
  - Anchored: hard-edged, obstructive visual language

## License and attribution
- Track all externally sourced assets in `ASSET_ATTRIBUTION.md`.
- Include author, source URL, and license.
- For CC BY assets, ensure required credit text is present.

## QA checklist before shipping
- [ ] Can each piece be identified instantly at 64x64?
- [ ] Are statuses visually distinct from piece identity?
- [ ] Does Steam look permeable vs Anchored looking blocking?
- [ ] Is board contrast low enough not to compete with gameplay tokens?
- [ ] Attribution file complete and accurate?
