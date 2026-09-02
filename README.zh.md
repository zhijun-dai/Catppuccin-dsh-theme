<h3 align="center">
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png" width="100" alt="Logo"/><br/>
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
	DeepSeek Harness 的 <a href="https://github.com/deepseek-ai/deepseek-harness">Catppuccin</a> 主题
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
</h3>

<p align="center">
	<a href="https://github.com/zhijun-dai/Catppuccin-dsh-theme/stargazers"><img src="https://img.shields.io/github/stars/zhijun-dai/Catppuccin-dsh-theme?colorA=363a4f&colorB=b7bdf8&style=for-the-badge"></a>
	<a href="https://github.com/zhijun-dai/Catppuccin-dsh-theme/issues"><img src="https://img.shields.io/github/issues/zhijun-dai/Catppuccin-dsh-theme?colorA=363a4f&colorB=f5a97f&style=for-the-badge"></a>
	<a href="https://github.com/zhijun-dai/Catppuccin-dsh-theme/contributors"><img src="https://img.shields.io/github/contributors/zhijun-dai/Catppuccin-dsh-theme?colorA=363a4f&colorB=a6da95&style=for-the-badge"></a>
	<a href="https://www.npmjs.com/package/dsh-catppuccin"><img src="https://img.shields.io/npm/v/dsh-catppuccin?colorA=363a4f&colorB=a6da95&style=for-the-badge"></a>
	<a href="https://www.npmjs.com/package/dsh-catppuccin"><img src="https://img.shields.io/npm/dt/dsh-catppuccin?colorA=363a4f&colorB=f5a97f&style=for-the-badge"></a>
</p>

<p align="center">
	<a href="README.md">English</a> | 中文
</p>

<p align="center">
	<img src="assets/preview.webp" width="100%" alt="Catppuccin 四主题下的 DeepSeek Harness"/>
</p>

## 目录

- [简介](#简介)
- [特性](#特性)
- [预览](#预览)
- [安装](#安装)
- [使用](#使用)
- [常见问题](#常见问题)
- [工作原理](#工作原理)
- [💝 致谢](#-致谢)

## 简介

🐱 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
的 [Catppuccin](https://github.com/catppuccin/catppuccin) 主题插件——一个包同时适配
**Web GUI**（`dsh web`）、**DSH Desktop** 与 **dsh-TUI** 终端：

- **Web / 桌面端**：整个界面用官方 26 色粉彩盘重新上色，不是一两个强调色，
  是全组件覆盖。
- **dsh-TUI**：四套官方主题色板安装时自动同步到 `~/.dsh-tui/themes/`。

内置 Catppuccin 四个风味——**Latte**、**Frappé**、**Macchiato**、**Mocha**——
接入官方主题系统，与内置浅色 / 深色 / 跟随系统平级，在 **设置 → 常规 → 外观**
下方提供一行 **Catppuccin** 一键切换。选择自动保存、重启自动恢复；
切回**默认**即逐像素还原内置外观，卸载零残留。

## 特性

- 🎨 **完整的 Catppuccin 颜色**——每个值都是官方色盘颜色（或色盘内混色），
  界面没有默认的 DeepSeek 蓝灰。
- 🖱️ **组件级染色**——消息气泡、工具调用行、代码块标签、时间戳、hover
  交互全部按色盘上色：鼠标滑过变主题色，空工作区标题是品牌 mauve。
- 💻 **dsh-TUI 终端主题**——一条命令装进终端客户端，启动自动同步四套主题，
  见 [安装 · dsh-TUI](#dsh-tui-终端主题)。
- 🔄 **更新检查**——设置页静默检查 npm 新版本（另有手动按钮），
  有新版直接给出可复制的升级命令。
- 🧠 **记住你的选择**——重启自动恢复，宿主重新断言偏好也不丢；
  关闭时还原你原本的浅色 / 深色偏好，而不是强制"跟随系统"。
- 🗄️ **双层持久化**——DSH Desktop 每次启动换随机端口、localStorage 清空，
  选择依然从 `$DSH_HOME` 恢复。
- ⚙️ **零侵入**——切回**默认**逐像素还原，不留任何注入样式。

## 预览

四个风味在 DeepSeek Harness 中的实际效果（文首大图为四主题合成）：

<details>
<summary>🌻 Latte（浅色）</summary>
<img src="assets/latte.webp"/>
</details>
<details>
<summary>🪴 Frappé（深色）</summary>
<img src="assets/frappe.webp"/>
</details>
<details>
<summary>🌺 Macchiato（深色）</summary>
<img src="assets/macchiato.webp"/>
</details>
<details>
<summary>🌿 Mocha（深色）</summary>
<img src="assets/mocha.webp"/>
</details>

## 安装

从 GitHub 安装（推荐——始终最新）：

```sh
dsh plugin --profile web add github:zhijun-dai/Catppuccin-dsh-theme
```

从 npm 安装：

```sh
dsh plugin --profile web add dsh-catppuccin
```

> 💡 npm 版本可能比 GitHub 滞后一点。想要最新版用上面的 GitHub 安装
> （可用 `#分支名` 锁定分支）。

DSH Desktop 用户装到桌面 profile：

```sh
dsh plugin --profile desktop add dsh-catppuccin
```

### dsh-TUI 终端主题

同一个包也会把四套 Catppuccin 主题同步进 dsh-TUI。装进 TUI profile，
首次启动即生效：

```sh
dsh plugin --profile dsh-tui add dsh-catppuccin
```

在 TUI 里切换：`/theme catppuccin-mocha`。

> 💡 如果你同时用 Web / Desktop 和 dsh-TUI，装到 web profile 也会在每次
> 启动时保持 TUI 主题同步，无需二次安装。磁盘上没有 `~/.dsh-tui`？
> 严格 no-op，不会创建任何东西。

装完重启 web 服务：

```sh
dsh web
```

## 使用

打开 Web UI，进入 **设置 → 常规**，选择四个 Catppuccin 风味之一
（选「默认」恢复内置外观）。选择按浏览器保存，启动时自动恢复。

## 常见问题

**Q：装完在设置里看不到 Catppuccin 行？**

确认装进了 `dsh web` 实际使用的 profile（上面的 `--profile web`），
装完重启 `dsh web`。

**Q：选择是怎么记住的？**

存两层：浏览器 `localStorage`（即时）+ Desktop 场景下 `$DSH_HOME`
下的小文件（耐久）——所以重启、切模型、Desktop 换端口都不丢。
你在内置外观行显式选的浅色 / 深色永远优先。

**Q：怎么升级？**

重跑一次安装命令（会拉到最新版），或者看设置页——它会在有新版本时
静默提示，并给出可直接复制的升级命令。然后重启 `dsh web`。

## 工作原理

主题定义由官方 [catppuccin/palette](https://github.com/catppuccin/palette)
的 `palette.json` 生成（不手改色值）。`scripts/gen-themes.mjs` 把每个风味的
26 个 Catppuccin 颜色映射到 dsh `@deepseek-ai/dsh-client-ui-theme` 样式表的
`--dsw-alias-*` token 目录（含 `--shiki-*` 语法高亮色和泄漏的
`--dsw-static-deepseek-*` 静态色），写出 `themes/` 下的逐风味 token 表，
并内嵌进浏览器端 bundle `lib/client.js`。dsh-TUI 主题由
`scripts/gen-tui-themes.mjs` 生成。

## 💝 致谢

- [zhijun-dai](https://github.com/zhijun-dai)
- [Catppuccin](https://github.com/catppuccin)
- [KinGao294/dsh-skin](https://github.com/KinGao294/dsh-skin) — 本插件的参考实现
- [DeepSeek](https://github.com/deepseek-ai)

<p align="center">
	🏆 已收录于 <a href="https://github.com/awesome-dsh-plugin/awesome-dsh-plugin">Awesome DSH Plugin</a>
</p>

&nbsp;

<p align="center">
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true" />
</p>

<p align="center">
	Copyright &copy; 2026-present <a href="https://github.com/zhijun-dai" target="_blank">zhijun-dai</a>
</p>

<p align="center">
	<a href="https://github.com/zhijun-dai/Catppuccin-dsh-theme/blob/main/LICENSE"><img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&logoColor=d9e0ee&colorA=363a4f&colorB=b7bdf8"/></a>
</p>
