# Pennywise and Violet Repository Catalogue

**Audit date:** 2026-09-11  
**Scope:** All 17 ibloud repositories and all 3 Loptr-Lab repositories visible to the connected GitHub account. Code search was supplemented with recursive tree inspection for repositories not indexed by GitHub code search.

## Direct repositories

| Repository | Relationship | Authority and rights boundary |
| --- | --- | --- |
| [ibloud/violets-revenge](https://github.com/ibloud/violets-revenge) | Primary Violet game, lore, community, bot intake, playtest, music-licensing, and archived persona documents; also contains Pennywise references in bot/intake code | Authority for the Violet's Revenge implementation and its archive; not Veiled Dominion rules authority |
| [ibloud/sewers-and-shadows-bot](https://github.com/ibloud/sewers-and-shadows-bot) | Discord runtime containing Violet and Pennywise prompts/personas, chess and card agents, game managers, rules text, and float engines | Direct third-party-reference implementation; permission-dependent and noncommercial pending review |
| [Loptr-Lab/veiled-dominion-engine](https://github.com/Loptr-Lab/veiled-dominion-engine) | Back in Derry/Pennywise variant documents plus Violet ecosystem references | Canonical Veiled Dominion rules authority; Pennywise material is historical case-study material only |
| [Loptr-Lab/duet-solo-hackathon](https://github.com/Loptr-Lab/duet-solo-hackathon) | Violet appears in dueling-system and Weaver design documentation | Experimental mechanics lab; does not set four-player canon |

## Adjacent documentation

| Repository | Relationship | Boundary |
| --- | --- | --- |
| [ibloud/ibloud.github.io](https://github.com/ibloud/ibloud.github.io) | Portfolio, ecosystem architecture, historical timeline, provenance, and rights-matrix references to Violet | Public ecosystem map; not gameplay or bot authority |
| [ibloud/duet_engine_architecture](https://github.com/ibloud/duet_engine_architecture) | Related extracted mechanics architecture | No direct Pennywise/Violet match found in the audited default branch; adjacent systems reference only |

## Examined with no direct default-branch match

The following visible repositories were checked and produced no direct Pennywise/Violet match in indexed code or the inspected non-indexed tree/content pass: living-room-poetry, tarantula-clone-hero, kujo-beatdown-beatsaber-map, ren-rhapsody, awesome-open-source-games, Paragon-Reborn, ren-tap-tap-revenge, battle-the-beast, ibloud-ivxx-story-lab, inpatient-corridors-review, made-sick, knox-hill-site, narrative-provenance, and Loptr-Lab/training.

Inpatient Corridors, Battle the Beast, and other ecosystem projects remain related at the portfolio or methodology level, but the audit did not find a direct Pennywise/Violet implementation on their default branches.

## Known limitations

- GitHub code search covers default branches and may not expose deleted files, unmerged branches, releases, Actions artifacts, wikis, issues, private external storage, or Discord history.
- Git history preserves earlier material even when the current branch is later sanitized.
- A future repository, branch, wiki, or transferred project must be added when discovered.

## Required handling

1. Do not consolidate these repositories merely because they share characters or mechanics.
2. Treat sewers-and-shadows-bot as the direct Discord implementation dependency.
3. Treat all Pennywise persona, dialogue, naming, and franchise expression as permission-dependent.
4. Extract reusable mechanics into original Veiled Dominion examples.
5. Link technical findings by commit or issue while preserving each repository's authority.
