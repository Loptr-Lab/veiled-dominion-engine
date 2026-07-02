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

        public void PlacePiece(Piece piece)
        {
            _occupied[piece.Position] = piece;
        }

        public void MovePiece(Piece piece, BoardCoordinate destination)
        {
            _occupied.Remove(piece.Position);
            piece.Position = destination;
            _occupied[destination] = piece;
        }

        public void RemovePiece(BoardCoordinate coord)
        {
            _occupied.Remove(coord);
        }
    }
}
