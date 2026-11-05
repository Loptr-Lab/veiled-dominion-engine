using System.Text.Json;
using VeiledDominion.Board;
using VeiledDominion.Pieces;
using VeiledDominion.Systems;

namespace VeiledDominion.Match;

public enum TurnPhase { Start, Movement, Terminal }
public enum ActionKind { BeginMovement, Move, Sacrifice, SpendBoon }
public sealed record PlayerAction(Faction Player, ActionKind Kind, string PieceId = null, int X = 0, int Y = 0, bool Dash = false);
public sealed record ActionResult(bool Accepted, string Reason);
public sealed record PieceSnapshot(string Id, PieceType Type, Faction Owner, Seat Seat, int X, int Y, bool Veiled, bool HasMoved, bool Sanctuary);

// A deliberately restricted review engine: unresolved rules reject atomically rather than invent canon.
public sealed class ReviewMatch
{
    private BoardState board;
    private readonly Piece[] initial;
    private readonly Faction[] order;
    private List<Piece> graveyard = new();
    private HashSet<string> friendlyVeiled = new(StringComparer.Ordinal);
    private List<PlayerAction> actions = new();
    private List<string> events = new();
    private int activeIndex;
    public Faction ActivePlayer => order[activeIndex];
    public TurnPhase Phase { get; private set; } = TurnPhase.Start;
    public int TurnNumber { get; private set; } = 1;
    public int Boons { get; private set; }
    public int LeadershipPoints { get; private set; }
    public int FriendlyVeilingCount => friendlyVeiled.Count;
    public string Outcome { get; private set; }
    public bool DashUnlocked { get; private set; }

    public ReviewMatch(IEnumerable<Piece> pieces)
    {
        initial = pieces.Select(p => p.Copy()).ToArray();
        var owners = initial.GroupBy(p => p.Owner).ToArray();
        if (owners.Length != 4 || owners.Any(g => g.Select(p => p.Seat).Distinct().Count() != 1) ||
            owners.Select(g => g.First().Seat).Distinct().Count() != 4 ||
            owners.Any(g => g.Count(p => p.Type == PieceType.King) != 1) ||
            initial.Count(p => p.Type == PieceType.Rebirth && p.Owner == Faction.Rebirth) != 1 ||
            initial.Count(p => p.Type == PieceType.Death && p.Owner == Faction.Rebirth) != 1 ||
            initial.Any(p => (p.Type is PieceType.Rebirth or PieceType.Death) && p.Owner != Faction.Rebirth) ||
            initial.Any(p => BoardGeometry.IsNeutralCenter(p.Position)))
            throw new ArgumentException("Review setup requires four oriented armies, their Leaders, Rebirth and Death, outside the unresolved center.");
        order = owners.OrderBy(g => g.First().Seat).Select(g => g.Key).ToArray();
        board = NewBoard();
        StartOwnerTurn();
    }

    private BoardState NewBoard()
    {
        var fresh = new BoardState();
        foreach (var piece in initial) fresh.PlacePiece(piece.Copy());
        return fresh;
    }

    public string Snapshot() => JsonSerializer.Serialize(new
    {
        TurnNumber, ActivePlayer, Phase, Boons, DashUnlocked, FriendlyVeilingCount, Outcome,
        LeadershipPoints,
        Pieces = board.AllPieces.OrderBy(p => p.Id, StringComparer.Ordinal).Select(p => new PieceSnapshot(
            p.Id, p.Type, p.Owner, p.Seat, p.Position.X, p.Position.Y, p.IsVeiled, p.HasMoved,
            RadiusOfRuinSystem.IsInSanctuary(board, p))),
        Graveyard = graveyard.Select(p => new { p.Id, p.Type, p.Owner, p.Seat }),
        FriendlyVeiledIds = friendlyVeiled.OrderBy(id => id, StringComparer.Ordinal),
        Actions = actions, Events = events,
        Limitations = new[] { "Center rules", "Boon duration", "Repeat-friendly-Veil counting", "Promotion", "Death capture", "Simultaneous victory", "Checkmate/elimination", "Castling/en passant" }
    });

    public IReadOnlyList<string> InspectAuraTargets() => RadiusOfRuinSystem.EligibleTargets(board);

    public string MovementRejection(string pieceId, BoardCoordinate target, bool dash = false)
    {
        var piece = board.AllPieces.SingleOrDefault(p => p.Id == pieceId);
        if (Phase == TurnPhase.Terminal) return "Match is terminal.";
        if (Phase != TurnPhase.Movement) return "Begin Movement at the Start phase first.";
        if (piece == null || piece.Owner != ActivePlayer) return "No active player's piece with that identity.";
        if (dash && !DashUnlocked) return "Dash requires three friendly pieces in the Graveyard at turn start.";
        return Movement.Validate(board, piece, target, dash);
    }

    public ActionResult Apply(PlayerAction action)
    {
        if (action == null) return new(false, "Action is required.");
        if (Phase == TurnPhase.Terminal) return new(false, "Match is terminal.");
        if (action.Player != ActivePlayer) return new(false, "Not the active player.");
        if (action.Kind == ActionKind.SpendBoon)
        {
            if (Phase != TurnPhase.Start || action.Player != Faction.Rebirth || Boons == 0)
                return new(false, "Boon spend requires Rebirth's Start phase and a token.");
            return new(false, "DecisionRequired: one player turn versus full clockwise cycle suppression.");
        }
        if (action.Kind == ActionKind.BeginMovement)
        {
            if (Phase != TurnPhase.Start) return new(false, "Already in Movement phase.");
            Phase = TurnPhase.Movement;
            actions.Add(action);
            events.Add($"{TurnNumber}: {ActivePlayer} began Movement");
            return new(true, "Accepted");
        }
        if (Phase != TurnPhase.Movement) return new(false, "Begin Movement first.");
        var piece = board.AllPieces.SingleOrDefault(p => p.Id == action.PieceId);
        if (piece == null || piece.Owner != ActivePlayer) return new(false, "No active player's piece with that identity.");
        var candidate = board.Copy();
        var moved = candidate.AllPieces.Single(p => p.Id == piece.Id);
        Piece removed = null;
        if (action.Kind == ActionKind.Move)
        {
            var target = new BoardCoordinate(action.X, action.Y);
            var reason = MovementRejection(piece.Id, target, action.Dash);
            if (reason != null) return new(false, reason);
            removed = candidate.GetPieceAt(target);
            if (removed != null) candidate.RemovePiece(target);
            candidate.MovePiece(moved, target);
        }
        else if (action.Kind == ActionKind.Sacrifice)
        {
            if (ActivePlayer != Faction.Rebirth || piece.Type is PieceType.King or PieceType.Rebirth or PieceType.Death)
                return new(false, "Only Rebirth's non-Leader, non-unique allies may be sacrificed.");
            removed = moved;
            candidate.RemovePiece(moved.Position);
        }
        else return new(false, "Unknown action.");

        if (candidate.AllPieces.Where(p => p.Type == PieceType.King).Any(p => Movement.HasUnresolvedAttack(candidate, p)))
            return new(false, "DecisionRequired: center traversal or Death capture affects Leader safety.");
        // Check safety must run before aura can disable an attacker, as in standard chess movement.
        if (Movement.InCheck(candidate, ActivePlayer)) return new(false, "Move leaves the active Leader in check.");
        if (order.Where(owner => owner != ActivePlayer).Any(owner => Movement.InCheck(candidate, owner)))
            return new(false, "ReviewBoundary: check delivery awaits complete checkmate/elimination adjudication.");
        var targets = RadiusOfRuinSystem.EligibleTargets(candidate);
        var newFriendly = targets.Where(id => candidate.AllPieces.Single(p => p.Id == id).Owner == Faction.Rebirth).ToArray();
        if (newFriendly.Any(friendlyVeiled.Contains))
            return new(false, "DecisionRequired: count repeat applications or distinct friendly pieces for The Fall.");
        int mercy = 0;
        if (ActivePlayer == Faction.Rebirth && action.Kind == ActionKind.Move && removed == null)
        {
            if (board.AllPieces.Where(p => p.Owner == Faction.Rebirth).Any(p => Movement.HasUnresolvedAttack(board, p)) ||
                candidate.AllPieces.Where(p => p.Owner == Faction.Rebirth).Any(p => Movement.HasUnresolvedAttack(candidate, p)))
                return new(false, "DecisionRequired: center or Death attack semantics affect mercy scoring.");
            mercy = MercyPoints(board, candidate, piece, moved);
        }
        if (LeadershipPoints + mercy >= 10 && FriendlyVeilingCount + newFriendly.Length >= 5)
            return new(false, "DecisionRequired: simultaneous Leadership and The Fall victory precedence.");
        RadiusOfRuinSystem.Apply(candidate, targets);
        board = candidate;
        if (removed != null) graveyard.Add(removed.Copy());
        if (action.Kind == ActionKind.Sacrifice) Boons++;
        friendlyVeiled.UnionWith(newFriendly);
        LeadershipPoints += mercy;
        if (mercy > 0) events.Add($"{TurnNumber}: Mercy +{mercy} LP; total {LeadershipPoints}");
        actions.Add(action);
        events.Add($"{TurnNumber}: {ActivePlayer} {action.Kind} {piece.Id}" +
            (removed == null ? "" : $"; graveyard {removed.Id}"));
        foreach (var id in targets) events.Add($"{TurnNumber}: Veiled {id}; expires at owner's next Start");
        if (FriendlyVeilingCount >= 5 || LeadershipPoints >= 10)
        {
            Outcome = FriendlyVeilingCount >= 5 ? "Mortals win collectively: The Fall" : "Rebirth wins: 10 Leadership Points";
            Phase = TurnPhase.Terminal;
            events.Add(Outcome);
            return new(true, "Accepted");
        }
        activeIndex = (activeIndex + 1) % order.Length;
        TurnNumber++;
        Phase = TurnPhase.Start;
        StartOwnerTurn();
        return new(true, "Accepted");
    }

    private static int MercyPoints(BoardState before, BoardState after, Piece oldPiece, Piece moved)
    {
        var enemiesBefore = before.AllPieces.Where(p => p.Owner != Faction.Rebirth).ToArray();
        var enemiesAfter = after.AllPieces.Where(p => p.Owner != Faction.Rebirth).ToArray();
        bool withdrawal = enemiesBefore.Any(enemy => Movement.Attacks(before, enemy, oldPiece.Position) &&
            !Movement.Attacks(after, enemiesAfter.Single(p => p.Id == enemy.Id), moved.Position));
        bool coexistence = after.AllPieces.Any(p => p.Owner == Faction.Rebirth && enemiesAfter.Any(e =>
            Math.Max(Math.Abs(p.Position.X - e.Position.X), Math.Abs(p.Position.Y - e.Position.Y)) == 1));
        bool shielding = before.AllPieces.Where(p => p.Owner == Faction.Rebirth && p.Id != moved.Id && p.Type is PieceType.King or PieceType.Rebirth)
            .Any(protectedPiece => enemiesBefore.Where(e => e.Type is PieceType.Rook or PieceType.Bishop or PieceType.Queen or PieceType.Rebirth)
                .Any(enemy => Movement.Attacks(before, enemy, protectedPiece.Position) &&
                    BoardGeometry.Line(enemy.Position, protectedPiece.Position).Skip(1).SkipLast(1).Contains(moved.Position) &&
                    !Movement.Attacks(after, enemiesAfter.Single(p => p.Id == enemy.Id), protectedPiece.Position)));
        return (withdrawal ? 1 : 0) + (coexistence ? 1 : 0) + (shielding ? 1 : 0);
    }

    private void StartOwnerTurn()
    {
        RadiusOfRuinSystem.OnOwnerTurnStart(board, ActivePlayer);
        if (ActivePlayer == Faction.Rebirth) DashUnlocked = graveyard.Count(p => p.Owner == Faction.Rebirth) >= 3;
        events.Add($"{TurnNumber}: {ActivePlayer} Start; owner Veils cleared");
    }

    public void Restart()
    {
        board = NewBoard();
        graveyard.Clear(); friendlyVeiled.Clear(); actions.Clear(); events.Clear();
        activeIndex = 0; TurnNumber = 1; Boons = 0; LeadershipPoints = 0; DashUnlocked = false;
        Outcome = null; Phase = TurnPhase.Start;
        StartOwnerTurn();
    }
}
