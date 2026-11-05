using VeiledDominion.Board;
using VeiledDominion.Pieces;

namespace VeiledDominion.Match;

public static class Setup
{
    public static IReadOnlyList<Piece> Standard(Seat rebirthSeat = Seat.North, bool deathOnFirstRook = true)
    {
        var result = new List<Piece>();
        var back = new[] { PieceType.Rook, PieceType.Knight, PieceType.Bishop, PieceType.Queen,
            PieceType.King, PieceType.Bishop, PieceType.Knight, PieceType.Rook };
        int mortal = 1;
        foreach (Seat seat in Enum.GetValues<Seat>())
        {
            var faction = seat == rebirthSeat ? Faction.Rebirth : (Faction)mortal++;
            for (int file = 0; file < 8; file++)
            {
                var type = back[file];
                if (faction == Faction.Rebirth && file == 3) type = PieceType.Rebirth;
                if (faction == Faction.Rebirth && file == (deathOnFirstRook ? 0 : 7)) type = PieceType.Death;
                result.Add(new ChessPiece($"{faction}-back-{file}", type, faction, seat,
                    Orientation.FromNorth(new BoardCoordinate(3 + file, 0), seat)));
                result.Add(new ChessPiece($"{faction}-pawn-{file}", PieceType.Pawn, faction, seat,
                    Orientation.FromNorth(new BoardCoordinate(3 + file, 1), seat)));
            }
        }
        return result;
    }
}
