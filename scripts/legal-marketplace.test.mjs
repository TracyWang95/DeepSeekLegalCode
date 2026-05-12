import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = path => readFileSync(join(root, path), 'utf8')
const readJson = path => JSON.parse(read(path))

const packageJson = readJson('package.json')
const projectSettings = readJson('.deepseek/settings.json')
const runner = read('scripts/run-deepseek.mjs')
const main = read('src/main.tsx')
const constants = read('src/utils/plugins/legalMarketplace.ts')
const handler = read('src/cli/handlers/legal.ts')
const pluginCommands = read('src/utils/plugins/loadPluginCommands.ts')
const docs = read('docs/legal-plugins.md')
const design = read('docs/legal-integration-design.md')
const zhDocs = read('docs/legal-plugins.zh-CN.md')
const readmeEn = read('README_EN.md')

assert.match(
  constants,
  /LEGAL_MARKETPLACE_NAME\s*=\s*['"]claude-for-legal['"]/,
  'legal marketplace should use the upstream marketplace name',
)
assert.match(
  constants,
  /repo:\s*['"]anthropics\/claude-for-legal['"]/,
  'legal marketplace should point at the upstream GitHub repo',
)
assert.match(
  constants,
  /LEGAL_DEFAULT_PLUGIN\s*=\s*['"]commercial-legal['"]/,
  'legal setup should have a practical default plugin bundle',
)
assert.match(
  constants,
  /LEGAL_PLUGIN_LABELS/,
  'legal plugins should have user-friendly practice-area labels',
)
assert.match(
  constants,
  /getLegalSkillLabel/,
  'legal skills should have user-friendly second-level command labels',
)
assert.deepEqual(
  projectSettings.extraKnownMarketplaces?.['claude-for-legal']?.source,
  { source: 'github', repo: 'anthropics/claude-for-legal' },
  'project settings should pre-register the legal marketplace',
)

const enabledLegalPlugins = Object.entries(projectSettings.enabledPlugins ?? {})
  .filter(
    ([pluginId, enabled]) =>
      pluginId.endsWith('@claude-for-legal') && enabled === true,
  )
  .map(([pluginId]) => pluginId)
assert.equal(
  enabledLegalPlugins.length,
  12,
  'project settings should enable all core legal plugins',
)

for (const plugin of [
  'commercial-legal',
  'privacy-legal',
  'ai-governance-legal',
  'litigation-legal',
  'law-student',
]) {
  assert.match(
    constants,
    new RegExp(`['"]${plugin}['"]`),
    `${plugin} should be listed`,
  )
  assert.match(
    docs,
    new RegExp(`\`${plugin}\``),
    `${plugin} should be documented`,
  )
}

assert.match(
  handler,
  /addMarketplaceSource\(LEGAL_MARKETPLACE_SOURCE/,
  'legal setup should register the marketplace programmatically',
)
assert.match(
  handler,
  /installPluginOp\(pluginId,\s*scope\)/,
  'legal setup should install through the core plugin operation',
)
assert.match(
  main,
  /program\.command\(['"]legal['"]\)/,
  'CLI should expose a legal command group',
)
assert.match(
  main,
  /legalCmd\.command\(['"]doctor['"]\)/,
  'CLI should expose a legal doctor command',
)
assert.match(
  main,
  /legalCmd\.command\(['"]commands \[plugin\]['"]\)/,
  'CLI should expose a legal commands browser',
)
assert.match(
  handler,
  /legalDoctorHandler/,
  'legal handler should implement doctor diagnostics',
)
assert.match(
  handler,
  /legalCommandsHandler/,
  'legal handler should implement a beginner-friendly command list',
)
assert.match(
  handler,
  /installPluginsForHeadless\(\)/,
  'legal doctor should materialize project-declared legal plugins',
)
assert.match(
  handler,
  /installSelectedPlugins\(missingLegalPluginIds/,
  'legal doctor should install enabled legal plugins declared by project settings',
)
assert.match(
  pluginCommands,
  /getUserFacingPluginCommandName\(commandName,\s*displayName\)/,
  'plugin slash command display names should be resolved through a collision-safe helper',
)
assert.match(
  pluginCommands,
  /!trimmedDisplayName\.includes\(['"]:['"]\)/,
  'short plugin skill names like customize should not replace fully-qualified slash commands',
)
assert.match(
  runner,
  /'legal'/,
  'legal plugin management should not prompt for an API key',
)
assert.match(
  runner,
  /CLAUDE_CODE_SYNC_PLUGIN_INSTALL/,
  'runner should synchronously install project-declared plugins for fresh legal checkouts',
)
assert.match(
  readmeEn,
  /## Quick Start/,
  'English README should include the lawyer quick-start section',
)
assert.match(
  readmeEn,
  /12 `claude-for-legal` plugin bundles/,
  'English README should describe the preconfigured legal plugin bundles',
)
assert.match(
  docs,
  /deepseek-code legal doctor/,
  'legal docs should include doctor diagnostics',
)
assert.match(
  design,
  /anthropics\/claude-for-legal/,
  'integration design should document the upstream marketplace source',
)
assert.match(
  zhDocs,
  /DEEPSEEK_API_KEY/,
  'Chinese legal documentation should include lawyer setup guidance',
)
assert.match(
  packageJson.scripts['test:release'],
  /legal-marketplace\.test\.mjs/,
  'release tests should cover legal marketplace integration',
)
