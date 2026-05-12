# DeepSeek 法律插件指南

DeepSeekLegalCode 通过现有插件系统运行上游 `claude-for-legal` marketplace，同时把模型请求路由到 DeepSeek。

本仓库已经在 `.deepseek/settings.json` 中预配置：

- 注册 `claude-for-legal` marketplace，来源为 `anthropics/claude-for-legal`。
- 默认启用 12 个法律插件包。
- 启动或运行 `legal doctor` 时，可把项目声明的 marketplace 和插件同步到本地插件缓存。

## 律师快速启动

律师用户只需要配置 DeepSeek API Key：

```cmd
setx DEEPSEEK_API_KEY "sk-..."
deepseek-code
```

如果从源码目录启动：

```powershell
node scripts/run-deepseek.mjs
```

进入交互界面后输入 `/` 浏览命令。法律技能会显示为 `/插件:技能`，例如 `/law-student:case-brief`。这种命名方式可以避免多个插件都存在 `customize` 时产生误选。

## 插件和 skill 的关系

这里的插件不是宽泛法律门类，而是一个实践包。插件决定工作面、配置文件和一组二级 skills；真正执行的具体动作是 skill。

示例：

```text
/commercial-legal:review
/privacy-legal:use-case-triage
/law-student:case-brief
```

冒号左侧是插件包，冒号右侧是具体 skill。

## 常用命令

列出全部法律插件：

```powershell
deepseek-code legal list
```

列出某个插件下的全部二级技能：

```powershell
deepseek-code legal commands law-student
```

检查本地安装状态并同步项目声明：

```powershell
deepseek-code legal doctor
```

手动安装单个插件时，可以使用：

```powershell
deepseek-code legal setup commercial-legal
```

默认建议使用用户级配置，这样插件可以在不同客户或事项工作区复用。只有当团队明确希望把插件配置提交到当前仓库时，才使用项目级配置。

## 预配置插件包

| 插件包 | 边界 | 推荐入口 |
| --- | --- | --- |
| `commercial-legal` | 商业合同运营：供应商协议、NDA、SaaS 订阅、续约和升级流转。 | `/commercial-legal:review` |
| `privacy-legal` | 隐私工作流：PIA/DPIA、DPA、DSAR、政策与实践漂移。 | `/privacy-legal:use-case-triage` |
| `product-legal` | 产品上线法务：功能风险、发布评审、营销声明和快速问题分流。 | `/product-legal:is-this-a-problem` |
| `corporate-legal` | 公司交易与治理：M&A 尽调、交割、董事会文件、主体合规。 | `/corporate-legal:diligence-issue-extraction` |
| `employment-legal` | 劳动雇佣和 HR 合规：招聘、解雇、分类、休假、调查、制度。 | `/employment-legal:wage-hour-qa` |
| `regulatory-legal` | 监管监控与政策差距：监管动态、政策 diff、缺口、意见稿。 | `/regulatory-legal:reg-feed-watcher` |
| `ai-governance-legal` | AI 治理：AI 用例、影响评估、清单、供应商 AI 条款和政策。 | `/ai-governance-legal:use-case-triage` |
| `litigation-legal` | 诉讼与争议：事项接入、legal hold、时间线、claim chart、证据开示。 | `/litigation-legal:matter-intake` |
| `ip-legal` | 知识产权实务：商标、FTO、开源合规、IP 条款、侵权分流。 | `/ip-legal:clearance` |
| `legal-clinic` | 法律诊所教学：接案、研究路线、文书、导师审阅、学期交接。 | `/legal-clinic:research-start` |
| `law-student` | 法学院学习：案例摘要、cold call、IRAC、记忆卡、考试准备。 | `/law-student:case-brief` |
| `legal-builder-hub` | 法律插件生态管理：浏览、安装、更新、禁用和质检社区 skills。 | `/legal-builder-hub:registry-browser` |

## 安全边界

- 法律插件输出是草稿，不构成法律意见。
- 正式依赖、提交或发送前，必须人工核验事实、引用、司法辖区、期限和权限。
- 不要把 `DEEPSEEK_API_KEY` 写入仓库、issue、截图或日志。
- 如果模型调用返回 `Insufficient Balance`，说明 API Key 对应账户余额不足；插件安装、列表、验证和 `legal doctor` 不需要模型余额。
