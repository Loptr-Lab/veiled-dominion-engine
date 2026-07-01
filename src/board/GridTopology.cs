using System;
using System.Collections.Generic;
using System.Linq;

namespace VeiledDominion.Board
{
    /// <summary>
    /// Represents a coordinate on the 14×14 cross-shaped 4-player grid.
    /// 
    /// The board topology is:
    /// ```
    ///        North (Player 1)
    ///           [0-13]
    ///            ↓
    ///      [0-4] [ cross ] [9-13]
    ///      West              East
    ///      (P3)             (P2)
    ///      [9-13][ cross ][0-4]
    ///             ↓
    ///        South (Player 4)
    ///           [0-13]
    /// ```
    /// 
    /// The cross center is a 2×2 neutral zone at (6,6), (6,7), (7,6), (7,7).
    /// </summary>
    public struct GridCoordinate : IEquatable<GridCoordinate>
    {
        public int X { get; }
        public int Y { get; }

        public GridCoordinate(int x, int y)
        {
            X = x;
            Y = y;
        }

        public override bool Equals(object obj) => obj is GridCoordinate coord && Equals(coord);
        public bool Equals(GridCoordinate other) => X == other.X && Y == other.Y;
        public override int GetHashCode() => HashCode.Combine(X, Y);
        public override string ToString() => $"({X}, {Y})";

        public static bool operator ==(GridCoordinate left, GridCoordinate right) => left.Equals(right);
        public static bool operator !=(GridCoordinate left, GridCoordinate right) => !left.Equals(right);
    }

    /// <summary>
    /// GridTopology manages the 14×14 cross-shaped board geometry and coordinate validation.
    /// 
    /// Responsibilities:
    /// - Validate coordinates as legal board positions
    /// - Calculate 8-directional neighbors (adjacency queries)
    /// - Calculate distances (for AoE calculations)
    /// - Identify player starting zones and neutral sanctuary
    /// </summary>
    public class GridTopology
    {
        public const int GRID_SIZE = 14;
        private const int CROSS_CENTER_START = 6;
        private const int CROSS_CENTER_END = 7;
        private const int NEUTRAL_ZONE_SIZE = 2;

        /// <summary>
        /// All 8 cardinal and diagonal directions.
        /// Used for calculating movement vectors and AoE queries.
        /// </summary>
        public static readonly (int dx, int dy)[] EIGHT_DIRECTIONS =
        {
            (0, -1),   // North
            (1, -1),   // Northeast
            (1, 0),    // East
            (1, 1),    // Southeast
            (0, 1),    // South
            (-1, 1),   // Southwest
            (-1, 0),   // West
            (-1, -1)   // Northwest
        };

        /// <summary>
        /// Determines if a coordinate is a valid position on the cross-shaped grid.
        /// </summary>
        public static bool IsValidCoordinate(GridCoordinate coord)
        {
            int x = coord.X;
            int y = coord.Y;

            // Check bounds first
            if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE)
                return false;

            // The cross shape is valid in these zones:
            // 1. Center vertical strip (columns 6-7, all rows)
            // 2. Center horizontal strip (all columns, rows 6-7)
            // 3. North arm (rows 0-5, columns 6-7)
            // 4. South arm (rows 8-13, columns 6-7)
            // 5. West arm (rows 6-7, columns 0-5)
            // 6. East arm (rows 6-7, columns 8-13)

            bool isInVerticalCross = x >= 6 && x <= 7;
            bool isInHorizontalCross = y >= 6 && y <= 7;

            return isInVerticalCross || isInHorizontalCross;
        }

        /// <summary>
        /// Determines if a coordinate is in the neutral 2×2 center zone.
        /// This zone cannot be occupied by pieces (it's a sanctuary/void).
        /// </summary>
        public static bool IsNeutralZone(GridCoordinate coord)
        {
            return coord.X >= CROSS_CENTER_START && coord.X <= CROSS_CENTER_END &&
                   coord.Y >= CROSS_CENTER_START && coord.Y <= CROSS_CENTER_END;
        }

        /// <summary>
        /// Returns all 8 adjacent coordinates to a given position.
        /// Filters out invalid (non-cross) coordinates.
        /// </summary>
        public static List<GridCoordinate> GetAdjacentSquares(GridCoordinate coord)
        {
            var adjacent = new List<GridCoordinate>();

            foreach (var (dx, dy) in EIGHT_DIRECTIONS)
            {
                var neighbor = new GridCoordinate(coord.X + dx, coord.Y + dy);
                if (IsValidCoordinate(neighbor))
                {
                    adjacent.Add(neighbor);
                }
            }

            return adjacent;
        }

        /// <summary>
        /// Calculates Manhattan distance between two coordinates.
        /// Used for spatial queries and AoE range checks.
        /// </summary>
        public static int ManhattanDistance(GridCoordinate from, GridCoordinate to)
        {
            return Math.Abs(from.X - to.X) + Math.Abs(from.Y - to.Y);
        }

        /// <summary>
        /// Calculates Chebyshev distance (max of absolute differences).
        /// Better for "square" AoE ranges (like the Radius of Ruin's 1-square aura).
        /// </summary>
        public static int ChebyshevDistance(GridCoordinate from, GridCoordinate to)
        {
            return Math.Max(Math.Abs(from.X - to.X), Math.Abs(from.Y - to.Y));
        }

        /// <summary>
        /// Identifies which player's starting zone a coordinate belongs to.
        /// Returns: 1 (North), 2 (East), 3 (West), 4 (South), or 0 (neutral/cross center).
        /// </summary>
        public static int GetPlayerZone(GridCoordinate coord)
        {
            if (IsNeutralZone(coord))
                return 0; // Neutral zone

            // North zone (rows 0-5, columns 6-7)
            if (coord.Y < 6 && coord.X >= 6 && coord.X <= 7)
                return 1;

            // South zone (rows 8-13, columns 6-7)
            if (coord.Y > 7 && coord.X >= 6 && coord.X <= 7)
                return 4;

            // West zone (rows 6-7, columns 0-5)
            if (coord.X < 6 && coord.Y >= 6 && coord.Y <= 7)
                return 3;

            // East zone (rows 8-13, columns 8-13)
            if (coord.X > 7 && coord.Y >= 6 && coord.Y <= 7)
                return 2;

            return 0; // Should not reach here for valid cross coordinates
        }

        /// <summary>
        /// Calculates all coordinates within a specified Chebyshev distance radius.
        /// Used for AoE calculations (e.g., Radius of Ruin = 1-square radius).
        /// </summary>
        public static List<GridCoordinate> GetCoordinatesInRadius(GridCoordinate center, int radius)
        {
            var result = new List<GridCoordinate>();

            for (int x = center.X - radius; x <= center.X + radius; x++)
            {
                for (int y = center.Y - radius; y <= center.Y + radius; y++)
                {
                    var coord = new GridCoordinate(x, y);
                    if (IsValidCoordinate(coord) && ChebyshevDistance(center, coord) <= radius)
                    {
                        result.Add(coord);
                    }
                }
            }

            return result;
        }

        /// <summary>
        /// Determines if two coordinates are adjacent (including diagonally).
        /// </summary>
        public static bool AreAdjacent(GridCoordinate coord1, GridCoordinate coord2)
        {
            return ChebyshevDistance(coord1, coord2) == 1;
        }

        /// <summary>
        /// Calculates a directional vector from one coordinate to another.
        /// Returns unit direction (limited to 8 cardinal/diagonal directions).
        /// Returns (0, 0) if coordinates are identical.
        /// </summary>
        public static (int dx, int dy) GetDirectionVector(GridCoordinate from, GridCoordinate to)
        {
            int dx = to.X - from.X;
            int dy = to.Y - from.Y;

            // Normalize to unit direction
            if (dx != 0) dx = dx / Math.Abs(dx);
            if (dy != 0) dy = dy / Math.Abs(dy);

            return (dx, dy);
        }

        /// <summary>
        /// Returns all coordinates along a straight line from 'from' to 'to' (inclusive).
        /// Used for line-of-sight checks and sliding movement validation.
        /// </summary>
        public static List<GridCoordinate> GetLineOfSight(GridCoordinate from, GridCoordinate to)
        {
            var result = new List<GridCoordinate>();
            var (dx, dy) = GetDirectionVector(from, to);

            var current = from;
            while (current != to)
            {
                result.Add(current);
                current = new GridCoordinate(current.X + dx, current.Y + dy);
            }
            result.Add(to);

            return result;
        }

        /// <summary>
        /// Validates that a path from 'from' to 'to' is clear (no blocking pieces).
        /// </summary>
        public static bool IsPathClear(GridCoordinate from, GridCoordinate to, Func<GridCoordinate, bool> isBlocked)
        {
            var path = GetLineOfSight(from, to);
            // Check all intermediate squares (exclude start and end)
            for (int i = 1; i < path.Count - 1; i++)
            {
                if (isBlocked(path[i]))
                    return false;
            }
            return true;
        }
    }
}
