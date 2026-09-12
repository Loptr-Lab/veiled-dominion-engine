# Anonymous playtest telemetry contract

Version: `anonymous-playtest.v1` / `anonymous-feedback.v1`

This additive contract lets clients report whether Veiled Dominion's rules are understandable and enjoyable without creating a player identity record. The normative machine-readable contract is `anonymous-playtest-telemetry.v1.schema.json`.

## Privacy boundary

- `anonymousMatchId` is a random UUID created for the match. It is not a room code, reconnect token, DID, handle, email address, or network address.
- A feedback record must not include a reconnect token or free-form identity field.
- Comments are optional, plain text, and limited to 600 characters.
- Storage layers may add an `expiresAt` timestamp solely to enforce deletion; it is not part of the portable event payload.
- Producers should keep raw completed-game and feedback records for no more than 30 days unless a separately documented consent and governance process applies.
- Aggregate, non-identifying counts may be retained after raw records expire.

## Producer rules

1. Create one `anonymousMatchId` when a game room is created and persist it across reconnects.
2. Emit a completed-game record only after the authoritative engine declares the game over.
3. Accept at most one feedback submission per participating seat.
4. Validate all enumerations and lengths server-side; never trust browser validation alone.
5. A telemetry failure must never prevent or alter gameplay.

## Compatibility

Consumers must ignore unknown additive fields. Breaking changes require a new major contract version under the repository's contract-versioning policy.
