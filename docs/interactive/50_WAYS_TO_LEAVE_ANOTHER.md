# 50 Ways to Leave Another — Interactive Narrative Blueprint

## Purpose

This document establishes the first implementation layer for **50 Ways to Leave Another** as a successor/expansion narrative inside the Veiled Dominion ecosystem.

The prototype is deliberately small. It demonstrates a narrative model in which player choices alter persistent state and therefore change the meaning of later scenes, rather than merely selecting isolated alternate endings.

## Canonical relationship to Veiled Dominion

The Lady Violet/Sebastien arc asks:

> Who gets to decide my life?

Veiled Dominion expands that question to:

> Who gets to decide the rules?

50 Ways to Leave Another advances it to:

> What happens when people decide they do not have to stay?

The project should therefore be treated as a **successor/expansion story** unless later canon establishes a direct continuation with the same protagonists.

## Prototype principles

1. **Persistent state over branch-count.** Choices change variables that survive recombination.
2. **Convergence is intentional.** Branches can return to shared scenes while preserving their consequences.
3. **Meaning changes, not just endings.** The same line, person, or location can read differently depending on prior choices.
4. **Agency is the mechanic.** The player should repeatedly confront whether they are choosing, complying, rescuing, possessing, escaping, or redefining the rules.
5. **No false choice architecture.** If two choices produce the same state and meaning, they should normally be collapsed.

## First playable slice

The first slice uses Violet and Sebastien as the canonical bridge. It begins at the airship encounter, tests three different approaches to agency, then reconverges at the moment the ship rises.

The player tracks:

- `trust` — willingness to believe or understand another person.
- `freedom` — willingness to act outside an assigned role.
- `control` — tendency to impose an outcome on another person.

The important design move is that **control is not simply a bad-ending meter**. It is a narrative condition that changes later interpretation.

## Next implementation pass

- Add a second decision after the airship rises.
- Persist state into a `leave` choice.
- Create at least three semantically distinct exits: leave the person, leave the role, leave the story.
- Add a convergence scene that acknowledges the player's accumulated state.
- Add tests for every state transition before integrating a graphical client.

## Rights/production gate

This prototype is an internal narrative implementation artifact. Before commercial publication, the project should have documented chain of title for the underlying story/IP and written agreements covering contributors, commissioned work, music, performer rights, and any interactive/AI/digital-replica uses that apply to the production.

The repository currently distinguishes software licensing from original narrative/documentation/art licensing. This prototype should remain in the appropriate rights-controlled project area rather than being treated as generic engine code.
