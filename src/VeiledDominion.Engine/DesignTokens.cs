// Veiled Dominion // Loptr Lab
// Design Tokens v1 — C# mirror of design/tokens.css
//
// Keep in sync with tokens.css and design/tokens.ts.

namespace VeiledDominion.Engine;

/// <summary>
/// Static constants mirroring the Veiled Dominion design token set for cross-stack parity.
/// </summary>
public static class DesignTokens
{
    public static class Color
    {
        public const string BgBase = "#0D0C0E";
        public const string SurfaceConcrete = "#1A191C";
        public const string AccentCrimson = "#9E1B1B";
        public const string AccentGold = "#D4AF37";
        public const string TextPrimary = "#F5F5F7";
        public const string BorderStrong = "#2A2830";
        public const string BorderSoft = "#222126";
        public const string TextMuted = "#B7B7BE";
    }

    public static class Font
    {
        public const string FamilySans = "\"Inter\", \"SF Pro Display\", \"Segoe UI\", Roboto, Arial, sans-serif";
        public const string FamilyMono = "\"Roboto Mono\", \"SFMono-Regular\", Menlo, Consolas, monospace";
        public const string SizeDisplay = "24px";
        public const string SizeH2 = "14px";
        public const string SizeBody = "10px";
        public const string SizeData = "9px";
        public const int WeightDisplay = 700;
        public const int WeightH2 = 600;
        public const int WeightBody = 400;
        public const int WeightData = 400;
        public const double LineHeightBody = 1.5;
        public const string LetterSpacingDisplay = "0.1em";
    }

    public static class Border
    {
        public const string WidthStrap = "1px";
        public const string WidthSectionAccent = "2px";
        public const string RadiusNone = "0px";
    }

    public static class Veil
    {
        public const string HatchAngle = "45deg";
        public const string HatchStripe = "1px";
        public const string HatchGap = "6px";
        public const string HatchColor = "rgba(245, 245, 247, 0.18)";
    }

    public static class Motion
    {
        public const string Fast = "80ms";
        public const string Standard = "140ms";
        public const string Emphasis = "220ms";
        public const string EasingLinear = "linear";
        public const string EasingSnapped = "cubic-bezier(0.2, 0.8, 0.2, 1)";
    }

    public static class Z
    {
        public const int Base = 0;
        public const int Overlay = 10;
        public const int Alert = 20;
    }
}
