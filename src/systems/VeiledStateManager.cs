using System;
using System.Collections.Generic;
using System.Linq;
using VeiledDominion.Pieces;

namespace VeiledDominion.Systems
{
    /// <summary>
    /// VeiledStateManager orchestrates the lifecycle of the Veiled debuff across turn phases.
    /// 
    /// Critical responsibility: Ensure Veiled state clears at the EXACT moment the affected piece's
    /// faction BEGINS their turn, not during, not after. This prevents the "1-round duration" from
    /// bleeding across player turns in 4-player scenarios.
    /// 
    /// Turn Lifecycle:
    /// 1. Start Phase: Clear Veiled states for pieces of current faction
    /// 2. Action Phase: Execute moves (may trigger Radius of Ruin)
    /// 3. Resolution Phase: Evaluate AoE, apply new Veils, check victory conditions
    /// 4. End Phase: Transition to next player
    /// </summary>
    public class VeiledStateManager
    {
        /// <summary>
        /// All pieces currently on the board (updated by board state manager).
        /// </summary>
        private List<BasePiece> _allPieces;

        /// <summary>
        /// The Radius of Ruin system (for aura suppression control).
        /// </summary>
        private RadiusOfRuin _radiusOfRuin;

        /// <summary>
        /// Current turn faction (tracks whose turn it is).
        /// </summary>
        public PlayerFaction CurrentTurnFaction { get; private set; }

        /// <summary>
        /// Tracks if Aura Suppression (Martyr's Boon) is active this turn.
        /// When true, RadiusOfRuin.EvaluateAndApplyAura() is skipped.
        /// </summary>
        private bool _isAuraSuppressionActive;

        /// <summary>
        /// Tracks all pieces that are currently Veiled.
        /// Maps piece ID → Veiled state info.
        /// </summary>
        private Dictionary<string, VeiledStateInfo> _veiledPieces;

        public VeiledStateManager(List<BasePiece> allPieces, RadiusOfRuin radiusOfRuin)
        {
            _allPieces = allPieces ?? throw new ArgumentNullException(nameof(allPieces));
            _radiusOfRuin = radiusOfRuin ?? throw new ArgumentNullException(nameof(radiusOfRuin));

            _veiledPieces = new Dictionary<string, VeiledStateInfo>();
            _isAuraSuppressionActive = false;
            CurrentTurnFaction = PlayerFaction.North; // Starting faction
        }

        /// <summary>
        /// Phase 1: Start of turn - Clear Veiled states for pieces of the current faction.
        /// 
        /// This is called at the BEGINNING of each faction's turn, before any moves are made.
        /// This ensures the 1-round Veil duration is respected correctly in 4-player rotations.
        /// </summary>
        public void OnTurnStart(PlayerFaction turnFaction)
        {
            CurrentTurnFaction = turnFaction;

            // Step 1: Clear Veiled state for all pieces of the current faction
            var piecesToClear = _allPieces.Where(p => p.IsAlive && p.Faction == turnFaction && p.IsVeiled).ToList();

            foreach (var piece in piecesToClear)
            {
                piece.ClearVeiledState();
                _veiledPieces.Remove(piece.Id);
                Console.WriteLine($"[VEIL] Cleared Veiled state from {piece.Type} ({piece.Faction}) at {piece.Position}");
            }

            // Step 2: Clear Aura Suppression flag from last turn
            // (Suppression lasts only for one turn, then automatically resets)
            _isAuraSuppressionActive = false;
        }

        /// <summary>
        /// Phase 3: Resolution Phase - Evaluate and apply Radius of Ruin aura.
        /// 
        /// Called after a piece has completed its move.
        /// If the moving piece is Rebirth, and Aura Suppression is NOT active, trigger the aura.
        /// </summary>
        public void OnMoveResolution(BasePiece movingPiece)
        {
            // Only Rebirth triggers the aura
            if (movingPiece.Type != PieceType.Rebirth)
                return;

            // If Aura Suppression is active, skip aura evaluation
            if (_isAuraSuppressionActive)
            {
                Console.WriteLine($"[AURA] Aura Suppression active - Radius of Ruin disabled this turn");
                return;
            }

            // Evaluate and apply the aura
            _radiusOfRuin.EvaluateAndApplyAura();
        }

        /// <summary>
        /// Public API: Activate Aura Suppression (Martyr's Boon ability).
        /// 
        /// When Rebirth spends a Boon Token at the START of her turn, this method is called.
        /// It temporarily disables the Radius of Ruin for that turn only.
        /// </summary>
        public void ActivateAuraSuppressionForThisTurn()
        {
            if (CurrentTurnFaction != PlayerFaction.North)
            {
                throw new InvalidOperationException("Aura Suppression can only be activated by Rebirth (North faction)");
            }

            _isAuraSuppressionActive = true;
            Console.WriteLine($"[SUPPRESSION] Aura Suppression activated - Radius of Ruin disabled for this turn");
        }

        /// <summary>
        /// Check if a specific piece is currently Veiled.
        /// </summary>
        public bool IsPieceVeiled(BasePiece piece)
        {
            return piece.IsVeiled && _veiledPieces.ContainsKey(piece.Id);
        }

        /// <summary>
        /// Get detailed state info for a Veiled piece.
        /// Returns null if piece is not Veiled.
        /// </summary>
        public VeiledStateInfo GetVeiledStateInfo(BasePiece piece)
        {
            return _veiledPieces.TryGetValue(piece.Id, out var info) ? info : null;
        }

        /// <summary>
        /// Get all pieces currently in Veiled state for a specific faction.
        /// </summary>
        public List<BasePiece> GetVeiledPiecesForFaction(PlayerFaction faction)
        {
            return _allPieces.Where(p => p.IsAlive && p.Faction == faction && p.IsVeiled).ToList();
        }

        /// <summary>
        /// Get all pieces currently in Veiled state across the entire board.
        /// </summary>
        public List<BasePiece> GetAllVeiledPieces()
        {
            return _allPieces.Where(p => p.IsAlive && p.IsVeiled).ToList();
        }

        /// <summary>
        /// Check the "The Fall" victory condition.
        /// Mortals win if Rebirth has accidentally Veiled 5 of her own pieces.
        /// </summary>
        public bool HasMortalsWonViaTheFall()
        {
            return _radiusOfRuin.HasRebirthLostViaTheFall();
        }

        /// <summary>
        /// Get the current count of Rebirth's self-Veils.
        /// </summary>
        public int GetRebirthSelfVeilCount()
        {
            return _radiusOfRuin.RebirthSelfVeilCount;
        }

        /// <summary>
        /// Internal tracking: Register a piece as Veiled.
        /// Called by RadiusOfRuin when applying Veil state.
        /// </summary>
        internal void RegisterVeiledPiece(BasePiece piece, GridCoordinate rebirthPosition)
        {
            if (!_veiledPieces.ContainsKey(piece.Id))
            {
                var stateInfo = new VeiledStateInfo
                {
                    PieceId = piece.Id,
                    Faction = piece.Faction,
                    VeiledAtTurn = CurrentTurnFaction,
                    VeiledByRebirthPosition = rebirthPosition,
                    VeiledRoundsRemaining = 1
                };

                _veiledPieces[piece.Id] = stateInfo;
            }
            // If already Veiled, do NOT refresh duration (as per rules: "duration does not stack")
        }

        /// <summary>
        /// Get the audit trail of all Veil applications (delegates to RadiusOfRuin).
        /// </summary>
        public List<VeilApplicationRecord> GetVeilAuditLog()
        {
            return _radiusOfRuin.GetVeilAuditLog();
        }

        /// <summary>
        /// Reset the state manager for a new game.
        /// </summary>
        public void Reset()
        {
            _veiledPieces.Clear();
            _isAuraSuppressionActive = false;
            CurrentTurnFaction = PlayerFaction.North;
            _radiusOfRuin.Reset();
        }

        /// <summary>
        /// Get detailed debug information about current Veiled states.
        /// </summary>
        public string GetDebugState()
        {
            var lines = new List<string>
            {
                $"=== VEILED STATE DEBUG ===",
                $"Current Turn Faction: {CurrentTurnFaction}",
                $"Aura Suppression Active: {_isAuraSuppressionActive}",
                $"Rebirth Self-Veil Count: {_radiusOfRuin.RebirthSelfVeilCount}/5 (The Fall threshold)",
                $"Total Veiled Pieces: {_veiledPieces.Count}",
                $""
            };

            if (_veiledPieces.Count > 0)
            {
                lines.Add("Veiled Pieces:");
                foreach (var kvp in _veiledPieces)
                {
                    var info = kvp.Value;
                    lines.Add($"  - {info.PieceId} ({info.Faction}) veiled at {info.VeiledByRebirthPosition}");
                }
            }
            else
            {
                lines.Add("(No pieces currently Veiled)");
            }

            return string.Join("\n", lines);
        }
    }

    /// <summary>
    /// Tracks state information for a single Veiled piece.
    /// </summary>
    public class VeiledStateInfo
    {
        public string PieceId { get; set; }
        public PlayerFaction Faction { get; set; }
        public PlayerFaction VeiledAtTurn { get; set; } // Which faction's turn the Veil was applied
        public GridCoordinate VeiledByRebirthPosition { get; set; }
        public int VeiledRoundsRemaining { get; set; }

        public override string ToString()
        {
            return $"[Veiled] {PieceId} ({Faction}) - Applied at Rebirth position {VeiledByRebirthPosition}";
        }
    }
}
