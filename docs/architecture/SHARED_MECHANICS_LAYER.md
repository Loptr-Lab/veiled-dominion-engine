# Shared Mechanics Layer

**Status:** Reusable mechanics boundary. Not Veiled Dominion canon.

## Purpose

This document defines the smallest mechanics vocabulary that can be shared between Money Game and Veiled Dominion without merging their game identities, rules, or fictional systems.

It sits **below host-game design** and **above implementation details**.

```text
                 SHARED MECHANICS
                       │
          ┌────────────┴────────────┐
          │                         │
      MONEY GAME              VEILED DOMINION
   socioeconomic host         restraint/chess host
```

## 1. Canonical State

The host engine owns authoritative state.

A state consists of:
- entities/actors;
- state variables;
- legal actions;
- active effects or conditions;
- relationships or constraints required by the host game;
- event/result metadata.

The shared layer does not prescribe which state variables a game must have.

## 2. Actors

An actor is an entity capable of producing or receiving state changes.

Generic actor contract:

```text
Actor
├── identity
├── state
├── capabilities
├── constraints
├── objectives / behavior
└── available actions
```

The host game defines the meaning of each field.

Money Game's factions are one host-specific implementation.

Veiled Dominion's players and pieces are governed by its own canonical rules.

## 3. Actions

```text
actor intent
    ↓
validate against canonical state
    ↓
resolve
    ↓
produce next state + result metadata
```

The shared layer requires deterministic resolution but does not define the host game's legal moves.

## 4. State Transitions

A state transition is the authoritative result of a valid action or system trigger.

```text
Stateₙ + Trigger/Action
          ↓
   deterministic resolver
          ↓
       Stateₙ₊₁
          +
    result/event metadata
```

The frontend may render the result but must not independently decide the outcome.

## 5. Causal Event Chain

The reusable causal vocabulary is:

```text
Event
  ↓
Outcome
  ↓
Reaction
  ↓
Counterreaction
  ↓
Further state transition
```

This is a mechanics pattern, not a requirement that every host game use external-world events.

Money Game uses real-world/economic events as one source of triggers.

Veiled Dominion can use its own game-state triggers.

## 6. Cascades

A cascade is a sequence of causally linked transitions.

```text
Trigger
  ↓
Transition
  ↓
Reaction
  ↓
Transition
  ↓
Counterreaction
  ↓
...
```

The host game must define:
- what creates a reaction;
- ordering;
- loop prevention;
- concurrency;
- termination;
- visibility;
- any depth or budget limits.

No shared numerical defaults are established here.

## 7. Conditions and Effects

A host game may represent temporary or persistent conditions as state.

The shared layer does not prescribe duration semantics.

For example, Veiled Dominion's canonical Veiled lifecycle remains an independent host rule: it expires at the start of the affected owner's next turn. That rule is not generalized into the shared layer.

## 8. Presentation Boundary

The shared mechanics layer returns authoritative state and results.

Presentation may:
- render state;
- explain results;
- animate transitions;
- expose accessibility equivalents;
- provide player interaction.

Presentation may not become an alternate rules engine.

This aligns with Veiled Dominion's existing architecture boundary: the engine owns truth; the UI owns presentation.

## 9. Host Instantiation: Money Game

Money Game supplies host-specific semantics:

```text
External Data
    ↓
Event Ingestion
    ↓
Event Classification
    ↓
Signal Extraction
    ↓
Ledger Impact
    ↓
Player Choice
    ↓
Social Outcome
    ↓
Cascade
```

Its six ledgers and influence model remain Money Game-specific.

Nothing in this document changes the Money Game constitutional invariant.

## 10. Host Instantiation: Veiled Dominion

Veiled Dominion supplies its own semantics:

```text
Player Action / Canonical Trigger
            ↓
       Engine Validation
            ↓
      State Transition
            ↓
       Rule Resolution
            ↓
   Result / Event Metadata
            ↓
      Next Turn / Effects
```

The current four-player, 14×14 rules remain authoritative.

The shared layer does not alter:
- Rebirth;
- Death;
- Radius of Ruin;
- Veiling;
- Sanctuary;
- Martyr's Boon;
- Soul Reservoir;
- Leadership/Mercy;
- Mortal victory conditions.

Those remain Veiled Dominion-specific rules.

## 11. The Weaver Boundary

**The Weaver is not defined by this document.**

If The Weaver later uses the shared mechanics layer, its role must be specified as a Veiled Dominion host implementation.

This document therefore provides a place for Weaver mechanics to consume shared primitives without declaring what The Weaver *is*.

## 12. Promotion Rule

A shared mechanic is not automatically canonical in either host.

Promotion requires an explicit host-specific design decision and must be recorded through that project's existing authority mechanism.

## Safety Test

Before merging a future shared-mechanics implementation, ask:

1. Can this mechanic be described without Money Game-specific economic meaning?
2. Can it be implemented without changing current Veiled Dominion rules?
3. Is the host-specific meaning documented separately?
4. Does the engine remain the source of truth?
5. Has any experimental behavior been accidentally promoted?
6. Could removing the shared layer leave the host game's canonical rules unchanged?

If any answer is **no**, the change is not yet a safe shared-layer implementation.