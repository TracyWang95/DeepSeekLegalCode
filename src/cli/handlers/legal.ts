/* eslint-disable custom-rules/no-process-exit -- CLI handler exits after command completion */
import figures from 'figures'
import { setUseCoworkPlugins } from '../../bootstrap/state.js'
import {
  type InstallableScope,
  assertInstallableScope,
  installPluginOp,
} from '../../services/plugins/pluginOperations.js'
import { cliError, cliOk } from '../exit.js'
import { errorMessage } from '../../utils/errors.js'
import { logError } from '../../utils/log.js'
import { clearAllCaches } from '../../utils/plugins/cacheUtils.js'
import { loadInstalledPluginsV2 } from '../../utils/plugins/installedPluginsManager.js'
import {
  addMarketplaceSource,
  loadKnownMarketplacesConfig,
  saveMarketplaceToSettings,
} from '../../utils/plugins/marketplaceManager.js'
import {
  checkEnabledPlugins,
  findMissingPlugins,
  installSelectedPlugins,
} from '../../utils/plugins/pluginStartupCheck.js'
import { installPluginsForHeadless } from '../../utils/plugins/headlessPluginInstall.js'
import {
  LEGAL_DEFAULT_PLUGIN,
  LEGAL_MARKETPLACE_NAME,
  LEGAL_MARKETPLACE_SOURCE,
  LEGAL_PLUGIN_COMMANDS,
  LEGAL_PLUGIN_NAMES,
} from '../../utils/plugins/legalMarketplace.js'
import { scopeToSettingSource } from '../../utils/plugins/pluginIdentifier.js'

type LegalOptions = {
  cowork?: boolean
  scope?: string
}

function validateLegalPlugin(plugin: string): void {
  if (plugin in LEGAL_PLUGIN_COMMANDS) return

  cliError(
    `${figures.cross} Unknown legal plugin "${plugin}". Available plugins: ${LEGAL_PLUGIN_NAMES.join(', ')}`,
  )
}

function resolveScope(options: LegalOptions): InstallableScope {
  const scope = options.scope || 'user'
  assertInstallableScope(scope)
  if (options.cowork && scope !== 'user') {
    cliError('--cowork can only be used with user scope')
  }
  return scope
}

export async function legalListHandler(): Promise<void> {
  process.stdout.write('DeepSeekCode legal plugins:\n\n')
  for (const name of LEGAL_PLUGIN_NAMES) {
    process.stdout.write(`  ${figures.pointer} ${name}\n`)
    process.stdout.write(`    First command: ${LEGAL_PLUGIN_COMMANDS[name]}\n`)
  }
  process.stdout.write(
    `\nInstall one with: deepseek-code legal setup ${LEGAL_DEFAULT_PLUGIN}\n`,
  )
  cliOk()
}

export async function legalDoctorHandler(): Promise<void> {
  try {
    process.stdout.write('Syncing declared legal plugins...\n')
    await installPluginsForHeadless()
    const enabledPluginIds = await checkEnabledPlugins()
    const missingLegalPluginIds = (await findMissingPlugins(enabledPluginIds)).filter(
      pluginId => pluginId.endsWith(`@${LEGAL_MARKETPLACE_NAME}`),
    )
    if (missingLegalPluginIds.length > 0) {
      await installSelectedPlugins(missingLegalPluginIds, undefined, 'user')
    }

    const marketplaces = await loadKnownMarketplacesConfig()
    const installed = loadInstalledPluginsV2()
    const enabled = new Set(await checkEnabledPlugins())
    const marketplace = marketplaces[LEGAL_MARKETPLACE_NAME]
    const legalPluginIds = Object.keys(installed.plugins)
      .filter(pluginId => pluginId.endsWith(`@${LEGAL_MARKETPLACE_NAME}`))
      .sort()

    process.stdout.write('DeepSeekCode legal integration status:\n\n')
    process.stdout.write(
      `  ${marketplace ? figures.tick : figures.cross} Marketplace: ${LEGAL_MARKETPLACE_NAME}\n`,
    )
    if (marketplace?.source.source === 'github') {
      process.stdout.write(`    Source: ${marketplace.source.repo}\n`)
    }
    if (marketplace?.installLocation) {
      process.stdout.write(`    Cache: ${marketplace.installLocation}\n`)
    }

    if (legalPluginIds.length === 0) {
      process.stdout.write(
        `\n  ${figures.cross} No legal plugins installed\n` +
          `    Run: deepseek-code legal setup ${LEGAL_DEFAULT_PLUGIN}\n`,
      )
      cliOk()
    }

    process.stdout.write('\n  Installed legal plugins:\n')
    for (const pluginId of legalPluginIds) {
      const pluginName = pluginId.slice(
        0,
        -`@${LEGAL_MARKETPLACE_NAME}`.length,
      )
      const installations = installed.plugins[pluginId] ?? []
      const scopes = installations.map(entry => entry.scope).join(', ')
      process.stdout.write(
        `    ${enabled.has(pluginId) ? figures.tick : figures.cross} ${pluginId} (${scopes || 'unknown'} scope)\n`,
      )
      if (LEGAL_PLUGIN_COMMANDS[pluginName]) {
        process.stdout.write(
          `      First command: ${LEGAL_PLUGIN_COMMANDS[pluginName]}\n`,
        )
      }
    }

    cliOk()
  } catch (error) {
    logError(error)
    cliError(`${figures.cross} Failed to diagnose legal plugins: ${errorMessage(error)}`)
  }
}

export async function legalSetupHandler(
  plugin = LEGAL_DEFAULT_PLUGIN,
  options: LegalOptions,
): Promise<void> {
  if (options.cowork) setUseCoworkPlugins(true)

  try {
    validateLegalPlugin(plugin)
    const scope = resolveScope(options)

    process.stdout.write(
      `Adding ${LEGAL_MARKETPLACE_NAME} marketplace from ${LEGAL_MARKETPLACE_SOURCE.repo}...\n`,
    )
    const { name, alreadyMaterialized, resolvedSource } =
      await addMarketplaceSource(LEGAL_MARKETPLACE_SOURCE, message => {
        process.stdout.write(`${message}\n`)
      })

    saveMarketplaceToSettings(
      name,
      { source: resolvedSource },
      scopeToSettingSource(scope),
    )
    clearAllCaches()

    const pluginId = `${plugin}@${LEGAL_MARKETPLACE_NAME}`
    process.stdout.write(`Installing ${pluginId} at ${scope} scope...\n`)
    const result = await installPluginOp(pluginId, scope)

    if (!result.success) {
      throw new Error(result.message)
    }

    const firstCommand = LEGAL_PLUGIN_COMMANDS[plugin]
    cliOk(
      `${figures.tick} ${alreadyMaterialized ? 'Marketplace already configured' : 'Marketplace configured'}\n` +
        `${figures.tick} ${result.message}\n` +
        `Restart DeepSeek Code, then run: ${firstCommand}`,
    )
  } catch (error) {
    logError(error)
    cliError(`${figures.cross} Failed to set up legal plugin: ${errorMessage(error)}`)
  }
}
