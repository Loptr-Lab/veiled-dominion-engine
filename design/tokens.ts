/**
 * Veiled Dominion // Loptr Lab
 * Design Tokens v1 — TypeScript mirror of design/tokens.css
 *
 * Keep in sync with tokens.css and src/VeiledDominion.Engine/DesignTokens.cs.
 */

export const DesignTokens = {
  color: {
    bgBase: "#0D0C0E",
    surfaceConcrete: "#1A191C",
    accentCrimson: "#9E1B1B",
    accentGold: "#D4AF37",
    textPrimary: "#F5F5F7",
    borderStrong: "#2A2830",
    borderSoft: "#222126",
    textMuted: "#B7B7BE",
  },

  font: {
    familySans: '"Inter", "SF Pro Display", "Segoe UI", Roboto, Arial, sans-serif',
    familyMono: '"Roboto Mono", "SFMono-Regular", Menlo, Consolas, monospace',
    sizeDisplay: "24px",
    sizeH2: "14px",
    sizeBody: "10px",
    sizeData: "9px",
    weightDisplay: 700,
    weightH2: 600,
    weightBody: 400,
    weightData: 400,
    lineHeightBody: 1.5,
    letterSpacingDisplay: "0.1em",
  },

  border: {
    widthStrap: "1px",
    widthSectionAccent: "2px",
    radiusNone: "0px",
  },

  veil: {
    hatchAngle: "45deg",
    hatchStripe: "1px",
    hatchGap: "6px",
    hatchColor: "rgba(245, 245, 247, 0.18)",
  },

  motion: {
    fast: "80ms",
    standard: "140ms",
    emphasis: "220ms",
    easingLinear: "linear",
    easingSnapped: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  },

  z: {
    base: 0,
    overlay: 10,
    alert: 20,
  },

  semantic: {
    uiBg: "var(--color-bg-base)",
    uiSurface: "var(--color-surface-concrete)",
    uiText: "var(--color-text-primary)",
    uiBorder: "var(--color-border-strong)",
    uiDangerBg: "var(--color-accent-crimson)",
    uiMasteredBg: "var(--color-accent-gold)",
  },
} as const;

export type VDDesignTokens = typeof DesignTokens;
