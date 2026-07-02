using System;

namespace VeiledDominion.Board
{
    /// <summary>
    /// Which of the four arms of the cross-shaped board a coordinate belongs to,
    /// or the neutral center zone shared by all factions.
    /// </summary>
    public enum BoardZone
    {
        OutOfBounds,
        NorthArm,
        SouthArm,
        EastArm,
        WestArm,
        Center
    }

    /// <summary>
    /// A single tile position on the 14x14 cross-shaped board.
    /// Origin (0,0) is the top-left of the bounding square; the cross shape
    /// is carved out of that square by masking the four corner quadrants.
    /// </summary>
    public readonly struct BoardCoordinate : IEquatable<BoardCoordinate>
    {
        public readonly int X;
        public readonly int Y;

        public BoardCoordinate(int x, int y)
        {
            X = x;
            Y = y;
        }

        public bool Equals(BoardCoordinate other) => X == other.X && Y == other.Y;
        public override bool Equals(object obj) => obj is BoardCoordinate other && Equals(other);
        public override int GetHashCode() => HashCode.Combine(X, Y);
        public override string ToString() => $"({X},{Y})";

        public static BoardCoordinate operator +(BoardCoordinate a, BoardCoordinate b)
            => new BoardCoordinate(a.X + b.X, a.Y + b.Y);

        public static bool operator ==(BoardCoordinate a, BoardCoordinate b) => a.Equals(b);
        public static bool operator !=(BoardCoordinate a, BoardCoordinate b) => !a.Equals(b);
    }

    /// <summary>
    /// Defines the cross-shaped 14x14 board geometry: bounds checking, zone
    /// lookup, and the neutral center. Pure logic, no Unity/Unreal dependency
    /// so it can be unit tested headless before any rendering exists.
    ///
    /// Layout (14x14 bounding square, 4-wide arms, 2x2-ish center — adjust
    /// ARM_WIDTH / BOARD_SIZE below once the exact grid is finalized against
    /// the design doc; this is a starting scaffold, not the locked geometry).
    /// </summary>
    public static class BoardGeometry
    {
        public const int BoardSize = 14;
        public const int ArmWidth = 4;       // width of each of the 4 arms
        public const int CenterStart = (BoardSize - ArmWidth) / 2; // 5
        public const int CenterEnd = CenterStart + ArmWidth - 1;   // 8

        /// <summary>
        /// True if the coordinate is a valid, in-bounds tile on the cross
        /// (i.e. not one of the four masked-out corners of the bounding square).
        /// </summary>
        public static bool IsValidTile(BoardCoordinate c)
        {
            if (c.X < 0 || c.X >= BoardSize || c.Y < 0 || c.Y >= BoardSize)
                return false;

            bool inCenterCols = c.X >= CenterStart && c.X <= CenterEnd;
            bool inCenterRows = c.Y >= CenterStart && c.Y <= CenterEnd;

            // Valid if it's in the vertical arm (center columns, any row),
            // the horizontal arm (center rows, any column), or the center overlap.
            return inCenterCols || inCenterRows;
        }

        /// <summary>
        /// Returns which faction arm (or the center) a tile belongs to.
        /// Returns OutOfBounds for masked corner tiles.
        /// </summary>
        public static BoardZone GetZone(BoardCoordinate c)
        {
            if (!IsValidTile(c))
                return BoardZone.OutOfBounds;

            bool inCenterCols = c.X >= CenterStart && c.X <= CenterEnd;
            bool inCenterRows = c.Y >= CenterStart && c.Y <= CenterEnd;

            if (inCenterCols && inCenterRows)
                return BoardZone.Center;

            if (inCenterCols)
                return c.Y < CenterStart ? BoardZone.NorthArm : BoardZone.SouthArm;

            // inCenterRows must be true here since IsValidTile passed
            return c.X < CenterStart ? BoardZone.WestArm : BoardZone.EastArm;
        }

        /// <summary>
        /// The 8 tiles orthogonally/diagonally adjacent to a coordinate,
        /// filtered to only those that are valid board tiles.
        /// Used directly by RadiusOfRuin's adjacency query.
        /// </summary>
        public static System.Collections.Generic.IEnumerable<BoardCoordinate> GetAdjacent(BoardCoordinate c)
        {
            for (int dx = -1; dx <= 1; dx++)
            {
                for (int dy = -1; dy <= 1; dy++)
                {
                    if (dx == 0 && dy == 0) continue;
                    var candidate = new BoardCoordinate(c.X + dx, c.Y + dy);
                    if (IsValidTile(candidate))
                        yield return candidate;
                }
            }
        }
    }
}
