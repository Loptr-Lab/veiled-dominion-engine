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
4. The Document Matrix

This repository is modular. Dig deeper into the systems via the following files:

Systems & Rules

→ RULEBOOK_v0.1.md — The playable, text-based rulebook. Piece movements, turn structure, and win conditions.
→ FAQ_EDGE_CASES.md — Clarifications on the Veiled state, Rebirth Dash, and 4-player interactions.
Engineering & Architecture

→ UNITY_INIT.md — Unity 2022 LTS URP environment setup, folder structure, and grey-box visual specs.
Note: C# Logic (BasePiece.cs, RadiusOfRuin.cs, VeiledStateManager.cs) is located in /src/.
Variant Proof-of-Concepts

We use variants to prove the underlying logic engine can handle any thematic skin, not just our core gothic lore.

→ SYSTEMS_QUARTET_VARIANT.md — Mapping the engine to socio-economic philosophy (Veblen, Fresco).
→ DARK_BAUHAUS_VARIANT.md — Abstract geometric gallery edition & UI/UX status effect testing.
→ SICKBOI_VARIANT.md — Glitch/Corrupted ROM aesthetic for viral short-form video.
Narrative & Lore

To maintain a clean, systems-focused public repo, the lore bible (The Daughter's Diary, The Queen's Song, Daddy's Little Mortis branding) is kept strictly internal. See the private Google Drive 00_INTERNAL folder for narrative assets.
5. Visual Language

Death (The Void): Musou Black / Black 4.0. Ultra-matte, light-absorbing void.
Rebirth (The Spark): Translucent resin with internal LEDs. Warm amber glow.
The Board: Polished obsidian or dark glass. The board is a reflection of the player.
Project: Loptr Lab | License: CC BY-NC-SA 4.0 (Open Process)
