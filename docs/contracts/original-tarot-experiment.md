# Receiving contract: original tarot hero experiment

Date: 2026-10-08. Status: Experimental; owner-approved design direction.  
Rules authority: external experiment only; no change to the four-player GDD/rulebook.  
Source type: original design proposal using generic symbolic concepts; historical inspiration remains external research.  
Implementation: documentation only; no runtime, schema or bot integration in this increment.  
Commercial use: not cleared by this contract; existing repository licenses and contributor rights apply.  
Accessibility review: requirements specified; human/iPad testing pending.  
Rights review: no third-party art, asset files or character content added; full release clearance pending.  
Tracking: [#52](https://github.com/Loptr-Lab/veiled-dominion-engine/issues/52).

## Source and ownership

The source proposal is [Original hero cards and consequential stories](https://github.com/ibloud/Paragon-Reborn/blob/feature/original-tarot-direction/docs/ORIGINAL_HERO_CARD_DIRECTION.md), with its [rights boundary](https://github.com/ibloud/Paragon-Reborn/blob/feature/original-tarot-direction/docs/ORIGINAL_CONTENT_RIGHTS.md) and [source issue](https://github.com/ibloud/Paragon-Reborn/issues/16). Links identify the companion review branch until merged; pin an approved revision when implementing.

This repository receives a future isolated browser/headless experiment. It does not replace its canonical four-player game, rename Rebirth, alter PIXIE, or turn the six-position TypeScript exercise into a production hero engine. Keep code in a distinct module when implementation is authorized and specified. No new source-code runtime is included here.

## Mechanical boundary

The experiment separates hero archetype, player-selected build modifiers, and story opportunities. Suit roles are design hypotheses: Swords for precision/control, Staves for initiative, Cups for support and Coins for preparation. Archetypes represent tensions, not destiny or personality assessment. Upright/reversed approaches require explicit costs and counters, not better/worse rankings. Card number is not power.

The source's first target remains one original hero, one modifier and one authored choice. Three heroes, twelve build cards, two approaches per hero and three equipped slots are subsequent hypotheses, not implementation claims. Do not import the historical third-party roster as IDs, defaults, prompts or fixtures.

Every runtime effect needs an exact cost, trigger, cooldown, duration, stacking/cap rule, cancellation behavior and legal response. Preserve existing shared v1 fixtures. A new version must include explicit compatibility and migration notes before it is normative. Baseline chess movement, Veiling, Sanctuary and victory conditions receive no changes from this experiment.

## Story adapter requirements

Future state records content/rules versions, seed, selected IDs, offered choices, accepted choice-event IDs, consequences, party/location/relationship flags, seen encounters and provenance references. Filter authored encounters for eligibility before seeded selection; record the random algorithm and stable ordering. Provide an authored fallback if none qualify. Choice consequences are atomic and idempotent. Reject unavailable choices; save/resume preserves the pending decision.

Combat and narrative state have separate authority. Story variation cannot silently change competitive stats or rewards. Cooperative modifiers must have a tested difficulty budget. Bots use the same rules and observable information as players; narration gives them no hidden advantage. Generative dialogue is deferred and cannot set mechanics, rewards or canon. The runtime must remain playable with narration disabled.

## Acceptance matrix for implementation

| Input or action | Expected observation |
| --- | --- |
| Same versions, seed, state and choices | Same selected encounters and final consequences |
| Absent character or incompatible relationship flag | Contradictory scene excluded |
| Empty eligible set | Authored fallback, no stalled run |
| Same choice-event ID delivered twice | One consequence only |
| Invalid/unoffered choice | Rejected without state mutation |
| Save and reload at a decision | Choices and later outcome preserved |
| Alternative consequential choice | Different later objective or ending condition |
| Different story in competitive configuration | Identical combat values and reward rules |
| Card combo stress test | Bounded resources, finite control, no recursive trigger exploit |
| Keyboard/screen reader/iPad; no color or motion | Every effect and choice still understandable and operable |

These are future acceptance scenarios, not tests already passing. Measure balance by matchup, skill and mode; combine bot exploit checks with human clarity/agency tests. Do not infer balance from equal point totals or a small win-rate sample.

## Rights and licensing

Use original writing, generic placeholders and subsequently commissioned/cleared assets. A reference link does not relicense source documentation. LICENSE.md remains authoritative for this repository's license map; no new grant covers external characters, artwork, brands or source assets. Keep third-party asset files and historical lore out of browser bundles and generation inputs. Do not assume a tarot deck's art or guidebook is public domain because its symbolism is old.

New content must have creator, source/creation record, license, permitted use, attribution, modifications, dependencies, AI restrictions and review disposition recorded. Product title and character labels remain provisional until reviewed. No declaration of completed IP separation or commercial clearance is made.

## Rollout

1. Merge/reconcile the source design and this receiving document through ordinary repository review.
2. Agree exact effects and a versioned data proposal; resolve license/provenance questions for the actual implementation.
3. Build the isolated one-hero proof with deterministic story and combat checks.
4. Conduct human accessibility and balance review before expansion.
5. Add Codex or other presentation adapters only against approved versioned data. Do not change other bots or games by implication.
