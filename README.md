# 专家·技能·连接器

将常用 AI 能力管理整合到 DeepSeek Harness 工作界面。

本定制版本按 **专家、技能、连接器** 顺序组织，并提供对应资源的搜索与安装。产品界面不包含工具裁缝、独立插件市场，也不展示 GitHub Star 或插件宣传入口。

## 功能

- **连接器管理（MCP）**：查看连接状态、配置与工具 Schema；支持添加、编辑、禁用、重连、项目作用域、导入与授权。
- **Skill 管理**：全局与项目技能列表、详情、安装、卸载、收藏、模型侧启停及技能套件。
- **专家中心**：本地与市场专家列表、详情、召唤、会话级挂载与移除。
- **资源市场**：仅展示 MCP 连接器、SkillHub 技能及专家目录。原 DSH 插件市场已移除。

第三方资源的来源、版权及安全说明仍按实际提供方展示，不用作本产品的宣传。

## 在 DSH 对话里创建专家或技能

在「专家」页点击 **新建专家**，或在「技能」页点击 **新建技能**：页面会切回 DSH 当前对话，并将相应的创建指令填入输入框（**不会自动发送**）。你可以直接补充需求，再让 DSH 的 AI 与你共同设计、生成和验证文件。

- 自定义专家沿用 WorkBuddy 格式：`~/.workbuddy/plugins/marketplaces/my-experts/plugins/<专家名>/.codebuddy-plugin/plugin.json` 和 `agents/<专家名>.md`。如设置了 `WORKBUDDY_CONFIG_DIR`，优先使用该位置。
- 自定义 Skill 使用 DSH 可发现的目录：`~/.agents/skills/<技能名>/SKILL.md`。
- 这两个按钮是**对话引导入口**，不是“自动创建”按钮。只有在用户确认方案且 DSH 会话有本机写入权限后，AI 才能真正落盘。专家/技能列表可能需要刷新。
- 草稿写入依赖 DSH 当前会话的标准输入框 `inputActions.setDraft` 能力；本改动仍需在用户所用 DSH 桌面端进行联调测试。

针对性回归检查：`node test/create-with-ai.mjs`。

## 安装

本项目仍采用 DSH 插件加载机制提供原生界面能力。安装需要 DSH 0.1.5-rc.1 或以上版本，Node.js 22.15 或以上。

```sh
dsh plugin --profile web add github:linyalan2000/dsh-armory
```

桌面端将 `--profile web` 换为 `--profile desktop`。安装或更新后完全退出 DSH，再重新启动。

> 当前定制变更位于 `work/native-capability-center` 开发分支。正式安装前应先合并、发布并完成宿主环境验证；不要把这条安装命令误当成已发布的定制版。

## 开发检查

```sh
npm install --no-save yaml@2 eslint@9
npm test
npm run lint
```

原版相关测试中涉及工具裁缝、插件市场和仓库 Star 的用例，需要随移除功能同步清理或替换为针对新界面的回归测试。

## 来源与许可证

本项目基于 [2026heshao/dsh-armory](https://github.com/2026heshao/dsh-armory) 二次开发；上游源于 [Imzl-zl/dsh-mcp-manager-ui](https://github.com/Imzl-zl/dsh-mcp-manager-ui)。遵循仓库原有的 MIT 许可，相关版权信息保留在 [LICENSE](LICENSE) 中。
