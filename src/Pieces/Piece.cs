using VeiledDominion.Board;

namespace VeiledDominion.Pieces
{
    public enum Faction
    {
        Rebirth,      // the sole controller of Rebirth + Death
        MortalFactionA,
        MortalFactionB,
        MortalFactionC
    }

    public enum PieceType
    {
        King,
        Queen,
        Rook,
        Bishop,
        Knight,
        Pawn,
        Rebirth,   // unique - Rebirth's own faction piece
        Death      // unique - invulnerable, aura-immune
    }

    /// <summary>
    /// Base class for every piece on the board. Movement rules live in
    /// subclasses (or a strategy object, TBD) — this holds only the state
    /// that every piece shares, including Veiled State which any Mortal
    /// Faction piece can be put into by Rebirth's aura.
    /// </summary>
    public abstract class Piece
    {
        public PieceType Type { get; }
        public Faction Owner { get; }
        public BoardCoordinate Position { get; internal set; }

        /// <summary>
        /// True if this piece has been dulled by Rebirth's RadiusOfRuin.
        /// A Veiled piece is functionally reduced to Pawn-like movement
        /// until it leaves the aura's radius. See RadiusOfRuinSystem.
        /// </summary>
        public bool IsVeiled { get; internal set; }

        /// <summary>
        /// Death is immune to the aura entirely; everything else can be Veiled.
        /// Rebirth herself cannot be Veiled by her own aura.
        /// </summary>
        public virtual bool IsAuraImmune => Type == PieceType.Death || Type == PieceType.Rebirth;

        protected Piece(PieceType type, Faction owner, BoardCoordinate startPosition)
        {
            Type = type;
            Owner = owner;
            Position = startPosition;
        }

        /// <summary>
        /// Returns the set of legal destination tiles for this piece given
        /// the current board state. Implemented per piece type. When
        /// IsVeiled is true, callers should apply the Veiled movement
        /// restriction on top of whatever this returns (see design doc —
        /// Veiled pieces move as Pawns regardless of their true type).
        /// </summary>
        public abstract System.Collections.Generic.IEnumerable<BoardCoordinate> GetLegalMoves(BoardState board);
    }
}
