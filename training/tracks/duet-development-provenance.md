# Veiled Dominion / Duet development provenance

This is the development-training reference for the current Duet architecture. It teaches the actual lineage from the original Pulsr work through the current production/playtest build, the architecture laboratory, and the permanent Loptr Lab engine.

## The source-of-truth flow

```text
ORIGINAL DUET
Pulsr
   │
   ▼
MORTIS
Pulsr
   │
   ▼
DUET HACKATHON
CURRENT PRODUCTION / PLAYTEST BUILD
   │
   │ extract + validate architecture
   ▼
DUET ARCHITECTURE LAB
ibloud/duet_engine_architecture
   │
   │ graduate reusable systems
   ▼
LOPTR LAB PERMANENT ENGINE
Loptr-Lab/veiled-dominion-engine
   │
   ▼
FUTURE DUET / OTHER BUILDS
```

The important boundary is that **Duet Hackathon is the current production/playtest build**. It is not a separate historical layer beneath production.

### Development rule

**Do not fork the current Duet Hackathon playtest directly into the permanent Loptr Lab engine.**

The current Duet Hackathon remains the working production/playtest source. The architecture repository is the extraction and validation laboratory: mechanics, accessibility patterns, content contracts, tests, and build/distribution practices are isolated there so they can be proven independently. Only validated reusable systems graduate into the permanent engine.

## Repository roles

| Layer | Repository / artifact | Development role |
| --- | --- | --- |
| Original Duet | Pulsr: `pulsr.social/ibloud` | Original Duet lineage/reference |
| Mortis | Pulsr: `pulsr.social/mortis` | Related earlier Pulsr lineage/reference |
| Duet Hackathon | Current production/playtest build | Working source for extraction and validation |
| Architecture Lab | [ibloud/duet_engine_architecture](https://github.com/ibloud/duet_engine_architecture) | Extract, isolate, test, document, and validate reusable architecture |
| Permanent Engine | [Loptr-Lab/veiled-dominion-engine](https://github.com/Loptr-Lab/veiled-dominion-engine) | Long-lived reusable engine; receive validated systems |
| Playable distribution | [Veiled Dominion: Duet on itch.io](https://ibloud.itch.io/veiled-dominion-duet) | A later playable distribution artifact, not the original Duet source |

The Pulsr references above preserve provenance supplied for this project; they are not a claim that their current pages have been independently archived or verified here.

## What belongs in the architecture lab

The lab may contain:

- Rebirth / Death mechanics and extracted rule contracts
- Radius of Ruin and Sanctuary state behavior
- Veiled-state behavior
- screen-reader-first command paths
- keyboard and visual-board parity
- audio cues
- content and actor contracts
- runtime smoke tests
- reproducible browser and itch builds
- GitHub Pages distribution
- architecture notes explaining what was learned from the current playtest

The lab should make the boundary visible: the production/playtest build proves the game experience; the lab proves which pieces can become reusable architecture.

## What graduates to the permanent engine

A piece is ready to move toward the permanent engine when it has:

1. a documented contract;
2. tests that describe its behavior;
3. an explicit accessibility requirement where applicable;
4. clear ownership/provenance;
5. no accidental dependency on the demo page, fixture, or presentation layer;
6. a reason to be reusable beyond one Duet build.

Graduation is therefore **extraction and validation**, not a blind fork.

## Training exercise

When extending Duet, record each proposed change as one of:

- **reference** — observed in the current production/playtest build or earlier documented lineage;
- **experiment** — implemented in the architecture lab to test an idea;
- **validated** — supported by tests and suitable for extraction;
- **engine** — accepted into the permanent engine;
- **future build** — consumes the permanent engine rather than recreating the prototype.

This classification prevents the development history from collapsing into a false single code lineage.

## Related source

- [Duet architecture lab](https://github.com/ibloud/duet_engine_architecture)
- [Permanent Veiled Dominion engine](https://github.com/Loptr-Lab/veiled-dominion-engine)
- [Veiled Dominion: Duet playable distribution](https://ibloud.itch.io/veiled-dominion-duet)
