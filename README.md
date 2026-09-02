<h3 align="center">
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png" width="100" alt="Logo"/><br/>
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
	Catppuccin for <a href="https://github.com/deepseek-ai/deepseek-harness">DeepSeek Harness</a>
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
	<a href="README.zh.md">中文</a>
</p>

<p align="center">
	<img src="assets/preview.webp" width="100%" alt="The four Catppuccin flavors in DeepSeek Harness"/>
</p>

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Previews](#previews)
- [Install](#install)
- [Usage](#usage)
- [FAQ](#faq)
- [How it works](#how-it-works)
- [💝 Thanks to](#-thanks-to)

## Intro

🐱 A [Catppuccin](https://github.com/catppuccin/catppuccin) theme plugin for
[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) — one
package that covers **Web GUI** (`dsh web`), **DSH Desktop** and
**dsh-TUI**:

- **Web / Desktop**: the whole UI re-skinned with the official 26-color
  pastel palette — every component, not just a few accents.
- **dsh-TUI**: four official theme palettes auto-synced to
  `~/.dsh-tui/themes/` on install.

The four flavors — **Latte**, **Frappé**, **Macchiato**, **Mocha** — plug
into the built-in theme system on a level with the light/dark/system
choices, with a one-click switch row in **Settings → General**. Your choice
is saved automatically and restored on restart, and switching back to
**Default** restores the built-in appearance pixel-perfectly — no leftovers.

## Features

- 🎨 **Full palette coverage** — every value is a Catppuccin palette color
  (or a mix of palette colors); the default DeepSeek blue-gray never shows
  through.
- 🖱️ **Component-level accents** — message bubbles, tool-call rows, code
  tags, timestamps and hover interactions are tinted from the palette; hover
  glows in the theme accent, and the empty-workspace headline reads in
  brand mauve.
- 💻 **dsh-TUI themes** — one install command drops the four themes into
  your terminal client; they auto-sync on every start. See
  [Install · dsh-TUI](#dsh-tui-terminal-themes).
- 🔄 **Update check** — Settings silently checks npm for a newer release
  (with a manual button too) and shows a copyable upgrade command.
- 🧠 **Choice remembered** — persisted across restarts and re-applied even
  when the host re-asserts its own preference; turning it off restores the
  built-in light/dark choice you had before, not a forced "system".
- 🗄️ **Durable state** — flavor choice survives DSH Desktop's random
  per-launch port where browser localStorage starts empty.
- ⚙️ **Zero intrusion** — switching to **Default** restores the built-in
  appearance pixel-identical; uninstall leaves nothing behind.

## Previews

The four flavors in DeepSeek Harness (headline image above is the
catwalk composite; each flavor below in full):

<details>
<summary>🌻 Latte</summary>
<img src="assets/latte.webp"/>
</details>
<details>
<summary>🪴 Frappé</summary>
<img src="assets/frappe.webp"/>
</details>
<details>
<summary>🌺 Macchiato</summary>
<img src="assets/macchiato.webp"/>
</details>
<details>
<summary>🌿 Mocha</summary>
<img src="assets/mocha.webp"/>
</details>

## Install

From GitHub (recommended — always the latest):

```sh
dsh plugin --profile web add github:zhijun-dai/Catppuccin-dsh-theme
```

From npm:

```sh
dsh plugin --profile web add dsh-catppuccin
```

> 💡 The npm release may lag slightly behind GitHub. For the very latest,
> use the GitHub install above (pin a branch with `#branch-name`).

For DSH Desktop, target the desktop profile:

```sh
dsh plugin --profile desktop add dsh-catppuccin
```

### dsh-TUI (terminal themes)

The same package also syncs the four Catppuccin themes into your dsh-TUI.
Install into the TUI profile and they land on the first start:

```sh
dsh plugin --profile dsh-tui add dsh-catppuccin
```

Then pick a theme inside the TUI: `/theme catppuccin-mocha`.

> 💡 Installed into a web/desktop profile of a user who also runs dsh-TUI,
> the themes stay in sync on every web start — no second install needed.
> No `~/.dsh-tui` on disk? Strict no-op, nothing is created.

Restart the web server afterwards:

```sh
dsh web
```

## Usage

Open the web UI, go to **Settings → General**, and pick one of the four
Catppuccin flavors (or **Default** to follow the built-in appearance).
Choice is saved per browser and restored at boot.

## FAQ

**Q: I installed the plugin but don't see the themes in Settings.**

Make sure the profile you installed into is the one `dsh web` runs
(`--profile web` above), and restart `dsh web` after installing.

**Q: How is my choice remembered?**

It lives in browser `localStorage` (instant) and, for Desktop users, in a
small durable file under `$DSH_HOME` — so it survives restarts, model
switches and Desktop's per-launch port changes. Your explicit
light/dark/system pick in the built-in Appearance row always wins.

**Q: How do I upgrade?**

Re-run the install command (it fetches the newest release), or check the
Settings row — it silently tells you when a newer version exists and shows
the copyable upgrade command. Then restart `dsh web`.

## How it works

The theme definitions are generated from the official
[catppuccin/palette](https://github.com/catppuccin/palette) `palette.json`
(never hand-edited). `scripts/gen-themes.mjs` maps the 26 Catppuccin colors
per flavor onto the `--dsw-alias-*` token directory from dsh's
`@deepseek-ai/dsh-client-ui-theme` stylesheets (including the `--shiki-*`
syntax palette and the leaked `--dsw-static-deepseek-*` static colors),
writes the per-flavor token tables to `themes/`, and embeds them into the
browser bundle `lib/client.js`. The dsh-TUI themes come from
`scripts/gen-tui-themes.mjs`.

## 💝 Thanks to

- [zhijun-dai](https://github.com/zhijun-dai)
- [Catppuccin](https://github.com/catppuccin)
- [KinGao294/dsh-skin](https://github.com/KinGao294/dsh-skin) — the reference theme plugin this port is modeled on
- [DeepSeek](https://github.com/deepseek-ai)

<p align="center">
	🏆 Listed on <a href="https://github.com/awesome-dsh-plugin/awesome-dsh-plugin">Awesome DSH Plugin</a>
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
