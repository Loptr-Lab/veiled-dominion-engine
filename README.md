# Veiled Dominion Engine

An open-source 4-player asymmetric strategy game engine built on a 14×14 cross-shaped board.

> **Note:** This repository is the engine and production codebase.
> Exercise materials and training resources live in the separate
> [Loptr-Lab/training](https://github.com/Loptr-Lab/training) repository.

## What this is

Veiled Dominion is a 4-player, asymmetric, state-manipulation strategy game.
This repository contains the engine architecture, gameplay rules, and
production-facing C# source.

Key documents to orient yourself:
- [`docs/RULEBOOK_v0.1/`](docs/RULEBOOK_v0.1) — canonical gameplay rules and board geometry
- [`ARCHITECTURE_OVERVIEW.md`](ARCHITECTURE_OVERVIEW.md) — runtime sequencing contract
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to contribute
- [`docs/CONTRIBUTOR_SKILLSET_AND_RESOURCES.md`](docs/CONTRIBUTOR_SKILLSET_AND_RESOURCES.md) — required background and expectations for contributors

## Repository Structure

```
src/
  board/       ← canonical board geometry (GridTopology.cs)
  pieces/      ← base piece types (BasePiece.cs)
  systems/     ← core systems (RadiusOfRuin.cs, VeiledStateManager.cs)
  integration/ ← external adapter boundaries (rpgActor/)
docs/          ← design, architecture, and accessibility documentation
training/      ← curriculum overview (exercise repo: Loptr-Lab/training)
```

> **`src/` casing note:** Some legacy uppercase directories (`src/Board/`,
> `src/Pieces/`, `src/Systems/`) exist alongside their lowercase equivalents.
> The lowercase paths are canonical. See [`SRC_CASING.md`](SRC_CASING.md)
> for the migration status and guidance.

## Engine Characteristics

- **Deterministic:** identical input sequences must produce identical game states
- **Headless-testable:** board geometry, movement validation, and aura logic run without rendering dependencies
- **Variant-extensible:** baseline rules are stable; variant hooks integrate without rewriting the core loop
- **4-player:** turn queue with clockwise progression, not a 2-player toggle

## Accessibility

Veiled Dominion's high-contrast rendering pipeline requires careful engineering
to remain safe for photosensitive players. If your work touches rendering,
shaders, post-processing, or WebGL export, read
[`docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md`](docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md)
before writing code.

## License

See [`LICENSE.md`](LICENSE.md).
