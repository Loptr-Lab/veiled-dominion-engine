namespace VeiledDominion.Board;

public enum Seat { North, East, South, West }

public static class Orientation
{
    public static BoardCoordinate Forward(Seat seat) => seat switch
    {
        Seat.North => new(0, 1),
        Seat.East => new(-1, 0),
        Seat.South => new(0, -1),
        Seat.West => new(1, 0),
        _ => throw new ArgumentOutOfRangeException(nameof(seat))
    };

    public static BoardCoordinate FromNorth(BoardCoordinate coordinate, Seat seat) => seat switch
    {
        Seat.North => coordinate,
        Seat.East => new(13 - coordinate.Y, coordinate.X),
        Seat.South => new(13 - coordinate.X, 13 - coordinate.Y),
        Seat.West => new(coordinate.Y, 13 - coordinate.X),
        _ => throw new ArgumentOutOfRangeException(nameof(seat))
    };
}
