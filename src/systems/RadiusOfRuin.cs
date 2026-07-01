using System;
using System.Collections.Generic;
using System.Linq;
using VeiledDominion.Board;
using VeiledDominion.Pieces;

namespace VeiledDominion.Systems
{
    /// <summary>
    /// RadiusOfRuin manages the AoE debuff aura around the Rebirth piece.
    /// 
    /// Core Mechanic:
    /// When Rebirth completes her move, she emits a 1-square radius aura.
    /// Any piece (friendly or enemy, except Death and Rebirth) ending their turn within this radius
    /// enters the Veiled debuffed state for exactly 1 round.
    /// 
    /// Design Notes:
    /// - Grid-based state checking (NOT physics-based collision detection)
    /// - Death's Sanctuary breaks the aura for pieces within 1 square of Death
    /// - Self-exclusion: Rebirth is immune to her own aura
    /// - Deterministic: All state changes are logged for replay/debugging
    /// </summary>
    public class RadiusOfRuin
    {
        /// <summary>
        /// Reference to the Rebirth piece (the aura source).
        /// </summary>
        private BasePiece _rebirthPiece;

        /// <summary>
        /// Reference to the Death piece (sanctuary - blocks Veil application).
        /// </summary>
        private BasePiece _deathPiece;

        /// <summary>
        /// All pieces currently on the board (for state queries).
        /// Updated by the board state manager.
        /// </summary>
        private List<BasePiece> _allPieces;

        /// <summary>
        /// Callback to check if a coordinate is currently occupied.
        /// Provided by the board state manager.
        /// </summary>
        private Func<GridCoordinate, bool> _isOccupiedCallback;

        /// <summary>
        /// Audit log of all Veil applications this game session.
        /// Used to track "The Fall" victory condition (5 self-Veils = Mortals win).
        /// </summary>
        private List<VeilApplicationRecord> _veilAuditLog;

        /// <summary>
        /// Counter for how many of Rebirth's own pieces have been Veiled this game.
        /// When this reaches 5, Mortals win via "The Fall".
        /// </summary>
        public int RebirthSelfVeilCount { get; private set; }

        public RadiusOfRuin(BasePiece rebirthPiece, BasePiece deathPiece, List<BasePiece> allPieces, Func<GridCoordinate, bool> isOccupiedCallback)
        {
            _rebirthPiece = rebirthPiece ?? throw new ArgumentNullException(nameof(rebirthPiece));
            _deathPiece = deathPiece ?? throw new ArgumentNullException(nameof(deathPiece));
            _allPieces = allPieces ?? throw new ArgumentNullException(nameof(allPieces));
            _isOccupiedCallback = isOccupiedCallback ?? throw new ArgumentNullException(nameof(isOccupiedCallback));

            _veilAuditLog = new List<VeilApplicationRecord>();
            RebirthSelfVeilCount = 0;
        }

        /// <summary>
        /// Public API: Evaluate and apply the Radius of Ruin aura.
        /// 
        /// Call this at the end of Rebirth's move (during the Resolution Phase).
        /// 
        /// Logic:
        /// 1. Get all coordinates within 1-square radius of Rebirth
        /// 2. For each coordinate, check if it's occupied by a piece
        /// 3. If occupied, check if the piece is immune (Death, Rebirth, or in Sanctuary)
        /// 4. If not immune, apply Veiled state and log the application
        /// </summary>
        public void EvaluateAndApplyAura()
        {
            // Step 1: Get all coordinates in the 1-square radius around Rebirth
            var aureaCoordinates = GridTopology.GetCoordinatesInRadius(_rebirthPiece.Position, radiusDistance: 1);

            // Step 2: For each coordinate in the aura, check for occupied pieces
            foreach (var coord in aureaCoordinates)
            {
                // Skip Rebirth's own position (self-exclusion)
                if (coord == _rebirthPiece.Position)
                    continue;

                // Find the piece at this coordinate (if any)
                var targetPiece = FindPieceAtCoordinate(coord);
                if (targetPiece == null)
                    continue;

                // Step 3: Check immunity conditions
                if (IsImmuneToPiece(targetPiece))
                    continue;

                // Step 4: Apply Veiled state and log
                ApplyVeiledToPiece(targetPiece);
            }
        }

        /// <summary>
        /// Determines if a piece is immune to the Radius of Ruin aura.
        /// 
        /// Immunity Conditions:
        /// 1. The piece is Rebirth herself (self-exclusion)
        /// 2. The piece is Death (the mentor is never Veiled)
        /// 3. The piece is within Sanctuary radius of Death (1 square from Death)
        /// </summary>
        private bool IsImmuneToPiece(BasePiece piece)
        {
            // Condition 1: Self-exclusion for Rebirth
            if (piece.Id == _rebirthPiece.Id)
                return true;

            // Condition 2: Death is never Veiled
            if (piece.Id == _deathPiece.Id)
                return true;

            // Condition 3: Sanctuary - pieces within 1 square of Death are immune
            if (IsInSanctuary(piece.Position))
                return true;

            return false;
        }

        /// <summary>
        /// Determines if a coordinate is within the Sanctuary radius of Death.
        /// Sanctuary = any square within 1 square (Chebyshev distance) of Death.
        /// </summary>
        private bool IsInSanctuary(GridCoordinate coord)
        {
            int distanceToDeath = GridTopology.ChebyshevDistance(coord, _deathPiece.Position);
            return distanceToDeath <= 1;
        }

        /// <summary>
        /// Apply the Veiled debuff to a piece and log the application.
        /// </summary>
        private void ApplyVeiledToPiece(BasePiece targetPiece)
        {
            // Determine if this is a self-Veil (Rebirth Veiling her own piece)
            bool isSelfVeil = targetPiece.Faction == _rebirthPiece.Faction;

            // Apply the debuff
            targetPiece.ApplyVeiledState();

            // Log the event for audit trail and "The Fall" tracking
            var record = new VeilApplicationRecord
            {
                VeiledPieceId = targetPiece.Id,
                VeiledPieceType = targetPiece.Type,
                VeiledFaction = targetPiece.Faction,
                RebirthPosition = _rebirthPiece.Position,
                DeathPosition = _deathPiece.Position,
                IsSelfVeil = isSelfVeil,
                Timestamp = DateTime.UtcNow
            };

            _veilAuditLog.Add(record);

            // Increment self-Veil counter if applicable
            if (isSelfVeil)
            {
                RebirthSelfVeilCount++;
                Console.WriteLine($"[AURA] Self-Veil #{RebirthSelfVeilCount}: {targetPiece.Type} at {targetPiece.Position}");
            }

            // Console logging for playtest debugging
            Console.WriteLine($"[AURA] Piece veiled: {targetPiece.Type} ({targetPiece.Faction}) at {targetPiece.Position}");
        }

        /// <summary>
        /// Find a piece at a specific coordinate.
        /// Returns null if no piece occupies that square.
        /// </summary>
        private BasePiece FindPieceAtCoordinate(GridCoordinate coord)
        {
            return _allPieces.FirstOrDefault(p => p.Position == coord && p.IsAlive);
        }

        /// <summary>
        /// Query the audit log for all Veil applications.
        /// Used for debugging, replays, and determining victory conditions.
        /// </summary>
        public List<VeilApplicationRecord> GetVeilAuditLog()
        {
            return new List<VeilApplicationRecord>(_veilAuditLog);
        }

        /// <summary>
        /// Check if "The Fall" victory condition has been met.
        /// Mortals win if Rebirth has accidentally Veiled 5 of her own pieces.
        /// </summary>
        public bool HasRebirthLostViaTheFall()
        {
            return RebirthSelfVeilCount >= 5;
        }

        /// <summary>
        /// Reset the aura system for a new game.
        /// </summary>
        public void Reset()
        {
            _veilAuditLog.Clear();
            RebirthSelfVeilCount = 0;
        }
    }

    /// <summary>
    /// Record of a single Veil application event.
    /// Stored in the audit log for determinism and debugging.
    /// </summary>
    public class VeilApplicationRecord
    {
        public string VeiledPieceId { get; set; }
        public PieceType VeiledPieceType { get; set; }
        public PlayerFaction VeiledFaction { get; set; }
        public GridCoordinate RebirthPosition { get; set; }
        public GridCoordinate DeathPosition { get; set; }
        public bool IsSelfVeil { get; set; }
        public DateTime Timestamp { get; set; }

        public override string ToString()
        {
            var selfLabel = IsSelfVeil ? "[SELF]" : "";
            return $"{Timestamp:HH:mm:ss.fff} {selfLabel} {VeiledPieceType} ({VeiledFaction}) Veiled at {RebirthPosition}";
        }
    }
}
