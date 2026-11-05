using VeiledDominion.Board;
using VeiledDominion.Systems;

namespace VeiledDominion.Pieces;

public sealed class ChessPiece : Piece
{
    public ChessPiece(string id, PieceType type, Faction owner, Seat seat, BoardCoordinate position)
        : base(id, type, owner, seat, position) { }

    internal override Piece Copy() => new ChessPiece(Id, Type, Owner, Seat, Position)
        { IsVeiled = IsVeiled, HasMoved = HasMoved };

    public override IEnumerable<BoardCoordinate> GetLegalMoves(BoardState board)
    {
        for (int x = 0; x < BoardGeometry.BoardSize; x++)
            for (int y = 0; y < BoardGeometry.BoardSize; y++)
            {
                var target = new BoardCoordinate(x, y);
                if (Movement.Validate(board, this, target) == null) yield return target;
            }
    }
}
