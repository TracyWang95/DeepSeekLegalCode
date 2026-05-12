# DeepSeek Legal Plugins

DeepSeekCode can run Anthropic's `claude-for-legal` plugin marketplace through the
existing plugin system while routing model calls to DeepSeek.

This repository ships with project-level defaults in `.deepseek/settings.json`:

- `claude-for-legal` is pre-registered as a marketplace.
- The 12 core legal workflows are enabled by default.

On first startup, DeepSeekCode can materialize the configured marketplace and
plugin into the user's local plugin cache. The helper commands below remain
available for installing additional legal workflows.

## Lawyer quick start

For this repository, lawyers only need a DeepSeek API key:

```bash
setx DEEPSEEK_API_KEY "sk-..."
deepseek-code
```

or from a source checkout:

```bash
node scripts/run-deepseek.mjs
```

DeepSeekCode detects `.deepseek/settings.json` and synchronizes the preinstalled
legal plugin before the first headless prompt. In interactive mode, accept the
workspace trust prompt and the legal plugin will be prepared from the repository
defaults.

## Install another workflow

Install the commercial legal workflow:

```bash
deepseek-code legal setup commercial-legal
```

Install a different workflow:

```bash
deepseek-code legal list
deepseek-code legal setup privacy-legal
deepseek-code legal setup ai-governance-legal
```

The command adds the `anthropics/claude-for-legal` marketplace, installs the
selected plugin at user scope by default, and prints the first slash command to
run after restarting DeepSeekCode.

Check the local installation state:

```bash
deepseek-code legal doctor
```

`legal doctor` also synchronizes the project-declared marketplace and enabled
plugin into the local plugin cache, so it is the fastest way to verify a fresh
clone.

## Manual setup

The helper is equivalent to:

```bash
deepseek-code plugin marketplace add anthropics/claude-for-legal --scope user
deepseek-code plugin install commercial-legal@claude-for-legal --scope user
```

Use `--scope project` only when the legal workflow must be shared with the
current repository. User scope is the better default for legal work because the
plugin can be used from any client matter workspace.

## Available workflows

| Plugin | First command |
| --- | --- |
| `commercial-legal` | `/commercial-legal:review` |
| `privacy-legal` | `/privacy-legal:use-case-triage` |
| `product-legal` | `/product-legal:is-this-a-problem` |
| `corporate-legal` | `/corporate-legal:diligence-issue-extraction` |
| `employment-legal` | `/employment-legal:wage-hour-qa` |
| `regulatory-legal` | `/regulatory-legal:reg-feed-watcher` |
| `ai-governance-legal` | `/ai-governance-legal:use-case-triage` |
| `litigation-legal` | `/litigation-legal:matter-intake` |
| `ip-legal` | `/ip-legal:clearance` |
| `legal-clinic` | `/legal-clinic:cold-start-interview` |
| `law-student` | `/law-student:cold-start-interview` |
| `legal-builder-hub` | `/legal-builder-hub:registry-browser` |

## Safety model

Legal plugin output is draft work product for attorney review. DeepSeekCode
does not turn these workflows into legal advice, legal conclusions, or a
substitute for professional responsibility. Verify citations, jurisdictional
assumptions, deadlines, and anything that will be filed, sent, or relied on.

## Troubleshooting

If a model call fails with `Insufficient Balance`, the DeepSeek account behind
`DEEPSEEK_API_KEY` needs billing credit before workflows can run. Plugin setup,
listing, validation, and `legal doctor` do not require a model call.
