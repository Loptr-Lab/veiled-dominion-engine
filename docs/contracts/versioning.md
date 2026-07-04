# Contract Versioning Policy

## Goals

- Prevent silent breakage between C# engine and TypeScript client.
- Make compatibility expectations explicit per change.

## Versioning model (recommended)

Use semantic intent for contract package/schema versions:

- **MAJOR**: breaking field removals/renames, meaning changes.
- **MINOR**: backward-compatible additions.
- **PATCH**: clarifications/non-structural fixes.

## Compatibility rules

- Additive fields should be optional by default for consumers.
- Producers should avoid removing fields without deprecation window.
- Unknown enum values must be handled safely in clients.

## Change checklist

- [ ] Updated schema/docs in this directory.
- [ ] Updated serializer/deserializer tests.
- [ ] Updated consumers for new/changed fields.
- [ ] Recorded breaking rationale (if applicable).
