/**
 * dsh-catppuccin — dsh-TUI theme-sync half.
 *
 * dsh-TUI has no theme registration API — custom themes are only ever read
 * from `~/.dsh-tui/themes/<name>.json`. This tiny Cordis plugin ships as a
 * second bundle row (dsh-catppuccin/tui-themes, no inject → activates in
 * EVERY profile) and idempotently copies the four Catppuccin theme JSONs
 * from this package into the TUI data dir on activation:
 *
 *   - installed into a dsh-tui profile: themes land on first TUI start —
 *     `dsh plugin --profile dsh-tui add dsh-catppuccin` is the whole install;
 *   - installed into a web/desktop profile of a user who also runs dsh-TUI:
 *     themes stay in sync on every web start, no second install needed;
 *   - no `~/.dsh-tui` on disk (web-only user): strict no-op — the directory
 *     is never created by this plugin.
 *
 * The `catppuccin-*.json` namespace is plugin-owned: syncing overwrites
 * those files when they differ from the shipped copies (that is how updates
 * propagate). Users who want to customize copy one under their own name —
 * other files in the themes directory are never touched.
 *
 * Best-effort by contract: any failure is swallowed silently — theme sync
 * must never drag down profile startup.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Stable cordis plugin name (matches the cordis.patch.yml row id). */
export const name = 'dsh-catppuccin-tui-themes'

/** File name shape this plugin owns and syncs. */
function isOwnedTheme(file) {
  return file.startsWith('catppuccin-') && file.endsWith('.json')
}

/**
 * Idempotently copy every `catppuccin-*.json` from `bundledDir` into
 * `<tuiHome>/themes/`. Writes only files whose content differs from the
 * shipped copy; never touches other files. Returns the files written
 * (empty = already in sync, or `tuiHome` absent — the sync no-ops unless
 * the user actually has a dsh-TUI data dir).
 */
export function syncTuiThemes(bundledDir, tuiHome) {
  if (!existsSync(tuiHome) || !statSync(tuiHome).isDirectory()) return []
  const written = []
  let targetReady = false
  for (const file of readdirSync(bundledDir).sort()) {
    if (!isOwnedTheme(file)) continue
    const source = readFileSync(join(bundledDir, file))
    const dest = join(tuiHome, 'themes', file)
    let identical = false
    try {
      identical = readFileSync(dest).equals(source)
    } catch {
      identical = false // missing or unreadable target → (re)write it
    }
    if (identical) continue
    if (!targetReady) {
      mkdirSync(join(tuiHome, 'themes'), { recursive: true })
      targetReady = true
    }
    writeFileSync(dest, source)
    written.push(file)
  }
  return written
}

/** Cordis entry: sync once at activation. No inject — must activate in any
 *  profile (dsh-tui has no webServer; the main half waits there instead). */
export function apply() {
  try {
    // lib/tui-themes.js -> <package root>/themes/tui (shipped via
    // package.json "files"; same layout under a link: dev install).
    const bundledDir = fileURLToPath(new URL('../themes/tui', import.meta.url))
    syncTuiThemes(bundledDir, join(homedir(), '.dsh-tui'))
  } catch {
    // Best-effort: never disturb profile startup for a theme copy.
  }
}
