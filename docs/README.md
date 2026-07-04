# Veiled Dominion Engine — Documentation Index

This directory contains lightweight design documentation for the project.

## Why this exists
Veiled Dominion is a cross-stack prototype (`C#`, `TypeScript`, `HTML`) with custom bundling/runtime behavior.  
These docs keep game logic, architecture, and implementation decisions aligned as the project evolves.

## Documentation map

- `vision.md`  
  Product intent, constraints, non-goals, and milestone outcomes.
- `architecture/overview.md`  
  System boundaries, data flow, and ownership between game engine and web UI.
- `adr/`  
  Architecture Decision Records (ADRs), one file per major decision.
- `gameplay/rules.md`  
  Canonical gameplay rules and edge-case handling.
- `frontend/bundling.md`  
  Bundle structure and runtime unpacking/loading behavior.
- `contracts/`  
  Cross-layer contracts (DTOs/events), versioning, and compatibility policy.

## Conventions

- Keep docs short and current.
- Prefer decision records (ADRs) for major technical choices.
- If a decision takes >10 minutes to re-explain, document it.
- Update docs in the same PR as implementation changes when possible.

## Review cadence

- Revisit `vision.md` and `gameplay/rules.md` at each milestone.
- Add ADRs for decisions that affect:
  - data contracts
  - build/deploy pipeline
  - game-rule enforcement architecture
  - rendering/runtime model
