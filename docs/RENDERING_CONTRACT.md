# Veiled Dominion — Rendering Contract (Engine -> UI)

Defines stable mapping from engine state to renderable UI state.

## Purpose
Keep engine logic independent from frontend presentation while guaranteeing consistent, deterministic visuals.

## Engine-side inputs (conceptual)
- Board size: 6x6
- Piece fields:
  - `id`
  - `element` (`Ember | Tide | Root | Gale`)
  - `position` (`row`, `col`)
  - `owner`
  - optional `status` (`type`, `turnsLeft`)
- Square status (e.g., `Steam`)
- Optional per-piece movement metadata (e.g., Tide next allowed axis)
- Optional Root anchor metadata/zone

## UI view-model output (recommended)
```ts
type Axis = 'horizontal' | 'vertical';

interface RenderPiece {
  id: string;
  row: number;
  col: number;
  owner: string;
  baseIcon: string;         // asset path
  overlays: string[];       // status overlay asset paths
  hints: string[];          // axis indicators, etc.
}

interface RenderSquare {
  row: number;
  col: number;
  overlays: string[];       // steam, anchor-zone visuals
}

interface BoardViewModel {
  pieces: RenderPiece[];
  squares: RenderSquare[];
}
