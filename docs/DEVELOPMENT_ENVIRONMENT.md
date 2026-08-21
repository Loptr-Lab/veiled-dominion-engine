# Development Environment Setup Guide

This repository's active contributor workflow is TypeScript + Jest.

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
