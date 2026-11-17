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


## Polyfork asset resources — reviewed 31 October 2026

Use this shortlist for a bounded asset-evaluation exercise. These are existing
third-party resources, not assets created or already integrated by Loptr Lab.
The reviewed catalogue lists free low-poly GLB editions; paid HD editions and
subscription features are separate. Recheck the selected asset's live terms
and file access before using it. No purchase is required or authorized here.

| Asset page | Asset ID | Proposed exercise |
| --- | --- | --- |
| [Flagstone Floor Tile](https://polyfork.dev/asset/flagstone-floor-tile-2a04ea) | `flagstone-floor-tile-2a04ea` | Duet optional board-surface study; 138 triangles |
| [Condition Ring](https://polyfork.dev/asset/condition-ring-df5a73) | `condition-ring-df5a73` | Duet optional selection/veil marker; 308 triangles; pair with text |
| [Glowing Rune Stone](https://polyfork.dev/asset/glowing-rune-stone-5a5558) | `glowing-rune-stone-5a5558` | Duet optional scenery; 476 triangles; no new rules meaning |
| [Meeting Chair](https://polyfork.dev/asset/meeting-chair-731ce0) | `meeting-chair-731ce0` | Rhapsody issue #11 chair/figure blocking; 464 triangles |
| [Field Console](https://polyfork.dev/asset/field-console-a92adc) | `field-console-a92adc` | Rhapsody issue #11 console blocking; 396 triangles |
| [Meeting Room Display](https://polyfork.dev/asset/meeting-room-display-fddfc3) | `meeting-room-display-fddfc3` | Rhapsody issue #11 abstract displays; 656 triangles |

Read [Polyfork licensing](https://polyfork.dev/licensing), the
[platform distinction](https://polyfork.dev/platform) and
[agent documentation](https://polyfork.dev/llms.txt). Standard terms permit
project use and modification, while standalone asset redistribution and some
platform/self-hosting uses have separate restrictions. Keep vendor assets
outside the repository's MIT claim. A catalogue link is not a local download,
a tested import, a perpetual CDN guarantee, or proof of device performance.
Record asset ID, source, access date, file/version/hash when retrieved,
license terms, actual cost and any edits. No celebrity likeness, recording
or project-canon rights are provided by a prop model.

### One small learning task

Choose one approved candidate; import or compose it in an isolated study using
permitted access. Check scale, material appearance, keyboard access, failure
behavior and target-device performance. Export/reopen it where supported.
Provide an artifact, text description and reproducible findings. Mark the result
usable, needs more testing or unsuitable; do not infer acceptance from a preview.

For Rhapsody, reuse [existing issue #11](https://github.com/ibloud/ren-rhapsody/issues/11)
and its three-shot study; preserve original audio and the Halloween First
Movement freeze. For Duet, any 3D board is still an optional visual proposal,
separate from the existing multiplayer and accessibility acceptance work.
Keep [Break This Build](https://break.loptrlab.com/) as the shared test entry,
the project repositories as implementation authority, and the
[canonical ecosystem map](https://github.com/ibloud/ibloud.github.io/blob/main/docs/ECOSYSTEM_ARCHITECTURE.md)
as relationship authority. Made-Sick remains the general resource directory;
this section is a specific training exercise, not a replacement catalogue.



## Optional AI tools: learn through one artifact

Choose one tool for one small artifact. These are optional Loptr Lab learning suggestions, not required subscriptions, integrated services or endorsements. The source pages describe capabilities; none of these tools has a hands-on training acceptance result in this addition. Start with the tools and equipment you already have. Made-Sick remains general resource discovery.

### Claude

[Official resource](https://platform.claude.com/docs/en/intro).

- **Placement:** Start here: optional coding practice
- **Loptr Lab objective:** Explain and review one small code change against a written requirement.
- **Prerequisites:** Basic code reading; an isolated project and its existing test command. API work additionally needs a private key and a spending limit.
- **Costs, rights and privacy:** Chat plans and API billing are separate; check the chosen product’s current price, data settings and retention. Never put keys, private source or participant records in prompts or public issues.
- **Practice and evidence:** Record the requirement, proposed diff, tests actually run, a rejected suggestion and one human correction. Without an account, review a fictional response in the existing AI Literacy exercise.
- **Test status:** Source-described candidate; hands-on tool, export, billing and accessibility tests not run.

### Meshy

[Official resource](https://www.meshy.ai/).

- **Placement:** Candidate: static 3D prop first
- **Loptr Lab objective:** Evaluate one image-to-3D prop against its brief, then export and reopen it.
- **Prerequisites:** One original generic prop reference and access to a compatible viewer/editor; confirm the upload, download and import path on your own device.
- **Costs, rights and privacy:** Free and paid output rights differ. Meshy’s reviewed terms claim ownership of free-plan outputs and provide an attribution license. Non-Enterprise training use has an opt-out; confirm it before uploading unpublished work. Community publication has separate terms.
- **Practice and evidence:** Keep the brief, model/export, text description, scale/material findings, file size and any failed imports. Do not begin with approved characters or infer an iPad-compatible downstream workflow.
- **Test status:** Source-described candidate; hands-on tool, export, billing and accessibility tests not run.

### fal

[Official resource](https://fal.ai/).

- **Placement:** Advanced API reference
- **Loptr Lab objective:** Compare one model request with its output, usage and actual cost.
- **Prerequisites:** API familiarity, private credential storage and a clear spending cap; inspect the selected model before using it.
- **Costs, rights and privacy:** Check model-specific input/output permissions, retention, rates and credit expiry. A platform credit is not a license for every model or asset.
- **Practice and evidence:** Record model/version, non-sensitive request settings, output, failures and cost. An annotated request/response diagram is the no-account alternative; do not run paid requests to complete training.
- **Test status:** Source-described candidate; hands-on tool, export, billing and accessibility tests not run.

### Hyper3D / Rodin

[Official resource](https://hyper3d.ai/).

- **Placement:** Optional alternative to Meshy
- **Loptr Lab objective:** Compare one 3D result with the same original prop brief.
- **Prerequisites:** The same reference, viewer and acceptance criteria used for the prop exercise.
- **Costs, rights and privacy:** Check current account cost, export entitlement, output rights and data/training settings. Event credits are not standing access or permission for unrelated portfolio use.
- **Practice and evidence:** Use instead of Meshy for a first test, or compare later only when time permits. Record repair and import effort; a product page is not a tested model.
- **Test status:** Source-described candidate; hands-on tool, export, billing and accessibility tests not run.

### Tripo

[Official resource](https://www.tripo3d.ai/).

- **Placement:** Optional alternative to Meshy
- **Loptr Lab objective:** Compare geometry and export suitability for the same original prop brief.
- **Prerequisites:** A compatible viewer/editor and a documented target format; check device requirements first.
- **Costs, rights and privacy:** Verify current cost, export entitlement, output rights and data/training settings. Do not assume a passed event redemption deadline can be extended.
- **Practice and evidence:** Keep the brief, exported result, repair notes and actual costs. Do not subscribe to multiple generators merely to finish a comparison.
- **Test status:** Source-described candidate; hands-on tool, export, billing and accessibility tests not run.

### Rokoko

[Official resource](https://www.rokoko.com/).

- **Placement:** Later: motion study
- **Loptr Lab objective:** Inspect a short motion capture or animation result for timing and cleanup needs.
- **Prerequisites:** A suitable rig and confirmed recording/export software and equipment; use an original object or a consenting adult performer.
- **Costs, rights and privacy:** Check plan/export costs, recording storage and permissions. A performer’s image and movement can be personal data; obtain permission before recording or uploading. Do not assume a suit is required or provided.
- **Practice and evidence:** After the static asset succeeds, compare a short original motion before and after cleanup. A labeled pose sequence is an alternative without capture equipment.
- **Test status:** Source-described candidate; hands-on tool, export, billing and accessibility tests not run.

### Reallusion / iClone

[Official resource](https://www.reallusion.com/iclone/download.html).

- **Placement:** Later: rigging and animation
- **Loptr Lab objective:** Evaluate whether a short original animation survives export and reopen.
- **Prerequisites:** Verify the current desktop OS, GPU, software and rig compatibility; an iPad browser alone does not establish compatibility.
- **Costs, rights and privacy:** Check edition restrictions, export allowance, renewal and asset licenses. An event’s PERSONAL offer does not establish unlimited or commercial rights for every asset.
- **Practice and evidence:** Record one animation, export settings and a reopen test. Use a storyboard or timing diagram if compatible equipment is unavailable.
- **Test status:** Source-described candidate; hands-on tool, export, billing and accessibility tests not run.

### Complete the existing exercise

1. Before starting, write the skill, artifact, completion criteria and time limit. Reserve sleep, breaks and time for inspection and export. Agree scope, attribution, visibility and an exit path before collaborating.
2. Check the selected product’s current prerequisites, account/API costs, renewal, credit expiry, input/output rights, privacy and training-data settings. Record the source URL and date. A promotion does not establish eligibility or permitted portfolio use.
3. Use original or permission-cleared material. Keep credentials, private correspondence and sensitive participant records out of uploads and public checkpoints. Preserve established character details; a test is not a canon change.
4. Produce one result, inspect it against the brief, revise once if useful, and save/reopen the export where available. Record time, retries, cost, device/browser, accessibility barriers and what remains untested.
5. Keep your result in the existing GitHub/PIXIE checkpoint with attribution and a next action. For visual work, reuse the Hybrid Creative Technology review record and mapped source criteria; do not invent a new score, certification or learner tracker. Stop when the time/cost limit is reached.

No-account alternatives: [AI Literacy practice](../ai-literacy/rubrics.html), an original hand-drawn prop sheet, a storyboard or an annotated API diagram. These alternatives meet the documentation practice without buying software or claiming a tool was tested. For a creative artifact use the [existing review record](creative-production-review.md) and [review guidance](hybrid-creative-technology.html#creative-review). Reuse [Training issue #45](https://github.com/Loptr-Lab/training/issues/45) for the existing optional visual-production workshop; source-project work retains its owning issue.

### Source and verification limits

Reviewed 17 November 2026: capability descriptions for the creative tools come from the Epic partner descriptions; Claude’s developer introduction was read separately. Meshy’s terms were read for its specific rights/privacy limits. These are educational checks, not professional clearance. Other vendors’ full terms, working accounts, devices, imports and redemptions remain unverified.

- [Epic jam partner descriptions and offers](https://itch.io/jam/2026-epic-ai-megajam)
- [Epic partner announcement](https://forums.unrealengine.com/t/meet-the-2026-epic-ai-megajam-partners/2853549)
- [Claude developer introduction](https://platform.claude.com/docs/en/intro)
- [Meshy terms](https://www.meshy.ai/terms-of-use), especially sections 2.9 and 3.2–3.3

### Dated MegaJam promotion note — 17 November 2026

Historical offer snapshot as of 17 November 2026, not a live offer or an instruction to redeem. Claim deadlines differ from usage windows. Many offers depend on prior jam registration or emailed codes; a later claim date does not establish late-joiner eligibility. Verify terms, expiry and renewal before any activation. These offers are not prerequisites for training.

| Offer | Claim deadline | Usage or restriction |
| --- | --- | --- |
| Meshy | Nov 17 | One month; new account and card required; automatic renewal. |
| Claude | Nov 27, while available | Credits last 90 days after claim; API credit is separate from a chat subscription. |
| fal | Nov 30 | Credit expiry unspecified in the event listing; verify it. |
| Hyper3D / Rodin | Nov 16 — passed | Benefits expire Nov 20; only relevant if already activated. |
| Tripo | Nov 16 — passed | Access through Nov 17 Pacific; confirm export access if already activated. |
| Rokoko | Not specified | One month from signup; verify remaining eligibility and activation terms. |
| iClone PERSONAL | No expiration listed | First-time users; up to 30 exports; verify current edition restrictions. |
