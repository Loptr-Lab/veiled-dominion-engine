using System.Collections.Generic;
using System.Linq;
using VeiledDominion.Board;
using VeiledDominion.Pieces;

namespace VeiledDominion.Systems
{
    public sealed class RadiusOfRuinSystem
    {
        public static bool IsInSanctuary(BoardState board, Piece piece)
        {
            var death = board.AllPieces.SingleOrDefault(p => p.Type == PieceType.Death);
            return death != null && piece.Owner == death.Owner && piece.Owner == Faction.Rebirth &&
                Math.Max(Math.Abs(piece.Position.X - death.Position.X), Math.Abs(piece.Position.Y - death.Position.Y)) <= 1;
        }

        public static IReadOnlyList<string> EligibleTargets(BoardState board)
        {
            var rebirth = board.AllPieces.SingleOrDefault(p => p.Type == PieceType.Rebirth);
            if (rebirth == null) return Array.Empty<string>();
            var radius = new HashSet<BoardCoordinate>(BoardGeometry.GetAdjacent(rebirth.Position));
            return board.AllPieces.Where(p => !p.IsAuraImmune && !p.IsVeiled &&
                radius.Contains(p.Position) && !IsInSanctuary(board, p))
                .Select(p => p.Id).OrderBy(id => id, StringComparer.Ordinal).ToArray();
        }

        internal static void Apply(BoardState board, IEnumerable<string> ids)
        {
            var targets = ids.ToHashSet(StringComparer.Ordinal);
            foreach (var piece in board.AllPieces.Where(p => targets.Contains(p.Id))) piece.IsVeiled = true;
        }

        internal static void OnOwnerTurnStart(BoardState board, Faction owner)
        {
            foreach (var piece in board.AllPieces.Where(p => p.Owner == owner)) piece.IsVeiled = false;
        }
    }
}
