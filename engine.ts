// engine.ts — CANDIDATE IMPLEMENTS THIS FILE.
// Do not change these function signatures; engine.test.ts calls them directly.

import { Board, Piece, Position } from "./types";

/**
 * Returns all legal destination squares for `piece` given the current
 * board state. Must account for:
 *  - Element-specific movement shape
 *  - Tide's alternating-axis constraint (see README.md)
 *  - Gale's pivot + "cannot end on starting row/column" constraint
 *  - Ember's midpoint-must-be-empty rule, and Steam blocking Ember's path/landing
 *  - Root's anchoring (if implemented — not covered by mandatory tests)
 */
export function getLegalMoves(board: Board, piece: Piece): Position[] {
  throw new Error("Not implemented");
}

/**
 * Applies a move, returning a NEW Board (do not mutate the input).
 * Responsible for:
 *  - Updating the moved piece's position
 *  - Recording lastMoveAxis for Tide pieces
 *  - Applying Burning to enemy pieces adjacent to an Ember's landing square
 *  - Resolving the Ember+Tide -> Steam reaction where applicable
 *  - NOT advancing the turn counter or expiring statuses (see advanceTurn)
 */
export function applyMove(
  board: Board,
  pieceId: string,
  destination: Position
): Board {
  throw new Error("Not implemented");
}

/**
 * Advances board.turn by 1 and expires any Burning/Steam statuses whose
 * expiry turn has passed. Must NOT mutate the input board.
 */
export function advanceTurn(board: Board): Board {
  throw new Error("Not implemented");
}
