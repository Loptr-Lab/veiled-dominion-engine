# Veiled Dominion Engine — Documentation Index

This directory contains lightweight design, continuity, architecture, and research-alignment documentation for the project.

## Why this exists

Veiled Dominion is a cross-stack prototype (`C#`, `TypeScript`, `HTML`) with custom bundling/runtime behavior. These docs keep game logic, architecture, implementation decisions, continuity authority, and research evidence aligned as the project evolves.

## Documentation map

- `CANON_AND_CONTINUITY.md`  
  Canon authority, source hierarchy, cross-repository boundaries, and unresolved continuity decisions.
- `RESEARCH_ALIGNMENT.md`  
  Role of this repository as the primary creative case in the doctoral practice-research project.
- `design/GDD.md`  
  Canonical four-player design intent, mechanics, and verified repository structure.
- `RULEBOOK_v0.1`  
  Current four-player rules baseline.
- `vision.md`  
  Product intent, constraints, non-goals, and milestone outcomes.
- `architecture/overview.md`  
  System boundaries, data flow, and ownership between game engine and web UI.
- `adr/`  
  Architecture Decision Records, one file per major decision.
- `gameplay/rules.md`  
  Gameplay rules and edge-case handling; reconcile explicit divergences against the rulebook.
- `frontend/bundling.md`  
  Bundle structure and runtime unpacking/loading behavior.
- `contracts/`  
  Cross-layer contracts, versioning, and compatibility policy.

## Conventions

- Keep docs short and current.
- Preserve provenance when material has research or design-history value.
- Label content as Canonical, Narrative canon, Adaptation, Experimental, Historical/archive, or Unresolved design decision.
- Prefer ADRs for major technical choices.
- If a decision takes more than 10 minutes to re-explain, document it.
- Record rationale, constraints, alternatives, and unresolved questions in the same PR as the decision when possible.
- Do not treat the root TypeScript exercise harness as the canonical four-player engine.

## Review cadence

- Revisit `vision.md`, `design/GDD.md`, `RULEBOOK_v0.1`, and `RESEARCH_ALIGNMENT.md` at each milestone.
- Add ADRs for decisions that affect:
  - data contracts;
  - build/deploy pipeline;
  - game-rule enforcement architecture;
  - rendering/runtime model;
  - canonical versus experimental boundaries;
  - preservation or interpretation of research evidence.
