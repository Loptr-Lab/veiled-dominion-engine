# VEILED DOMINION — Master Game Design Document

## 1. Executive Summary

Veiled Dominion is a four-player chess variant that reimagines the board not as a battlefield of conquest, but as a classroom for the cosmos. The protagonist, Rebirth, is dangerously overpowered. Her challenge is not gaining strength, but mastering temperance. You do not win by destroying the board; you win by learning to exist on it without breaking it.

**Project invariant:** Power becomes mastery through restraint.

**Design question:** Every game teaches you to become more powerful. What if the lesson was the opposite?

The canonical target is the four-player game on a 14×14 cross-shaped board. See `docs/CANON_AND_CONTINUITY.md` for source authority and continuity boundaries.

## 2. Core Pillars

- **Asymmetry:** One player, Rebirth, plays by different rules from the three Mortal factions.
- **Restraint as a mechanic:** The most powerful piece on the board is a liability to her own team.
- **Alternative victory:** Leadership/Mercy play provides a non-capturing path to victory.

## 3. Signature Mechanics

- **Radius of Ruin:** Rebirth emits a one-square aura. Affected pieces ending a turn within it become Veiled according to the canonical rulebook.
- **Veiled lifecycle:** Veiling lasts until the start of the affected piece owner's next turn. It is owner-turn-based, not a generic fixed two-turn timer.
- **Sanctuary:** Death provides a one-square protected psychic space where qualifying friendly pieces are shielded from Radius of Ruin.
- **Martyr's Boon:** A voluntary allied sacrifice grants a Boon that can temporarily suppress Rebirth's aura.
- **Soul Reservoir:** Every three friendly pieces in the Graveyard unlocks Rebirth's ability to phase through other pieces.
- **Leadership/Mercy:** Merciful, non-capturing maneuvers earn Leadership Points; the current rulebook sets victory at 10 LP.

Rebirth's stated immunity to Veiling conflicts with the broader loss-of-control direction and with Duet's experimental behavior. The rulebook preserves the current immunity while this remains an explicit unresolved design decision.

## 4. Verified Document Matrix

### Canonical game documentation

- `docs/CANON_AND_CONTINUITY.md` — source hierarchy, continuity boundaries, cross-repository contract, and unresolved decisions.
- `docs/design/GDD.md` — canonical four-player design intent and system overview.
- `docs/RULEBOOK_v0.1` — playable four-player rules baseline, including turn structure and victory conditions.
- `docs/gameplay/rules.md` — gameplay rules and edge-case documentation; reconcile it through explicit review if it diverges from the rulebook.

### Intended C#/Unity implementation

The repository contains two inconsistent path/casing families:

- Lowercase paths: `src/board/GridTopology.cs`, `src/pieces/BasePiece.cs`, `src/systems/RadiusOfRuin.cs`, and `src/systems/VeiledStateManager.cs`.
- Uppercase paths: `src/Board/BoardCoordinate.cs`, `src/Board/BoardState.cs`, `src/Pieces/Piece.cs`, and `src/Systems/RadiusOfRuinSystem.cs`.

These are distinct paths on case-sensitive systems. Their ownership and intended consolidation must be resolved before implementation work. Documentation must not invent missing files or imply that placeholder architecture is complete.

Unity setup references currently include both `docs/UNITY_INIT.md` and `docs/UNITY_PROJECT_SETUP.md`. Their scopes should be compared before either is merged, renamed, or removed.

### Unrelated TypeScript exercise harness

The root `package.json` identifies the TypeScript package as `veiled-dominion-engine-exercise-harness`. Its `engine.ts`, `types.ts`, `engine.test.ts`, and related files model a six-position, two-owner Ember/Tide/Root/Gale exercise with Burning and Steam effects.

That harness is not the canonical four-player Veiled Dominion engine. Do not implement Radius of Ruin, Sanctuary, Veiling, or other canonical mechanics by extending it, and do not write canonical regression tests against it.

### Online systems and player identity

- `docs/PLAYER_IDENTITY_AND_RANKED_INTEGRATION.md` — planned AT Protocol (`rpg.actor`) identity and ranked-play architecture with server-side competitive authority.
- `src/integration/rpgActor/` and `tests/rpgActorAcceptance.spec.ts` — TypeScript integration work separate from the canonical board engine.

### Experimental repository

`Loptr-Lab/duet-solo-hackathon` is a separate two-player, 8×8, screen-reader-first mechanics experiment. Its fixed two-turn Veil timer, Rebirth loss-of-control rule, tiered promotion, and optional Fog Mode do not set four-player canon unless explicitly promoted.

### Variants and historical material

- `docs/variants/` contains variant concepts and proofs of concept; presence does not grant canonical status.
- `docs/variants/BACK_IN_DERRY.md` and `docs/variants/BACK_IN_DERRY_VARIANT.md` both exist and require an explicit authority decision rather than silent deletion or consolidation.
- Historical blueprints and older rulebooks remain design provenance, not current mechanics.
- Narrative adaptations and the standalone film reinterpretation remain distinct from rules authority.

## 5. Documentation Rules

- Do not silently promote experimental mechanics.
- Do not rewrite historical material as current canon.
- Do not create mechanics merely to make documents align.
- Label contradictions as unresolved design decisions until an authoritative source resolves them.
- Update documentation alongside implementation decisions and add regression coverage only to confirmed game-engine code.

