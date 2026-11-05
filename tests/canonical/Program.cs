using System.Text.Json;
using VeiledDominion.Board;
using VeiledDominion.Pieces;
using VeiledDominion.Systems;
using VeiledDominion.Match;

int passed = 0;
void Test(string name, Action test)
{
    try { test(); passed++; Console.WriteLine($"PASS {name}"); }
    catch (Exception error) { Console.Error.WriteLine($"FAIL {name}: {error}"); Environment.ExitCode = 1; }
}
void Assert(bool condition, string message = "Assertion failed") { if (!condition) throw new Exception(message); }
Piece P(string id, PieceType type, Faction owner, int x, int y, Seat seat = Seat.North)
    => new ChessPiece(id, type, owner, seat, new(x, y));
BoardState Board(params Piece[] pieces)
{
    var board = new BoardState();
    foreach (var piece in pieces) board.PlacePiece(piece);
    return board;
}
IEnumerable<Piece> Leaders() => new[] {
    P("rk", PieceType.King, Faction.Rebirth, 3, 0),
    P("ak", PieceType.King, Faction.MortalFactionA, 13, 10, Seat.East),
    P("bk", PieceType.King, Faction.MortalFactionB, 10, 13, Seat.South),
    P("ck", PieceType.King, Faction.MortalFactionC, 0, 10, Seat.West)
};
ReviewMatch Match(params Piece[] extras) => new(Leaders().Concat(new[] {
    P("r", PieceType.Rebirth, Faction.Rebirth, 5, 4),
    P("d", PieceType.Death, Faction.Rebirth, 10, 0)
}).Concat(extras));
void Begin(ReviewMatch match) => Assert(match.Apply(new(match.ActivePlayer, ActionKind.BeginMovement)).Accepted);
void Accepted(ReviewMatch match, PlayerAction action)
{
    var result = match.Apply(action); Assert(result.Accepted, result.Reason);
}
void RejectedUnchanged(ReviewMatch match, PlayerAction action, string reason)
{
    string before = match.Snapshot(); var result = match.Apply(action);
    Assert(!result.Accepted && result.Reason.Contains(reason), result.Reason);
    Assert(before == match.Snapshot(), "Rejection mutated state");
}

Test("all 196 squares and bounded exterior match standard 160-tile cross", () => {
    int count = 0;
    for (int x = -1; x <= 14; x++) for (int y = -1; y <= 14; y++) {
        bool expected = x >= 0 && x < 14 && y >= 0 && y < 14 && !((x < 3 || x > 10) && (y < 3 || y > 10));
        Assert(BoardGeometry.IsValidTile(new(x, y)) == expected, $"{x},{y}");
        if (expected) count++;
    }
    Assert(count == 160);
});
Test("all rotations preserve playable and nonplayable squares", () => {
    foreach (Seat seat in Enum.GetValues<Seat>()) for (int x = 0; x < 14; x++) for (int y = 0; y < 14; y++)
        Assert(BoardGeometry.IsValidTile(new(x,y)) == BoardGeometry.IsValidTile(Orientation.FromNorth(new(x,y), seat)));
});
Test("every Rebirth orientation and Death rook choice has 64 unique correctly composed placements", () => {
    foreach (Seat seat in Enum.GetValues<Seat>()) foreach (bool left in new[] { true, false }) {
        var pieces = Setup.Standard(seat, left);
        Assert(pieces.Count == 64 && pieces.Select(p => p.Position).Distinct().Count() == 64);
        Assert(pieces.All(p => BoardGeometry.IsValidTile(p.Position)));
        Assert(pieces.Count(p => p.Type == PieceType.Pawn) == 32);
        Assert(pieces.Count(p => p.Type == PieceType.King) == 4);
        Assert(pieces.Count(p => p.Type == PieceType.Queen) == 3);
        Assert(pieces.Single(p => p.Type == PieceType.Rebirth).Position == Orientation.FromNorth(new(6, 0), seat));
        Assert(pieces.Single(p => p.Type == PieceType.Death).Position == Orientation.FromNorth(new(left ? 3 : 10, 0), seat));
        _ = new ReviewMatch(pieces);
    }
});
Test("line traversal rejects non-rays, out-of-bounds and missing corner paths", () => {
    Assert(BoardGeometry.Line(new(3,3), new(5,6)).Count == 0);
    Assert(BoardGeometry.Line(new(-1,3), new(5,3)).Count == 0);
    Assert(BoardGeometry.Line(new(3,0), new(0,3)).Count == 0);
    Assert(BoardGeometry.Line(new(3,3), new(3,3)).Count == 1);
    Assert(BoardGeometry.Line(new(3,3), new(10,10)).Count == 8);
});
Test("invalid origins have no adjacency", () => Assert(!BoardGeometry.GetAdjacent(new(-1,5)).Any()));
Test("duplicate identity and occupied placement reject without overwrite", () => {
    var board = Board(P("a",PieceType.Rook,Faction.Rebirth,3,3));
    try { board.PlacePiece(P("b",PieceType.Rook,Faction.Rebirth,3,3)); throw new Exception("Accepted collision"); }
    catch (ArgumentException) { Assert(board.AllPieces.Count == 1); }
});
foreach (Seat seat in Enum.GetValues<Seat>()) {
    Test($"{seat}: forward, double step and blocked pawn", () => {
        var start = Orientation.FromNorth(new(5,1), seat);
        var pawn = new ChessPiece("p", PieceType.Pawn, Faction.Rebirth, seat, start);
        var board = Board(pawn); var one = Orientation.FromNorth(new(5,2),seat); var two = Orientation.FromNorth(new(5,3),seat);
        Assert(Movement.Validate(board,pawn,one) == null);
        Assert(Movement.Validate(board,pawn,two) == null);
        board.PlacePiece(new ChessPiece("block",PieceType.Pawn,Faction.Rebirth,seat,one));
        Assert(Movement.Validate(board,pawn,two) != null);
    });
    Test($"{seat}: Veiled knight loses jump, moves only one forward and cannot capture", () => {
        var position = Orientation.FromNorth(new(4,4),seat);
        var piece = new ChessPiece("v",PieceType.Knight,Faction.Rebirth,seat,position) { IsVeiled = true };
        var board = Board(piece); var target = position + Orientation.Forward(seat);
        Assert(Movement.Validate(board,piece,target) == null);
        Assert(Movement.Validate(board,piece,Orientation.FromNorth(new(5,6),seat)) != null);
        board.PlacePiece(new ChessPiece("enemy",PieceType.Pawn,Faction.MortalFactionA,seat,target));
        Assert(Movement.Validate(board,piece,target) != null);
    });
}
Test("sliders cannot jump friendly or enemy blockers", () => {
    foreach (var owner in new[] {Faction.Rebirth,Faction.MortalFactionA}) {
        var rook = P("rook",PieceType.Rook,Faction.Rebirth,3,4);
        var board = Board(rook,P("block",PieceType.Pawn,owner,4,4));
        Assert(Movement.Validate(board,rook,new(5,4)) != null);
        Assert((Movement.Validate(board,rook,new(4,4)) == null) == (owner != Faction.Rebirth));
    }
});
Test("Death is friendly pass-through but never a landing square", () => {
    var rook = P("rook",PieceType.Rook,Faction.Rebirth,3,4);
    var board = Board(rook,P("death",PieceType.Death,Faction.Rebirth,4,4));
    Assert(Movement.Validate(board,rook,new(5,4)) == null);
    Assert(Movement.Validate(board,rook,new(4,4)) != null);
    var enemy = P("enemy",PieceType.Rook,Faction.MortalFactionA,6,4); board.PlacePiece(enemy);
    Assert(Movement.Validate(board,enemy,new(4,4)) != null);
    Assert(Movement.Validate(board,enemy,new(3,4)) != null);
});
Test("Death moves one square into attacked squares; capture decision remains explicit", () => {
    var death = P("d",PieceType.Death,Faction.Rebirth,4,4);
    var board = Board(death,P("enemy",PieceType.Rook,Faction.MortalFactionA,5,8));
    Assert(Movement.Validate(board,death,new(5,4)) == null);
    Assert(Movement.Validate(board,death,new(6,4)) != null);
    board.PlacePiece(P("victim",PieceType.Pawn,Faction.MortalFactionA,5,4));
    Assert(Movement.Validate(board,death,new(5,4)).Contains("DecisionRequired"));
});
Test("center is geometrically present but rule-dependent moves explicitly reject", () => {
    var rook = P("rook",PieceType.Rook,Faction.Rebirth,5,6); var board = Board(rook);
    Assert(BoardGeometry.IsValidTile(new(6,6)));
    Assert(Movement.Validate(board,rook,new(8,6)).Contains("DecisionRequired"));
});
Test("Sanctuary protects only Rebirth allies; unique pieces are immune", () => {
    var ally = P("ally",PieceType.Pawn,Faction.Rebirth,4,4);
    var enemy = P("enemy",PieceType.Pawn,Faction.MortalFactionA,4,5);
    var board = Board(P("r",PieceType.Rebirth,Faction.Rebirth,5,5), P("d",PieceType.Death,Faction.Rebirth,3,4),ally,enemy);
    Assert(RadiusOfRuinSystem.IsInSanctuary(board,ally));
    Assert(!RadiusOfRuinSystem.IsInSanctuary(board,enemy));
    Assert(RadiusOfRuinSystem.EligibleTargets(board).SequenceEqual(new[]{"enemy"}));
});
Test("aura inspection is pure; reapplication idempotent; only owner Start expires Veil", () => {
    var enemy = P("enemy",PieceType.Pawn,Faction.MortalFactionA,4,5);
    var board = Board(P("r",PieceType.Rebirth,Faction.Rebirth,5,5),enemy);
    var targets = RadiusOfRuinSystem.EligibleTargets(board);
    Assert(!enemy.IsVeiled);
    RadiusOfRuinSystem.Apply(board,targets);
    Assert(enemy.IsVeiled && RadiusOfRuinSystem.EligibleTargets(board).Count == 0);
    board.MovePiece(board.AllPieces.Single(p=>p.Id=="r"),new(9,9));
    RadiusOfRuinSystem.Apply(board,RadiusOfRuinSystem.EligibleTargets(board));
    RadiusOfRuinSystem.OnOwnerTurnStart(board,Faction.MortalFactionB);
    Assert(enemy.IsVeiled);
    RadiusOfRuinSystem.OnOwnerTurnStart(board,Faction.MortalFactionA);
    Assert(!enemy.IsVeiled);
});
Test("Dash passes occupied paths, never occupied landing, only for Rebirth", () => {
    var rebirth = P("r",PieceType.Rebirth,Faction.Rebirth,3,4);
    var board = Board(rebirth,P("block",PieceType.Pawn,Faction.MortalFactionA,4,4));
    Assert(Movement.Validate(board,rebirth,new(5,4)) != null);
    Assert(Movement.Validate(board,rebirth,new(5,4),true) == null);
    Assert(Movement.Validate(board,rebirth,new(4,4),true) != null);
    Assert(!board.AllPieces.Single(p=>p.Id=="block").IsVeiled);
});
Test("standard setup accepts clockwise opening moves in all four orientations", () => {
    var match = new ReviewMatch(Setup.Standard());
    foreach (var owner in new[]{Faction.Rebirth,Faction.MortalFactionA,Faction.MortalFactionB,Faction.MortalFactionC}) {
        Assert(match.ActivePlayer == owner); Begin(match);
        Seat seat = (Seat)(int)owner; var target = Orientation.FromNorth(new(5,2),seat);
        Accepted(match,new(owner,ActionKind.Move,$"{owner}-pawn-2",target.X,target.Y));
    }
    Assert(match.ActivePlayer == Faction.Rebirth && match.TurnNumber == 5);
});
Test("wrong owner, blocked movement and invalid phase leave exact snapshot unchanged", () => {
    var match = new ReviewMatch(Setup.Standard());
    RejectedUnchanged(match,new(Faction.MortalFactionA,ActionKind.BeginMovement),"active");
    RejectedUnchanged(match,new(Faction.Rebirth,ActionKind.Move,"Rebirth-pawn-0",3,2),"Begin");
    Begin(match);
    RejectedUnchanged(match,new(Faction.Rebirth,ActionKind.Move,"Rebirth-back-7",10,3),"blocked");
});
Test("sacrifice excludes Death/Rebirth/Leader; accepted sacrifice grants Boon and graveyard", () => {
    var match = new ReviewMatch(Setup.Standard()); Begin(match);
    foreach(var id in new[]{"Rebirth-back-0","Rebirth-back-3","Rebirth-back-4"})
        RejectedUnchanged(match,new(Faction.Rebirth,ActionKind.Sacrifice,id),"Only");
    Accepted(match,new(Faction.Rebirth,ActionKind.Sacrifice,"Rebirth-pawn-0"));
    Assert(match.Boons == 1);
    using var snapshot = JsonDocument.Parse(match.Snapshot());
    Assert(snapshot.RootElement.GetProperty("Graveyard").GetArrayLength() == 1);
});
Test("capture moves removed piece into graveyard and preserves ownership", () => {
    var match = Match(P("rook",PieceType.Rook,Faction.Rebirth,3,3),P("enemy",PieceType.Pawn,Faction.MortalFactionA,3,4,Seat.East));
    Begin(match); Accepted(match,new(Faction.Rebirth,ActionKind.Move,"rook",3,4));
    using var snapshot = JsonDocument.Parse(match.Snapshot());
    Assert(snapshot.RootElement.GetProperty("Graveyard")[0].GetProperty("Id").GetString() == "enemy");
});
Test("enemy entering stationary aura is Veiled until that owner's next Start", () => {
    var match = Match(P("s",PieceType.Pawn,Faction.Rebirth,3,1),P("enemy",PieceType.Rook,Faction.MortalFactionA,8,3,Seat.East));
    Begin(match); Accepted(match,new(Faction.Rebirth,ActionKind.Sacrifice,"s"));
    Begin(match); Accepted(match,new(Faction.MortalFactionA,ActionKind.Move,"enemy",6,3));
    using var snapshot = JsonDocument.Parse(match.Snapshot());
    var enemy = snapshot.RootElement.GetProperty("Pieces").EnumerateArray().Single(p=>p.GetProperty("Id").GetString()=="enemy");
    Assert(enemy.GetProperty("Veiled").GetBoolean());
    string before = match.Snapshot();
    for(int i=0;i<10;i++) _ = match.InspectAuraTargets();
    Assert(before == match.Snapshot());
});
Test("five first-time friendly Veils produce The Fall and terminal rejection", () => {
    var match = Match(P("s",PieceType.Pawn,Faction.Rebirth,3,1),
        P("f1",PieceType.Pawn,Faction.Rebirth,4,3),P("f2",PieceType.Pawn,Faction.Rebirth,5,3),
        P("f3",PieceType.Pawn,Faction.Rebirth,6,3),P("f4",PieceType.Pawn,Faction.Rebirth,4,4),
        P("f5",PieceType.Pawn,Faction.Rebirth,6,4));
    Begin(match); Accepted(match,new(Faction.Rebirth,ActionKind.Sacrifice,"s"));
    Assert(match.FriendlyVeilingCount == 5 && match.Phase == TurnPhase.Terminal && match.Outcome.Contains("Fall"));
    RejectedUnchanged(match,new(Faction.Rebirth,ActionKind.BeginMovement),"terminal");
    Console.WriteLine("SCENARIO The Fall: named fixture, BeginMovement -> sacrifice s -> five first applications -> collective Mortal victory.");
});
Test("restart clears terminal outcome, events, counters, graveyard and resources", () => {
    var match = new ReviewMatch(Setup.Standard()); string initial = match.Snapshot();
    Begin(match); Accepted(match,new(Faction.Rebirth,ActionKind.Sacrifice,"Rebirth-pawn-0"));
    match.Restart(); Assert(initial == match.Snapshot());
});
Test("accepted-action replay is byte-identical", () => {
    var first = new ReviewMatch(Setup.Standard()); var second = new ReviewMatch(Setup.Standard());
    var actions = new[]{new PlayerAction(Faction.Rebirth,ActionKind.BeginMovement),
        new PlayerAction(Faction.Rebirth,ActionKind.Move,"Rebirth-pawn-2",5,2),
        new PlayerAction(Faction.MortalFactionA,ActionKind.BeginMovement),
        new PlayerAction(Faction.MortalFactionA,ActionKind.Move,"MortalFactionA-pawn-0",11,3)};
    foreach(var action in actions) { Accepted(first,action); Accepted(second,action); Assert(first.Snapshot()==second.Snapshot()); }
});
Test("check detection and self-check rejection are headless and transactional", () => {
    var rook = P("enemy",PieceType.Rook,Faction.MortalFactionA,3,5,Seat.East);
    var match = Match(rook,P("shield",PieceType.Rook,Faction.Rebirth,3,3)); Begin(match);
    RejectedUnchanged(match,new(Faction.Rebirth,ActionKind.Move,"shield",4,3),"check");
    var board = Board(Leaders().Concat(new[]{rook}).ToArray()); Assert(Movement.InCheck(board,Faction.Rebirth));
});
Test("standard setup opening hazard is reproducible rather than silently exempted", () => {
    var match = new ReviewMatch(Setup.Standard()); Begin(match);
    Accepted(match,new(Faction.Rebirth,ActionKind.Move,"Rebirth-pawn-0",3,2));
    Assert(match.FriendlyVeilingCount == 5 && match.Phase == TurnPhase.Terminal);
    Console.WriteLine("SCENARIO Standard opening: North pawn-0 (3,1)->(3,2) immediately triggers The Fall under current end-phase rules.");
});
void MortalCycle(ReviewMatch match, int cycle)
{
    foreach(var (owner,id,x,y) in new[]{(Faction.MortalFactionA,"ak",13,cycle % 2 == 0 ? 9 : 10),
        (Faction.MortalFactionB,"bk",cycle % 2 == 0 ? 9 : 10,13),
        (Faction.MortalFactionC,"ck",cycle % 2 == 0 ? 1 : 0,10)}) {
        Begin(match); Accepted(match,new(owner,ActionKind.Move,id,x,y));
    }
}
Test("three sacrifices unlock Dash at Rebirth Start; Boon decision never consumes token", () => {
    var match = Match(P("s1",PieceType.Pawn,Faction.Rebirth,3,1),P("s2",PieceType.Pawn,Faction.Rebirth,4,1),P("s3",PieceType.Pawn,Faction.Rebirth,5,1),
        P("block",PieceType.Pawn,Faction.MortalFactionA,7,4,Seat.East));
    Begin(match); RejectedUnchanged(match,new(Faction.Rebirth,ActionKind.Move,"r",8,4,true),"three friendly");
    Accepted(match,new(Faction.Rebirth,ActionKind.Sacrifice,"s1")); MortalCycle(match,0);
    RejectedUnchanged(match,new(Faction.Rebirth,ActionKind.SpendBoon),"DecisionRequired");
    Assert(match.Boons == 1 && !match.DashUnlocked);
    Begin(match); Accepted(match,new(Faction.Rebirth,ActionKind.Sacrifice,"s2")); MortalCycle(match,1);
    Assert(!match.DashUnlocked);
    Begin(match); Accepted(match,new(Faction.Rebirth,ActionKind.Sacrifice,"s3")); MortalCycle(match,2);
    Assert(match.DashUnlocked && match.Boons == 3);
    Begin(match); Accepted(match,new(Faction.Rebirth,ActionKind.Move,"r",10,4,true));
});
Test("repeat friendly Veiling is an atomic decision boundary, not a chosen counting rule", () => {
    var match = Match(P("f",PieceType.Pawn,Faction.Rebirth,4,3),P("s1",PieceType.Pawn,Faction.Rebirth,3,1),P("s2",PieceType.Pawn,Faction.Rebirth,4,1));
    Begin(match); Accepted(match,new(Faction.Rebirth,ActionKind.Sacrifice,"s1"));
    Assert(match.FriendlyVeilingCount == 1); MortalCycle(match,0);
    Begin(match); RejectedUnchanged(match,new(Faction.Rebirth,ActionKind.Sacrifice,"s2"),"repeat applications");
});
Test("Leadership Coexistence capped once per turn, terminal at ten, deterministic replay", () => {
    var pieces = Leaders().Concat(new[]{P("r",PieceType.Rebirth,Faction.Rebirth,5,4),P("d",PieceType.Death,Faction.Rebirth,10,0),
        P("friend",PieceType.Pawn,Faction.Rebirth,9,6),P("enemy",PieceType.Pawn,Faction.MortalFactionA,10,6,Seat.East)}).ToArray();
    var match = new ReviewMatch(pieces); var replay = new ReviewMatch(pieces);
    var sequence = new List<PlayerAction>();
    void Act(PlayerAction action) { Accepted(match,action); sequence.Add(action); }
    for(int i=0;i<10;i++) {
        Act(new(Faction.Rebirth,ActionKind.BeginMovement));
        Act(new(Faction.Rebirth,ActionKind.Move,"d",10,i % 2 == 0 ? 1 : 0));
        Assert(match.LeadershipPoints == i+1);
        if(i==9) break;
        foreach(var (owner,id,x,y) in new[]{(Faction.MortalFactionA,"ak",13,i%2==0?9:10),
            (Faction.MortalFactionB,"bk",i%2==0?9:10,13),(Faction.MortalFactionC,"ck",i%2==0?1:0,10)}) {
            Act(new(owner,ActionKind.BeginMovement)); Act(new(owner,ActionKind.Move,id,x,y));
        }
    }
    Assert(match.Outcome.Contains("Leadership") && match.Phase == TurnPhase.Terminal);
    string before=match.Snapshot(); for(int i=0;i<10;i++) _=match.InspectAuraTargets(); Assert(before==match.Snapshot());
    RejectedUnchanged(match,new(Faction.Rebirth,ActionKind.Move,"d",10,1),"terminal");
    foreach(var action in sequence) Accepted(replay,action);
    Assert(match.Snapshot()==replay.Snapshot());
    match.Restart(); Assert(match.LeadershipPoints==0 && match.Outcome==null);
    Console.WriteLine($"SCENARIO Leadership: {sequence.Count} accepted intents, ten Death repositionings with a persistent adjacent friendly/enemy pair; 10 LP, exact replay.");
});
Test("Withdrawal awards once and capture earns no mercy", () => {
    var match = Match(P("rook",PieceType.Rook,Faction.Rebirth,8,5),P("enemy",PieceType.Rook,Faction.MortalFactionA,8,8,Seat.East));
    Begin(match); Accepted(match,new(Faction.Rebirth,ActionKind.Move,"rook",9,5));
    Assert(match.LeadershipPoints==1);
    var capture = Match(P("rook",PieceType.Rook,Faction.Rebirth,8,5),P("enemy",PieceType.Rook,Faction.MortalFactionA,8,8,Seat.East));
    Begin(capture); Accepted(capture,new(Faction.Rebirth,ActionKind.Move,"rook",8,8)); Assert(capture.LeadershipPoints==0);
});
Test("Shielding actually interrupts an existing ray to Leader", () => {
    var match = Match(P("shield",PieceType.Rook,Faction.Rebirth,4,2),P("enemy",PieceType.Rook,Faction.MortalFactionA,3,5,Seat.East));
    Begin(match); Accepted(match,new(Faction.Rebirth,ActionKind.Move,"shield",3,2)); Assert(match.LeadershipPoints==1);
});
Console.WriteLine($"Canonical C# regression groups passed: {passed}; exit={Environment.ExitCode}");
