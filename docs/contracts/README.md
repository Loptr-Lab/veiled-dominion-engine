# Contracts

This directory defines cross-layer contracts between backend/engine and frontend/client.

## Published contracts

- [`anonymous-playtest-telemetry.v1.schema.json`](anonymous-playtest-telemetry.v1.schema.json) — normative anonymous completed-game and optional feedback records.
- [`anonymous-playtest-telemetry.md`](anonymous-playtest-telemetry.md) — privacy boundary and producer requirements.
- [`versioning.md`](versioning.md) — compatibility and change policy.

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
