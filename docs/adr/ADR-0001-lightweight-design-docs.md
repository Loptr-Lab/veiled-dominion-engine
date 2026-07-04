# ADR-0001: Adopt lightweight design documentation baseline

- **Status**: Accepted
- **Date**: 2026-07-04

## Context

The repository spans multiple technologies and includes custom frontend bundling/runtime behavior.
Without lightweight documentation, architecture and gameplay intent may drift as implementation evolves.

## Decision

Adopt a minimal documentation baseline under `/docs`:

- Vision & scope
- Architecture overview
- Gameplay rules spec
- Frontend bundling/runtime notes
- Contracts and versioning notes
- ADR log for major decisions

## Consequences

### Positive
- Faster onboarding.
- Clear decision trail for major architectural choices.
- Reduced cross-layer contract drift.

### Trade-offs
- Small ongoing maintenance overhead.
- Requires docs updates during implementation PRs.

## Follow-ups

- Add ADR template (`ADR-0000-template.md`) and enforce usage for major decisions.
- Add a PR checklist item: “Docs/contracts updated if behavior changed.”
