# Component Architecture Specification: Veiled Dominion // Loptr Lab

This document defines the canonical component contracts, state enums, interaction rules, and visual guardrails for the Veiled Dominion UI layer. All frontend implementations and backend engine responses **must** conform to these definitions.

---

## 1. Global Structural Rules

1. **The Modular Strap Constraint:** All UI panels must be bound together by `1px` flat solid boundaries. Windows do not float; they are structurally locked to the edges of the display matrix.
2. **The Asymmetric Flash:** Interfaces remain `90%` monochromatic (`#0D0C0E` and `#1A191C`). Pure `#9E1B1B` crimson is applied exclusively as a solid background block behind text to flag turn changes, forced submission states, or illegal board maneuvers.
3. **The Veil State Pattern:** Hidden zones, blocked actions, or fog-of-war states on the board grid are indicated via a rigid, 45-degree diagonal hatch pattern overlaying the grid squares. Apply the `.vd-veil` class.
4. **The Y-Axis Split Component:** Portrait cards, selection menus, and identity frames utilise a hard center-cut mask along the exact Y-axis. The left hemisphere renders clean, clinical vector schematics; the right hemisphere reveals raw, high-contrast, texturally gritty ink illustration. Apply the `.vd-y-split` class.
5. **Zero Radius:** No `border-radius` other than `0px` (`--radius-none`) is permitted on structural containers.

---

## 2. Canonical Enums (TypeScript)

### `TurnPhase`

```ts
export enum TurnPhase {
  Restraint = "Restraint",
  Contest   = "Contest",
  Lock      = "Lock"
}
```

| Value       | Description                                          |
|-------------|------------------------------------------------------|
| `Restraint` | Initial placement / constraint phase of the turn.    |
| `Contest`   | Active manoeuvre and challenge resolution phase.     |
| `Lock`      | Turn-end commitment; no further moves permitted.     |

---

### `TurnOwner`

```ts
export enum TurnOwner {
  Player1 = "Player1",
  Player2 = "Player2",
  Player3 = "Player3",
  Player4 = "Player4"
}
```

---

### `BoardCellState`

```ts
export enum BoardCellState {
  Normal          = "Normal",
  Veiled          = "Veiled",           // hidden / fog-of-war
  Selectable      = "Selectable",       // valid move target
  Selected        = "Selected",         // currently selected source cell
  Illegal         = "Illegal",          // attempted invalid action
  ForcedSubmission= "ForcedSubmission", // compulsion / penalty state
  Locked          = "Locked",           // inaccessible by rule
  LastMoveOrigin  = "LastMoveOrigin",
  LastMoveTarget  = "LastMoveTarget"
}
```

---

### `PieceState`

```ts
export enum PieceState {
  Idle       = "Idle",
  Focused    = "Focused",
  Threatened = "Threatened",
  Pinned     = "Pinned",
  Submitted  = "Submitted",
  Eliminated = "Eliminated",
  Mastered   = "Mastered"
}
```

---

### `LogSeverity`

```ts
export enum LogSeverity {
  Info     = "Info",
  Warning  = "Warning",
  Critical = "Critical"
}
```

---

### `SystemBannerState`

```ts
export enum SystemBannerState {
  Neutral             = "Neutral",
  TurnChange          = "TurnChange",
  IllegalAction       = "IllegalAction",
  SubmissionDetected  = "SubmissionDetected",
  LockState           = "LockState"
}
```

---

## 3. Component Inventory and Contracts

### `BoardCellViewModel`

Represents a single cell in the game grid as transmitted from the engine to the UI layer.

```ts
export interface BoardCellViewModel {
  id: string;
  row: number;
  col: number;
  state: BoardCellState;
  occupantPieceId?: string;
  occupantOwner?: TurnOwner;
}
```

**Rendering contract:**

| `state`           | CSS Class(es)                        | Notes                                      |
|-------------------|--------------------------------------|--------------------------------------------|
| `Normal`          | `.vd-panel`                          | Default cell appearance.                   |
| `Veiled`          | `.vd-panel .vd-veil`                 | Hatch overlay applied via `::after`.       |
| `Selectable`      | `.vd-panel` + highlight border       | Use `--color-accent-gold` border.          |
| `Selected`        | `.vd-panel` + filled border          | Use `--color-accent-gold` background tint. |
| `Illegal`         | `.vd-panel .vd-state-critical`       | Crimson flash; no interaction.             |
| `ForcedSubmission`| `.vd-panel .vd-state-critical`       | Crimson flash; requires acknowledgement.   |
| `Locked`          | `.vd-panel .vd-veil`                 | Hatch overlay; pointer-events: none.       |
| `LastMoveOrigin`  | `.vd-panel` + subtle muted border    | Use `--color-text-muted` border.           |
| `LastMoveTarget`  | `.vd-panel` + subtle muted border    | Use `--color-text-muted` border.           |

---

### `ActionItem`

Represents a single action button in any action bar or context menu.

```ts
export interface ActionItem {
  id: string;
  label: string;
  hotkey?: string;
  enabled: boolean;
  critical?: boolean;
}
```

- `critical: true` → apply `.vd-state-critical` to the action button.
- `enabled: false` → apply `opacity: 0.4` and `pointer-events: none`.

---

### `LogEntry`

Represents a single entry in the engine log stream.

```ts
export interface LogEntry {
  id: string;
  ts: string; // ISO 8601 timestamp
  severity: LogSeverity;
  message: string;
}
```

**Rendering contract:**

| `severity` | Style                                    |
|------------|------------------------------------------|
| `Info`     | `.vd-data` — default `--color-text-primary`. |
| `Warning`  | `.vd-data` — `--color-accent-gold` text. |
| `Critical` | `.vd-data .vd-state-critical`            |

---

## 4. State Mappings and Interaction Rules

### Cell Interactivity

A cell is interactive if and only if its state is **not** `Locked` or `Illegal`:

```ts
export const isCellInteractive = (state: BoardCellState): boolean => {
  return ![
    BoardCellState.Locked,
    BoardCellState.Illegal
  ].includes(state);
};
```

### Critical Banner Trigger

A system banner is rendered with the crimson critical style when:

```ts
export const isCriticalBanner = (state: SystemBannerState): boolean => {
  return state === SystemBannerState.IllegalAction
    || state === SystemBannerState.SubmissionDetected;
};
```

---

## 5. Event / State Transition Rules

```
TurnPhase:
  Restraint → Contest  (on valid piece selection + move commit)
  Contest   → Lock     (on turn-end action confirmed)
  Lock      → Restraint (on next player's turn begin)

BoardCellState:
  Normal      → Selected         (on user click, isCellInteractive true)
  Selected    → Selectable       (adjacent valid targets highlighted)
  Selectable  → LastMoveTarget   (on move confirmed)
  Selected    → LastMoveOrigin   (on move confirmed)
  Any         → Illegal          (on engine rejection, clears after 1 frame)
  Any         → ForcedSubmission (on engine compulsion rule trigger)
  Any         → Veiled           (on fog-of-war toggle by engine)
  Any         → Locked           (on rule-locked zone enforcement)

PieceState:
  Idle       → Focused    (on cell Selected containing piece)
  Focused    → Idle       (on deselect)
  Any        → Threatened (on engine threat detection)
  Any        → Pinned     (on engine pin detection)
  Focused    → Submitted  (on ForcedSubmission resolution)
  Any        → Eliminated (on capture/removal)
  Any        → Mastered   (on alternative victory condition met)
```

---

## 6. Example Selectors

```css
/* Board cell — default */
.vd-board-cell {
  /* inherits .vd-panel */
}

/* Board cell — veiled fog state */
.vd-board-cell[data-state="Veiled"] {
  /* inherits .vd-veil via class addition */
}

/* Board cell — illegal action flash */
.vd-board-cell[data-state="Illegal"] {
  background: var(--ui-danger-bg);
  color: var(--ui-text);
}

/* Piece — mastered state */
.vd-piece[data-state="Mastered"] {
  border: var(--border-width-strap) solid var(--color-accent-gold);
}

/* System banner — critical */
.vd-system-banner[data-banner="IllegalAction"],
.vd-system-banner[data-banner="SubmissionDetected"] {
  /* inherits .vd-state-critical */
  background: var(--ui-danger-bg);
  color: var(--ui-text);
}

/* Log entry — warning */
.vd-log-entry[data-severity="Warning"] {
  color: var(--color-accent-gold);
}

/* Log entry — critical */
.vd-log-entry[data-severity="Critical"] {
  background: var(--ui-danger-bg);
  color: var(--ui-text);
}
```

---

## 7. C# Parity Enums

The following C# enums live in `src/VeiledDominion.Engine/UiContract/UiEnums.cs` and **must** remain in sync with the TypeScript canonical enums above:

```csharp
namespace VeiledDominion.Engine.UiContract;

public enum TurnPhase
{
    Restraint,
    Contest,
    Lock
}

public enum BoardCellState
{
    Normal,
    Veiled,
    Selectable,
    Selected,
    Illegal,
    ForcedSubmission,
    Locked,
    LastMoveOrigin,
    LastMoveTarget
}

public enum PieceState
{
    Idle,
    Focused,
    Threatened,
    Pinned,
    Submitted,
    Eliminated,
    Mastered
}

public enum LogSeverity
{
    Info,
    Warning,
    Critical
}
```

---

## 8. Non-Negotiable Visual Guardrails

1. **No rounded corners.** `border-radius` must always be `0px` on structural containers and cells.
2. **Crimson (`#9E1B1B`) is reserved exclusively** for critical/illegal/forced-submission states. Never use it for decorative or informational purposes.
3. **Gold (`#D4AF37`) is reserved exclusively** for mastered piece borders and selectable cell highlights.
4. **The veil hatch** must always be rendered via the `::after` pseudo-element with `pointer-events: none`, never as a visible DOM layer.
5. **The Y-axis split** is a strict `50/50` grid split — `grid-template-columns: 1fr 1fr`. No asymmetric ratios.
6. **All motion durations** must use token values (`--motion-fast: 80ms`, `--motion-standard: 140ms`, `--motion-emphasis: 220ms`). No custom transition durations.
7. **Log streams** must use the monospace family (`--font-family-mono`) at `9px` (`--font-size-data`) and remain left-aligned at all times.
8. **Border width on UI straps** must always be exactly `1px` (`--border-width-strap`). Never `0`, never `2px` (reserved for section accents only).
