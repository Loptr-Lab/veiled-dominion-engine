// types.ts — core data model. Candidates may adjust internals if needed,
// but the exported shape (Position, Piece, Board, Element) must stay
// compatible with engine.test.ts, which candidates must NOT edit.

export type Element = "Ember" | "Tide" | "Root" | "Gale";
export type Owner = "A" | "B";
export type Axis = "horizontal" | "vertical" | "diagonal";

export interface Position {
  row: number; // 0-5
  col: number; // 0-5
}

export interface Piece {
  id: string;
  element: Element;
  owner: Owner;
  position: Position;

  // Set when this piece's most recent move was a Tide move, recording
  // which axis it moved along. Undefined if the piece has never moved
  // (i.e. no alternation constraint applies to its first move).
  lastMoveAxis?: Axis;

  // Turn number through which this piece remains Burning (inclusive).
  // Undefined = not burning. See README.md for the exact expiry contract.
  burningUntilTurn?: number;
}

export interface SquareStatus {
  // Turn number through which this square remains Steam (inclusive).
  steamUntilTurn?: number;
}

export interface Board {
  size: number; // 6
  pieces: Piece[];
  squareStatus: Map<string, SquareStatus>; // key: squareKey(position)
  turn: number; // current turn number, starts at 1, incremented by applyMove
}

export function squareKey(pos: Position): string {
  return `${pos.row},${pos.col}`;
}

export function inBounds(pos: Position, size: number): boolean {
  return pos.row >= 0 && pos.row < size && pos.col >= 0 && pos.col < size;
}

export function pieceAt(board: Board, pos: Position): Piece | undefined {
  return board.pieces.find(
    (p) => p.position.row === pos.row && p.position.col === pos.col
  );
}

export function isBurning(piece: Piece, board: Board): boolean {
  return (
    piece.burningUntilTurn !== undefined && board.turn <= piece.burningUntilTurn
  );
}

export function isSteam(board: Board, pos: Position): boolean {
  const status = board.squareStatus.get(squareKey(pos));
  return (
    status?.steamUntilTurn !== undefined && board.turn <= status.steamUntilTurn
  );
}
