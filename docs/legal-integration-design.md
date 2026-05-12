# Legal Integration Design

This integration keeps `claude-for-legal` as an upstream marketplace and adds a
thin DeepSeekCode-native onboarding layer around it.

## Goals

- Use Anthropic's published legal plugins without vendoring or forking their
  content.
- Route all model traffic through DeepSeekCode's existing DeepSeek adapter.
- Make installation discoverable through a first-class `legal` command group.
- Keep legal workflows auditable: explicit marketplace source, visible install
  scope, and a diagnostic command for local state.

## Architecture

The repository includes `.deepseek/settings.json` so a clone carries the legal
plugin intent:

```json
{
  "extraKnownMarketplaces": {
    "claude-for-legal": {
      "source": {
        "source": "github",
        "repo": "anthropics/claude-for-legal"
      },
      "autoUpdate": true
    }
  },
  "enabledPlugins": {
    "privacy-legal@claude-for-legal": true,
    "commercial-legal@claude-for-legal": true
  }
}
```

The full file enables all 12 core legal workflows. The shortened example above
shows the shape only. The user's machine still owns the downloaded marketplace
cache and versioned plugin cache.

`deepseek-code legal setup <plugin>` performs three operations:

1. Register `anthropics/claude-for-legal` as a plugin marketplace.
2. Persist that marketplace declaration at the requested settings scope.
3. Install `<plugin>@claude-for-legal` through the existing plugin installer.

The legal command group does not bypass the plugin system. It delegates to the
same marketplace and plugin operations used by `deepseek-code plugin`, so
updates, enable/disable behavior, and plugin manifests remain standard.

## Commands

| Command | Purpose |
| --- | --- |
| `deepseek-code legal list` | Show curated legal plugins and first commands. |
| `deepseek-code legal commands [plugin]` | Show every `/plugin:skill` command, with beginner-friendly labels. |
| `deepseek-code legal setup [plugin]` | Add the marketplace and install a plugin. |
| `deepseek-code legal doctor` | Check marketplace, installed plugins, scopes, and enabled state. |

## Security and secrets

The integration never writes `DEEPSEEK_API_KEY` to code, plugin manifests, or
settings. Users provide the key through the normal environment-variable path.

Marketplace registration stores only the public source:

```json
{
  "source": "github",
  "repo": "anthropics/claude-for-legal"
}
```

## Verification gates

- `npm run check` builds the CLI and verifies `dist/cli.js --version`.
- `npm test` includes `scripts/legal-marketplace.test.mjs`.
- Runtime smoke checks should cover:
  - `deepseek-code legal list`
  - `deepseek-code legal setup privacy-legal --scope local`
  - `deepseek-code legal doctor`
  - a short `-p` model call after the DeepSeek account has available balance.
