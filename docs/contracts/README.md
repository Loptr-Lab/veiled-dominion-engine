# Contracts

This directory defines cross-layer contracts between backend/engine and frontend/client.

## What belongs here

- Request/response DTO specs.
- Event payload schemas.
- Enum/state mapping rules.
- Versioning and compatibility policy.

## Rules

- Contract changes must be explicit and reviewed.
- Breaking changes require:
  - version bump strategy
  - migration notes
  - linked ADR (if architectural impact is non-trivial)
