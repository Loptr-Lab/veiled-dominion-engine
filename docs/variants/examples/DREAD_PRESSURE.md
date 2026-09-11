# Dread Pressure

**Status:** Model  
**Rules authority:** No  
**Source type:** Original  
**Implementation:** Documentation-only  
**Commercial use:** Allowed under the project license  
**Accessibility review:** Pending  
**Rights review:** Passed — original abstraction

## Summary
Dread Pressure is the reusable worked example for creating a variant. It tests spatial tension without relying on a franchise, character, quotation, music, or recognizable visual identity.

## Mechanical thesis
A sacrificed friendly piece may leave a Lure token. On the affected opponent's next action, legal destinations are restricted to moves that reduce distance to that token. Tension comes from deterministic movement pressure, not hidden information or randomness.

## Rules delta
- Baseline topology and victory conditions remain unchanged.
- Creating a Lure uses the existing sacrifice timing window.
- A Lure affects enemy pieces within two squares.
- Restriction lasts for the next affected action and then expires.
- If no legal move reduces distance, ordinary legal moves remain available.
- Sanctuary immunity prevents the restriction.
- Multiple Lures do not stack; the nearest applies, with board-coordinate order as the tie-breaker.

## Edge cases
Tests must cover ties, board edges, Sanctuary overlap, pass-through movement, elimination, repetition, resignation, and draw priority.

## Accessibility
Pressure must be communicated through at least two channels. Safe Mode removes flashing, camera shake, and disorientation while retaining exact state information.

## Why this is the model
This file demonstrates how to extract a systems lesson from an earlier themed experiment while publishing only original, transferable expression.
