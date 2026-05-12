# DeepSeekLegalCode

[简体中文](README.md) | [English](README_EN.md)

DeepSeekLegalCode is a local CLI agent for legal work. It is adapted from the DeepSeekCode / Claude Code codebase, routes model calls to DeepSeek's Anthropic-compatible API, and ships with the `claude-for-legal` plugin marketplace preconfigured.

> Community project. Not an official DeepSeek or Anthropic product. Legal plugin outputs are drafts for attorney, legal-team, instructor, or student review, not legal advice.

![Node](https://img.shields.io/badge/node-%3E%3D18-339933)
![License](https://img.shields.io/badge/license-MIT-blue)
![DeepSeek](https://img.shields.io/badge/model-DeepSeek%20V4-4c8bf5)
![Legal Plugins](https://img.shields.io/badge/legal%20plugins-12%20preconfigured-6f42c1)

## Project Scope

- **Lawyer-friendly by default**: `.deepseek/settings.json` pre-registers `claude-for-legal` and enables 12 legal plugins.
- **Only one required setup step**: users provide `DEEPSEEK_API_KEY`; they do not need to understand marketplaces, MCP, or plugin installation.
- **Clear command names**: legal skills are shown as `/plugin:skill`, for example `/law-student:case-brief`, so duplicate names such as `customize` stay unambiguous.
- **Local-first workflow**: code, settings, plugin cache, and MCP connections run on the user's machine or chosen environment.
- **Open-source ready**: bilingual documentation, integration notes, tests, and a secret-scanning path are committed in the repo.

## Quick Start

```powershell
git clone https://github.com/TracyWang95/DeepSeekLegalCode.git
cd DeepSeekLegalCode
npm ci --ignore-scripts
npm run check
```

Set your DeepSeek API key:

```powershell
$env:DEEPSEEK_API_KEY="sk-..."
```

Start the interactive CLI:

```powershell
node scripts/run-deepseek.mjs
```

Type `/` in the interface to browse commands. Legal plugin commands use `/plugin:skill` names, for example:

```text
/commercial-legal:review Review the contracts in the current folder and list high-risk clauses, proposed edits, and attorney-confirmation questions.
/privacy-legal:use-case-triage Triage the privacy risk of an AI product feature and ask what facts are needed.
/law-student:case-brief Brief this case and identify the holding and rule.
```

## Legal Plugins

In this project, a "plugin" is not a broad legal taxonomy bucket. It is an upstream `claude-for-legal` practice bundle: one work surface, one profile, and a set of concrete second-level skills. The action you run is `/plugin:skill`. Use `node scripts/run-deepseek.mjs legal commands <plugin>` to inspect the full skill list.

This repository enables 12 `claude-for-legal` plugin bundles by default:

| Plugin Bundle | Boundary / Users | Concrete Skills | Good First Command |
| --- | --- | --- | --- |
| `commercial-legal` | Commercial contract operations: vendor agreements, NDAs, SaaS subscriptions, renewals, and escalation routing; not generic business-law advice. | `review`, `nda-review`, `saas-msa-review`, `vendor-agreement-review`, `renewal-tracker`, `stakeholder-summary` | `/commercial-legal:review` |
| `privacy-legal` | Privacy workflows: PIA/DPIA triage, DPAs, DSARs, and policy/practice drift; not every data-law question. | `use-case-triage`, `pia-generation`, `dpa-review`, `dsar-response`, `policy-monitor`, `reg-gap-analysis` | `/privacy-legal:use-case-triage` |
| `product-legal` | Product legal intake: feature risk, launch review, marketing claims, and fast triage for product teams. | `is-this-a-problem`, `feature-risk-assessment`, `launch-review`, `marketing-claims-review` | `/product-legal:is-this-a-problem` |
| `corporate-legal` | Corporate transactions and governance: M&A diligence, closings, board materials, entity compliance, and material contracts. | `diligence-issue-extraction`, `tabular-review`, `closing-checklist`, `board-minutes`, `entity-compliance` | `/corporate-legal:diligence-issue-extraction` |
| `employment-legal` | Employment and HR compliance: hiring, termination, classification, leave, investigations, and policies; jurisdiction matters. | `hiring-review`, `termination-review`, `worker-classification`, `wage-hour-qa`, `leave-tracker`, `policy-drafting` | `/employment-legal:wage-hour-qa` |
| `regulatory-legal` | Regulatory monitoring and policy gaps: feeds, policy diffs, gap surfacing, comments, and redrafts. | `reg-feed-watcher`, `policy-diff`, `gap-surfacer`, `gaps`, `comments`, `policy-redraft` | `/regulatory-legal:reg-feed-watcher` |
| `ai-governance-legal` | AI governance: AI use cases, impact assessments, inventories, vendor AI terms, and internal AI policies. | `use-case-triage`, `aia-generation`, `ai-inventory`, `vendor-ai-review`, `policy-starter`, `reg-gap-analysis` | `/ai-governance-legal:use-case-triage` |
| `litigation-legal` | Litigation and disputes: matter intake, legal holds, chronologies, claim charts, discovery, and counsel status. | `matter-intake`, `legal-hold`, `chronology`, `claim-chart`, `privilege-log-review`, `subpoena-triage` | `/litigation-legal:matter-intake` |
| `ip-legal` | IP practice: trademark clearance, FTO triage, open-source compliance, IP clauses, infringement triage, and portfolio tracking. | `clearance`, `fto-triage`, `oss-review`, `ip-clause-review`, `infringement-triage`, `portfolio` | `/ip-legal:clearance` |
| `legal-clinic` | Clinical legal education: client intake, research roadmaps, drafting, supervisor review, deadlines, and semester handoffs; not a general law-firm CRM. | `client-intake`, `research-start`, `memo`, `client-letter`, `supervisor-review-queue`, `semester-handoff` | `/legal-clinic:research-start` |
| `law-student` | Law-school learning: Socratic drills, case briefs, cold-call prep, IRAC, flashcards, and exam prep; learning mode, not answer-writing mode. | `session`, `case-brief`, `cold-call-prep`, `irac-practice`, `flashcards`, `study-plan`, `exam-forecast` | `/law-student:case-brief` |
| `legal-builder-hub` | Legal plugin ecosystem management: browse, install, update, disable, and QA community legal skills; it does not perform legal analysis itself. | `registry-browser`, `skill-installer`, `skill-manager`, `skills-qa`, `auto-updater`, `disable` | `/legal-builder-hub:registry-browser` |

List all plugins:

```powershell
node scripts/run-deepseek.mjs legal list
```

List every second-level skill under one plugin:

```powershell
node scripts/run-deepseek.mjs legal commands law-student
```

Check local plugin installation state:

```powershell
node scripts/run-deepseek.mjs legal doctor
```

`legal doctor` synchronizes the project-declared marketplace and enabled plugins into the local plugin cache. It is the quickest first check on a new machine or fresh clone.

## MCP Usage

MCP is optional. Legal plugins can use MCP servers to read local folders, knowledge bases, document systems, research systems, or team tools.

List configured MCP servers:

```powershell
node scripts/run-deepseek.mjs mcp list
```

Add a local filesystem MCP server:

```powershell
node scripts/run-deepseek.mjs mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem D:\Contracts
```

Then ask a legal plugin command to use that source:

```text
/commercial-legal:review Use the filesystem MCP to read D:\Contracts, review the agreement, and output a risk table.
```

## Project Layout

```text
.deepseek/settings.json               # Pre-registers claude-for-legal and enables 12 legal plugins
docs/legal-plugins.md                 # English legal plugin guide
docs/legal-plugins.zh-CN.md           # Chinese legal plugin guide
docs/legal-integration-design.md      # Integration design notes
scripts/run-deepseek.mjs              # DeepSeek launcher
scripts/legal-marketplace.test.mjs    # Legal marketplace integration test
src/cli/handlers/legal.ts             # legal subcommands
src/utils/plugins/legalMarketplace.ts # Legal plugin metadata and labels
```

## Development Commands

```powershell
npm run check
npm test
node scripts/run-deepseek.mjs legal doctor
node scripts/run-deepseek.mjs legal commands law-student
```

## Security Notes

- Do not commit DeepSeek API keys to the repo, README, issues, screenshots, or logs.
- The repository only records the public marketplace source: `anthropics/claude-for-legal`.
- Legal outputs are drafts by default and require qualified attorney, legal-team lead, instructor, or supervisor review.
- For current laws, regulations, cases, effective dates, monetary thresholds, and filing deadlines, verify against reliable sources or legal research tools.

## License

MIT. Upstream Claude Code / Claude for Legal trademarks, code, and content belong to their respective owners.
