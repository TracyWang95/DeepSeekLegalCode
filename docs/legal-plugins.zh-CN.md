# DeepSeek 法律插件

DeepSeekCode 可以通过现有插件系统运行 Anthropic 发布的
`claude-for-legal` marketplace，同时把模型请求继续路由到 DeepSeek。

本仓库已经内置项目级 `.deepseek/settings.json`：

- 预注册 `claude-for-legal` marketplace；
- 默认启用 12 个核心法律工作流。

首次启动时，DeepSeekCode 会基于该配置把 marketplace 和插件安装到用户本地
插件缓存。下面的 helper 命令用于检查状态或安装其它法律插件。

## 律师快速启动

本仓库面向律师使用时，只需要配置 DeepSeek API key：

```cmd
setx DEEPSEEK_API_KEY "sk-..."
deepseek-code
```

如果是源码目录：

```bash
node scripts/run-deepseek.mjs
```

DeepSeekCode 会检测 `.deepseek/settings.json` 并同步预装法律插件。交互模式下
接受工作区信任提示后即可使用，不需要律师理解 marketplace 或 plugin 安装流程。

## 安装其它法律工作流

安装商业合同法律工作流：

```bash
deepseek-code legal setup commercial-legal
```

安装其他法律工作流：

```bash
deepseek-code legal list
deepseek-code legal setup privacy-legal
deepseek-code legal setup ai-governance-legal
```

列出某个插件下面的全部 slash command：

```bash
deepseek-code legal commands law-student
```

交互式 `/` 菜单里，法律技能统一显示成 `/插件:技能`，例如
`/law-student:case-brief`。这样即使多个插件都有 `customize`，用户也能看清楚
自己选的是哪个工作流。

安装后重启 DeepSeekCode，再运行命令输出中提示的第一个 slash command。

检查本机法律插件状态：

```bash
deepseek-code legal doctor
```

`legal doctor` 会先同步项目声明的 marketplace 和默认启用插件到本地插件缓存，
因此它也是验证新克隆仓库最快的命令。

## 手动等价命令

```bash
deepseek-code plugin marketplace add anthropics/claude-for-legal --scope user
deepseek-code plugin install commercial-legal@claude-for-legal --scope user
```

默认建议使用 `user` scope，这样插件可以在不同客户或事项工作区复用。
只有当团队明确希望把法律插件配置提交到当前仓库时，才使用
`--scope project`。

## 可用工作流

| 插件 | 首个命令 |
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

## 安全边界

法律插件输出是供律师复核的工作草稿，不构成法律意见，也不能替代执业
责任。正式依赖、提交或发送前，需要人工核验引用、司法辖区、时限和事实
假设。

如果模型调用返回 `Insufficient Balance`，说明 `DEEPSEEK_API_KEY` 对应账户
余额不足；插件安装、列表、验证和 `legal doctor` 不需要模型余额。
