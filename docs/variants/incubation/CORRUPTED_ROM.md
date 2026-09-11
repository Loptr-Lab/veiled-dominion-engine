# Corrupted ROM

**Status:** Incubating  
**Rules authority:** No  
**Source type:** Original  
**Implementation:** Documentation-only  
**Commercial use:** Pending review  
**Accessibility review:** Restricted; Safe Mode required  
**Rights review:** Passed for this original abstraction

## Summary
Corrupted ROM presents the board as a damaged digital artifact. State changes appear as rendering faults while the underlying rules remain deterministic.

## Systems goals
- Test whether status changes remain legible under deliberately unstable presentation.
- Separate cosmetic corruption from authoritative game state.
- Require a safe presentation that preserves equivalent information.

## Presentation
The default concept may use low-resolution geometry, tracking lines, missing-texture motifs, ghost trails, and overwritten interface elements. It must not imitate a named artist, music catalog, voice, logo, character, or proprietary campaign.

## Mechanical mapping
- Radius of Ruin becomes a clearly bounded corruption zone.
- Veiled status uses altered movement feedback without simulated input delay.
- Sacrifice may trigger a non-flashing system-interruption motif.
- The event log remains plain, stable, and screen-reader compatible.

## Safety requirements
No implementation may ship without reduced motion, flash-frequency limits, static state alternatives, volume controls, captions, and a one-action Safe Mode. Cosmetic instability must never obscure legal moves or fabricate latency.

## Promotion gate
The variant remains experimental until accessibility review and deterministic playtests are complete.
