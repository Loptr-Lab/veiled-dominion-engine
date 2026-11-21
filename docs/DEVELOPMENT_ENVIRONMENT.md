# Development Environment Setup Guide

This repository's active contributor workflow is TypeScript + Jest.

## What these commands actually run

Read [canon and implementation boundaries](CANON_AND_CONTINUITY.md) before selecting work. The current Node/Jest workflow tests a six-position, two-owner exercise and a separate RPG actor compatibility contract; it is not a playable implementation of the canonical four-player game. C# scaffolds under both `src/Board`/`src/board` and `src/Pieces`/`src/pieces` remain incomplete and need an explicit ownership/casing decision before extension.

At the 7 November 2026 audit snapshot, `npm run typecheck` passed; Jest reported 24 passed and 24 failed across three suites. `engine.ts` still throws `Not implemented`, and `edge-rules.test.ts` requests a `GameEngine` constructor that is not exported. Record that baseline before making a change; do not repair disputed rules or alter mandatory tests to make orientation look successful. The maintained beginner exercise is [Training](https://github.com/Loptr-Lab/training/blob/main/CANDIDATE.md); experienced reviewers may inspect the game architecture directly without completing it.

For a working state-inspection helper, follow `types.ts`: `isSteam(board, position)` calls `squareKey`, reads `board.squareStatus`, and compares `board.turn` with `steamUntilTurn`. It returns a boolean, with no rendering or mutation. With `turn: 2` and a `0,0` entry expiring at turn 2 it returns true; at turn 3 it returns false. This is exercise state, not canonical Veiled duration. The intended movement path begins at `getLegalMoves` in `engine.ts`, but currently stops at the placeholder; its failure is visible in `engine.test.ts`.

## Quick Start

### Prerequisites
- Node.js 20+
- npm 10+

### Local setup
```bash
git clone https://github.com/Loptr-Lab/veiled-dominion-engine.git
cd veiled-dominion-engine
npm ci
```

### Verify
```bash
node --version
npm --version
npm run typecheck
npm test
```

## Dev Container

The repo includes `.devcontainer/devcontainer.json` for VS Code Dev Containers/Codespaces.

- Base image: `mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm`
- Post-create bootstrap: `npm ci`
- Forwarded ports: none required for default test workflow

To use it:
1. Open the repository in VS Code.
2. Run **Dev Containers: Reopen in Container**.
3. Wait for `npm ci` to complete.
4. Run `npm run typecheck && npm test`.

## Environment variables

No environment variables are required for current local development flows.

If future features introduce runtime config, copy `.env.example` to `.env` and fill the documented values.

## Common commands

```bash
npm ci
npm test
npm run test:watch
npm run typecheck
```
