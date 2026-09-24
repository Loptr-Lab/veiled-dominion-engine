# ADR-0002: Shared Mechanics Layer Extraction

- **Status:** Accepted for implementation as an architectural boundary; no Veiled Dominion canon is promoted by this ADR.
- **Date:** 2026-09-24
- **Scope:** Mechanics architecture only

## Context

Money Game has developed explicit contracts for actors, state changes, event translation, reactions, counterreactions, and cascades.

Veiled Dominion has an independent canonical game architecture. Its repository establishes that the engine owns canonical game state and rule enforcement, while the UI owns presentation. Its continuity policy also requires experimental or cross-repository mechanics to be explicitly classified rather than silently promoted.

The two systems therefore may share mechanics without becoming the same game.

## Decision

Establish a **shared mechanics layer as a reusable design boundary**, not as a new game canon and not as a replacement for either project's existing architecture.

The shared layer contains only mechanics that can be expressed without importing Money Game's socioeconomic semantics or Veiled Dominion's fictional/game-specific semantics.

### Shared mechanics primitives

1. **State** — A canonical game state contains authoritative variables and entities. The engine, not presentation code, owns authoritative state transitions.
2. **Actors** — An actor has identity, current state, capabilities, constraints, objectives or behavior rules, and available actions. Actor schemas are extensible by the host game.
3. **Action** — A player or system actor proposes an action against the current state. The authoritative engine validates the action and resolves its consequences.
4. **State transition** — A valid action or external trigger produces a deterministic state transition and result/event metadata.
5. **Event → Outcome → Reaction → Counterreaction** — A triggering event can alter state; state changes can create reactions; reactions can create counterreactions; cascades terminate according to host-game rules.
6. **Cascade** — A cascade is a bounded chain of causally linked state transitions. Loop prevention, ordering, depth, and termination are host-game contracts; the shared layer does not invent numerical values.
7. **Separation of mechanics and presentation** — The shared mechanics layer produces authoritative state and results. Rendering, animation, accessibility presentation, and narrative display consume those results without becoming the source of truth.

## Non-goals

This ADR does **not**:

- make Money Game a Veiled Dominion subsystem;
- make Veiled Dominion an economic simulation;
- promote Money Game's six ledgers into Veiled Dominion canon;
- promote Rebirth, Death, Radius of Ruin, Sanctuary, Martyr's Boon, Soul Reservoir, Leadership Points, or other Veiled Dominion mechanics into Money Game;
- define The Weaver's identity, abilities, or canonical role;
- define new numerical balance values;
- replace either project's existing rulebook, invariant, GDD, or canonical engine;
- create a third constitution governing either game.

## Host-specific instantiation

### Money Game

Money Game may instantiate the shared primitives using its existing six-ledger and influence architecture:

`external event → ledger impact → player choice → social outcome → cascade`

Its existing constitutional invariant remains authoritative:

**Money Game simulates the movement of power, not the movement of prices.**

### Veiled Dominion

Veiled Dominion remains governed by its existing project invariant:

**Power becomes mastery through restraint.**

Its current canonical game remains the four-player, 14×14 design. Existing mechanics and unresolved decisions remain governed by the current GDD, rulebook, and canon/continuity policy.

The shared layer provides reusable mechanics vocabulary only.

## Canon and promotion rule

A mechanic becomes Veiled Dominion canon only through the repository's existing explicit promotion process.

Presence in this shared layer is **not** promotion.

If a future implementation adopts a shared primitive, the implementation must document the host-specific meaning and authority.

## Implementation rule

Do not refactor the existing Veiled Dominion engine into this abstraction until the canonical C#/Unity path ownership issue documented in the GDD is resolved.

The first implementation is therefore documentation-level extraction and contract alignment. Code-level abstraction is a subsequent, explicit decision.

## Verification

A change is safe under this ADR if:

- existing Veiled Dominion canonical rules remain unchanged;
- no experimental mechanic is silently promoted;
- engine truth remains authoritative;
- UI remains presentation-only;
- host-specific semantics remain outside the shared primitive definitions;
- unresolved mechanics remain explicitly unresolved;
- the shared layer can be removed without changing the canonical Veiled Dominion rules.

## Consequence

Money Game and Veiled Dominion can evolve independently while sharing a vocabulary and eventual deterministic mechanics infrastructure.

This is an architectural reuse boundary, not a merger.