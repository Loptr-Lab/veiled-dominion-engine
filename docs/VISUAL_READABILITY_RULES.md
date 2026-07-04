# Veiled Dominion — Visual Readability Rules

These rules are mandatory for any frontend visualization of the engine.

## 1) Status effects must be distinct from piece identity
- Piece icon communicates **what the unit is** (Ember/Tide/Root/Gale).
- Status overlay communicates **what is currently affecting it** (Burning/etc).
- Do not reuse the same shape language for both.

Implementation guidance:
- Piece = solid silhouette token.
- Status = ring, halo, particle, or border overlay.

## 2) Midpoint visibility must be preserved
Ember movement depends on midpoint occupancy and Steam interaction.

Requirements:
- Grid boundaries should be clearly visible.
- Adjacent-square relationships must be easy to parse.
- Avoid over-textured or visually noisy boards.

## 3) Tide alternation must have a visible hint
Tide alternates axis (horizontal/vertical) between moves.

Requirements:
- Render a small directional indicator on Tide when selected (or always, if desired).
- Indicator maps to the next legal axis:
  - Horizontal allowed -> horizontal hint
  - Vertical allowed -> vertical hint

## 4) Steam and Anchored must communicate different blocking semantics
- Steam blocks Ember movement constraints only; should appear permeable.
- Anchored/anchor-zone behavior should appear more absolute/obstructive.

Requirements:
- Steam: soft alpha, mist/cloudy edges.
- Anchored zone: sharper motif (vines/stone/thorns), stronger edge definition.

## 5) Priority stack for overlays
When multiple overlays are present:
1. Piece base icon
2. Ownership tint/frame
3. Status overlays (Burning, etc.)
4. Turn/selection indicators
5. Interaction hints (e.g., Tide axis arrows)

Keep z-index predictable and documented.

## 6) Accessibility baseline
- Ensure contrast ratio supports low-vision readability.
- Do not rely on color alone; use shape/texture cues.
- Provide optional “high contrast mode” palette.
