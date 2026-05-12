# DeepSeekLegalCode

[简体中文](README.md) | [English](README_EN.md)

DeepSeekLegalCode is a local CLI agent for legal professional work. It is adapted from the DeepSeekCode / Claude Code codebase, routes model calls to DeepSeek's Anthropic-compatible API, and this repository ships with Anthropic's `claude-for-legal` plugin marketplace preconfigured.

> Community project. Not an official DeepSeek or Anthropic product. Legal workflow outputs are attorney-review drafts, not legal advice.

![DeepSeekCode](DeepSeekCode.png)

![Node](https://img.shields.io/badge/node-%3E%3D18-339933)
![License](https://img.shields.io/badge/license-MIT-blue)
![DeepSeek](https://img.shields.io/badge/model-DeepSeek%20V4-4c8bf5)
![Legal Workflows](https://img.shields.io/badge/legal%20workflows-12%20preinstalled-6f42c1)

## Why This Project

- **Lawyer-friendly by default**: `.deepseek/settings.json` pre-registers `claude-for-legal` and enables 12 core legal workflows.
- **Only one required setup step**: users provide `DEEPSEEK_API_KEY`; no marketplace or plugin installation knowledge is required.
- **DeepSeek-powered agent runtime**: keeps Claude Code-style tool use, slash commands, sub-agents, MCP, and permission prompts while using DeepSeek models.
- **Auditable integration**: marketplace source, preinstalled settings, diagnostics, tests, and design notes are all committed in the repo.
- **Open-source ready**: bilingual documentation, verification commands, and a secret-scanning path are included.

## Quick Start For Lawyers

Install dependencies and build:

```powershell
cd D:\DeepSeekCode
npm ci --ignore-scripts
npm run check
```

Set your DeepSeek API key:

```powershell
$env:DEEPSEEK_API_KEY="sk-..."
```

Start DeepSeekCode:

```powershell
node scripts/run-deepseek.mjs
```

Then run a preinstalled legal workflow:

```text
/commercial-legal:review Review the contract in the current folder. List high-risk clauses, proposed edits, and questions for attorney confirmation.
```

One-shot mode:

```powershell
node scripts/run-deepseek.mjs -p "/privacy-legal:use-case-triage What information do you need to triage a new AI product feature?"
```

## Preinstalled Legal Workflows

This repository enables 12 legal plugins by default:

| Use Case | Plugin | First Command |
| --- | --- | --- |
| Commercial contracts / SaaS / NDA | `commercial-legal` | `/commercial-legal:review` |
| Privacy / DPIA / DPA | `privacy-legal` | `/privacy-legal:use-case-triage` |
| Product counseling / marketing claims / launch review | `product-legal` | `/product-legal:is-this-a-problem` |
| Corporate / M&A / board materials | `corporate-legal` | `/corporate-legal:diligence-issue-extraction` |
| Employment / HR compliance | `employment-legal` | `/employment-legal:wage-hour-qa` |
| Regulatory monitoring / policy gaps / comments | `regulatory-legal` | `/regulatory-legal:reg-feed-watcher` |
| AI governance / vendor AI terms / impact assessments | `ai-governance-legal` | `/ai-governance-legal:use-case-triage` |
| Litigation / holds / discovery / outside counsel | `litigation-legal` | `/litigation-legal:matter-intake` |
| IP / trademark / FTO / open source | `ip-legal` | `/ip-legal:clearance` |
| Legal clinic supervision | `legal-clinic` | `/legal-clinic:cold-start-interview` |
| Law school study workflows | `law-student` | `/law-student:cold-start-interview` |
| Legal plugin discovery and management | `legal-builder-hub` | `/legal-builder-hub:registry-browser` |

Check local installation state:

```powershell
node scripts/run-deepseek.mjs legal doctor
```

List all legal workflows:

```powershell
node scripts/run-deepseek.mjs legal list
```

List every second-level command in one workflow:

```powershell
node scripts/run-deepseek.mjs legal commands law-student
```

In the interactive `/` menu, legal skills are shown as `/plugin:skill`, for
example `/law-student:case-brief`, with a short practice label beside them.

## MCP Usage

Legal plugins can use MCP servers for local files, knowledge bases, Slack, Google Drive, research systems, and other data sources.

List configured MCP servers:

```powershell
node scripts/run-deepseek.mjs mcp list
```

Add a local filesystem MCP server:

```powershell
node scripts/run-deepseek.mjs mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem D:\Contracts
```

Use it from a legal workflow:

```text
/commercial-legal:review Use the filesystem MCP to read D:\Contracts and produce a contract risk table.
```

## Core DeepSeekCode Capabilities

- Project-aware chat with tool execution and permission prompts
- Thinking mode with `max` effort by default
- File reading, editing, diffs, sub-agents, and task decomposition
- MCP, hooks, plugins, and slash commands
- `-p` non-interactive mode for scripts and CI
- 1M context window and up to 384K output tokens
- Isolated config under `~/.deepseek-code` and project `.deepseek/`

## Repository Layout

```text
.deepseek/settings.json              # Preinstalls claude-for-legal and 12 legal plugins
docs/legal-plugins.md                # English legal workflow guide
docs/legal-plugins.zh-CN.md          # Chinese legal workflow guide
docs/legal-integration-design.md     # Integration design notes
scripts/run-deepseek.mjs             # DeepSeek launcher
scripts/legal-marketplace.test.mjs   # Legal marketplace integration test
src/cli/handlers/legal.ts            # legal subcommands
src/utils/plugins/legalMarketplace.ts # legal marketplace constants
```

## Development

```bash
git clone https://github.com/TracyWang95/DeepSeekLegalCode.git
cd DeepSeekCode
npm ci --ignore-scripts
npm run check
npm test
```

Common commands:

```bash
npm run build          # Build dist/cli.js
npm run check          # Build and verify version output
npm test               # Run release test suite
node scripts/run-deepseek.mjs legal doctor
```

## Model Aliases

| Alias | DeepSeek Model |
| --- | --- |
| `pro` | `deepseek-v4-pro` |
| `flash` | `deepseek-v4-flash` |

Legacy Claude aliases (`sonnet`, `opus`, `haiku`, `best`) remain compatible.

## Documentation

| Document | Description |
| --- | --- |
| [Legal Plugins](docs/legal-plugins.md) | Preinstalled workflows, lawyer usage, MCP, and safety boundaries |
| [中文法律插件指南](docs/legal-plugins.zh-CN.md) | Chinese legal workflow guide |
| [Integration Design](docs/legal-integration-design.md) | Marketplace, preinstalled settings, and verification gates |
| [Getting Started](docs/getting-started.md) | Installation, first run, API key setup |
| [Configuration](docs/configuration.md) | Environment variables, model aliases, settings.json |
| [Usage Guide](docs/usage.md) | Interactive mode, CLI flags, slash commands, tools |
| [MCP & Advanced](docs/mcp-and-advanced.md) | MCP servers, sub-agents, hooks, worktrees, CI/CD |
| [Architecture](docs/architecture.md) | Project structure, build pipeline, adapter internals |

## Security And Responsibility

- `DEEPSEEK_API_KEY` is never written to repository files, settings, or plugin manifests.
- Preinstalled settings only store the public marketplace source: `anthropics/claude-for-legal`.
- Legal outputs require attorney review. Verify citations, deadlines, jurisdictions, and factual assumptions before relying on any output.
- Before publishing, run:

```bash
npm run check
npm test
rg "sk-[0-9a-f]{20,}|DEEPSEEK_API_KEY=.*sk-" -n .
```

## License

[MIT](LICENSE)
