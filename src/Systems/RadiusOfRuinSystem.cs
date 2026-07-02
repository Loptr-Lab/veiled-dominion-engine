using System.Collections.Generic;
using System.Linq;
using VeiledDominion.Board;
using VeiledDominion.Pieces;

namespace VeiledDominion.Systems
{
    /// <summary>
    /// Implements Rebirth's passive aura: any non-immune piece adjacent to
    /// Rebirth (the 8 surrounding tiles) becomes Veiled — dulled to
    /// Pawn-like movement until it leaves the radius.
    ///
    /// This is a pure state-transition system: call Recalculate() once per
    /// turn resolution phase, after any movement has been applied to the
    /// board. It does not mutate the board itself beyond the IsVeiled flag
    /// on affected pieces, so it's safe to call speculatively (e.g. for AI
    /// lookahead) without side effects on position.
    ///
    /// Also tracks Rebirth's self-Veil count for the loss condition
    /// (5 self-Veils = Rebirth loses systemic control). "Self-Veil" means
    /// Rebirth's own move caused one of her own Mortal-Faction-aligned
    /// units — if she ever gains one via mechanics like Knight the Pawns —
    /// to enter the radius. Adjust the ownership check below once that
    /// mechanic (build step 6) is implemented; currently this counts any
    /// Rebirth-faction-owned piece other than Rebirth/Death herself.
    /// </summary>
    public class RadiusOfRuinSystem
    {
        private readonly BoardState _board;

        public int SelfVeilCount { get; private set; }

        public RadiusOfRuinSystem(BoardState board)
        {
            _board = board;
        }

        /// <summary>
        /// Recomputes Veiled State for every piece on the board relative to
        /// Rebirth's current position. Should be called once per resolution
        /// phase, not per individual move, so a single turn's chain of
        /// events only produces one aura update.
        /// </summary>
        public void Recalculate()
        {
            var rebirth = _board.AllPieces.FirstOrDefault(p => p.Type == PieceType.Rebirth);
            if (rebirth == null)
                return; // Rebirth off the board (shouldn't happen mid-game) — no aura to apply

            var radiusTiles = new HashSet<BoardCoordinate>(BoardGeometry.GetAdjacent(rebirth.Position));

            foreach (var piece in _board.AllPieces)
            {
                if (piece == rebirth)
                    continue;

                bool inRadius = radiusTiles.Contains(piece.Position);
                bool shouldBeVeiled = inRadius && !piece.IsAuraImmune;

                if (shouldBeVeiled && !piece.IsVeiled && piece.Owner == rebirth.Owner)
                {
                    // Newly Veiled and it's one of Rebirth's own — counts toward
                    // the 5-self-Veil loss condition.
                    SelfVeilCount++;
                }

                piece.IsVeiled = shouldBeVeiled;
            }
        }

        /// <summary>
        /// True once Rebirth has lost systemic control per the design doc's
        /// loss condition. The turn loop should check this after every
        /// Recalculate() call.
        /// </summary>
        public bool HasRebirthLostControl => SelfVeilCount >= 5;
    }
}
