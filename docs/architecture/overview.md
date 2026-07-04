# Architecture Overview

## Purpose

This document describes high-level system boundaries for the Veiled Dominion prototype.

## High-level components

1. **Game Engine (C#)**
   - Owns canonical game state and rule enforcement.
   - Validates actions and computes next state.
   - Exposes contracts consumable by frontend/runtime layers.

2. **Web Client (TypeScript/HTML)**
   - Renders board and state.
   - Collects user intent/actions.
   - Displays feedback and status transitions.

3. **Bundle Runtime (HTML + browser script loader)**
   - Unpacks embedded assets (manifest/template mechanism).
   - Rewrites UUID-based references to blob URLs.
   - Boots scripts and mounts React/Babel content.

## Ownership boundaries

- **Engine owns truth**: legality and outcomes come from engine rules, not UI heuristics.
- **UI owns presentation**: animation, layout, and interaction affordances are client concerns.
- **Runtime owns loading**: asset decode/decompress/injection is isolated from game logic.

## Data flow (conceptual)

1. UI emits player action.
2. Action is validated by engine.
3. Engine returns updated state + event/result metadata.
4. UI reconciles and re-renders.
5. Runtime concerns (asset loading/execution) remain transparent to gameplay logic.

## Key risks

- Rule logic accidentally duplicated in frontend.
- Implicit data contracts causing drift across C# and TS.
- Bundle-loader complexity obscuring production/runtime failures.

## Mitigations

- Maintain explicit contracts in `docs/contracts/`.
- Add ADRs for architectural changes affecting boundaries.
- Keep runtime bundling process documented and observable.
