// Veiled Dominion // Loptr Lab
// UI Contract Enums — C# parity with design/components.md canonical enums.
//
// Keep naming stable to avoid frontend/backend contract drift.

namespace VeiledDominion.Engine.UiContract;

/// <summary>
/// Represents the current phase of a player's turn.
/// </summary>
public enum TurnPhase
{
    Restraint,
    Contest,
    Lock
}

/// <summary>
/// Represents the visual/interactive state of a single board cell.
/// </summary>
public enum BoardCellState
{
    Normal,
    Veiled,           // hidden / fog-of-war
    Selectable,       // valid move target
    Selected,         // currently selected source cell
    Illegal,          // attempted invalid action
    ForcedSubmission, // compulsion / penalty state
    Locked,           // inaccessible by rule
    LastMoveOrigin,
    LastMoveTarget
}

/// <summary>
/// Represents the state of an individual game piece.
/// </summary>
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

/// <summary>
/// Severity level for engine log entries and system banners.
/// </summary>
public enum LogSeverity
{
    Info,
    Warning,
    Critical
}
