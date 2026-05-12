# DeepSeekLegalCode

[简体中文](README.md) | [English](README_EN.md)

DeepSeekLegalCode 是一个面向法律专业工作的本地 CLI Agent。它基于 DeepSeekCode / Claude Code 代码库改造，将模型请求路由到 DeepSeek 的 Anthropic 兼容 API，并在本仓库中预装 Anthropic 发布的 `claude-for-legal` 法律插件集。

> 社区独立项目，非 DeepSeek 或 Anthropic 官方产品。法律插件输出是供律师复核的工作草稿，不构成法律意见。

![DeepSeekCode](DeepSeekCode.png)

![Node](https://img.shields.io/badge/node-%3E%3D18-339933)
![License](https://img.shields.io/badge/license-MIT-blue)
![DeepSeek](https://img.shields.io/badge/model-DeepSeek%20V4-4c8bf5)
![Legal Workflows](https://img.shields.io/badge/legal%20workflows-12%20preinstalled-6f42c1)

## 为什么值得关注

- **律师开箱即用**：项目自带 `.deepseek/settings.json`，预注册 `claude-for-legal` marketplace，并默认启用 12 个核心法律工作流。
- **只需要一个 API Key**：律师用户只配置 `DEEPSEEK_API_KEY`，启动后即可使用法律插件，不需要理解 MCP、marketplace 或插件安装流程。
- **DeepSeek 驱动**：通过 DeepSeek 的 Anthropic 兼容 API 运行，保留 Claude Code 风格的工具调用、斜杠命令、子代理和 MCP 能力。
- **可审计、可复现**：法律插件来源、预装配置、诊断命令、测试脚本和设计说明都在仓库内。
- **面向开源交付**：包含中英文文档、集成设计、测试覆盖和密钥泄漏检查路径。

## 律师快速启动

安装依赖并构建：

```powershell
cd D:\DeepSeekCode
npm ci --ignore-scripts
npm run check
```

设置 DeepSeek API Key：

```powershell
$env:DEEPSEEK_API_KEY="sk-..."
```

启动：

```powershell
node scripts/run-deepseek.mjs
```

进入界面后直接输入法律工作流命令，例如：

```text
/commercial-legal:review 帮我审查当前目录里的合同，列出高风险条款、修改建议和需要人工确认的问题。
```

或一次性运行：

```powershell
node scripts/run-deepseek.mjs -p "/privacy-legal:use-case-triage 帮我判断一个 AI 产品功能的隐私风险，需要问我哪些信息？"
```

## 预装法律工作流

本仓库默认启用以下 12 个插件：

| 场景 | 插件 | 首个命令 |
| --- | --- | --- |
| 商业合同 / SaaS / NDA | `commercial-legal` | `/commercial-legal:review` |
| 隐私合规 / DPIA / DPA | `privacy-legal` | `/privacy-legal:use-case-triage` |
| 产品法务 / 营销声明 / 上线评审 | `product-legal` | `/product-legal:is-this-a-problem` |
| 公司法务 / M&A / 董事会文件 | `corporate-legal` | `/corporate-legal:diligence-issue-extraction` |
| 劳动雇佣 / HR 合规 | `employment-legal` | `/employment-legal:wage-hour-qa` |
| 监管合规 / 政策差距 / 意见征询 | `regulatory-legal` | `/regulatory-legal:reg-feed-watcher` |
| AI 治理 / AI 供应商条款 / 影响评估 | `ai-governance-legal` | `/ai-governance-legal:use-case-triage` |
| 诉讼 / 证据 / 法律保全 / 律所协作 | `litigation-legal` | `/litigation-legal:matter-intake` |
| 知识产权 / 商标 / FTO / OSS | `ip-legal` | `/ip-legal:clearance` |
| 法律诊所 / 学生监督 | `legal-clinic` | `/legal-clinic:cold-start-interview` |
| 法学生 / 案例摘要 / IRAC 训练 | `law-student` | `/law-student:cold-start-interview` |
| 法律插件发现与管理 | `legal-builder-hub` | `/legal-builder-hub:registry-browser` |

查看本地预装状态：

```powershell
node scripts/run-deepseek.mjs legal doctor
```

列出全部法律工作流：

```powershell
node scripts/run-deepseek.mjs legal list
```

## MCP 怎么用

法律插件可以调用 MCP 连接文件系统、知识库、Slack、Google Drive 或其它数据源。先查看当前 MCP：

```powershell
node scripts/run-deepseek.mjs mcp list
```

添加一个本地文件系统 MCP：

```powershell
node scripts/run-deepseek.mjs mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem D:\合同资料
```

启动后让插件使用资料目录：

```text
/commercial-legal:review 使用 filesystem MCP 读取 D:\合同资料，审查合同并输出风险表。
```

## 通用 DeepSeekCode 能力

- 项目感知对话，支持工具执行和权限确认
- Thinking 推理模式，默认 `max` effort
- 文件读取、编辑、diff、子代理和任务分解
- MCP、hooks、插件、斜杠命令
- `-p` 非交互模式，适合脚本和 CI
- 1M 上下文窗口，最高 384K 输出 token
- 配置隔离到 `~/.deepseek-code` 和项目 `.deepseek/`

## 项目结构

```text
.deepseek/settings.json              # 预装 claude-for-legal marketplace 和 12 个法律插件
docs/legal-plugins.md                # 英文法律插件指南
docs/legal-plugins.zh-CN.md          # 中文法律插件指南
docs/legal-integration-design.md     # 集成设计说明
scripts/run-deepseek.mjs             # DeepSeek 启动器
scripts/legal-marketplace.test.mjs   # 法律插件集成测试
src/cli/handlers/legal.ts            # legal 子命令
src/utils/plugins/legalMarketplace.ts # legal marketplace 常量
```

## 从源码开发

```bash
git clone https://github.com/TracyWang95/DeepSeekLegalCode.git
cd DeepSeekCode
npm ci --ignore-scripts
npm run check
npm test
```

常用命令：

```bash
npm run build          # 构建 dist/cli.js
npm run check          # 构建并验证版本输出
npm test               # 运行 release 测试套件
node scripts/run-deepseek.mjs legal doctor
```

## 模型别名

| 别名 | DeepSeek 模型 |
| --- | --- |
| `pro` | `deepseek-v4-pro` |
| `flash` | `deepseek-v4-flash` |

旧版 Claude 别名（`sonnet`、`opus`、`haiku`、`best`）仍兼容可用。

## 文档

| 文档 | 内容 |
| --- | --- |
| [法律插件指南](docs/legal-plugins.zh-CN.md) | 预装法律插件、律师使用方式、MCP 和安全边界 |
| [Legal Plugins](docs/legal-plugins.md) | English legal workflow guide |
| [集成设计](docs/legal-integration-design.md) | marketplace、预装配置、验证门禁 |
| [快速开始](docs/getting-started.md) | 安装、首次运行、API key 设置 |
| [配置参考](docs/configuration.md) | 环境变量、模型别名、settings.json |
| [使用指南](docs/usage.md) | 交互模式、CLI 参数、斜杠命令、工具 |
| [MCP 与高级功能](docs/mcp-and-advanced.md) | MCP 服务、子代理、Hooks、Worktree、CI/CD |
| [架构与开发](docs/architecture.md) | 项目结构、构建流程、适配层原理 |

## 安全与责任边界

- 不把 `DEEPSEEK_API_KEY` 写入仓库、设置文件或插件配置。
- 预装配置只记录公开 marketplace 来源：`anthropics/claude-for-legal`。
- 法律插件输出必须由律师复核；引用、时限、司法辖区和事实假设需要人工确认。
- 对外提交前建议运行：

```bash
npm run check
npm test
rg "sk-[0-9a-f]{20,}|DEEPSEEK_API_KEY=.*sk-" -n .
```

## 许可证

[MIT](LICENSE)

## 友情链接

- [LINUX DO](https://linux.do)
