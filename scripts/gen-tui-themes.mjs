#!/usr/bin/env node
/**
 * Generate themes/tui/catppuccin-*.json — Catppuccin themes for dsh-TUI
 * (dropped into ~/.dsh-tui/themes/, see dsh-TUI docs/themes.md). The
 * colour plan mirrors the official @catppuccin/vscode conventions, same as
 * our web half's shiki mapping: syntax = keyword mauve / string green /
 * comment overlay2 / number peach / function blue / type yellow / variable
 * text / operator teal / punctuation overlay2 / constant peach; semantic =
 * success green / error red / warning yellow / merged mauve; brand group =
 * mauve; diff backgrounds at 15% alpha (word 20%); shimmer variants blend
 * the base colour 30% towards text; rainbow slots follow the style-guide
 * hues with indigo = lavender, violet = mauve.
 *
 * Run: node scripts/gen-tui-themes.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const REF = join(root, 'palette', 'palette.json')
const OUT_DIR = join(root, 'themes', 'tui')

const catppuccin = JSON.parse(readFileSync(REF, 'utf8'))

/** All keys of the dsh-TUI Theme type, in declaration order — the loader
 *  skips unknown keys, so this doubles as a guard against typos. */
const THEME_KEYS = [
  'autoAccept', 'bashBorder', 'claude', 'toolNameMutate', 'toolNameExec',
  'claudeShimmer', 'claudeBlue_FOR_SYSTEM_SPINNER', 'claudeBlueShimmer_FOR_SYSTEM_SPINNER',
  'permission', 'permissionShimmer', 'planMode', 'ide', 'promptBorder', 'promptBorderShimmer',
  'text', 'inverseText', 'inactive', 'inactiveShimmer', 'subtle', 'suggestion', 'remember',
  'background', 'success', 'error', 'warning', 'merged', 'warningShimmer',
  'diffAdded', 'diffRemoved', 'diffAddedDimmed', 'diffRemovedDimmed', 'diffAddedWord', 'diffRemovedWord',
  'toolCardBackground', 'toolCardBackgroundDim',
  'toolDotExec', 'toolDotRead', 'toolDotWrite', 'toolDotWeb', 'toolDotTask',
  'syntaxKeyword', 'syntaxString', 'syntaxComment', 'syntaxNumber', 'syntaxFunction',
  'syntaxType', 'syntaxVariable', 'syntaxOperator', 'syntaxPunctuation', 'syntaxConstant',
  'red_FOR_SUBAGENTS_ONLY', 'blue_FOR_SUBAGENTS_ONLY', 'green_FOR_SUBAGENTS_ONLY',
  'yellow_FOR_SUBAGENTS_ONLY', 'purple_FOR_SUBAGENTS_ONLY', 'orange_FOR_SUBAGENTS_ONLY',
  'pink_FOR_SUBAGENTS_ONLY', 'cyan_FOR_SUBAGENTS_ONLY',
  'professionalBlue', 'chromeYellow', 'clawd_body', 'clawd_background',
  'userMessageBackground', 'userMessageBackgroundHover', 'messageActionsBackground',
  'selectionBg', 'bashMessageBackgroundColor', 'memoryBackgroundColor',
  'rate_limit_fill', 'rate_limit_empty', 'fastMode', 'fastModeShimmer',
  'briefLabelYou', 'briefLabelClaude',
  'rainbow_red', 'rainbow_orange', 'rainbow_yellow', 'rainbow_green', 'rainbow_blue',
  'rainbow_indigo', 'rainbow_violet',
  'rainbow_red_shimmer', 'rainbow_orange_shimmer', 'rainbow_yellow_shimmer',
  'rainbow_green_shimmer', 'rainbow_blue_shimmer', 'rainbow_indigo_shimmer', 'rainbow_violet_shimmer',
  'subagentBullet', 'subagentDescription', 'subagentModel', 'subagentElapsed',
  'subagentToolName', 'subagentStatusRunning', 'subagentStatusCompleted', 'subagentStatusFailed',
]

/* ---------------- colour helpers (all palette-canonical) ---------------- */

const channels = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const toHex = (rgb) => `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`

/** Blend colour `a` towards colour `b` by ratio t (0..1); shimmer variants. */
function blend(p, a, b, t) {
  const [ar, ag, ab] = channels(p[a])
  const [br, bg, bb] = channels(p[b])
  return toHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t])
}

/** Official vscode opacity convention: palette colour + alpha byte. */
function alpha(p, name, ratio) {
  return p[name] + Math.round(ratio * 255).toString(16).padStart(2, '0')
}

/* ------------------------------ colour plan ------------------------------ */

function buildColors(p, light) {
  const shimmer = (name) => blend(p, name, 'text', 0.3)
  const accent = 'mauve' // official Catppuccin accent; brand/interaction group

  return {
    autoAccept: p[accent],
    bashBorder: p.flamingo,
    claude: p[accent],
    toolNameMutate: p.yellow,
    toolNameExec: p.teal,
    claudeShimmer: shimmer(accent),
    claudeBlue_FOR_SYSTEM_SPINNER: p[accent],
    claudeBlueShimmer_FOR_SYSTEM_SPINNER: shimmer(accent),
    permission: p[accent],
    permissionShimmer: shimmer(accent),
    planMode: p.green,
    ide: p[accent],
    promptBorder: p.surface2,
    promptBorderShimmer: p[accent],
    text: p.text,
    inverseText: p.base,
    inactive: p.subtext0,
    inactiveShimmer: p.subtext1,
    subtle: p.overlay0,
    suggestion: p[accent],
    remember: p[accent],
    background: p[accent],
    success: p.green,
    error: p.red,
    warning: p.yellow,
    merged: p[accent],
    warningShimmer: shimmer('yellow'),
    diffAdded: alpha(p, 'green', 0.15),
    diffRemoved: alpha(p, 'red', 0.15),
    diffAddedDimmed: alpha(p, 'green', 0.08),
    diffRemovedDimmed: alpha(p, 'red', 0.08),
    diffAddedWord: alpha(p, 'green', 0.2),
    diffRemovedWord: alpha(p, 'red', 0.2),
    toolCardBackground: p.surface0,
    toolCardBackgroundDim: p.mantle,
    toolDotExec: p.green,
    toolDotRead: p.teal,
    toolDotWrite: p[accent],
    // stays blue so the five tool dots remain distinguishable
    toolDotWeb: p.blue,
    toolDotTask: p.pink,
    syntaxKeyword: p[accent],
    syntaxString: p.green,
    syntaxComment: p.overlay2,
    syntaxNumber: p.peach,
    syntaxFunction: p.blue,
    syntaxType: p.yellow,
    syntaxVariable: p.text,
    syntaxOperator: p.teal,
    syntaxPunctuation: p.overlay2,
    syntaxConstant: p.peach,
    red_FOR_SUBAGENTS_ONLY: p.red,
    blue_FOR_SUBAGENTS_ONLY: p.blue,
    green_FOR_SUBAGENTS_ONLY: p.green,
    yellow_FOR_SUBAGENTS_ONLY: p.yellow,
    purple_FOR_SUBAGENTS_ONLY: p[accent],
    orange_FOR_SUBAGENTS_ONLY: p.peach,
    pink_FOR_SUBAGENTS_ONLY: p.pink,
    cyan_FOR_SUBAGENTS_ONLY: p.teal,
    professionalBlue: p[accent],
    chromeYellow: p.yellow,
    clawd_body: p.peach,
    clawd_background: p.base,
    // userMessageBackground omitted: built-in bases define '' (no fill),
    // and the TUI loader would warn-and-skip an empty-string override
    userMessageBackgroundHover: alpha(p, 'surface0', 0.5),
    messageActionsBackground: p.surface0,
    selectionBg: alpha(p, 'overlay2', light ? 0.3 : 0.25),
    bashMessageBackgroundColor: alpha(p, 'surface0', 0.6),
    memoryBackgroundColor: alpha(p, 'surface0', 0.6),
    rate_limit_fill: p[accent],
    rate_limit_empty: p.surface1,
    fastMode: p.peach,
    fastModeShimmer: shimmer('peach'),
    briefLabelYou: p.yellow,
    briefLabelClaude: p[accent],
    rainbow_red: p.red,
    rainbow_orange: p.peach,
    rainbow_yellow: p.yellow,
    rainbow_green: p.green,
    rainbow_blue: p.blue,
    rainbow_indigo: p.lavender,
    rainbow_violet: p[accent],
    rainbow_red_shimmer: shimmer('red'),
    rainbow_orange_shimmer: shimmer('peach'),
    rainbow_yellow_shimmer: shimmer('yellow'),
    rainbow_green_shimmer: shimmer('green'),
    rainbow_blue_shimmer: shimmer('blue'),
    rainbow_indigo_shimmer: shimmer('lavender'),
    rainbow_violet_shimmer: shimmer(accent),
    subagentBullet: p.flamingo,
    subagentDescription: p.text,
    subagentModel: p.subtext0,
    subagentElapsed: p.subtext0,
    subagentToolName: p[accent],
    subagentStatusRunning: p[accent],
    subagentStatusCompleted: p.green,
    subagentStatusFailed: p.red,
  }
}

/* --------------------------------- emit ---------------------------------- */

const FLAVORS = [
  { id: 'latte', label: 'Latte', base: 'light' },
  { id: 'frappe', label: 'Frappé', base: 'dark' },
  { id: 'macchiato', label: 'Macchiato', base: 'dark' },
  { id: 'mocha', label: 'Mocha', base: 'dark' },
]

const HEX_VALUE = /^(?:#[0-9a-f]{6}(?:[0-9a-f]{2})?|)$/

mkdirSync(OUT_DIR, { recursive: true })
for (const { id, label, base } of FLAVORS) {
  const palette = Object.fromEntries(
    Object.entries(catppuccin[id].colors).map(([name, col]) => [name, col.hex]),
  )
  const colors = buildColors(palette, base === 'light')

  // Guard: keys exactly the dsh-TUI Theme set minus deliberately omitted
  // keys, values well-formed (the TUI loader skips bad entries per key —
  // we want zero skips).
  const omitted = new Set(['userMessageBackground'])
  delete colors.userMessageBackground
  const keys = Object.keys(colors)
  const expected = THEME_KEYS.filter((k) => !omitted.has(k))
  if (keys.join(',') !== expected.join(',')) {
    const missing = expected.filter((k) => !keys.includes(k))
    const extra = keys.filter((k) => !expected.includes(k))
    throw new Error(`${id}: key mismatch — missing: ${missing}, extra: ${extra}`)
  }
  for (const [key, value] of Object.entries(colors)) {
    if (!HEX_VALUE.test(value)) throw new Error(`${id}: bad value for ${key}: ${value}`)
  }

  const file = join(OUT_DIR, `catppuccin-${id}.json`)
  writeFileSync(
    file,
    `${JSON.stringify(
      { name: `catppuccin-${id}`, displayName: `Catppuccin ${label}`, base, colors },
      null,
      2,
    )}\n`,
    'utf8',
  )
  console.log(`wrote ${file} (${keys.length} keys)`)
}
