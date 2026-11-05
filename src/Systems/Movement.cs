using VeiledDominion.Board;
using VeiledDominion.Pieces;

namespace VeiledDominion.Systems;

public static class Movement
{
    public static string Validate(BoardState board, Piece piece, BoardCoordinate target, bool dash = false)
    {
        if (board.GetPieceAt(piece.Position) != piece) return "Piece is not on this board.";
        if (!BoardGeometry.IsValidTile(target) || target == piece.Position) return "Invalid destination.";
        int dx = target.X - piece.Position.X, dy = target.Y - piece.Position.Y;
        int ax = Math.Abs(dx), ay = Math.Abs(dy);
        var occupant = board.GetPieceAt(target);
        var forward = Orientation.Forward(piece.Seat);
        bool slide = false;
        bool pattern = piece.Type switch
        {
            PieceType.King or PieceType.Death => Math.Max(ax, ay) == 1,
            PieceType.Knight => ax * ay == 2,
            PieceType.Rook => dx == 0 || dy == 0,
            PieceType.Bishop => ax == ay,
            PieceType.Queen or PieceType.Rebirth => dx == 0 || dy == 0 || ax == ay,
            PieceType.Pawn => PawnPattern(),
            _ => false
        };
        slide = piece.Type is PieceType.Rook or PieceType.Bishop or PieceType.Queen or PieceType.Rebirth;
        if (piece.IsVeiled)
        {
            pattern = dx == forward.X && dy == forward.Y && occupant == null;
            slide = false;
        }
        if (!pattern) return "Movement pattern or Veiled restriction.";
        if (dash && (piece.Type != PieceType.Rebirth || piece.IsVeiled)) return "Only unveiled Rebirth may Dash.";
        if (occupant != null && (occupant.Owner == piece.Owner || occupant.Type == PieceType.Death || dash))
            return "Occupied landing square is not capturable.";
        if (occupant?.Type == PieceType.King) return "Leaders are checkmated, not captured.";
        if (piece.Type == PieceType.Death && occupant != null)
            return "DecisionRequired: Death capture (historical no-capture clause).";
        var path = slide || piece.Type == PieceType.Pawn && Math.Max(ax, ay) == 2
            ? BoardGeometry.Line(piece.Position, target)
            : new[] { piece.Position, target };
        if (path.Count == 0) return "Path leaves the board or is not a straight ray.";
        if (path.Any(BoardGeometry.IsNeutralCenter)) return "Central 2x2 is Void and blocks traversal.";
        foreach (var c in path.Skip(1).SkipLast(1))
        {
            var blocker = board.GetPieceAt(c);
            if (blocker != null && !dash && !(blocker.Type == PieceType.Death && blocker.Owner == piece.Owner))
                return "Intermediate square is blocked.";
        }
        if (piece.Type == PieceType.Pawn && (target.X == 0 || target.Y == 0 || target.X == 13 || target.Y == 13))
            return "DecisionRequired: promotion geometry and choice.";
        return null;

        bool PawnPattern()
        {
            int along = dx * forward.X + dy * forward.Y;
            int across = Math.Abs(dx * forward.Y - dy * forward.X);
            if (occupant != null) return along == 1 && across == 1;
            return across == 0 && (along == 1 || along == 2 && !piece.HasMoved && IsPawnHome(piece));
        }
    }

    private static bool IsPawnHome(Piece piece) => piece.Seat switch
    {
        Seat.North => piece.Position.Y == 1,
        Seat.East => piece.Position.X == 12,
        Seat.South => piece.Position.Y == 12,
        Seat.West => piece.Position.X == 1,
        _ => false
    };

    public static bool Attacks(BoardState board, Piece attacker, BoardCoordinate target)
    {
        if (attacker.IsVeiled || attacker.Type == PieceType.Death || attacker.Position == target) return false;
        int dx = target.X - attacker.Position.X, dy = target.Y - attacker.Position.Y;
        int ax = Math.Abs(dx), ay = Math.Abs(dy);
        var forward = Orientation.Forward(attacker.Seat);
        bool pattern = attacker.Type switch
        {
            PieceType.Pawn => dx * forward.X + dy * forward.Y == 1 && Math.Abs(dx * forward.Y - dy * forward.X) == 1,
            PieceType.Knight => ax * ay == 2,
            PieceType.King => Math.Max(ax, ay) == 1,
            PieceType.Rook => dx == 0 || dy == 0,
            PieceType.Bishop => ax == ay,
            PieceType.Queen or PieceType.Rebirth => dx == 0 || dy == 0 || ax == ay,
            _ => false
        };
        if (!pattern || !BoardGeometry.IsValidTile(target)) return false;
        if (attacker.Type is PieceType.Pawn or PieceType.Knight or PieceType.King) return true;
        var path = BoardGeometry.Line(attacker.Position, target);
        return path.Count > 0 && path.Skip(1).SkipLast(1).All(c =>
        {
            var blocker = board.GetPieceAt(c);
            return blocker == null || blocker.Type == PieceType.Death && blocker.Owner == attacker.Owner;
        });
    }

    public static bool HasUnresolvedAttack(BoardState board, Piece target)
    {
        return board.AllPieces.Where(p => p.Owner != target.Owner).Any(p =>
        {
            if (p.Type == PieceType.Death)
                return Math.Max(Math.Abs(p.Position.X - target.Position.X), Math.Abs(p.Position.Y - target.Position.Y)) == 1;
            if (p.Type is not (PieceType.Rook or PieceType.Bishop or PieceType.Queen or PieceType.Rebirth)) return false;
            return Attacks(board, p, target.Position) && BoardGeometry.Line(p.Position, target.Position).Any(BoardGeometry.IsNeutralCenter);
        });
    }

    public static bool InCheck(BoardState board, Faction owner)
    {
        var leader = board.AllPieces.SingleOrDefault(p => p.Owner == owner && p.Type == PieceType.King);
        return leader != null && board.AllPieces.Any(p => p.Owner != owner && Attacks(board, p, leader.Position));
    }
}
