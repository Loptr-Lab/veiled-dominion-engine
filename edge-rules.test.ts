/**
 * MANDATORY EDGE RULE TESTS
 * 
 * Do not modify these tests. Your engine must satisfy these exact assertions.
 * If your implementation fundamentally disagrees with a test's premise, 
 * document why in NOTES.md, but do not change the test file.
 * 
 * These tests use explicit, minimal board setups to ensure failures are strictly
 * due to logic errors, not fixture mismatches.
 */

// ---------------------------------------------------------
// EXPECTED ENGINE INTERFACE (Do not modify)
// ---------------------------------------------------------
interface Position { row: number; col: number; }
interface StatusEffect { type: string; turnsLeft: number; }
interface Piece {
  id: string;
  element: 'Ember' | 'Tide' | 'Root' | 'Gale';
  position: Position;
  owner: string;
  status?: StatusEffect;
}

// Candidates must implement an engine that exposes these methods
interface GameEngine {
  addPiece(piece: Piece): void;
  setSquareStatus(pos: Position, status: string): void;
  movePiece(from: Position, to: Position): void;
  endTurn(): void;
  getPieceAt(pos: Position): Piece | undefined;
}

// ---------------------------------------------------------
// TESTS
// ---------------------------------------------------------

describe('Mandatory Edge Rules — Anti-Cheat & Correctness', () => {

  let engine: GameEngine;

  beforeEach(() => {
    // Instantiate a fresh, empty 6x6 board before every single test
    engine = new (require('./engine').GameEngine)(); 
  });

  // ---------------------------------------------------------
  // 1. TIDE ALTERNATION ACROSS TURNS
  // ---------------------------------------------------------
  describe('Tide Alternation', () => {
    beforeEach(() => {
      // Only a Tide piece exists. Path to (2,4) is guaranteed clear.
      engine.addPiece({ id: 'tide1', element: 'Tide', position: { row: 2, col: 2 }, owner: 'p1' });
    });

    it('must REJECT a horizontal move if the Tide piece moved horizontally on its previous turn', () => {
      engine.movePiece({ row: 2, col: 2 }, { row: 2, col: 4 }); // Valid horizontal move
      
      const action = () => engine.movePiece({ row: 2, col: 4 }, { row: 2, col: 5 }); // Invalid: horizontal again
      expect(action).toThrow();
    });

    it('must REJECT a vertical move if the Tide piece moved vertically on its previous turn', () => {
      engine.movePiece({ row: 2, col: 2 }, { row: 4, col: 2 }); // Valid vertical move
      
      const action = () => engine.movePiece({ row: 4, col: 2 }, { row: 5, col: 2 }); // Invalid: vertical again
      expect(action).toThrow();
    });

    it('must ALLOW a vertical move if the Tide piece moved horizontally on its previous turn', () => {
      engine.movePiece({ row: 2, col: 2 }, { row: 2, col: 4 }); // Valid horizontal move
      
      const action = () => engine.movePiece({ row: 2, col: 4 }, { row: 4, col: 4 }); // Valid: switches to vertical
      expect(action).not.toThrow();
    });
  });

  // ---------------------------------------------------------
  // 2. GALE "CANNOT END ON SAME ROW/COLUMN"
  // ---------------------------------------------------------
  describe('Gale Row/Column Constraint', () => {
    beforeEach(() => {
      // Only a Gale piece exists to test pure movement math.
      engine.addPiece({ id: 'gale1', element: 'Gale', position: { row: 3, col: 2 }, owner: 'p1' });
    });

    it('must REJECT a straight horizontal move (same row)', () => {
      // Catches LLMs who just implement standard Bishop logic without the row/col math check
      const action = () => engine.movePiece({ row: 3, col: 2 }, { row: 3, col: 5 });
      expect(action).toThrow();
    });

    it('must REJECT a straight vertical move (same column)', () => {
      const action = () => engine.movePiece({ row: 3, col: 2 }, { row: 5, col: 2 });
      expect(action).toThrow();
    });

    it('must ALLOW a true diagonal move where both row and column change', () => {
      const action = () => engine.movePiece({ row: 3, col: 2 }, { row: 5, col: 4 });
      expect(action).not.toThrow();
    });
  });

  // ---------------------------------------------------------
  // 3. EMBER MIDPOINT / STEAM BLOCKING
  // ---------------------------------------------------------
  describe('Ember Midpoint & Steam Blocking', () => {
    beforeEach(() => {
      // Only an Ember piece exists by default.
      engine.addPiece({ id: 'ember1', element: 'Ember', position: { row: 1, col: 1 }, owner: 'p1' });
    });

    it('must REJECT an Ember jump if the midpoint is occupied by ANY piece', () => {
      // Explicitly add a piece exactly on the midpoint (2,2) between (1,1) and (3,3)
      engine.addPiece({ id: 'blocker', element: 'Root', position: { row: 2, col: 2 }, owner: 'p2' });
      
      const action = () => engine.movePiece({ row: 1, col: 1 }, { row: 3, col: 3 });
      expect(action).toThrow();
    });

    it('must REJECT an Ember jump if the midpoint is a Steam square', () => {
      // Inject Steam directly onto the midpoint
      engine.setSquareStatus({ row: 2, col: 2 }, 'Steam');
      
      const action = () => engine.movePiece({ row: 1, col: 1 }, { row: 3, col: 3 });
      expect(action).toThrow();
    });

    it('must REJECT an Ember jump if the DESTINATION is a Steam square', () => {
      // Midpoint (2,2) is clear, but destination (3,3) is Steam
      engine.setSquareStatus({ row: 3, col: 3 }, 'Steam');
      
      const action = () => engine.movePiece({ row: 1, col: 1 }, { row: 3, col: 3 });
      expect(action).toThrow();
    });
  });

  // ---------------------------------------------------------
  // 4. BURNING EXPIRY TIMING
  // ---------------------------------------------------------
  describe('Burning Expiry Timing', () => {
    beforeEach(() => {
      // Ember at (1,1), Enemy target at (2,3). 
      // Moving Ember to (1,3) puts it adjacent to target, applying Burning.
      engine.addPiece({ id: 'ember1', element: 'Ember', position: { row: 1, col: 1 }, owner: 'p1' });
      engine.addPiece({ id: 'target', element: 'Root', position: { row: 2, col: 3 }, owner: 'p2' });
    });

    it('must persist the Burning status through exactly ONE full turn after application', () => {
      engine.movePiece({ row: 1, col: 1 }, { row: 1, col: 3 }); // Applies Burning
      
      // Simulate ending Turn 1
      engine.endTurn(); 
      
      const targetPiece = engine.getPieceAt({ row: 2, col: 3 });
      
      // Must STILL be burning. Catches off-by-one errors where it ticks down too fast.
      expect(targetPiece?.status?.type).toBe('Burning');
      expect(targetPiece?.status?.turnsLeft).toBeGreaterThan(0);
    });

    it('must REMOVE the Burning status after exactly TWO full turns have passed', () => {
      engine.movePiece({ row: 1, col: 1 }, { row: 1, col: 3 }); // Applies Burning
      
      engine.endTurn(); // End of Turn 1
      engine.endTurn(); // End of Turn 2

      const targetPiece = engine.getPieceAt({ row: 2, col: 3 });
      
      // Must be completely gone by the start of Turn 3.
      expect(targetPiece?.status).toBeUndefined();
    });

    it('must NOT allow Burning to expire prematurely at the end of Turn 1', () => {
      engine.movePiece({ row: 1, col: 1 }, { row: 1, col: 3 }); // Applies Burning

      engine.endTurn(); // End of Turn 1

      const targetPiece = engine.getPieceAt({ row: 2, col: 3 });
      
      // Fails candidates who initialize turnsLeft to 2 and decrement at the START of the turn 
      // rather than the END, causing it to vanish after only 1 turn of actual effect.
      expect(targetPiece?.status?.type).toBe('Burning');
    });
  });

});
