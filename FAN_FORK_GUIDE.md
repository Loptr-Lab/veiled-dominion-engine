# Fan Fork Guide

Fan forks are welcome when they respect the repository's license and continuity boundaries.

## Before publishing a fork

- Keep the MIT notice with copied or modified software.
- Attribute Loptr Lab and link to the source repository for copied creative material.
- License adapted creative material under CC BY-NC-SA 4.0 and keep it noncommercial.
- Use a different project name, logo, package identity, domain, and social account.
- State prominently: "Unofficial fan fork; not endorsed by Loptr Lab."
- Review `ASSET_ATTRIBUTION.md` and remove third-party material you cannot redistribute.
- Never commit credentials, personal data, private research records, or participant records.

## Continuity labels

Do not present a fork as canonical. Label material as one of:

- **Canonical source:** unchanged material linked back to this repository.
- **Fan adaptation:** material created or changed by the fork.
- **Experimental:** mechanics or presentation under test.
- **Historical/archive:** preserved prior material.
- **Unresolved:** a decision the fork has not made.

The four-player rules in this repository remain Loptr Lab's canonical rules authority. Fan
changes and material from Duet or the training exercise do not become official canon unless
Loptr Lab explicitly promotes them here.

## Safe development

Local tests require no secrets. Copy `.env.example` only if a future feature needs runtime
configuration. Use test accounts and synthetic data for integrations. Do not point a fork at
Loptr Lab production services.

Questions about permissions may be sent to questions@loptrlab.com.
