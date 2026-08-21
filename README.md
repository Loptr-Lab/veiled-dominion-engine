# Veiled Dominion Engine

Veiled Dominion is a 4-player chess variant that reimagines the board not as a battlefield of conquest, but as a classroom for restraint. One player controls **Rebirth**, a piece dangerously overpowered by standard rules. The other three must cooperate—without a formal alliance—to suppress her by mastering restraint.

**Status:** Early open prototype (v0.1). Core rules and architecture are documented; engine implementation is in progress. See [`ARCHITECTURE_OVERVIEW.md`](./ARCHITECTURE_OVERVIEW.md) for what's built.

---

## This Is the Game Repo

This repository is the actual **Veiled Dominion game engine** (C#/.NET, Unity) — game design, rules, and architecture.

If you're looking for the **candidate coding exercise** (TypeScript, used for hiring and VRS-supported training), that's a separate, self-contained repo: **[github.com/Loptr-Lab/training](https://github.com/Loptr-Lab/training)**.

---

## Core Mechanics

- **The Radius of Ruin** — Rebirth emits a 1-square aura. Any piece that ends its turn within it becomes *Veiled*: stripped to pawn-level movement for one turn.
- **The Sanctuary** — Death, Rebirth's mentor, provides a 1-square safe zone immune to the aura.
- **Martyr's Boon** — sacrificing an ally grants a token that can disable the aura for a turn.
- **The Soul Reservoir** — every 3 friendly pieces lost unlocks Rebirth's ability to phase through other pieces.
- **Victory** is possible three ways: standard checkmate, Rebirth reaching 10 Leadership Points through merciful (non-capturing) play, or the Mortal Factions winning collectively if Rebirth Veils 5 of her own pieces.

Full rules: [`RULEBOOK_v0.1`](./docs/RULEBOOK_v0.1). Full design doc: [`docs/design/GDD.md`](./docs/design/GDD.md).

---

## Documentation

| Doc | Covers |
|---|---|
| [`RULEBOOK_v0.1`](./docs/RULEBOOK_v0.1) | Complete playable rules |
| [`docs/design/GDD.md`](./docs/design/GDD.md) | Master design document |
| [`ARCHITECTURE_OVERVIEW.md`](./ARCHITECTURE_OVERVIEW.md) | Engine architecture, turn lifecycle, snapshot contract |
| [`docs/CONTRIBUTOR_SKILLSET_AND_RESOURCES.md`](./docs/CONTRIBUTOR_SKILLSET_AND_RESOURCES.md) | What you need to know before contributing engine code |
| [`docs/variants/`](./docs/variants/) | Thematic variant proofs-of-concept |

---

## Accessibility

Veiled Dominion's visual identity relies on extreme contrast (void-black vs. amber glow), which creates real risk for photosensitive and vestibular-sensitive players if not engineered carefully. We're building accessibility-first:

- [`docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md`](./docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md) — rendering/temporal-safety rules
- [`docs/ENGINE_ACCESSIBILITY_AUDIO_AURA.md`](./docs/ENGINE_ACCESSIBILITY_AUDIO_AURA.md) — non-visual play design for blind/low-vision players
- [`docs/ACCESSIBILITY_GRANT_POSITIONING.md`](./docs/ACCESSIBILITY_GRANT_POSITIONING.md) — current build status against these specs

These docs track implementation status honestly (planned vs. built) — check there before assuming any given accessibility feature is live.

---

## Community

This project follows a [Code of Conduct](./CODE_OF_CONDUCT.md). See [`SECURITY.md`](./SECURITY.md) to report a vulnerability.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for engine contribution guidelines and [`docs/CONTRIBUTOR_SKILLSET_AND_RESOURCES.md`](./docs/CONTRIBUTOR_SKILLSET_AND_RESOURCES.md) for the skills and arc you'll need.

Interested in contributing but new to the codebase? The [training curriculum](https://github.com/Loptr-Lab/training) is a structured on-ramp, including a hands-on graded exercise that mirrors this engine's architecture.

---

## Support

Loptr Lab is an independent creative studio. If you'd like to support this project's development: see [`docs/SPONSORS.md`](./docs/SPONSORS.md) and [`docs/SPONSORSHIP_STRATEGY.md`](./docs/SPONSORSHIP_STRATEGY.md), or [become a sponsor](https://github.com/sponsors/Loptr-Lab).

---

## License

See [`LICENSE.md`](./LICENSE.md).

## Contact

**Loptr Lab** — questions@loptrlab.com
