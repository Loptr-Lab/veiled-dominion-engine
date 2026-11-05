# PIXIE: join, contribute and resume

Updated 27 October 2026. One workflow across the existing ecosystem; GitHub holds shared contribution records.

[Open PIXIE](https://pixie-project-companion.ibloud-ivxx.chatgpt.site) · [Ecosystem](https://ecosystem.loptrlab.com) · [Training](https://loptrlab.com/training/)

## Why we are testing PIXIE

Loptr Lab’s ecosystem is the testing ground for an open-source multimedia training studio. PIXIE is its contributor companion, helping people join, learn, coordinate work and return with context intact. Contributor testing is the immediate goal; a finished commercial app is not required before testing begins. Pilot evidence should inform a concrete project pitch and a sustainable revenue model consistent with the existing mission, open participation and project licenses.

Read the [owner-confirmed studio direction](https://github.com/ibloud/ibloud.github.io/blob/main/docs/ECOSYSTEM_ARCHITECTURE.md#studio-viability-pilot--owner-confirmed-direction-18-october-2026). This workflow is a pilot of contributor coordination, not evidence that public plugin distribution, studio viability or commercial readiness is complete. Record concrete contributions, learning outcomes, handoffs, repeated explanations and defects. Build the pitch from those findings, with business-model assumptions labeled as hypotheses.

## PIXIE private-workspace acceptance — proposed contributor test

**Status:** This procedure applies only when maintainers announce a reviewed Railway release candidate. It does not establish that multi-user production is live. Maintainers must first verify an encrypted and recoverable volume backup, configure server sessions, and deploy the pinned reviewed commit. Do not confuse the original Site or static preview with Railway.

**Volunteer tester steps — no production credentials required:**

1. Open the maintainer-announced PIXIE Railway acceptance URL. Sign in with your own supported Atmosphere account. No email, invitation, shared password, or separate server connection key.
2. Open My projects. Create a project using fictional nonsensitive information. Save, refresh, and reopen it. Verify the interface never falsely reports success.
3. Edit a task and save. Export your own synthetic project and, if appropriate, import that same synthetic backup. Never upload real correspondence, case files or other sensitive records.
4. Sign out and confirm the private project disappears. Sign in again and verify the project persists. With permission, repeat using a second account in a separate browser profile; never share account credentials.
5. Check keyboard focus, VoiceOver when available, font size, zoom/reflow, and light/dark theme contrast. State what was not tested.
6. Record expected versus actual, time, device/browser, route and safe reproduction steps in the existing Training issues, labeled PIXIE integration or documentation report. Do not include cookies, secrets, private content, screenshots showing credentials or downloaded backups.

**Maintainer-only storage and release prerequisite:** Railway's existing volume does not currently have a verified dashboard backup. Before deployment, use a documented authenticated Railway file-transfer method from an existing authorized environment; securely encrypt an archive of the required private files, verify checksums and an isolated restore, and place the ciphertext in an owner-controlled private destination (Google Drive is an option) with the decryption key elsewhere. Never ask contributors to retrieve the production volume. No backup means no rollout. Preserve the old Site and volume throughout acceptance.

**Isolation and disclosure:** Release reviewers must use two synthetic accounts to verify that account B cannot list, read, update, delete, export, import into, or send account A's records to a model, even when given A's project ID. Never test with real participants' records. Security findings must not disclose a private exploit or user data in a public issue.
## Contributor steps

1. **Start.** Open the existing PIXIE companion, choose a project and read its repository’s contribution instructions. Training is the default starting point.
2. **Choose a task.** Use “How can I help?” for a bounded suggestion. Then choose “Join & coordinate” and describe the proposed task, progress, blocker and next action.
3. **Review and submit.** Review the checkpoint draft and its public visibility. “Review & submit on GitHub” opens a prefilled issue in that project. You submit it using GitHub; PIXIE does not post automatically or enroll you.
4. **Agree scope.** Record maintainer agreement, time, credit and exit arrangements in the issue. A suggestion or issue does not itself assign a task or grant access.
5. **Keep coordinated.** Add progress comments with evidence, blockers and the next action. Keep the issue URL. GitHub holds the shared history.
6. **Resume.** In a later session, choose the same project, select “Resume my checkpoint” and paste the issue URL. PIXIE reads the current public issue and latest comment page. Open the full GitHub discussion for older comments.


## From work to portfolio evidence

[Chris Tran’s career advice and optional coaching](https://made-sick.org/directory.html#resource-chris-tran-career) can help gaming professionals explain their work and prepare relevant professional conversations. The Made-Sick card holds the source, attribution and free/commercial distinctions.

- **Starting without project experience?** Browse the [current Training issues](https://github.com/Loptr-Lab/training/issues), read [how to contribute](https://github.com/Loptr-Lab/training/blob/main/CONTRIBUTING.md), and choose one bounded task suited to your skills and interests. Labels and available work can change. Check existing assignments and agree scope with the maintainer; a listing is not acceptance.
- **Returning to current work?** Keep the same project and issue. Use “Resume my checkpoint” as described above, or open that issue directly. Add evidence and your next action there; do not create a second tracker.
- **Already have work to present?** Use an existing artifact you may share. Skip beginner tasks and go straight to explaining it and choosing a relevant next step.

1. Follow the chosen project’s contribution and review process. Capture the **problem, your own contribution, artifact link, verification and outcome** in its existing checkpoint or progress comment. Mark pending review, failed checks and unknown outcomes honestly.
2. Write a short portfolio explanation: “The problem was __. I contributed __. The artifact is __. I checked __. The observed outcome was __; __ remains unverified.” Credit collaborators, retain licensing and confirm permitted portfolio use. Distinguish an exercise, voluntary contribution, paid work and employment; never invent metrics or imply maintainer acceptance.
3. Choose one next action: another contribution, sharing permitted work, an application, a professional conversation or [exploring Chris’s independent coaching](https://made-sick.org/directory.html#resource-chris-tran-career). Coaching is optional; free training and contribution remain available independently. Networking and referrals are options alongside applications, with no interview, job, payment or portfolio-acceptance promise.

**With PIXIE, if useful:** use your current task and public-safe evidence to draft a two-sentence contribution explanation and one relevant question or introduction. Review it yourself before sharing. Keep correspondence, employment details and sensitive material private; use only evidence you have permission to disclose. This is a manual prompt within the existing guidance, not automatic contact, sharing or synchronization.

## Remember your place on this device

Optionally choose “Remember this checkpoint on this device” in PIXIE. It stores only the public issue URL and project in this browser. “Forget saved link” removes that pointer; the GitHub issue remains. This does not synchronize across devices or sites.

## What persists

Submitted GitHub issues and comments persist across sessions. Drafts are not saved until submitted. PIXIE does not read private chat history, automatically remember your issue URL, create formal membership, grant repository access or collect email addresses. Keep private material out of public issues. Current open contribution is voluntary and unpaid.

## Current source and release boundary

**One Companion. Specialized projects. No duplicate workflows.** The authoritative
application source is `Loptr-Lab/pixie-ecosystem-guide`, `apps/companion/`, under
review in [PR #5](https://github.com/Loptr-Lab/pixie-ecosystem-guide/pull/5).
Training owns onboarding; it does not host or duplicate the Companion.

Follow the [current development priorities and project responsibilities](https://github.com/Loptr-Lab/pixie-ecosystem-guide#current-development-priorities--27-october-2026)
and [runtime acceptance evidence](https://github.com/Loptr-Lab/pixie-ecosystem-guide/blob/main/HOSTING-AND-DNS.md#companion-runtime-status--27-october-2026).
Finish existing deployment and accessibility acceptance before expanding features.
The existing Site/plugin remains in place; a static preview does not host MCP.
Source PRs do not authorize merging, deploying, Tangled synchronization, domain
changes or plugin replacement. Keep implementation/build commands in the owning
Companion repository rather than repeating them here.

## Respect the existing assignment

[Holdings issue #18](https://github.com/ibloud/pixie-holdings/issues/18) is assigned
to `sweetytweety2406-wq`. The first deliverable is a small draft PR to Holdings:
a proposed historical Drive archive-mapper schema, one synthetic example and
brief workflow instructions. The issue and maintainer comment define the fields
and scope. No private Drive access, live integration, migration or duplicate mapper
work is authorized. Assignment expansion requires maintainer agreement.

Keep progress and questions in that existing issue and the eventual PR. Reviewers
should check required-field coverage, explainable canonical/duplicate/retention
decisions, synthetic-only examples and usable instructions. Identify the affected
field or step, its impact and a concrete correction; do not replace the
contributor's draft with a parallel implementation. No draft PR was open for this
assignment when checked on 27 October 2026.

## Current boundary

The companion website is public. ChatGPT plugin distribution remains private until the public release process completes. GitHub/AT Protocol membership signup and private participant storage are not implemented by this checkpoint workflow. This is shared project coordination using GitHub, not a claim of an integrated AetherOS system. Reported issue text is not accepted story canon or verified completion.

## Hosting and domain

Keep the existing repositories and domain. ecosystem.loptrlab.com remains the hub; training remains the contributor manual; the existing companion serves the workflow. A subdomain under an owned domain normally requires DNS configuration rather than another registration, subject to the DNS provider’s plan. Custom-domain setup does not publish the ChatGPT plugin. Do not repoint the existing ecosystem hostname or migrate MCP/OAuth addresses without testing their supported configuration.

## Source and maintenance

The companion README carries implementation commands and release details. Before editing, reconcile the actual deployed source and the GitHub contribution source; do not assume automatic synchronization. Follow the [canonical ecosystem architecture](https://github.com/ibloud/ibloud.github.io/blob/main/docs/ECOSYSTEM_ARCHITECTURE.md) and [PIXIE interface track](PIXIE_ANNOUNCER_TRACK.md). Existing work is reused; failed retrieval is not proof of loss.
