/**
 * dsh-catppuccin — host half.
 *
 * Two exact webServer routes (the same pattern the shipped ui-* packages
 * use):
 *   - `/catppuccin/check-update` (GET): queries the npm registry for the
 *     latest `dsh-catppuccin` release, compared against the installed
 *     version; results are cached 5 minutes in memory, failures are never
 *     cached. The payload carries the ready-to-copy upgrade command (with
 *     the profile auto-detected and the channel picked by the installed
 *     version: stable only follows `latest`, prereleases may chase
 *     `beta`); installs from link/file/git get no npm command, only a
 *     git-pull hint.
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
import { mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs'
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

const VERSION_RE = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/

/** Parse a semver (prerelease-aware); null on garbage. */
function parseVersion(raw) {
  const match = VERSION_RE.exec(String(raw ?? '').trim())
  if (match === null) return null
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    pre: match[4] ?? null,
  }
}

function cmpParts(a, b) {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

/** Semver prerelease comparison; a null pre (a release) sorts above any pre. */
function comparePre(a, b) {
  if (a === null && b === null) return 0
  if (a === null) return 1
  if (b === null) return -1
  const as = a.split('.')
  const bs = b.split('.')
  const len = Math.max(as.length, bs.length)
  for (let i = 0; i < len; i++) {
    if (i >= as.length) return -1
    if (i >= bs.length) return 1
    const x = as[i]
    const y = bs[i]
    const xn = /^\d+$/.test(x)
    const yn = /^\d+$/.test(y)
    if (xn && yn) {
      const c = cmpParts(Number(x), Number(y))
      if (c !== 0) return c
    } else if (xn) {
      return -1 // numeric identifiers sort below alphanumeric ones
    } else if (yn) {
      return 1
    } else {
      const c = cmpParts(x, y)
      if (c !== 0) return c
    }
  }
  return 0
}

/** -1 when a < b, 0 equal, 1 when a > b. Unparseable inputs sort last. */
function compareVersions(a, b) {
  const pa = parseVersion(a)
  const pb = parseVersion(b)
  if (pa === null && pb === null) return 0
  if (pa === null) return -1
  if (pb === null) return 1
  for (const key of ['major', 'minor', 'patch']) {
    const c = cmpParts(pa[key], pb[key])
    if (c !== 0) return c
  }
  return comparePre(pa.pre, pb.pre)
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

const PKG_NAME = 'dsh-catppuccin'

/** Where the package was installed from, by its dependency spec. */
function installSourceOf(spec) {
  if (typeof spec !== 'string' || spec === '') return 'unknown'
  if (spec === 'workspace:*' || spec.startsWith('workspace:')) return 'link'
  if (spec.startsWith('link:')) return 'link'
  if (spec.startsWith('file:')) return 'file'
  // any other protocol (git+https:, github:…), or a bare path with
  // slashes (git URLs / local folders), counts as a non-registry source
  if (/^[a-z][a-z0-9+.-]*:/.test(spec) || spec.includes('/') || spec.includes('\\')) return 'git'
  return 'registry'
}

/**
 * Probe the active profile for the copyable upgrade command, in priority
 * order: (1) DSH Desktop's launcher-resolved profile, (2) argv hints
 * (--profile web / --profile=web), (3) scanning $DSH_HOME/profiles/* for a
 * direct dependency on this package (which also yields the install spec).
 */
function detectProfile(ctx) {
  try {
    const desktop = ctx?.get?.('desktopProfiles')
    if (desktop !== undefined && desktop !== null && typeof desktop === 'object' && typeof desktop.current === 'string') {
      return { name: desktop.current, detected: true, spec: null, env: 'desktop' }
    }
  } catch {
    // service absent — keep probing
  }
  const argv = process.argv ?? []
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--profile' && i + 1 < argv.length) {
      return { name: argv[i + 1], detected: true, spec: null, env: 'web' }
    }
    const inline = /^--profile=(.+)$/.exec(arg ?? '')
    if (inline !== null) return { name: inline[1], detected: true, spec: null, env: 'web' }
  }
  try {
    const root = join(dshHome(), 'profiles')
    for (const entry of readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      let manifest
      try {
        manifest = JSON.parse(readFileSync(join(root, entry.name, 'package.json'), 'utf8'))
      } catch {
        continue
      }
      const spec = manifest?.dependencies?.[PKG_NAME]
      if (typeof spec === 'string') {
        return { name: entry.name, detected: true, spec, env: process.env.DSH_PROFILE || 'web' }
      }
    }
  } catch {
    // no profiles dir — fall through to the env fallback
  }
  return { name: process.env.DSH_PROFILE || 'web', detected: false, spec: null, env: 'web' }
}

let updateCache = null

/** Query the npm registry and build the check payload. Failures are
 *  reported (ok: false, HTTP 502) but never cached. The client renders
 *  the payload directly. */
async function handleCheckUpdate(ctx, res) {
  if (updateCache !== null && Date.now() - updateCache.at < UPDATE_CACHE_TTL_MS) {
    json(res, 200, updateCache.payload)
    return
  }
  const current = pkg.version
  const profile = detectProfile(ctx)
  const installSource = profile.spec !== null ? installSourceOf(profile.spec) : 'unknown'
  const registrySource = installSource === 'registry' || installSource === 'unknown'
  const currentHasPre = parseVersion(current)?.pre !== null
  let ok = false
  let code = 'network'
  let error = null
  let latest = null
  let beta = null
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
      const tags = doc?.['dist-tags']
      if (typeof tags === 'object' && tags !== null && typeof tags.latest === 'string') {
        latest = tags.latest
        beta = typeof tags.beta === 'string' ? tags.beta : null
        ok = true
        code = 'ok'
      } else {
        code = 'no-dist-tags'
        error = 'registry document carries no dist-tags.latest'
      }
    } else {
      code = 'registry-http'
      error = `npm registry responded HTTP ${response.status}`
    }
  } catch (cause) {
    code = cause?.name === 'AbortError' ? 'registry-unreachable' : 'network'
    error = cause instanceof Error ? cause.message : String(cause)
  }
  // Channel: a stable install only ever follows `latest`; an installed
  // prerelease may also chase `beta` — unless a stable release overtook it.
  let newest = latest
  let channel = 'latest'
  if (ok && currentHasPre && beta !== null) {
    newest = compareVersions(latest, beta) >= 0 ? latest : beta
    channel = newest === beta ? 'beta' : 'latest'
  }
  const outdated = ok && newest !== null && compareVersions(current, newest) < 0
  const payload = {
    ok,
    code,
    current,
    latest: newest,
    outdated,
    channel: ok ? channel : 'latest',
    updateCommand: ok && registrySource ? `dsh plugin --profile ${profile.name} add ${PKG_NAME}@${channel}` : null,
    profile: profile.name,
    profileDetected: profile.detected,
    installSource,
    env: profile.env,
    checkedAt: new Date().toISOString(),
    error: error ?? undefined,
  }
  if (ok) updateCache = { at: Date.now(), payload }
  json(res, ok ? 200 : 502, payload)
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
        handleCheckUpdate(ctx, res)
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
