# Veiled Dominion Canon and Continuity

## Purpose

This document defines which Veiled Dominion sources have authority, how related tellings connect, and how experimental mechanics may enter the canonical game. It is a continuity policy, not a replacement for the rulebook.

The canonical game is the four-player, 14×14 cross-board design maintained in `Loptr-Lab/veiled-dominion-engine`. `Loptr-Lab/duet-solo-hackathon` is a separate experimental mechanics lab and does not set four-player rules.

## Project invariant

> Power becomes mastery through restraint.

For Rebirth, mastery does not mean learning to control others. It means restraining herself so that others remain capable of becoming themselves. Psychic restraint is the goal; loss of control is the terminal failure state.

## Source hierarchy

When sources conflict, use the following order and preserve the lower-ranked source's provenance rather than silently rewriting it.

1. **Primary narrative canon**
   - Death's Daughter origin myth / manga
   - The Daughter's Curriculum
2. **Current game canon**
   - `docs/design/GDD.md`
   - `docs/RULEBOOK_v0.1`
   - The four-player, 14×14 cross-board game is the canonical rules target.
3. **Adaptation**
   - Urban Alien Adventures
4. **Separate reinterpretation**
   - *Rebirth, Death's Daughter* film treatment
5. **Experimental**
   - `Loptr-Lab/duet-solo-hackathon`
   - Fog Mode
   - Resonance and sound presentation language
6. **Historical/archive**
   - *Daddy's Little Mortis — Game Blueprint*
   - Old Dice/Card/Chess Veiled Dominion rulebook

Historical sources record design provenance. They do not become current rules unless an explicit decision promotes them.

## Continuity boundaries

### Narrative canon

The Death's Daughter origin material establishes Rebirth's mythic origin, sovereign agency, direct access to God, the Flaming Sword, and Death as void and anchor.

### Game canon

The current game canon is the four-player design documented in this repository. Its core mechanics include Rebirth's asymmetric power, Death as uncapturable mentor and anchor, Radius of Ruin, Veiling, Sanctuary, Martyr's Boon, Soul Reservoir, Leadership/Mercy victory, standard checkmate, and the Mortal factions' collective victory condition.

### Adaptation

Urban Alien Adventures adapts the five-lesson continuity spine. It may interpret the themes dramatically, but it does not define game rules.

### Separate reinterpretation

The *Rebirth, Death's Daughter* film treatment is a brutalist science-fiction reinterpretation. Keeper is not literally Death, PIXIE is not literally Rebirth, the Ledger is not the game board, and the film's Daughter is not a literal game piece.

### Experimental work

Duet, Fog Mode, and other prototypes may test alternatives. Experimental behavior must be named as experimental and explicitly promoted by an authoritative design decision before it becomes canonical.

Resonance describes psychic intrusion, psychic defense, mastery/restraint, and cinematic feedback. It is presentation language—not a stat, HP system, damage type, or resource.

### Historical/archive work

Archived designs remain available as provenance. Do not normalize their terminology or mechanics into current canon merely to make documents appear consistent.

## The five-lesson continuity spine

*The Daughter's Curriculum* bridges mythology and mechanics without serving as mechanically exhaustive rules text:

1. Ride the Horse
2. Beware the Bishop
3. Take the Castle
4. Knight the Pawns
5. Rival the Queen

Urban Alien Adventures maps its episodes to those lessons:

| Episode | Curriculum lesson |
| --- | --- |
| The Setup | Ride the Horse |
| Bid for Power | Beware the Bishop |
| The Kingdom Falls | Take the Castle |
| The Alliance | Knight the Pawns |
| Journey's End | Rival the Queen |

The mapping establishes thematic continuity, not literal mechanical equivalence.

## Cross-repository rules contract

### Canonical Veiled lifecycle

A Veiled piece remains Veiled **until the start of the affected piece owner's next turn**. Expiration is tied to that owner's turn boundary, not to a generic fixed two-turn timer.

Radius of Ruin applies at a one-square range around Rebirth according to the rulebook. Sanctuary prevents qualifying friendly pieces near Death from becoming Veiled. Reapplication behavior must remain deterministic and should be covered by regression tests once a confirmed canonical engine implements these systems.

### Duet divergence

Duet currently uses a fixed `DURATION_TURNS: 2`, allows Rebirth to become Veiled, and treats a Veiled Rebirth as immediate `rebirth_lost_control` game over. Those behaviors are experimental. They do not modify the four-player contract.

### Unresolved design decision: Rebirth immunity

`docs/RULEBOOK_v0.1` says Rebirth is immune to Veiled status. The wider narrative direction treats loss of control as terminal failure, while Duet experimentally removes the exemption and ends the game when Rebirth becomes Veiled. The four-player Mortal victory condition separately counts Rebirth Veiling five friendly pieces.

No source currently inspected resolves whether canonical four-player Rebirth can herself become Veiled. Until an authoritative decision does so:

- preserve the rulebook's current immunity statement;
- do not promote Duet's loss-of-control implementation into the four-player rules;
- keep the contradiction visible in design review and pull-request notes.

## Repository and implementation policy

The root `engine.ts`, `types.ts`, and related TypeScript tests implement a six-position, two-owner Ember/Tide/Root/Gale coding exercise. They are not the canonical Veiled Dominion engine and must not receive four-player regression tests.

The repository also contains partial C#/Unity architecture in both uppercase and lowercase path variants. Resolve that structure explicitly before extending implementation code. Documentation must name only files that exist, preserve meaningful casing differences, and avoid implying that planned or placeholder code is complete.

Any cross-repository mechanics change must state whether it is:

- Canonical
- Narrative canon
- Adaptation
- Experimental
- Historical/archive
- Unresolved design decision

