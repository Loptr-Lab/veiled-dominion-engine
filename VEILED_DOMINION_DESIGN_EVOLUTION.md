# Veiled Dominion — Design Evolution Archive
### From "The Blueprint" (pure chess) → the Dice/Cards/Chess hybrid Rulebook → back to Playtest Rulebook v0.1 → the engine repo

This document preserves the full text of the four key design-history documents that trace how Veiled Dominion evolved, plus the pivot moment where the dice-and-cards hybrid was deliberately cut back down to a pure 4-player chess variant.

Source docs (all in Google Drive, owned by Dominique Devereaux):
- *Veiled Dominion - The Blueprint* — created 2026-04-25
- *Veiled Dominion Rulebook* — created 2026-05-06
- *VEILED DOMINION — Pitch Deck* — created 2026-06-29 (pivot document)
- *VEILED DOMINION Playtest Rulebook v0.1* — created 2026-06-29
- GitHub `Loptr-Lab/veiled-dominion-engine`, `GDD.md` — first commit 2026-07-01

---

## 1. April 25, 2026 — "The Blueprint" (Stage 1: pure chess concept)

The earliest surviving design document. Every core mechanic that survives to the final engine — Radius of Ruin, the Sanctuary, Martyr's Boon, Soul Reservoir — is already present here, on a straight chess board, with no dice and no cards.

> **VEILED DOMINION: GAME BLUEPRINT**
>
> **Project:** Daddy's Little Mortis
>
> **Lore:** A leadership trial where Death teaches his daughter, Rebirth, to guide souls affected by the end of life.
>
> ### The Narrative Core
> - **The Duo:** Death (the Mentor) teaches his daughter, Rebirth (the Student), the burden of leadership and cosmic duty.
> - **The Mission:** Helping those negatively affected by the end of life through strategic restraint.
>
> ### Key Game Mechanics
> - **The Radius of Ruin:** The Daughter is an Over-Powered (OP) piece with a permanent 1-square "aura." Any piece (ally or enemy) ending a turn in her radius is "Veiled," losing special abilities and moving only as a Pawn for one turn.
> - **The "Shadow" Safe Zone:** The Death piece acts as a stabilizer. His wide base creates a "classroom" area where the Daughter's Radius of Ruin is negated, allowing allies to stand near her safely.
> - **The Martyr's Boon:** Sacrificing an allied piece grants a "Boon Token," which can be spent to temporarily "tame" her aura, teaching the player to balance individual loss against the greater good.
> - **The Soul Reservoir:** Captured pieces go to a physical "Graveyard" tray. The more allies in the Grave, the more mobile the Daughter becomes (e.g., the Rebirth Dash), turning loss into spiritual momentum.
>
> ### Aesthetic & Design
> - **Death:** Painted in Musou Black or Black 4.0 to create a 2D "void" effect. He is a silhouette that swallows light.
> - **The Daughter:** Crafted in translucent, high-gloss resin with internal LEDs or glow-in-the-dark accents. She radiates a physical "spark."
> - **The Board:** 4-player layout (Teams or Chaos) using glass or obsidian-style tiles to emphasize the contrast between the glowing daughter and the "bottomless" mentor.
>
> ### I. Core Mechanics
> - **Radius of Ruin**: Rebirth (The Daughter) has a 1-square aura. Any piece that ends its turn in this radius is "Veiled"—losing special abilities and moving only like a Pawn for one turn.
> - **The Mentor (Safe Zone)**: Death provides stability. Any allied piece within 1 square of Death is immune to the Daughter's Radius of Ruin.
> - **Martyr's Boon**: Voluntarily sacrificing an allied piece grants a Boon Token, which can be spent to temporarily disable the Daughter's aura for one turn.
> - **Soul Reservoir**: For every three friendly pieces in the Graveyard, the Daughter unlocks the Rebirth Dash, allowing her to move through other pieces as if they were ghosts.
>
> ### II. How to Play (4-Player)
> - **Modes**: 2v2 (Teams) or Free-for-All (Chaos).
> - **Turn Structure**: Play proceeds clockwise. The Daughter's player must announce the status of her aura at the end of each move.
> - **Victory Conditions**: Standard Checkmate of opposing leaders or reaching a target Leadership Score via "Merciful" maneuvers (maneuvering without capturing pieces).
>
> ### III. Aesthetic Guidelines
> - **Death (The Living Shadow)**: Use ultra-matte paints like Musou Black or Black 4.0 to create a void-like appearance.
> - **Rebirth (The Spark)**: 3D-printed in translucent resin with internal LEDs or glow-in-the-dark additives.
> - **The Board**: Dark, polished glass or obsidian to highlight the contrast between the void and the spark.
>
> *Death not as a monster, but as a weary administrator, and the Daughter as a force that needs direction.*
>
> #### Dev Log #1: The Weight of the Crown
> **Lesson One: Presence is a Burden**
>
> *The void at the edge of the board doesn't just watch; it waits. I sat my daughter down before the 64 squares—the training ground for her future duties across the stars. She is vibrant, her light spilling across the obsidian tiles like a spilled star. It is beautiful, but it is dangerous.*
>
> *"Father," she asked, "why do the others flee when I approach? I only wish to lead them."*
>
> *I gestured to the Radius of Ruin surrounding her feet—that pulsing, ethereal glow that turns steel into glass and resolves into dust. "You are Rebirth, child. But too much light blinds as surely as the dark. To lead is to understand the gravity of your own existence. If you do not learn to temper that glow, you will burn the very souls you are meant to save."*
>
> **The Mechanic: Learning the Radius**
>
> In our first gameplay test, we realized the Daughter (Rebirth) was too powerful to be a standard piece. She doesn't just take; she changes the board.
>
> We've implemented the Radius of Ruin: a 1-square aura that follows her every move. In a 4-player game, this makes her a tactical wildfire. If she steps too close to an ally, she accidentally "Veils" them, stripping their abilities.
>
> **The Leadership Goal:** Can you win the game without accidentally neutralizing your own team?
>
> #### Dev Log #2: The Art of Sacrifice
> **Lesson Two: A Leader Bleeds First**
>
> *"Look at the board, child," I told her. She was hesitant, unwilling to move her smaller pieces into the line of fire. "You cannot keep everyone safe. To govern is to choose which losses are acceptable so the whole may survive."*
>
> *"But they are mine to protect," she whispered.*
>
> *"Then protect the future," I countered. "A king who never risks a knight will soon find his crown on the floor. A true leader knows that a well-placed sacrifice isn't a loss—it's an investment in victory."*
>
> **The Mechanic: The "Martyr's Boon"**
> - **The Mechanic**: When the Rebirth player voluntarily moves an allied piece into a position where it is captured, they gain a Boon Token.
> - **The Reward**: These tokens can be spent to temporarily "tame" the Radius of Ruin, allowing the Daughter to move without affecting allies for one turn.
> - **Leadership Lesson**: It forces you to weigh the life of a single unit against the strategic benefit of the entire army.
>
> #### Dev Log #3: The Silence of the Grave
> **Lesson Three: Respect the Fallen**
>
> *The board was littered with the husks of our training exercise. My daughter reached out to sweep them aside, but I caught her wrist. "They do not leave us, little Mortis. They simply move to the next room."*
>
> *I pointed to the edge of the board, where the shadows pooled deepest. "The Grave is not a trash bin. It is a reservoir. Those who have passed still hold weight in the world of the living. Ignore them, and you ignore half of your kingdom."*
>
> **The Mechanic: The "Soul Reservoir" (Graveyard)**
> - **The Mechanic**: Instead of standard piece values, the Graveyard tracks "Spirit Energy."
> - **The Interaction**: The Daughter can use her turn to "commune" with the Graveyard. For every three friendly pieces in the Grave, she can perform a Rebirth Dash, moving through enemy pieces as if they were ghosts.
> - **The Twist**: If the enemy captures too many of your pieces, they unintentionally make the Daughter more mobile and unpredictable.
> - **Leadership Lesson**: This teaches empathy for the "negatively affected." By honoring the fallen, you gain the strength to finish the mission.

---

## 2. May 6, 2026 — The Rulebook (Stage 2: Dice + Cards + Chess hybrid)

Eleven days later, the scope balloons dramatically. This is the only point in the project's history where dice mechanics enter the design — as Phase I of a three-phase "war game," with a full 52-card system as Phase II, and chess (now under a physical fog screen) demoted to Phase III.

> # Veiled Dominion Rulebook
>
> Veiled Dominion is a multi-system strategy war game where commanders must master three interlocking layers of warfare: Dice, Cards, and Chess. The game's narrative tension is built upon the "Fog of War," requiring players to balance resource management, tactical skirmishing, and hidden battlefield maneuvers to capture the enemy King or dominate two-thirds of the territory.
>
> ### Phase I: Fortune & Foundation (Dice)
> This opening phase lasts six rounds, during which players establish their power base and recruit armies.
> - **Initial Setup**: Players begin with 3 Resource Points (RP), a standard chess setup (used only as a visual ledger), and 3 face-down cards.
> - **Strategic Actions**:
>   - **Harvest (2d6)**: A reliable method to add the rolled result directly to the RP bank.
>   - **Gamble (1d8)**: High risk; a roll of 5–8 grants RP and a card, while 1–4 results in lost RP.
>   - **Challenge (d20 vs. d20)**: A head-to-head roll to steal 2 RP from an opponent, limited to twice per phase.
> - **Upgrades**: RP can be spent on critical advantages for later phases, such as Iron Reserves (extra cards), Battle Blessings (rerolls), or Fog Wards (revealing hidden pieces).
>
> ### Phase II: Schemes & Skirmishes (Cards)
> In this phase, players engage in pre-battle maneuvers and build a "War Hand" for the final conflict.
> - **Suit Domains**:
>   - **Spades (Conquest)**: Direct attack cards used to initiate skirmishes.
>   - **Hearts (Restoration)**: Support cards for recovering RP or drawing extra cards.
>   - **Diamonds (Intelligence)**: Subterfuge cards used to peek at or steal from an opponent's hand.
>   - **Clubs (Fortification)**: Defense cards used as reactions to block or reduce damage.
> - **Combat Responses**: When attacked by Spades, a defender can Block (using Clubs), Counter-Attack (using their own Spades), or Absorb the damage to gain a bonus card draw.
> - **The Lieutenant & The Warlord**: Face cards offer specialized powers, such as pre-staging Pawns (Jacks) or gaining immunity to attacks in the final phase (Kings).
>
> ### Phase III: The Fog of War (Chess)
> The final resolution is a full game of chess fought beneath a physical Fog Screen that hides the opponent's pieces until they are revealed.
> - **The Veil**: A divider is placed between ranks 4 and 5; pieces only become visible when they cross the midline, are targeted for attack, or deliver a check.
> - **Combat Resolution**: Unlike standard chess, captures are not automatic. They are resolved via:
>   - **Suit Hierarchy**: Spades > Hearts > Clubs > Diamonds > Spades.
>   - **Confirmation Roll (2d6)**: A result of 7 or higher is required for a successful capture. A "Natural 12" allows an extra move, while a "Natural 2" results in the attacker being captured instead.
> - **Special Tactics**:
>   - **Last Stand (Aces)**: Can be played to nullify a check or provide a significant bonus to a combat roll.
>   - **Pawn Promotion**: Reaching the back rank requires a card cost (e.g., discarding 2 cards for a Queen) and may be contested by the opponent.
>
> ### Victory Conditions
> A commander secures the Dominion by achieving Checkmate, controlling 48 or more squares (Domination), or by standard chess adjudication if all cards are exhausted.
>
> ### The Combat Exchange Sequence (Phase III detail)
> When a piece moves onto a square occupied by an opponent's piece:
> 1. **Secret Declaration**: Both players secretly select a card from their War Hand and reveal them simultaneously.
> 2. **Suit Hierarchy (The Cycle of War)**: Spades beat Hearts. Hearts beat Clubs. Clubs beat Diamonds. Diamonds beat Spades.
> 3. **Pip Comparison**: If both players play the same suit, the higher pip value wins. An exact tie results in mutual destruction — both pieces are removed from the board.
>
> **The Confirmation Roll (2d6):**
>
> | 2d6 Result | Outcome | Tactical Effect |
> |---|---|---|
> | 12 (Nat Max) | Critical Victory | Capture succeeds; the attacker advances one extra square forward. |
> | 7–11 | Victory | Capture succeeds normally. |
> | 6 | Narrow Failure | Attack repelled; turn ends, but attacker draws 1 card as consolation. |
> | 3–5 | Failure | Attack repelled; no capture occurs and the turn ends. |
> | 2 (Nat Min) | Critical Fumble | The attacker's piece is lost instead; the defender performs a counter-strike capture. |
>
> **Key Combat Modifiers:** Last Stand (Aces) grant +3 to the confirmation roll as a wild suit. Battle Blessing (a Phase I upgrade) allows a reroll of any single die once per game. King's Resilience: Kings are adjudicated by standard chess rules for check, but a King attempting a capture to escape still triggers the card/dice resolution.
>
> ### Suit Reference — Spades (Conquest / Attack)
>
> | Value | Name | Power |
> |---|---|---|
> | 2 | Skirmish Strike | Attack str. 2; efficient but low impact. |
> | 3 | Raiding Party | Attack str. 3; on success, opponent discards 1 random card. |
> | 4 | Flanking Thrust | Attack str. 4; targets any piece, ignoring movement range, once in Phase III. |
> | 5 | War March | Attack str. 5; if blocked, still advance 1 square in Phase III. |
> | 6 | Iron Assault | Attack str. 6; opponent's block card must strictly exceed this value. |
> | 7 | Siege Blade | Attack str. 7; +1 bonus to the 2d6 confirmation roll on win. |
> | 8 | Vanguard Charge | Attack str. 8; may combine with a second Spades card. |
> | 9 | Blood Oath | Attack str. 9; if blocked, opponent must reveal 1 hidden piece. |
> | 10 | Conqueror's Edge | Attack str. 10; on victory, draw 1 card from the discard pile. |
>
> Spades auto-beat Hearts; Spades are auto-beaten by Diamonds.
>
> ### Suit Reference — Diamonds (Intelligence / Subterfuge)
>
> | Value | Name | Power |
> |---|---|---|
> | 2 | Whisper Network | Peek at the top card of the draw pile; replace or leave it. |
> | 3 | Scout's Report | Peek at 1 random card from opponent's hand. |
> | 4 | Spy's Glance | Look at any 2 cards in opponent's hand, unrevealed. |
> | 5 | Courier Intercept | Look at opponent's entire hand for 5 seconds. |
> | 6 | Shadow Mapwork | Force opponent to reveal 1 hidden piece's square. |
> | 7 | Agent Extraction | Steal a named card; if absent, steal random. |
> | 8 | False Orders | Steal 1 random card, swap for 1 of yours. |
> | 9 | Black Cipher | Steal 2 random cards; opponent draws 1 in compensation. |
> | 10 | Grand Betrayal | Steal up to 3 cards of choice; opponent locked to defense next turn. |
>
> Diamonds auto-beat Spades; Diamonds are auto-beaten by Clubs. High-value Diamonds (7+) can bypass the Fog of War entirely, forcing reveal of both location and piece type.
>
> ### Suit Reference — Clubs (Fortification / Defense)
>
> | Value | Name | Power |
> |---|---|---|
> | 2 | Wicker Shield | Block str. 2; instant reaction. |
> | 3 | Leather Guard | Block str. 3; if it fully absorbs, draw 1 card. |
> | 4 | Iron Buckler | Block str. 4; reduces attack to 0 if within 2 of its value. |
> | 5 | Tower Shield | Block str. 5; hold as a Phase III +1 armor buff. |
> | 6 | Bulwark Wall | Block str. 6; on full block, counter for 1 RP damage. |
> | 7 | War Phalanx | Block str. 7; may protect a piece from capture once in Phase III. |
> | 8 | Fortress Gate | Block str. 8; if held at Phase III start, fortify one square permanently. |
> | 9 | Ironclad Aegis | Block str. 9; after blocking, play any 1 card free. |
> | 10 | Unbreakable Line | Block str. 10; guaranteed full block regardless of attack value. |
>
> Clubs auto-beat Diamonds; Clubs are auto-beaten by Hearts. High Clubs (J–K) nullify played Diamond cards.
>
> ### Suit Reference — Hearts (Restoration / Support)
>
> | Value | Name | Power |
> |---|---|---|
> | 2 | Ember Spark | Recover 1 RP. |
> | 3 | Field Dressing | Recover 2 RP or draw 1 card (choice before playing). |
> | 4 | Healer's Touch | Recover 2 RP; +1 shield buff to one Pawn for Phase III. |
> | 5 | Rallying Cry | Recover 3 RP or remove a negative status. |
> | 6 | Valor's Gift | Draw 2 cards; opponent may draw 1. |
> | 7 | Mender's Grace | Recover 4 RP; if hand empty after, draw 2. |
> | 8 | Lifeblood Surge | Recover 4 RP; restore one spent Phase I upgrade token. |
> | 9 | Undying Resolve | Recover 5 RP; next captured piece survives with 1 HP instead. |
> | 10 | Phoenix Rite | Recover all lost RP this phase (once per game). |
>
> Hearts auto-beat Clubs; Hearts are auto-beaten by Spades.
>
> ### Face Cards (all suits, identical effect)
> - **Jack — The Lieutenant:** Immediately move a Pawn one square forward (pre-staging).
> - **Queen — The Strategist:** Draw 3, keep 2, discard 1.
> - **King — The Warlord:** Double your next attack, OR gain Iron Resolve (immune to 1 Phase III capture).
> - **Ace — The Wild Fate:** Use as pip 1 or 14 of any suit, or hold as a Last Stand to nullify a check.

---

## 3. June 29, 2026 — The pivot (Pitch Deck)

Same day as the Playtest Rulebook rewrite below, the pitch deck explicitly instructs cutting the entire dice/card layer from how the game is presented — and, as it turned out, from the design itself going forward.

> **SLIDE 3: THE CONCEPT — ONE SENTENCE**
>
> Veiled Dominion is a 4-player chess variant where Death teaches his daughter to lead without destroying the souls she's meant to guide.
>
> **Speaker notes:** That's it. That's the whole game. Everything else is detail. If this sentence doesn't land, nothing after it will.
>
> **SLIDE 4: THE LORE — NO MORE THAN THIS**
>
> **Speaker notes:** Notice what I didn't include. No Chaturanga. No cardology. No Bourdieu. No tarot suits. No song lyrics. Those are your process — they're not the product. The audience doesn't need to see the kitchen. They need the meal.

This is the explicit design decision that ends the dice/cards hybrid phase.

---

## 4. June 29, 2026 — Playtest Rulebook v0.1 (Stage 3: back to pure chess)

Written the same day as the pitch pivot, this is a clean rewrite with no dice, no cards, no fog screen — matching the one-sentence pitch exactly.

> # VEILED DOMINION
> ## Official Playtest Rulebook (v0.1)
>
> **Players:** 4
> **Time:** 45–90 minutes
> **Mode:** Asymmetrical Free-For-All (1 Rebirth Player vs. 3 Mortal Players)
> *Note: 2v2 Team rules are provided as a Variant at the end.*
>
> ### 1. THE PREMISE
> You are not conquering a board. You are navigating a classroom.
>
> One player controls Rebirth (the Daughter), a piece of immense, terrifying power who is learning restraint. The other three players control Mortal Factions—standard chess armies whose goal is to survive her radiance, exploit her inexperience, or checkmate her before she masters her aura.
>
> ### 2. COMPONENTS
> - 1 Cross-shaped 4-Player Chessboard (14x14 squares total, with a neutral 2x2 center).
> - 3 Mortal Armies (Standard chess pieces: 1 Leader/King, 1 Queen, 2 Rooks, 2 Bishops, 2 Knights, 8 Pawns).
> - 1 Rebirth Army (1 Death piece, 1 Rebirth piece, 1 Leader, 1 Rook, 2 Bishops, 2 Knights, 8 Pawns). *Rebirth replaces the Queen. Death replaces a Rook.*
> - 1 Aura Ring (a physical ring or template marking the Radius of Ruin).
> - Boon Tokens (5 per player).
> - Leadership Point (LP) Tracker.
>
> ### 3. SETUP
> 1. Arrange the board. Mortal armies set up on the White, Black, and Grey quadrants (standard 4-player chess starting positions).
> 2. The Rebirth army sets up on the remaining (Red/Translucent) quadrant.
> 3. Place Rebirth on the Queen's starting square.
> 4. Place Death on one of the Rook's starting squares (Rebirth player's choice).
> 5. Place the Aura Ring under Rebirth.
>
> ### 4. PIECE MOVEMENTS
>
> **A. Mortal Factions (Players 2, 3, 4)** — move and capture exactly as in standard chess, with one exception: Pawns promote upon reaching the opposite edge of their starting quadrant, or the far edge of an adjacent quadrant.
>
> **B. The Rebirth Army (Player 1)** — all standard pieces move normally except:
>
> **REBIRTH (The Daughter)**
> - Movement: Moves exactly like a standard Queen.
> - Capture: Captures by displacement, like a Queen.
> - Immunity: Rebirth is immune to the Radius of Ruin. She cannot be "Veiled."
>
> **DEATH (The Mentor)**
> - Movement: Moves exactly like a standard King (1 square any direction).
> - The Void: Death cannot be captured. An enemy piece moving to his square is an illegal move (like moving into check). Death can move into squares attacked by enemies.
> - Passable: Friendly pieces may move through Death, but cannot end their turn on his square.
>
> ### 5. CORE MECHANICS (THE LESSON)
>
> **A. The Radius of Ruin (The Aura)** — Rebirth emits a 1-square aura in every direction. Any piece (other than Death or Rebirth) ending its turn within it becomes Veiled: it loses all special movement abilities, and for one full round can only move 1 square forward and cannot capture.
>
> **B. The Mentor's Sanctuary** — Any friendly piece ending its turn within 1 square of Death is immune to the Radius of Ruin.
>
> **C. Martyr's Boon** — On your turn, instead of moving, you may remove one of your own pieces (other than Rebirth, Death, or your Leader) to the Graveyard, gaining 1 Boon Token. Spend 1 Boon Token at the start of your turn to disable the Radius of Ruin for that whole turn.
>
> **D. The Soul Reservoir** — For every 3 friendly pieces in your Graveyard, Rebirth unlocks the Rebirth Dash: she may move through other pieces (friendly and enemy) during her movement phase, treating them as empty squares. She cannot end her movement on an occupied square. Pieces she passes through are unaffected by the Radius of Ruin unless she ends her turn adjacent to them.
>
> ### 6. TURN STRUCTURE
> Play proceeds clockwise, three phases per turn:
> - **Start of Turn:** Rebirth player announces any Boon Token spend; Veiled status is removed from pieces that were Veiled last round.
> - **Movement:** One standard move (or a Martyr's Boon sacrifice instead).
> - **End of Turn (Resolution):** Place the Aura Ring around Rebirth (if active); any piece in the radius not adjacent to Death becomes Veiled; check victory conditions; play passes left.
>
> ### 7. WIN CONDITIONS
>
> **Path 1 — Standard Checkmate:** A checkmated player is eliminated. If the Rebirth player's Leader is checkmated, the Mortal factions win collectively. A checkmated Mortal faction's remaining pieces become neutral obstacles (don't move, but block and can be captured). Rebirth herself cannot be checkmated — only her Leader.
>
> **Path 2 — Rebirth Wins via Leadership (Mercy):** The Rebirth player accumulates Leadership Points (LP) via Merciful Maneuvers; reaching 10 LP wins immediately.
> - Withdrawal (1 LP): moving a piece out of an enemy's attack range without capturing.
> - Shielding (1 LP): moving a piece between an enemy and your Leader/Rebirth without capturing the attacker.
> - Coexistence (1 LP, max 1/turn): ending your turn adjacent to an enemy piece without capturing it.
>
> **Path 3 — Mortal Factions Win via The Fall:** If Rebirth accidentally Veils 5 of her own friendly pieces over the course of the game, she loses control of her power and the Mortal factions win collectively.
>
> ### 8. EDGE CASES & CLARIFICATIONS
> - A Veiled piece cannot capture, but can still be captured normally.
> - An enemy piece that moves into the Radius of Ruin becomes Veiled at the end of that turn — making Rebirth a strong defensive piece.
> - The Radius of Ruin does not stack; it just refreshes its 1-turn duration.
> - Death cannot capture, nor be captured — he exists purely to reposition the Sanctuary.
> - Rebirth Dash does not trigger Veiling on pieces she passes over, only on those within 1 square of where she ends her turn.
>
> ### 9. VARIANT: 2v2 "THE PARTNERSHIP"
> - The Partner's Immunity: Rebirth's Mortal ally is NOT immune to the Radius of Ruin.
> - Shared Victory: Rebirth's 10 LP win condition wins for both teammates.
> - No The Fall: the "5 Veiled allies" loss condition is removed in 2v2, since it would be too easily exploited.

---

## 5. July 1, 2026 onward — the engine repo

`Loptr-Lab/veiled-dominion-engine` begins with `GDD.md`, `RULEBOOK_v0.1.md`, and the C# implementation (`GridTopology` for the 14×14 cross board, `BasePiece`, `RadiusOfRuinSystem`, `VeiledStateManager`) — building exactly the Stage 3 design above. No dice or card systems were ever carried into the codebase.

---

## Summary of the arc

| Stage | Date | Document | Dice? | Cards? | Chess? |
|---|---|---|---|---|---|
| 1 | Apr 25 | The Blueprint | No | No | Yes (core) |
| 2 | May 6 | Rulebook (hybrid) | **Yes — 2d6/1d8/d20** | **Yes — 52-card system** | Yes (Phase III only) |
| 2b | May 6–9 | 52 Cards of War / card PDF | — | Full card text | — |
| 3 | Jun 29 | Pitch Deck (pivot) | Cut | Cut | Yes (sole focus) |
| 3 | Jun 29 | Playtest Rulebook v0.1 | No | No | Yes (core) |
| 4 | Jul 1+ | GitHub engine repo | No | No | Yes (implemented) |
