# Pentaract game metadata compatibility — read-only test

**State:** fixture-only compatibility experiment, not a published ATproto/Pentaract game, registration, accessibility certification or deployed app.

**Collaboration:** [Upstream issue #29](https://github.com/gamesgamesgamesgamesgames/lexicon/issues/29). Canonical game sources remain [GDD](../../../../docs/design/GDD.md), [rulebook](../../../../docs/RULEBOOK_v0.1), and [continuity policy](../../../../docs/CANON_AND_CONTINUITY.md); this test does not set canon.

## Checked contract (2026-11-15)
- [Game record lexicon](https://github.com/gamesgamesgamesgamesgames/lexicon/blob/main/src/lexicons/games/gamesgamesgamesgames/game.json): required `name`, `createdAt`, `applicationType`; optional `summary`, `modes`, `themes`, `websites`.
- [Shared definitions](https://github.com/gamesgamesgamesgamesgames/lexicon/blob/main/src/lexicons/games/gamesgamesgamesgames/defs.json): `applicationType: game`, `modes: multiplayer`, `themes: fantasy`, `website: {url, type: official}`.
- [Publishing guide](https://github.com/gamesgamesgamesgamesgames/lexicon/blob/main/packages/docs/content/docs/guides/publishing-a-game-record.mdx) is **not** invoked. The fixture includes `createdAt` to satisfy the raw record schema. Its date is a test fixture timestamp, **not** the project's founding date, game launch date, or evidence of an ATproto write.

## Field mapping

| Upstream property | Fixture source / scope | Status |
| --- | --- | --- |
| `name`, `applicationType` | Repository title and strategy-game project | Mapped |
| `createdAt` | Fixture test timestamp | Synthetic; never publish as project date |
| `summary` | README: four-player, early open prototype | Mapped |
| `modes`, `themes` | Four-player design; fantasy themes | Mapped as descriptive tags; not verified platform behavior |
| `websites` | Canonical source repository | Mapped |
| `releases`, `publishedAt` | No verified shipping information | Omitted |
| `platformFeatures`, `languageSupports`, `media` | No current independently validated capability/assets prepared for this test | Omitted |
| `ageRatings`, `externalIds`, `multiplayerModes` | No verified third-party IDs, ratings, or runnable-player limits | Omitted |
| Contributor credits | Separate upstream actor/org credit records requiring subject + consent validation | Deferred |
| Physical/print-and-play ruleset association | No dedicated verified mapping within base game record | Unsupported / upstream discussion |
| Detailed accessibility verification and limitations | Project documentation describes requirements, **not** independent user acceptance | Unsupported / upstream discussion |
| Achievements, saves, player identity | Outside public game metadata and privacy boundary | Excluded |

## Run

```sh
node --test tests/interop/pentaract/fixture.test.cjs
```

The tests check required fields, accepted property names, and absence of unverified capability claims. This is a **limited structural smoke test** against the inspected schema; it is **not** a complete Lexicon validator, API/PDS interoperability test, or live integration. Schema changes upstream require comparison and updating this fixture and contract deliberately. No dependency, credential, network call, change to main gameplay, production publication, or private player data is introduced.

## Follow-up gate

Wait for upstream feedback on [#29](https://github.com/gamesgamesgamesgamesgames/lexicon/issues/29) before proposing new fields or publishing game records. Read-only testing can proceed without a maintainer response.
