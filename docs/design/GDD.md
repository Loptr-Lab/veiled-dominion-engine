VEILED DOMINION — Master Game Design Document

1. Executive Summary

Veiled Dominion is a 4-player chess variant that reimagines the board not as a battlefield of conquest, but as a classroom for the cosmos. The protagonist (Rebirth) is dangerously overpowered. Her challenge is not gaining strength, but mastering temperance. You don't win by destroying the board; you win by learning to exist on it without breaking it.

The Thesis: Every game teaches you to become more powerful. What if the lesson was the opposite?

2. Core Pillars

Asymmetry: One player (Rebirth) plays by completely different rules than the other three (Mortal Factions).
Restraint as a Mechanic: The most powerful piece on the board is a liability to her own team.
Alternative Victory: You can win the game without capturing a single enemy piece via the "Mercy" system.

3. The Signature Mechanics

Radius of Ruin: Rebirth emits a 1-square aura. Any piece (friendly or enemy) ending its turn within it is "Veiled" (stripped to Pawn-level movement for 1 turn).
The Sanctuary: Death (Rebirth's mentor) provides a 1-square safe zone where the aura cannot reach.
Martyr's Boon: Voluntarily sacrificing an ally grants a token to temporarily disable the aura.
Soul Reservoir: For every 3 friendly pieces in the Graveyard, Rebirth unlocks the ability to phase through other pieces.

## 4. The Document Matrix

This repository is modular. Dig deeper into the systems via the following files:

### Systems & Rules
→ `RULEBOOK_v0.1` — The playable, text-based rulebook. Piece movements, turn structure, and win conditions.
→ *(FAQ/edge-case doc not yet written — remove this link until one exists, or create `docs/FAQ_EDGE_CASES.md`)*

### Engineering & Architecture
→ `docs/UNITY_INIT.md` — Unity 2022 LTS URP environment setup, folder structure, and grey-box visual specs. (`docs/UNITY_PROJECT_SETUP.md` is a superseded duplicate; `UNITY_INIT.md` is the canonical doc.)
Note: C# logic (`BasePiece.cs`, `RadiusOfRuin.cs`, `VeiledStateManager.cs`) is located in `/src/`.

### Online Systems & Player Identity
→ `docs/PLAYER_IDENTITY_AND_RANKED_INTEGRATION.md` — Planned player-profile and ranked-play architecture using AT Protocol (rpg.actor) for portable identity, with server-side authority preserved for competitive integrity.

### Variant Proof-of-Concepts
→ `docs/variants/BACK_IN_DERRY.md` — High-pressure positional variant; the reference example for documentation-first variant submissions. (`docs/variants/BACK_IN_DERRY_VARIANT.md` is a superseded draft; `BACK_IN_DERRY.md` is the canonical doc.)
→ `docs/variants/SICKBOI_EXE.md` — Glitch/Corrupted ROM aesthetic for viral short-form video.

### Narrative & Lore
Kept internal per the existing note — no change needed.
