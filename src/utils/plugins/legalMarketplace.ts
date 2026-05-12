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

export const LEGAL_PLUGIN_LABELS: Record<string, string> = {
  'ai-governance-legal': 'AI 治理',
  'commercial-legal': '商业合同',
  'corporate-legal': '公司法务',
  'employment-legal': '劳动雇佣',
  'ip-legal': '知识产权',
  'law-student': '法学生学习',
  'legal-builder-hub': '法律插件管理',
  'legal-clinic': '法律诊所',
  'litigation-legal': '诉讼事项',
  'privacy-legal': '隐私合规',
  'product-legal': '产品法务',
  'regulatory-legal': '监管合规',
}

const LEGAL_COMMON_SKILL_LABELS: Record<string, string> = {
  'cold-start-interview': '初次配置',
  customize: '修改配置',
  'matter-workspace': '事项空间',
  'policy-monitor': '政策监控',
  'reg-gap-analysis': '法规差距分析',
  'use-case-triage': '用例风险初筛',
}

const LEGAL_PLUGIN_SKILL_LABELS: Record<string, Record<string, string>> = {
  'ai-governance-legal': {
    'ai-inventory': 'AI 清单盘点',
    'aia-generation': 'AI 影响评估',
    'policy-starter': 'AI 政策起草',
    'vendor-ai-review': 'AI 供应商条款审查',
  },
  'commercial-legal': {
    'amendment-history': '修订历史梳理',
    'escalation-flagger': '升级事项标记',
    'nda-review': 'NDA 审查',
    'renewal-tracker': '续约提醒',
    review: '合同审查',
    'review-proposals': '修改建议',
    'saas-msa-review': 'SaaS MSA 审查',
    'stakeholder-summary': '业务摘要',
    'vendor-agreement-review': '供应商协议审查',
  },
  'corporate-legal': {
    'ai-tool-handoff': 'AI 工具交接',
    'board-minutes': '董事会纪要',
    'closing-checklist': '交割清单',
    'deal-team-summary': '交易团队摘要',
    'diligence-issue-extraction': '尽调问题提取',
    'entity-compliance': '主体合规',
    'integration-management': '整合管理',
    'material-contract-schedule': '重大合同清单',
    'tabular-review': '表格化审查',
    'written-consent': '书面同意',
  },
  'employment-legal': {
    'classification-check': '用工分类检查',
    'expansion-kickoff': '跨地区扩张启动',
    'expansion-update': '扩张事项更新',
    'final-pay': '离职工资检查',
    'handbook-updates': '员工手册更新',
    'hiring-review': '招聘合规审查',
    investigation: '内部调查',
    'internal-investigation': '内部调查',
    'international-expansion': '国际扩张合规',
    'investigation-add': '调查材料补充',
    'investigation-memo': '调查备忘录',
    'investigation-open': '启动调查',
    'investigation-query': '调查事项查询',
    'investigation-summary': '调查摘要',
    'leave-tracker': '休假跟踪',
    'log-leave': '记录休假',
    'offer-review': '录用文件审查',
    'policy-drafting': '制度起草',
    'termination-review': '解雇审查',
    'wage-hour-qa': '工时工资问答',
    'worker-classification': '员工/承包商分类',
  },
  'ip-legal': {
    'cease-desist': '停止侵权函',
    clearance: '商标清查',
    'dmca-takedown': 'DMCA 下架',
    'fto-triage': 'FTO 初筛',
    'infringement-triage': '侵权风险初筛',
    'invention-intake': '发明披露接入',
    'ip-clause-review': '知识产权条款审查',
    'oss-review': '开源合规审查',
    portfolio: 'IP 组合管理',
    takedown: '下架请求',
  },
  'law-student': {
    'bar-prep-questions': '法考练习题',
    'case-brief': '案例摘要',
    'cold-call-prep': '课堂点名准备',
    'exam-forecast': '考试重点预测',
    flashcards: '记忆卡片',
    'irac-practice': 'IRAC 练习',
    'legal-writing': '法律写作',
    'outline-builder': '课程大纲',
    session: '学习会话',
    'socratic-drill': '苏格拉底问答',
    'study-plan': '学习计划',
  },
  'legal-builder-hub': {
    'auto-updater': '社区技能更新',
    disable: '禁用技能',
    'registry-browser': '技能市场浏览',
    'related-skills-surfacer': '相关推荐',
    'skill-installer': '安装社区技能',
    'skill-manager': '技能管理',
    'skills-qa': '技能质量检查',
    uninstall: '卸载技能',
  },
  'legal-clinic': {
    'build-guide': '办案指南生成',
    'client-comms-log': '客户沟通记录',
    'client-intake': '客户接案',
    'client-interview-prep': '客户访谈准备',
    'client-letter': '客户信函',
    deadlines: '期限管理',
    draft: '文书起草',
    'form-generation': '表单生成',
    'intake-memo': '接案备忘录',
    memo: '法律备忘录',
    'plain-language-letters': '白话客户信',
    ramp: '快速熟悉事项',
    'reflection-journal': '学习反思',
    'research-start': '研究路线图',
    'research-plan': '研究计划',
    'semester-handoff': '学期交接',
    status: '事项状态',
    'supervisor-review-queue': '导师审阅队列',
  },
  'litigation-legal': {
    'brief-section-drafter': '诉状段落起草',
    chronology: '事实时间线',
    'claim-chart': '权利要求表',
    'demand-draft': '函件起草',
    'demand-intake': '函件接收分析',
    'demand-received': '对方函件分析',
    'deposition-prep': '证言准备',
    'legal-hold': '证据保全',
    'matter-briefing': '事项简报',
    'matter-close': '事项结案',
    'matter-intake': '事项接入',
    'matter-update': '事项更新',
    'oc-status': '外部律师状态',
    'portfolio-status': '案件组合状态',
    'privilege-log-review': '特权日志审查',
    'subpoena-triage': '传票初筛',
  },
  'privacy-legal': {
    'dpa-review': 'DPA 审查',
    'dsar-response': 'DSAR 回复',
    'pia-generation': 'PIA/DPIA 生成',
  },
  'product-legal': {
    'feature-risk-assessment': '功能风险评估',
    'is-this-a-problem': '这是不是法律问题',
    'launch-review': '上线评审',
    'marketing-claims-review': '营销声明审查',
  },
  'regulatory-legal': {
    comments: '监管意见稿',
    'gap-surfacer': '合规缺口发现',
    gaps: '缺口清单',
    'policy-diff': '政策差异比对',
    'policy-redraft': '政策改写',
    'reg-feed-watcher': '监管动态监控',
  },
}

function titleCaseSkillName(skillName: string): string {
  return skillName
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function getLegalSkillLabel(
  pluginName: string,
  skillName: string,
): string {
  return (
    LEGAL_PLUGIN_SKILL_LABELS[pluginName]?.[skillName] ??
    LEGAL_COMMON_SKILL_LABELS[skillName] ??
    titleCaseSkillName(skillName)
  )
}
