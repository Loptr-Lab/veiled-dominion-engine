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

For the cross-project placement of the Weaver, PIXIE, Duet, and 52 Cards of War, see the [Duet project bible](https://github.com/Loptr-Lab/duet-solo-hackathon/blob/main/docs/PROJECT_BIBLE.md). Its external [52 Aces reading-list reference](https://52aces.com/reading-list/) is research context only. Neither the Weaver's proposed collaboration nor an outside reading list changes this source hierarchy, grants contributor rights, or promotes experimental cards or mechanics into the four-player game.

## Continuity boundaries

### Narrative canon

The Death's Daughter origin material establishes Rebirth's mythic origin, sovereign agency, direct access to God, the Flaming Sword, and Death as void and anchor.

#### Rebirth’s voice and performance

- **Point of view.** Rebirth speaks as Death’s daughter. She has firsthand familiarity with death and its aftermath. Give her the practical detail that a stranger to that world would miss. Being Death’s daughter is less fun than it sounds, and she can admit that with dry affection.
- **Humor.** Death’s pronunciation makes “Rebirth” sound like “afterbirth.” The awkwardness is part of their family dynamic and belongs to his delivery. Preserve the sound-alike when writing the exchange. Her humor makes mortality and the practical realities of life after death easier to talk about. Aim the joke at the awkwardness, the system or her own situation. Give grief room to land.
- **Scale.** She can describe an enormous cosmic problem in language from everyday life. In the ecological satire concept, Gaia cries out after humanity’s exploitation and the Galactic Council hears her. Earth becomes the subject of a bidding war, like a neighborhood being gentrified, while people are too absorbed in petty feuds to recognize that they are not alone or care for the home that sustains them. Use the neighborhood analogy to ground her delivery. The Council and bidding war are story-treatment material and this note sets no game rules.
- **Continuity check.** Read the scene aloud. Check whose line carries the joke, whether the humor makes room for something painful, and whether the cosmic stakes remain concrete. Keep Rebirth’s perspective distinct from PIXIE’s interface voice and the Grad Student’s narration.

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

## Walking the Path — dice, cards, chess

The existing [rules page](../rules.html) names this sequence as stages in the Daughter's education. The [design evolution archive](../VEILED_DOMINION_DESIGN_EVOLUTION.md) preserves the original hybrid's three phases. This is the story/curriculum order, not the current software delivery order or a claim that every stage is playable.

| Stage | Original design record | Narrative reading (interpretation) |
| --- | --- | --- |
| Dice — Fortune & Foundation | Chance, resources, risk and establishing a power base. | The Daughter learns to act within circumstances she did not choose. |
| Cards — Schemes & Skirmishes | Four suits, a War Hand, hidden information, support and defense. | The Queen learns to read competing intentions, negotiate loyalties and distinguish a binding rule from a choice. |
| Chess — The Fog of War | Spatial positioning, leadership and consequences in the archived hybrid. | Rebirth must exercise her power without making everyone else disposable; winning through restraint rather than domination. |

These phases are distinct from the five curriculum lessons above; no one-to-one stage/lesson mapping is established. In particular, **Rival the Queen** is the final named lesson, not evidence that the Queen must marry the King to win.

### Relationship to Duet and Veiled Dominion

- **Origin:** Death's Daughter supplies the mythic foundation; Rebirth's birth and education precede her mastery.
- **Duet (experimental, earlier chapter):** the rules page describes pawn promotion into Rebirth, a readiness threshold, and the Sealed Deck reward. The 52-card system is described there through Death's/King's and the Daughter's/Queen's worldviews. The effect of a drawn hand is explicitly unfinished. The page describes these characters learning each other's leadership styles.
- **Veiled Dominion (current baseline):** the [GDD](design/GDD.md) and [rulebook](RULEBOOK_v0.1) retain one Rebirth player versus three Mortal players on the 14×14 board. Mercy and collective victory demonstrate that control of others is not the only route to winning.
- **Later chapter (open concept):** the same rules page describes four players against Death and the Daughter as a unified opposing force. Its wording describes them as grown and married; the relationship outcome, control model, any new piece, and win conditions are not settled mechanics. Do not treat that passage as a compulsory marriage requirement or as the current four-player baseline.

The rules page traces the alternative victory philosophy to Lady Violet questioning why there can only be one winner. The Queen's agency and the possibility of victory without an imposed bond are the narrative direction; exact Knight/alliance mechanics and the later campaign outcome require separate design approval.

### Build order and transition boundaries

The rules page expressly deprioritizes dice relative to cards. The archived hybrid is historical; the later chess-first pivot is recorded in the archive. Duet's Sealed Deck unlock is a separate experimental readiness mechanism and does not reverse the educational order. No cross-game resource transfer, unlock criteria for dice-to-cards-to-chess, deck effects, or four-against-two control system is specified here. Do not implement these from the continuity map alone.

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

## Variant authority

`docs/variants/VARIANT_REGISTRY.yml` is the canonical classification index for variant status, provenance, implementation state, rights/accessibility review, and rules authority. It does not itself grant canonical rules authority; the authoritative GDD and rulebook remain the promotion mechanism.

`docs/variants` contains models, incubation work, and case studies. None sets canonical rules unless an explicit maintainer decision updates the authoritative GDD and rulebook.

- Dread Pressure is an original documentation model.
- Corrupted ROM is an original incubation experiment with mandatory Safe Mode.
- Back in Derry/Pennywise material is a permission-dependent historical reference.
- Discord exhibitions, supporter rewards, and store mockups do not create canon or commercial permission.
- Systems Quartet is historical provenance and a non-canonical prototype.
- Dark Bauhaus is a historical presentation experiment and non-canonical.
- Paracausal Edition is a deferred third-party reference concept and is not cleared for commercial or canonical use.

See `docs/variants/VARIANT_REGISTRY.yml`.
