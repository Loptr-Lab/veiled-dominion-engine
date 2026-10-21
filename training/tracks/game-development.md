# Game development track

## Work tasks

Implement and test game systems, use an engine and source control, create or integrate assets, profile performance, run playtests, and document production handoffs.

## Required capabilities

- Compute and graphics appropriate to the chosen engine and target platform
- Storage for engine versions, source assets, builds, and backups
- Accessible editor, viewport, debugging, and collaboration workflows
- Input and output options that support testing without making one physical interaction method mandatory

## Plan

Separate requirements for programming, art, audio, design, testing, and target-platform builds. A minimum configuration must run the real learning tasks reliably; preferred capabilities must be tied to a documented barrier or workflow gain. Review [accessibility needs](../accessibility/index.md) before comparing systems.

## Duet architecture provenance

For the Veiled Dominion / Duet development path, use the [Duet development provenance guide](./duet-development-provenance.md). The current Duet Hackathon is the production/playtest build. The architecture lab is the extraction/validation layer, and the permanent Loptr Lab engine receives only validated reusable systems.

Do not model this as a direct production-to-engine fork. Preserve provenance and test the boundary between presentation-specific Duet code and reusable engine architecture.

## Xbox development workstation path

For a Windows and Xbox game track, use a **Windows x64 PC** for editing, builds, debugging, and local PC playtests. An iPad can remain the planning and remote-access device, but the GDK Visual Studio extensions require x64 Windows; ARM Windows devices are unsupported for those extensions. Microsoft lists Windows 10/11 64-bit for Xbox builds, at least 30 GB free for the GDK installation, the Windows SDK, Visual Studio, and the GDK. [Microsoft PC requirements](https://learn.microsoft.com/en-us/gaming/gdk/docs/gdk-dev/get-started/overviews/set-up-dev-pc) · [Microsoft tool requirements](https://learn.microsoft.com/en-us/gaming/gdk/docs/gdk-dev/get-started/overviews/sdk-and-tools)

| Phase | Capability and equipment | Decision point |
| --- | --- | --- |
| PC prototype | Windows x64 desktop, suitable CPU/GPU for the chosen engine, accessible display/input, NVMe storage, backups, and wired networking | Test representative Duet or other game builds before committing to a model. |
| Comfortable local development | Planning target: 8-core-class CPU, 32 GB RAM, 1–2 TB NVMe SSD, and a discrete GPU appropriate to the engine. These are **planning targets**, not Microsoft minimums. | Compare the real engine workload, warranty, upgrade path, and accessibility setup. |
| Xbox console build | GDK with Xbox Extensions, approved program access, and an Xbox development kit; connect workstation and kit by Ethernet on the same switch/subnet. | Pursue [ID@Xbox registration and concept review](https://learn.microsoft.com/en-us/gaming/gdk/docs/gdk-dev/pc-dev/tutorials/pc-e2e-guide/e2e-register-id-at-xbox) before budgeting for restricted console hardware. |

Microsoft recommends an NVMe SSD, Cat 6a cabling and a shared Ethernet switch for console deployments; 10 GbE is an optimization for supported dev kits, **not a baseline purchase**. A retail Xbox in Developer Mode serves a narrower UWP test path and does not substitute for the full GDK console workflow. [Microsoft workstation guidance](https://learn.microsoft.com/en-us/gaming/gdk/docs/gdk-dev/get-started/overviews/set-up-dev-pc) · [GDK setup](https://learn.microsoft.com/en-us/gaming/gdk/docs/gdk-dev/get-started/get-started-home) · [UWP FAQ](https://learn.microsoft.com/en-us/windows/uwp/xbox-apps/frequently-asked-questions)

See the [dated Xbox workstation purchasing example](../technology-planning/xbox-workstation-example.md) for an indicative price range, reputable purchasing channels, and quote checks. Keep the final funding request tied to documented work tasks and current quotes.
