import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'

const root = new URL('../', import.meta.url)
const pkg = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'))
const source = readFileSync(new URL('lib/client.js', root), 'utf8')
const storageKey = 'dsh-catppuccin:skin'
const flavors = ['latte', 'frappe', 'macchiato', 'mocha'].map((name) => `catppuccin-${name}`)

function loadBundle(code, modules, globals = {}) {
  let entry
  runInNewContext(code, {
    ...globals,
    window: { ...globals.window, __ModuleLoader__: { load: (value) => { entry = value } } },
  })
  assert.ok(entry, 'bundle registers with the DSH lazy-CJS loader')
  return entry.factory((id) => {
    assert.ok(Object.hasOwn(modules, id), `module unavailable in the host: ${id}`)
    return modules[id]
  })
}

// The optional integration run loads the published DSH ThemeRuntime itself.
// Its UI components and settings transport are outside these lifecycle tests.
const realThemePath = process.env.DSH_THEME_CLIENT_PATH
const RealThemeRuntime = realThemePath && loadBundle(readFileSync(realThemePath, 'utf8'), {
  react: {},
  'react/jsx-runtime': {},
  '@deepseek-ai/dsh-client-ui-primitives': {},
  '@deepseek-ai/dsh-client-store': {},
}).ThemeRuntime

class ThemeRuntime {
  constructor(ctx, host) {
    this.ctx = ctx
    this.host = host
    this.themes = [{ id: 'light', colorScheme: 'light' }, { id: 'dark', colorScheme: 'dark' }]
    this.preference = 'system'
    this.publish()
  }
  getTheme() { return this.snapshot }
  publish() {
    this.snapshot = {
      preference: this.preference,
      active: this.themes.find(({ id }) => id === (this.preference === 'system' ? 'light' : this.preference)),
    }
    this.ctx.emit('theme/change', this.snapshot)
  }
  register(definition) {
    this.themes.push(definition)
    this.publish()
    return () => {
      this.themes = this.themes.filter(({ id }) => id !== definition.id)
      if (this.preference === definition.id) this.preference = 'system'
      this.publish()
    }
  }
  setTheme(id) {
    assert.ok(id === 'system' || this.themes.some((theme) => theme.id === id))
    if (this.preference === id) return
    this.preference = id
    if (['light', 'dark', 'system'].includes(id)) this.host.set('preference', id)
    this.publish()
  }
  adopt() {
    this.preference = this.host.getSnapshot().value.preference
    this.publish()
  }
}

function boot(saved = null, builtin = 'system', durableState = Promise.resolve({})) {
  const storage = new Map(saved ? [[storageKey, saved]] : [])
  const timers = new Map()
  const listeners = new Map()
  const disposers = []
  const elements = new Set()
  let nextTimer = 0
  let row
  const makeElement = () => ({
    dataset: {},
    style: { setProperty() {}, removeProperty() {}, getPropertyValue: () => '' },
    isConnected: false,
    hasAttribute: () => false,
    toggleAttribute() {}, setAttribute() {}, removeAttribute() {},
    remove() { this.isConnected = false; elements.delete(this) },
    appendChild(child) { child.isConnected = true; elements.add(child) },
  })
  const globals = {
    window: { localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key),
    } },
    document: {
      body: makeElement(), head: makeElement(), documentElement: makeElement(),
      createElement: makeElement, querySelectorAll: () => [], querySelector: () => null,
    },
    MutationObserver: class { observe() {} disconnect() {} },
    fetch: async (_url, options) => ({ ok: true, json: async () => options ? {} : await durableState }),
    setTimeout: (callback, delay) => { const id = ++nextTimer; timers.set(id, { callback, delay }); return id },
    clearTimeout: (id) => timers.delete(id),
  }
  const plugin = loadBundle(source, {
    'react/jsx-runtime': { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
    react: { useSyncExternalStore: (_subscribe, getSnapshot) => getSnapshot() },
  }, globals)
  const ctx = {
    inject() {},
    emit(event, snapshot) { for (const listener of [...(listeners.get(event) ?? [])]) listener(snapshot) },
    on(event, listener) {
      if (!listeners.has(event)) listeners.set(event, new Set())
      listeners.get(event).add(listener)
      disposers.push(() => listeners.get(event).delete(listener))
    },
    effect: (effect) => { const dispose = effect(); if (dispose) disposers.push(dispose) },
    locale: { register: () => () => {} },
    slots: {
      inject: (_slot, callback) => callback(),
      register: (definition, component) => { row = { props: definition.inject(), component }; return () => {} },
    },
  }
  const hostState = {
    preference: builtin, fontSize: 14,
    codeFontSize: 13, terminalFontSize: 13,
    textFontFamily: '', codeFontFamily: '', terminalFontFamily: '',
  }
  const host = {
    getSnapshot: () => ({ value: hostState }),
    subscribe: () => () => {},
    set: async (field, value) => { hostState[field] = value },
  }
  ctx.theme = new (RealThemeRuntime || ThemeRuntime)(ctx, host)
  const originalSetTheme = ctx.theme.setTheme
  plugin.apply(ctx)
  const settle = () => {
    for (let attempts = 0; attempts < 20; attempts++) {
      const tasks = [...timers].filter(([, task]) => task.delay === 0)
      if (tasks.length === 0) return
      for (const [id, task] of tasks) { timers.delete(id); task.callback() }
    }
    assert.fail('theme restoration did not settle')
  }
  return {
    plugin, ctx, storage, row, settle, originalSetTheme,
    reload(preference) { hostState.preference = preference; ctx.theme.adopt(); settle() },
    dispose() { for (const dispose of disposers.reverse()) dispose() },
  }
}

test('client boots without the removed dsh-client-runtime module (#3)', () => {
  const app = boot()
  assert.deepEqual(Array.from(app.plugin.SKINS, ({ id }) => id), flavors)
  assert.deepEqual(Array.from(app.plugin.inject), ['slots', 'locale', 'theme'])
  assert.equal(app.row.props.getSkin(), 'system')
  app.dispose()
})

test('manifest requests the current renderer and settings providers (#3)', () => {
  assert.deepEqual(pkg.dsh.client.inject, [
    '@deepseek-ai/dsh-client-ui-renderer', '@deepseek-ai/dsh-client-locale',
    '@deepseek-ai/dsh-client-ui-theme', '@deepseek-ai/dsh-client-ui-settings',
  ])
  assert.deepEqual(Object.keys(pkg.peerDependencies), ['react'])
})

test('shipped bundle and theme JSONs match the template', () => {
  const template = readFileSync(new URL('lib/client.tpl.js', root), 'utf8')
  const skins = flavors.map((id) => JSON.parse(readFileSync(new URL(`themes/${id}.json`, root), 'utf8')))
  const normalize = (text) => text.replaceAll('\r\n', '\n')
  assert.equal(normalize(source), normalize(template.replace('__SKINS__', JSON.stringify(skins, null, 2))))
})

for (const builtin of ['system', 'light', 'dark']) {
  test(`saved skin survives repeated settings reloads adopting ${builtin} (#2)`, () => {
    const app = boot('catppuccin-mocha', builtin)
    for (let i = 0; i < 8; i++) app.reload(builtin)
    assert.equal(app.row.props.getSkin(), 'catppuccin-mocha')
    app.dispose()
  })
}

test('picker notifies subscribers and Default stays off after a synchronous theme event (#2)', () => {
  const app = boot()
  let updates = 0
  const unsubscribe = app.row.props.subscribeSkin(() => updates++)
  app.row.props.setSkin('catppuccin-frappe')
  app.settle()
  assert.equal(app.storage.get(storageKey), 'catppuccin-frappe')
  assert.equal(app.row.props.getSkin(), 'catppuccin-frappe')
  assert.equal(updates, 1)
  app.row.props.setSkin('system')
  app.settle()
  assert.equal(app.storage.has(storageKey), false)
  assert.equal(app.row.props.getSkin(), 'system')
  unsubscribe()
  const before = updates
  app.ctx.theme.setTheme('dark')
  assert.equal(updates, before)
  app.dispose()
})

for (const builtin of ['light', 'dark', 'system']) {
  test(`explicit Appearance choice ${builtin} takes priority over the saved skin`, () => {
    const app = boot('catppuccin-mocha')
    app.ctx.theme.setTheme(builtin)
    app.settle()
    assert.equal(app.row.props.getSkin(), builtin)
    assert.equal(app.storage.has(storageKey), false, 'explicit built-in choice also clears the saved flavor')
    app.dispose()
  })
}

test('another plugin theme stays selected', () => {
  const app = boot('catppuccin-mocha')
  const unregister = app.ctx.theme.register({ id: 'other-theme', colorScheme: 'dark', tokens: {} })
  app.ctx.theme.setTheme('other-theme')
  app.settle()
  assert.equal(app.row.props.getSkin(), 'other-theme')
  assert.equal(app.storage.has(storageKey), false)
  unregister()
  app.dispose()
})

test('delayed durable hydration respects an explicit System choice', async () => {
  let resolveState
  const durableState = new Promise((resolve) => { resolveState = resolve })
  const app = boot(null, 'system', durableState)
  app.ctx.theme.setTheme('system')
  resolveState({ skin: 'catppuccin-mocha' })
  await new Promise((resolve) => setImmediate(resolve))
  app.settle()
  assert.equal(app.row.props.getSkin(), 'system')
  assert.equal(app.storage.has(storageKey), false)
  app.dispose()
})

test('durable skin hydrates when no theme has been selected', async () => {
  const app = boot(null, 'system', Promise.resolve({ skin: 'catppuccin-mocha' }))
  await new Promise((resolve) => setImmediate(resolve))
  app.settle()
  assert.equal(app.row.props.getSkin(), 'catppuccin-mocha')
  assert.equal(app.storage.get(storageKey), 'catppuccin-mocha')
  app.dispose()
})

test('delayed durable hydration does not revive a skin after choosing another plugin', async () => {
  let resolveState
  const durableState = new Promise((resolve) => { resolveState = resolve })
  const app = boot(null, 'system', durableState)
  const unregister = app.ctx.theme.register({ id: 'other-theme', colorScheme: 'dark', tokens: {} })
  app.ctx.theme.setTheme('other-theme')
  resolveState({ skin: 'catppuccin-mocha' })
  await new Promise((resolve) => setImmediate(resolve))
  app.settle()
  assert.equal(app.row.props.getSkin(), 'other-theme')
  assert.equal(app.storage.has(storageKey), false)
  app.reload('system')
  assert.equal(app.row.props.getSkin(), 'system')
  unregister()
  app.dispose()
})

test('teardown restores the original theme setter', () => {
  const app = boot()
  app.dispose()
  assert.equal(app.ctx.theme.setTheme, app.originalSetTheme)
})
