# DeepSeek Legal Plugins

DeepSeekLegalCode runs the upstream `claude-for-legal` marketplace through the existing plugin system while routing model calls to DeepSeek.

This repository ships with project-level defaults in `.deepseek/settings.json`:

- `claude-for-legal` is pre-registered from `anthropics/claude-for-legal`.
- 12 legal plugin bundles are enabled by default.
- Startup and `legal doctor` can synchronize the project-declared marketplace and plugins into the local plugin cache.

## Lawyer Quick Start

Lawyer users only need a DeepSeek API key:

```cmd
setx DEEPSEEK_API_KEY "sk-..."
deepseek-code
```

From a source checkout:

```powershell
node scripts/run-deepseek.mjs
```

Type `/` in the interactive UI to browse commands. Legal skills are shown as `/plugin:skill`, for example `/law-student:case-brief`, so duplicate skill names such as `customize` remain unambiguous.

## Plugin vs. Skill

In this repository, a plugin is a practice bundle. It defines a work surface, profile, and a group of second-level skills. The concrete action you run is the skill.

Examples:

```text
/commercial-legal:review
/privacy-legal:use-case-triage
/law-student:case-brief
```

The left side of the colon is the plugin bundle. The right side is the concrete skill.

## Common Commands

List all legal plugins:

```powershell
deepseek-code legal list
```

List every second-level skill under one plugin:

```powershell
deepseek-code legal commands law-student
```

Check local installation state and synchronize project defaults:

```powershell
deepseek-code legal doctor
```

Install one plugin manually:

```powershell
deepseek-code legal setup commercial-legal
```

User scope is the better default for legal work because the same plugin can be used from different client or matter workspaces. Use project scope only when the team intentionally wants the plugin declaration committed to the current repository.

## Preconfigured Plugin Bundles

| Plugin Bundle | Boundary | Good First Command |
| --- | --- | --- |
| `commercial-legal` | Commercial contract operations: vendor agreements, NDAs, SaaS subscriptions, renewals, and escalation routing. | `/commercial-legal:review` |
| `privacy-legal` | Privacy workflows: PIA/DPIA, DPAs, DSARs, and policy/practice drift. | `/privacy-legal:use-case-triage` |
| `product-legal` | Product legal intake: feature risk, launch review, marketing claims, and fast triage. | `/product-legal:is-this-a-problem` |
| `corporate-legal` | Corporate transactions and governance: M&A diligence, closings, board materials, and entity compliance. | `/corporate-legal:diligence-issue-extraction` |
| `employment-legal` | Employment and HR compliance: hiring, termination, classification, leave, investigations, and policies. | `/employment-legal:wage-hour-qa` |
| `regulatory-legal` | Regulatory monitoring and policy gaps: feeds, policy diffs, gaps, comments, and redrafts. | `/regulatory-legal:reg-feed-watcher` |
| `ai-governance-legal` | AI governance: use cases, impact assessments, inventories, vendor AI terms, and policies. | `/ai-governance-legal:use-case-triage` |
| `litigation-legal` | Litigation and disputes: matter intake, legal holds, chronologies, claim charts, and discovery. | `/litigation-legal:matter-intake` |
| `ip-legal` | IP practice: trademark clearance, FTO triage, open-source compliance, IP clauses, and infringement triage. | `/ip-legal:clearance` |
| `legal-clinic` | Clinical legal education: intake, research roadmaps, drafting, supervisor review, and semester handoffs. | `/legal-clinic:research-start` |
| `law-student` | Law-school learning: case briefs, cold-call prep, IRAC, flashcards, and exam prep. | `/law-student:case-brief` |
| `legal-builder-hub` | Legal plugin ecosystem management: browse, install, update, disable, and QA community skills. | `/legal-builder-hub:registry-browser` |

## Safety Model

- Legal plugin output is draft work product, not legal advice.
- Verify facts, citations, jurisdictions, deadlines, authority, and anything that will be filed, sent, or relied on.
- Do not commit `DEEPSEEK_API_KEY` to the repository, issues, screenshots, or logs.
- If a model call fails with `Insufficient Balance`, the DeepSeek account behind `DEEPSEEK_API_KEY` needs billing credit. Plugin setup, listing, validation, and `legal doctor` do not require a model call.
