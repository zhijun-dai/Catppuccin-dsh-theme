/**
 * dsh-catppuccin — host half.
 *
 * Two exact webServer routes (the same pattern the shipped ui-* packages
 * use):
 *   - `/catppuccin/check-update` (GET): queries the npm registry for the
 *     latest `dsh-catppuccin` release, compared against the installed
 *     version; results are cached 5 minutes in memory, failures are never
 *     cached. The payload carries a ready-to-copy upgrade command.
 *   - `/catppuccin/state` (GET / PUT): durable flavor persistence in a
 *     small JSON file under `$DSH_HOME` (`catppuccin-state.json`), written
 *     atomically (temp + rename). The browser localStorage is the instant
 *     layer; this file survives DSH Desktop's random per-launch loopback
 *     port, where localStorage (scoped per origin, port included) always
 *     starts empty.
 *
 * `webServer` is a hard inject dependency so this half only activates where
 * the service is live (headless profiles have none and stay inert).
 */
import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(ROOT, '..', 'package.json'), 'utf8'))

export const name = 'dsh-catppuccin'
export const inject = ['webServer']

/** npm registry abbreviated packument endpoint (the install-v1 document). */
const REGISTRY_URL = 'https://registry.npmjs.org/dsh-catppuccin'
const CHECK_UPDATE_PATH = '/catppuccin/check-update'
const STATE_PATH = '/catppuccin/state'
const STATE_FILENAME = 'catppuccin-state.json'
const UPDATE_CACHE_TTL_MS = 5 * 60 * 1000
const UPDATE_FETCH_TIMEOUT_MS = 8000

/* ------------------------------ semver (tiny) ------------------------------ */

/** Parse `major.minor.patch`; null on garbage. */
function parseVersion(raw) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(raw.trim())
  if (match === null) return null
  return [Number(match[1]), Number(match[2]), Number(match[3])]
}

/** -1 when a < b, 0 equal, 1 when a > b. Unparseable inputs sort last. */
function compareVersions(a, b) {
  const pa = parseVersion(a)
  const pb = parseVersion(b)
  if (pa === null && pb === null) return 0
  if (pa === null) return -1
  if (pb === null) return 1
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pa[i] > pb[i] ? 1 : -1
  }
  return 0
}

/* ------------------------------ durable state ------------------------------ */

function dshHome() {
  return process.env.DSH_HOME || join(homedir(), '.dsh')
}

function stateFilePath() {
  return join(dshHome(), STATE_FILENAME)
}

/** Read the durable state; absent or unparseable means none yet. */
function readDurableState() {
  try {
    const parsed = JSON.parse(readFileSync(stateFilePath(), 'utf8'))
    if (typeof parsed !== 'object' || parsed === null) return null
    return parsed
  } catch {
    return null
  }
}

/** Write atomically: temp file + rename over the target (mode 0600 keeps
 *  the preference private; a failed rename leaves the previous file). */
function writeDurableState(state) {
  const path = stateFilePath()
  mkdirSync(dirname(path), { recursive: true })
  const tmp = `${path}.tmp`
  writeFileSync(tmp, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 })
  renameSync(tmp, path)
}

/* ------------------------------- update check ------------------------------ */

/** Best-effort profile probe for the copyable upgrade command. */
function detectProfile() {
  return process.env.DSH_PROFILE || 'web'
}

let updateCache = null

/** Query the npm registry and build the check payload. Failures are
 *  reported (ok: false) but never cached. */
async function handleCheckUpdate(res) {
  if (updateCache !== null && Date.now() - updateCache.at < UPDATE_CACHE_TTL_MS) {
    json(res, 200, updateCache.payload)
    return
  }
  const current = pkg.version
  let latest = null
  let error = null
  let ok = false
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), UPDATE_FETCH_TIMEOUT_MS)
    const response = await fetch(REGISTRY_URL, {
      signal: controller.signal,
      headers: { accept: 'application/vnd.npm.install-v1+json' },
    })
    clearTimeout(timer)
    if (response.ok) {
      const doc = await response.json()
      latest = doc?.['dist-tags']?.latest ?? null
      ok = latest !== null
    } else {
      error = `npm registry responded HTTP ${response.status}`
    }
  } catch (cause) {
    error = cause instanceof Error ? cause.message : String(cause)
  }
  const upToDate = ok && latest !== null && compareVersions(current, latest) >= 0
  const payload = {
    current,
    latest,
    ok,
    upToDate,
    error,
    command: `dsh plugin --profile ${detectProfile()} add dsh-catppuccin@latest`,
  }
  if (ok) updateCache = { at: Date.now(), payload }
  json(res, 200, payload)
}

/* ---------------------------------- http ----------------------------------- */

function json(res, status, payload) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(payload))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

/** Cordis entry: register the routes and release them on teardown. */
export function apply(ctx) {
  const webServer = ctx.get('webServer')
  if (webServer === undefined) return
  const disposers = [
    webServer.register({
      kind: 'exact',
      path: CHECK_UPDATE_PATH,
      handler: (req, res) => {
        handleCheckUpdate(res)
      },
    }),
    webServer.register({
      kind: 'exact',
      path: STATE_PATH,
      handler: async (req, res) => {
        if (req.method === 'GET') {
          json(res, 200, readDurableState() ?? {})
          return
        }
        if (req.method === 'PUT') {
          try {
            const parsed = JSON.parse(await readBody(req))
            if (typeof parsed !== 'object' || parsed === null) throw new Error('bad body')
            writeDurableState(parsed)
            json(res, 200, { ok: true })
          } catch (error) {
            json(res, 400, { ok: false, error: error instanceof Error ? error.message : String(error) })
          }
          return
        }
        json(res, 405, { ok: false, error: 'method not allowed' })
      },
    }),
  ]
  ctx.effect(() => () => {
    for (const dispose of disposers) dispose()
  }, 'dsh-catppuccin: host routes')
}
