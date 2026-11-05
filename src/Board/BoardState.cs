using System.Collections.Generic;
using VeiledDominion.Pieces;

namespace VeiledDominion.Board
{
    /// <summary>
    /// Holds the live position of every piece on the board for a single
    /// game state. Deliberately minimal — this is the scaffold the turn
    /// loop, movement validation, and RadiusOfRuinSystem all read from.
    /// Expand with capture history / move log once the turn loop (build
    /// step 5) is underway.
    /// </summary>
    public class BoardState
    {
        private readonly Dictionary<BoardCoordinate, Piece> _occupied = new();

        public IReadOnlyCollection<Piece> AllPieces => (IReadOnlyCollection<Piece>)_occupied.Values;

        public Piece GetPieceAt(BoardCoordinate coord)
            => _occupied.TryGetValue(coord, out var piece) ? piece : null;

        public bool IsOccupied(BoardCoordinate coord) => _occupied.ContainsKey(coord);

        internal void PlacePiece(Piece piece)
        {
            if (!BoardGeometry.IsValidTile(piece.Position) || IsOccupied(piece.Position) || AllPieces.Any(p => p.Id == piece.Id))
                throw new ArgumentException("Invalid placement or duplicate piece.");
            _occupied.Add(piece.Position, piece);
        }

        internal void MovePiece(Piece piece, BoardCoordinate destination)
        {
            if (GetPieceAt(piece.Position) != piece || !BoardGeometry.IsValidTile(destination) || IsOccupied(destination))
                throw new InvalidOperationException("Movement must be validated and capture resolved first.");
            _occupied.Remove(piece.Position);
            piece.Position = destination;
            piece.HasMoved = true;
            _occupied.Add(destination, piece);
        }

        internal void RemovePiece(BoardCoordinate coord) => _occupied.Remove(coord);

        internal BoardState Copy()
        {
            var copy = new BoardState();
            foreach (var piece in AllPieces) copy.PlacePiece(piece.Copy());
            return copy;
        }
    }
}
