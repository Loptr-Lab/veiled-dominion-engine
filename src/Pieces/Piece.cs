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
        public string Id { get; }
        public Seat Seat { get; }
        public bool HasMoved { get; internal set; }
        public PieceType Type { get; }
        public Faction Owner { get; }
        public BoardCoordinate Position { get; internal set; }

        /// <summary>
        /// True if this piece has been dulled by Rebirth's RadiusOfRuin.
        /// Veiling persists until the start of the affected owner's next turn,
        /// independently of proximity. It allows one forward step and no capture.
        /// </summary>
        public bool IsVeiled { get; internal set; }

        /// <summary>
        /// Death is immune to the aura entirely; everything else can be Veiled.
        /// Rebirth herself cannot be Veiled by her own aura.
        /// </summary>
        public virtual bool IsAuraImmune => Type == PieceType.Death || Type == PieceType.Rebirth;

        protected Piece(string id, PieceType type, Faction owner, Seat seat, BoardCoordinate startPosition)
        {
            if (string.IsNullOrWhiteSpace(id)) throw new ArgumentException("Piece identity is required.", nameof(id));
            Id = id;
            Type = type;
            Owner = owner;
            Seat = seat;
            Position = startPosition;
        }

        internal abstract Piece Copy();

        /// <summary>
        /// Returns movement-pipeline candidates, including Veiled restrictions.
        /// Match validation additionally enforces turn ownership, Leader safety,
        /// resources and review boundaries. Consumers must submit intents to the match.
        /// </summary>
        public abstract System.Collections.Generic.IEnumerable<BoardCoordinate> GetLegalMoves(BoardState board);
    }
}
