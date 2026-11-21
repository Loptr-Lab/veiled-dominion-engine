# Repository instruction entry — Loptr-Lab/veiled-dominion-engine

Scope: this repository. Four-player Veiled Dominion rules and in-progress engine; includes Gods of Mayhem and a separate candidate exercise.

Before work, explicitly read the [shared ecosystem instructions](https://github.com/ibloud/ibloud.github.io/blob/docs/agent-design-continuity/docs/ECOSYSTEM_INSTRUCTIONS.md)
(or `docs/ECOSYSTEM_INSTRUCTIONS.md` in a locally available `ibloud/ibloud.github.io` checkout),
then the local sources below and any applicable nested `AGENTS.md`.
A link does not automatically load or inherit instructions. The shared file is under
review in portfolio PR #59; it is not yet a merged production record. If unavailable,
identify the gap and stop only work dependent on it; do not fabricate its contents.
Local security, privacy, canon, license, tests and release authority remain local.

## Local essentials and sources

Keep four-player canon separate from Duet and the TypeScript exercise. Starter placeholders and CI exceptions are not verified gameplay. LICENSE.md maps software to MIT; older CONTRIBUTING.md wording says CC BY-NC-SA for code: unresolved authority conflict, not permission to relicense. Preserve behavior and ask the owner only before work dependent on resolving that conflict. Mayhem is the existing human team/community and paper-playtest pathway, not an AI or membership backend.

Read: [README.md](README.md), [ARCHITECTURE_OVERVIEW.md](ARCHITECTURE_OVERVIEW.md), [docs/RULEBOOK_v0.1](docs/RULEBOOK_v0.1), [docs/CANON_AND_CONTINUITY.md](docs/CANON_AND_CONTINUITY.md), [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), [LICENSE.md](LICENSE.md).
Inspect existing changes, open issues/PRs and unpublished work before creating a duplicate.
Use the current contribution entry in README and the local contribution policy where present;
record ideas as proposals, not automatic assignments. Identify exact source conflicts and
preserve behavior; do not invent precedence or relax a hold.

## Existing work

Read [boundary PR #57](https://github.com/Loptr-Lab/veiled-dominion-engine/pull/57) and [stabilization issue #41](https://github.com/Loptr-Lab/veiled-dominion-engine/issues/41); do not restart candidate or canonical-engine work.

## Checks and release boundary

Commands confirmed in local scripts/configuration (not a claim of current passing results):

- `npm run typecheck`
- `npm test -- --runInBand`

CNAME loptrlab.com is configured; live deployment and current review URL unverified.
No merge, deploy, release, DNS, authentication or infrastructure change is authorized
by this instruction structure. Preserve existing palettes, symbols, stylesheet ownership,
privacy and governance gates. Report committed documentation, checks, previews, merged
source and observed live behavior separately. Automated checks do not establish physical
iPad/Safari/VoiceOver acceptance. MCP tools do not automatically discover or enforce this file.

No nested AGENTS.md was found in the inspected revision; add one only for materially different directory requirements.
