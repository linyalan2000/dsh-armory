# DSH 能力中心

将常用 AI 能力管理整合到 DeepSeek Harness 工作界面。

本定制版本聚焦 **MCP、Skill、专家**，并提供对应资源的搜索与安装。产品界面不包含工具裁缝、独立插件市场，也不展示 GitHub Star 或插件宣传入口。

## 功能

- **MCP 管理**：查看连接状态、配置与工具 Schema；支持添加、编辑、禁用、重连、项目作用域、导入与授权。
- **Skill 管理**：全局与项目技能列表、详情、安装、卸载、收藏、模型侧启停及技能套件。
- **专家中心**：本地与市场专家列表、详情、召唤、会话级挂载与移除。
- **资源市场**：仅展示 MCP 连接器、SkillHub 技能及专家目录。原 DSH 插件市场已移除。

第三方资源的来源、版权及安全说明仍按实际提供方展示，不用作本产品的宣传。

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
