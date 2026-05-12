import type { MarketplaceSource } from './schemas.js'

export const LEGAL_MARKETPLACE_NAME = 'claude-for-legal'

export const LEGAL_MARKETPLACE_SOURCE = {
  source: 'github',
  repo: 'anthropics/claude-for-legal',
} as const satisfies MarketplaceSource

export const LEGAL_DEFAULT_PLUGIN = 'commercial-legal'

export const LEGAL_PLUGIN_COMMANDS: Record<string, string> = {
  'ai-governance-legal': '/ai-governance-legal:use-case-triage',
  'commercial-legal': '/commercial-legal:review',
  'corporate-legal': '/corporate-legal:diligence-issue-extraction',
  'employment-legal': '/employment-legal:wage-hour-qa',
  'ip-legal': '/ip-legal:clearance',
  'law-student': '/law-student:cold-start-interview',
  'legal-builder-hub': '/legal-builder-hub:registry-browser',
  'legal-clinic': '/legal-clinic:cold-start-interview',
  'litigation-legal': '/litigation-legal:matter-intake',
  'privacy-legal': '/privacy-legal:use-case-triage',
  'product-legal': '/product-legal:is-this-a-problem',
  'regulatory-legal': '/regulatory-legal:reg-feed-watcher',
}

export const LEGAL_PLUGIN_NAMES = Object.keys(LEGAL_PLUGIN_COMMANDS).sort()
