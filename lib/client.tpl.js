// dsh-catppuccin — browser half (client plugin bundle). GENERATED FILE:
// run `node scripts/gen-themes.mjs` to regenerate from lib/client.tpl.js.
//
// Loaded by dsh-client-modules at /plugins/dsh-catppuccin/client.js and
// executed through the vendored cordis Loader's lazy-CJS module table
// (window.__ModuleLoader__.load). The factory body is plain CJS with
// require() resolved against the shell's module table — the same shape the
// shipped ui-* packages' tsdown bundles emit.
window.__ModuleLoader__.load({
	id: "dsh-catppuccin",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _runtime_client = require("@deepseek-ai/dsh-client-runtime/client");

		//#region dsh-catppuccin: definitions
		/** The settings row's locale namespace. */
		const SETTINGS_NS = "settings.catppuccin";
		/** localStorage key holding the selected theme id. */
		const STORAGE_KEY = "dsh-catppuccin:skin";
		/** localStorage key remembering the last built-in preference. */
		const RESTORE_KEY = "dsh-catppuccin:restore";
		/** localStorage key for the pastel-glow layer toggle ("on" default). */
		const GLOW_KEY = "dsh-catppuccin:glow";
		/** localStorage key holding the glass layer state (JSON, off default). */
		const GLASS_KEY = "dsh-catppuccin:glass";
		/** Sentinel meaning "no custom theme — follow the built-in appearance". */
		const DEFAULT_SKIN = "system";

		/**
		 * The Catppuccin theme catalog, generated from the official
		 * catppuccin/palette palette.json. Each entry is a third-party theme
		 * for the built-in ThemeRuntime: an id, the base palette it builds on
		 * (colorScheme drives body[data-ds-dark-theme]), and --dsw-alias-*
		 * overrides applied as inline custom properties on <body> by
		 * ui-layout's ThemePresenter. Values are concrete CSS colors (no var()
		 * indirection).
		 */
		const SKINS = __SKINS__;

		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"skin.title": "Catppuccin 主题",
			"skin.default": "默认",
			"skin.catppuccin-latte": "Latte",
			"skin.catppuccin-frappe": "Frappé",
			"skin.catppuccin-macchiato": "Macchiato",
			"skin.catppuccin-mocha": "Mocha",
			"skin.checkUpdate": "检查更新",
			"skin.updating": "检查中…",
			"skin.updateError": "检查更新失败",
			"skin.updateCurrent": "当前",
			"skin.updateLatest": "最新",
			"skin.updateUpToDate": "已是最新版本",
			"skin.glowTitle": "粉彩光效",
			"skin.glowHint": "柔和渐变与微光（关闭即还原平面效果）",
			"skin.glassTitle": "玻璃拟态",
			"skin.glassDesc": "磨砂玻璃卡片，模糊度、磨砂度与背景亮度可调",
			"skin.glassEnable": "启用玻璃拟态",
			"skin.glassModeMica": "云母效果",
			"skin.glassModeCompat": "兼容模式",
			"skin.glassModeHint": "云母效果把界面改成悬浮磨砂卡片；兼容模式保持原版排版，只把材质换成玻璃",
			"skin.glassPreset": "预设",
			"skin.glassPresetClear": "清透",
			"skin.glassPresetStandard": "标准",
			"skin.glassPresetFrosted": "磨砂",
			"skin.glassMode": "模式",
			"skin.glassBlur": "模糊度",
			"skin.glassFrost": "磨砂度",
			"skin.glassBrightness": "背景亮度",
			"skin.glassBrightnessDark": "深色主题：0 为纯黑，50 为原样",
			"skin.glassBrightnessLight": "浅色主题：50 为原样，100 为纯白",
			"skin.glassReset": "恢复默认",
			"skin.updateGit": "本地链接 / 源码安装（link·file·git）：npm 升级命令不适用，请改用 git pull 或重新构建",
			"skin.updateBeta": "beta 通道",
			"skin.updateLatestTag": "latest 通道"
		};

		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"skin.title": "Catppuccin theme",
			"skin.default": "Default",
			"skin.catppuccin-latte": "Latte",
			"skin.catppuccin-frappe": "Frappé",
			"skin.catppuccin-macchiato": "Macchiato",
			"skin.catppuccin-mocha": "Mocha",
			"skin.checkUpdate": "Check for updates",
			"skin.updating": "Checking…",
			"skin.updateError": "Update check failed",
			"skin.updateCurrent": "Current",
			"skin.updateLatest": "Latest",
			"skin.updateUpToDate": "You're up to date",
			"skin.glowTitle": "Pastel glow",
			"skin.glowHint": "Soft gradients and halos — off restores the flat look",
			"skin.glassTitle": "Glassmorphism",
			"skin.glassDesc": "Frosted glass cards — blur, frost and brightness are adjustable",
			"skin.glassEnable": "Enable glass",
			"skin.glassModeMica": "Mica",
			"skin.glassModeCompat": "Compat",
			"skin.glassModeHint": "Mica floats the UI as frosted cards; Compat keeps the stock layout and only swaps the material",
			"skin.glassPreset": "Presets",
			"skin.glassPresetClear": "Clear",
			"skin.glassPresetStandard": "Standard",
			"skin.glassPresetFrosted": "Frosted",
			"skin.glassMode": "Mode",
			"skin.glassBlur": "Blur",
			"skin.glassFrost": "Frost",
			"skin.glassBrightness": "Brightness",
			"skin.glassBrightnessDark": "Dark scheme: 0 = pure black, 50 = unchanged",
			"skin.glassBrightnessLight": "Light scheme: 50 = unchanged, 100 = pure white",
			"skin.glassReset": "Reset defaults",
			"skin.updateGit": "Installed via link/file/git: the npm upgrade command does not apply — use git pull or rebuild",
			"skin.updateBeta": "beta channel",
			"skin.updateLatestTag": "latest channel"
		};
		//#endregion

		//#region dsh-catppuccin: persistence
		/** Read a localStorage string value (null on absence or error). */
		function readStorage(key) {
			try {
				const value = window.localStorage.getItem(key);
				return typeof value === "string" ? value : null;
			} catch {
				return null;
			}
		}

		/** Write (or remove with null) a localStorage value. */
		function writeStorage(key, value) {
			try {
				if (value === null) window.localStorage.removeItem(key);
				else window.localStorage.setItem(key, value);
			} catch {
				// storage unavailable / quota — the preference stays process-local
			}
		}

		/** Saved skin id (may be unknown/absent). */
		function readSavedSkin() {
			return readStorage(STORAGE_KEY);
		}

		/** Persist a skin choice; DEFAULT_SKIN clears the stored value. */
		function writeSavedSkin(id) {
			writeStorage(STORAGE_KEY, id === DEFAULT_SKIN ? null : id);
		}

		/**
		 * Remember a built-in preference (system/light/dark) whenever the
		 * runtime is not on a Catppuccin flavor, so turning the skin off
		 * hands the user back exactly what they had before the plugin —
		 * instead of dropping them onto "system".
		 */
		function rememberBuiltinPreference(preference) {
			if (SKINS.some((skinDefinition) => skinDefinition.id === preference)) return;
			if (preference === "light" || preference === "dark" || preference === DEFAULT_SKIN) {
				writeStorage(RESTORE_KEY, preference);
			}
		}

		/** The preference to restore when turning the skin off (default: system). */
		function readRestoredPreference() {
			const raw = readStorage(RESTORE_KEY);
			return raw === "light" || raw === "dark" ? raw : DEFAULT_SKIN;
		}

		/** Apply (or remove) the pastel-glow layer on the document root. */
		function applyGlow(enabled) {
			if (enabled) document.documentElement.dataset.dshGlow = "on";
			else delete document.documentElement.dataset.dshGlow;
		}

		/** Glow layer state, default on. */
		function isGlowEnabled() {
			return readStorage(GLOW_KEY) !== "off";
		}

		/** Glass layer defaults (off — the stock UI stays untouched until enabled). */
		const GLASS_DEFAULT = { enabled: false, mode: "mica", blur: 2, frost: 20, brightness: 50 };

		/** One-click presets; a state triple matches exactly to highlight. */
		const GLASS_PRESETS = [
			{ id: "clear", blur: 0, frost: 8, brightness: 50 },
			{ id: "standard", blur: 2, frost: 20, brightness: 50 },
			{ id: "frosted", blur: 12, frost: 45, brightness: 50 }
		];

		/** Seams the glass styles are keyed on (stable DSH markers). */
		const GLASS_SEAMS = [
			{ attr: "data-dsh-glass-frame", selector: ':has(> [class*="sidebarCol"])' },
			{ attr: "data-dsh-glass-sidebar-root", selector: '[class*="sidebarCol"] [class*="root"]', first: true },
			{ attr: "data-dsh-glass-surface", selector: 'button[class*="newSession"]' },
			{ attr: "data-dsh-glass-trajectory", selector: "[data-conversation-composer-overlay]" },
			{ attr: "data-dsh-glass-details", selector: '[class*="detailsCol"] [class*="root"]', first: true },
			{ attr: "data-dsh-glass-inputbar", selector: ':has(> [data-composer-card])' },
			{ attr: "data-dsh-glass-add", selector: '[data-composer-card] [class*="add"]' },
			{ attr: "data-dsh-glass-stats", selector: '[data-slot="conversation.composer.dock"] [class*="root"]', first: true }
		];

		/** Clamp a finite number into [min, max]; anything else falls back. */
		function clampNumber(raw, min, max, fallback) {
			const value = typeof raw === "number" && Number.isFinite(raw) ? raw : fallback;
			return Math.min(max, Math.max(min, value));
		}

		/** Sanitize an untrusted glass state (unknown shape → defaults, out-of-range → clamped). */
		function sanitizeGlass(parsed) {
			if (typeof parsed !== "object" || parsed === null) return { ...GLASS_DEFAULT };
			return {
				enabled: parsed.enabled === true,
				mode: parsed.mode === "compat" ? "compat" : "mica",
				blur: clampNumber(parsed.blur, 0, 40, GLASS_DEFAULT.blur),
				frost: clampNumber(parsed.frost, 0, 100, GLASS_DEFAULT.frost),
				brightness: clampNumber(parsed.brightness, 0, 100, GLASS_DEFAULT.brightness)
			};
		}

		/** Read the glass state; the legacy "on"/"off" value migrates to JSON. */
		function readGlassState() {
			const raw = readStorage(GLASS_KEY);
			if (raw === "on" || raw === "off") {
				const migrated = { ...GLASS_DEFAULT, enabled: raw === "on" };
				writeGlassState(migrated);
				return migrated;
			}
			let parsed = null;
			try {
				parsed = raw !== null ? JSON.parse(raw) : null;
			} catch {
				parsed = null;
			}
			return sanitizeGlass(parsed);
		}

		/** Persist the glass state as JSON. */
		function writeGlassState(state) {
			writeStorage(GLASS_KEY, JSON.stringify(state));
		}

		/** True when the active color scheme is dark (body marker from the presenter). */
		function glassIsDark() {
			return document.body.hasAttribute("data-ds-dark-theme");
		}

		/**
		 * Apply (or remove) the whole glass layer: the html attribute gates,
		 * the mode attribute, the four knob custom properties, the two edge
		 * fades and the seam observer. Idempotent and re-reads the color
		 * scheme, so a theme/change listener can just call it again (dark
		 * flips the brightness knob's polarity).
		 */
		function applyGlassState(state, darkHint) {
			const doc = document.documentElement;
			const on = state.enabled === true;
			if (on) doc.dataset.dshGlass = "on";
			else delete doc.dataset.dshGlass;
			doc.toggleAttribute("data-dsh-glass-float", on && state.mode !== "compat");
			doc.toggleAttribute("data-dsh-glass-compat", on && state.mode === "compat");
			if (on) {
				// darkHint lets the theme/change listener pass the incoming
				// color scheme directly — the body marker updates a tick late
				const dark = darkHint !== undefined ? darkHint : glassIsDark();
				doc.style.setProperty("--dsh-glass-blur", `${state.blur}px`);
				doc.style.setProperty("--dsh-glass-frost", String(Math.min(state.frost / 50, 1.4)));
				doc.style.setProperty("--dsh-glass-brightness-black", String(dark ? Math.max(0, (50 - state.brightness) / 50) : 0));
				doc.style.setProperty("--dsh-glass-brightness-white", String(dark ? 0 : Math.max(0, (state.brightness - 50) / 50)));
				ensureFades();
				observeSeams();
			} else {
				for (const key of ["--dsh-glass-blur", "--dsh-glass-frost", "--dsh-glass-brightness-black", "--dsh-glass-brightness-white"]) {
					doc.style.removeProperty(key);
				}
				removeFades();
				stopSeams();
			}
		}

		/** Append the two edge-fade nodes (idempotent). */
		function ensureFades() {
			if (document.querySelector('[data-dsh-glass-fade="top"]') === null) {
				const top = document.createElement("span");
				top.setAttribute("data-dsh-glass-fade", "top");
				top.setAttribute("aria-hidden", "true");
				document.body.appendChild(top);
			}
			if (document.querySelector('[data-dsh-glass-fade="bottom"]') === null) {
				const bottom = document.createElement("span");
				bottom.setAttribute("data-dsh-glass-fade", "bottom");
				bottom.setAttribute("aria-hidden", "true");
				document.body.appendChild(bottom);
			}
		}

		/** Remove the edge-fade nodes. */
		function removeFades() {
			for (const node of document.querySelectorAll("[data-dsh-glass-fade]")) node.remove();
		}

		/**
		 * Stamp the glass seams and keep them stamped: React re-mounts move
		 * DOM around, so every childList change re-runs the stamp (rAF
		 * throttled) and drops markers that no longer match — a stale marker
		 * would glass the wrong subtree after a re-mount.
		 */
		let glassSeamObserver = null;
		let seamRaf = null;
		function stampSeams() {
			if (seamRaf !== null) return;
			seamRaf = window.requestAnimationFrame(() => {
				seamRaf = null;
				for (const seam of GLASS_SEAMS) {
					const matched = [...document.querySelectorAll(seam.selector)];
					const targets = seam.first ? matched.slice(0, 1) : matched;
					const keep = new Set(targets);
					for (const target of targets) target.setAttribute(seam.attr, "");
					for (const element of document.querySelectorAll(`[${seam.attr}]`)) {
						if (!keep.has(element)) element.removeAttribute(seam.attr);
					}
				}
			});
		}
		function observeSeams() {
			if (glassSeamObserver !== null) return;
			stampSeams();
			glassSeamObserver = new MutationObserver(stampSeams);
			glassSeamObserver.observe(document.documentElement, { childList: true, subtree: true });
		}
		function stopSeams() {
			if (glassSeamObserver !== null) {
				glassSeamObserver.disconnect();
				glassSeamObserver = null;
			}
			if (seamRaf !== null) {
				window.cancelAnimationFrame(seamRaf);
				seamRaf = null;
			}
		}

		/**
		 * Durable two-layer persistence: localStorage is the instant layer,
		 * the host's state file (under $DSH_HOME) survives Desktop's
		 * per-launch port churn where localStorage always starts empty.
		 * Changes are debounced into a single PUT.
		 */
		const STATE_ROUTE = "/catppuccin/state";
		let stateTimer = null;
		function flushState() {
			const saved = readSavedSkin();
			const glass = readGlassState();
			fetch(STATE_ROUTE, {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ version: 1, skin: saved, glass })
			}).catch(() => {
				// best-effort; localStorage still holds the choice
			});
		}
		function scheduleFlush() {
			if (stateTimer !== null) clearTimeout(stateTimer);
			stateTimer = setTimeout(() => {
				stateTimer = null;
				flushState();
			}, 300);
		}
		//#endregion

		//#region dsh-catppuccin: glass stylesheet
		/**
		 * The complete glassmorphism stylesheet — resident in the DOM at all
		 * times, gated on html[data-dsh-glass="on"] plus the float/compat
		 * mode marker. Attributes absent == zero effect, so the stock UI
		 * stays pixel-identical until the user enables the layer.
		 *
		 * Kept separate from SURFACE_RULES because glass works under any
		 * active theme (colors come from the --dsw-alias-* tokens the theme
		 * presenter writes on <body>), while SURFACE_RULES only mounts under
		 * a Catppuccin skin. Every selector starts with the single
		 * [data-dsh-glass="on"] gate; the boot code injects the sheet with
		 * that gate boosted by :not(#dsh-catppuccin-glass) so the resident
		 * sheet out-ranks the shipped ui-* stylesheets regardless of
		 * injection order (same trick as SURFACE_RULES' boost).
		 *
		 * Blur containment (a backdrop-filtered element becomes the
		 * containing block for its fixed descendants): the sidebar column
		 * never blurs itself — the frost sits on a ::before child layer
		 * that is not an ancestor of the column's content. The floating
		 * header/composer panes blur but host no fixed overlays; only
		 * [role=dialog][aria-modal=true] gets the glass fill (assumed to
		 * carry no fixed descendants), small dialogs/tooltips stay native.
		 */
		const GLASS_SHEET = `
[data-dsh-glass="on"] body {
  --dsh-glass-card: color-mix(in srgb, var(--dsw-alias-bg-layer-1) calc(52% * var(--dsh-glass-frost, 1)), transparent);
  --dsh-glass-card-raised: color-mix(in srgb, var(--dsw-alias-bg-layer-1) calc(64% * var(--dsh-glass-frost, 1)), transparent);
  --dsh-glass-card-hover: color-mix(in srgb, var(--dsw-alias-bg-layer-1) calc(76% * var(--dsh-glass-frost, 1)), transparent);
  --dsh-glass-rim: color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent);
  --dsh-glass-rim-soft: color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);
  --dsh-glass-edge: inset 0 1px 0 rgba(255, 255, 255, 0.42);
  --dsh-glass-drop: 0 10px 32px color-mix(in srgb, var(--dsw-alias-bg-mask-2) 38%, transparent);
  background: color-mix(in srgb,
    color-mix(in srgb, var(--dsw-alias-bg-base), #ffffff calc(var(--dsh-glass-brightness-white, 0) * 100%)),
    #000000 calc(var(--dsh-glass-brightness-black, 0) * 100%));
}
[data-dsh-glass="on"] body[data-ds-dark-theme] {
  --dsh-glass-rim: color-mix(in srgb, var(--dsw-alias-label-primary) 24%, transparent);
  --dsh-glass-rim-soft: color-mix(in srgb, var(--dsw-alias-label-primary) 16%, transparent);
  --dsh-glass-edge: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  --dsh-glass-drop: 0 10px 32px rgba(2, 6, 14, 0.45);
}
/* solid ground: frame, active phase and details column go transparent so
   the brightness-tuned body base shows through; the composer seat drops
   its opaque underlay */
[data-dsh-glass="on"] [data-dsh-glass-frame],
[data-dsh-glass="on"] [data-phase],
[data-dsh-glass="on"] [data-dsh-glass-details] {
  background: transparent;
}
[data-dsh-glass="on"] [data-phase] [class*="composerSeat"] { background: none; }
[data-dsh-glass="on"] [data-conversation-scroll] { text-shadow: 0 0 1px rgba(255, 255, 255, 0.5); }
[data-dsh-glass="on"] body[data-ds-dark-theme] [data-conversation-scroll] { text-shadow: 0 0 1px rgba(0, 0, 0, 0.4); }
/* ===== Mica mode: panes float over the transcript as frosted cards ===== */
[data-dsh-glass="on"][data-dsh-glass-float] [data-phase="active"] header { position: relative; z-index: 8; }
[data-dsh-glass="on"][data-dsh-glass-float] header {
  margin: 12px 16px 0;
  padding: 10px 16px 8px;
  border: 1px solid var(--dsh-glass-rim);
  border-radius: 20px;
  background: var(--dsh-glass-card);
  box-shadow: var(--dsh-glass-edge), var(--dsh-glass-drop);
  backdrop-filter: blur(var(--dsh-glass-blur, 14px));
}
[data-dsh-glass="on"][data-dsh-glass-float] header::after { display: none; }
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-frame][data-sidebar-collapsed] header { margin-left: 28px; }
[data-dsh-glass="on"][data-dsh-glass-float] [class*="sidebarCol"] {
  --dsw-specific-sidebar-fill: transparent;
  position: relative;
  z-index: 9;
  margin: 12px;
  padding: 10px 12px 14px;
  border: 1px solid var(--dsh-glass-rim);
  border-right-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 40%, transparent);
  border-radius: 20px;
  box-shadow: var(--dsh-glass-drop);
  overflow: hidden;
}
[data-dsh-glass="on"][data-dsh-glass-float] [class*="sidebarCol"]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--dsh-glass-card);
  box-shadow: var(--dsh-glass-edge);
  backdrop-filter: blur(var(--dsh-glass-blur, 14px));
  z-index: -1;
  pointer-events: none;
}
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-frame]:not([data-sidebar-collapsed]) [data-dsh-glass-sidebar-root] { width: 100% !important; }
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-frame][data-sidebar-collapsed] [class*="sidebarCol"] {
  margin: 12px -12px 12px 12px;
  padding: 0;
  border-radius: 16px;
}
/* composer: a floating card, or one slab when the stats row docks under it */
[data-dsh-glass="on"][data-dsh-glass-float] [data-composer-card],
[data-dsh-glass="on"][data-dsh-glass-float] [data-composer-card]::after { border-radius: 24px; }
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-inputbar]:not([class*="hero"]):not(:has([data-dsh-glass-stats])) { padding-bottom: 12px; }
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-inputbar]:has([data-dsh-glass-stats]) {
  margin: 0 auto 12px;
  width: var(--dsh-composer-card-max-width);
  border: 1px solid var(--dsh-glass-rim);
  border-radius: 24px;
  background: var(--dsh-glass-card);
  box-shadow: var(--dsh-glass-edge), var(--dsh-glass-drop);
  backdrop-filter: blur(var(--dsh-glass-blur, 14px));
}
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-inputbar]:has([data-dsh-glass-stats]) [data-composer-card],
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-inputbar]:has([data-dsh-glass-stats]) [data-slot="conversation.composer.dock"] {
  background: transparent;
  box-shadow: none;
  border: 0;
}
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-inputbar]:has([data-dsh-glass-stats]) [data-composer-card] {
  border-bottom: 1px solid var(--dsh-glass-rim-soft);
  border-radius: 0;
}
/* trajectory view panel */
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-trajectory] {
  margin: 8px 16px 12px;
  width: calc(100% - 32px);
  height: calc(100% - 20px);
  border: 1px solid var(--dsh-glass-rim);
  border-radius: 20px;
  background: var(--dsh-glass-card);
  box-shadow: var(--dsh-glass-edge), var(--dsh-glass-drop);
  backdrop-filter: blur(var(--dsh-glass-blur, 14px));
  overflow: hidden;
}
/* message bubbles inside the transcript only */
[data-dsh-glass="on"][data-dsh-glass-float] [data-conversation-scroll] [class*="bubble"] {
  border-radius: 14px;
  border: 1px solid var(--dsh-glass-rim-soft);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) calc(46% * var(--dsh-glass-frost, 1)), transparent);
  backdrop-filter: blur(var(--dsh-glass-blur, 14px));
}
/* new-session seat and the attachment "+" raise above the glass */
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-surface],
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-add] {
  background: var(--dsh-glass-card-raised);
  border: 1px solid var(--dsh-glass-rim);
  box-shadow: var(--dsh-glass-edge);
  backdrop-filter: blur(var(--dsh-glass-blur, 14px));
}
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-surface]:hover,
[data-dsh-glass="on"][data-dsh-glass-float] [data-dsh-glass-add]:hover { background: var(--dsh-glass-card-hover); }
/* content scrolls *under* the floating header: negative margin pulls the
   transcript up, padding re-seats the first message below the card */
[data-dsh-glass="on"][data-dsh-glass-float] [data-phase="active"] [data-conversation-scroll] {
  margin-top: -95px;
  padding-top: 107px;
}
[data-dsh-glass="on"][data-dsh-glass-float] [class*="banner"] { position: static; }
/* menus and modal dialogs get the glass fill; small dialogs/tooltips stay
   native (the modal carries no fixed-position descendants) */
[data-dsh-glass="on"][data-dsh-glass-float] [role="menu"],
[data-dsh-glass="on"][data-dsh-glass-float] [role="dialog"][aria-modal="true"] {
  background: var(--dsh-glass-card-raised);
  border: 1px solid var(--dsh-glass-rim);
  box-shadow: var(--dsh-glass-edge), var(--dsh-glass-drop);
  border-radius: 14px;
  backdrop-filter: blur(var(--dsh-glass-blur, 14px));
}
/* ===== Compat mode: layout untouched, only the material blurs ===== */
[data-dsh-glass="on"][data-dsh-glass-compat] [role="menu"],
[data-dsh-glass="on"][data-dsh-glass-compat] [role="tooltip"],
[data-dsh-glass="on"][data-dsh-glass-compat] [class*="card"],
[data-dsh-glass="on"][data-dsh-glass-compat] [class*="panel"],
[data-dsh-glass="on"][data-dsh-glass-compat] [class*="popover"],
[data-dsh-glass="on"][data-dsh-glass-compat] [class*="dropdown"] {
  backdrop-filter: blur(12px);
}
[data-dsh-glass="on"][data-dsh-glass-compat] [data-conversation-scroll] [class*="bubble"] { backdrop-filter: blur(12px); }
[data-dsh-glass="on"][data-dsh-glass-compat] [role="dialog"][aria-modal="true"] {
  background: var(--dsh-glass-card-raised);
  border: 1px solid var(--dsh-glass-rim);
  backdrop-filter: blur(var(--dsh-glass-blur, 12px));
}
/* ===== edge fades: content melts at the viewport top/bottom ===== */
[data-dsh-glass="on"] [data-dsh-glass-fade] {
  position: fixed;
  left: 0;
  right: 0;
  height: 13px;
  z-index: 7;
  pointer-events: none;
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.18);
}
[data-dsh-glass="on"] body[data-ds-dark-theme] [data-dsh-glass-fade] { background: rgba(0, 0, 0, 0.14); }
[data-dsh-glass="on"] [data-dsh-glass-fade="top"] {
  top: 0;
  -webkit-mask-image: linear-gradient(180deg, black 0%, transparent 100%);
  mask-image: linear-gradient(180deg, black 0%, transparent 100%);
}
[data-dsh-glass="on"] [data-dsh-glass-fade="bottom"] {
  bottom: 0;
  -webkit-mask-image: linear-gradient(0deg, black 0%, transparent 100%);
  mask-image: linear-gradient(0deg, black 0%, transparent 100%);
}
`;
		//#endregion

		//#region dsh-catppuccin: settings row store
		/**
		 * Skin row slot store: a mirror of the theme service snapshot. The
		 * plugin's apply-world change listener is the only writer; the row
		 * component reads via props.useStore.
		 */
		function createSkinStore() {
			return (0, _runtime_client.defineStore)({
				init: () => ({
					skin: DEFAULT_SKIN,
					revision: -1
				}),
				actions: {
					sync: (d, skin, revision) => {
						if (revision <= d.revision) return;
						d.skin = skin;
						d.revision = revision;
					}
				}
			});
		}
		//#endregion

		//#region dsh-catppuccin: settings row
		/** Inline style sheet for the row (kept dependency-free). */
		const styles = {
			group: {
				borderBottom: "1px solid var(--dsw-alias-border-l2)",
				display: "flex",
				flexDirection: "column",
				gap: "10px",
				padding: "16px 0"
			},
			title: {
				color: "var(--dsw-alias-label-primary)",
				fontSize: "14px",
				fontWeight: 400,
				lineHeight: "22px"
			},
			grid: {
				display: "flex",
				flexWrap: "wrap",
				gap: "10px"
			},
			card: {
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "6px",
				width: "96px",
				padding: "3px",
				borderRadius: "10px",
				// longhand on purpose: the shorthand leaves borderColor to
				// fall back to currentColor once React clears the selected
				// override, painting stale black/white boxes on deselect
				borderWidth: "2px",
				borderStyle: "solid",
				borderColor: "transparent",
				background: "transparent",
				cursor: "pointer",
				font: "inherit",
				boxSizing: "border-box"
			},
			cardSelected: {
				borderColor: "var(--dsw-alias-brand-primary)",
				background: "var(--dsw-alias-interactive-bg-hover)"
			},
			cardLabel: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				lineHeight: "16px",
				whiteSpace: "nowrap"
			},
			cardLabelSelected: {
				color: "var(--dsw-alias-label-primary)"
			},
			swatch: {
				width: "100%",
				height: "52px",
				borderRadius: "8px",
				boxSizing: "border-box",
				padding: "8px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				gap: "6px"
			},
			swatchLine: {
				height: "7px",
				borderRadius: "4px"
			},
			defaultSwatch: {
				width: "100%",
				height: "52px",
				borderRadius: "8px",
				boxSizing: "border-box",
				display: "flex",
				overflow: "hidden",
				border: "1px solid var(--dsw-alias-border-l2)"
			},
			updateRow: {
				display: "flex",
				alignItems: "center",
				flexWrap: "wrap",
				gap: "8px",
				marginTop: "4px"
			},
			updateButton: {
				background: "var(--dsw-alias-button-floating-fill)",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "8px",
				color: "var(--dsw-alias-label-primary)",
				cursor: "pointer",
				font: "inherit",
				fontSize: "12px",
				lineHeight: "18px",
				padding: "3px 10px"
			},
			updateDetail: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			updateCommand: {
				background: "var(--dsw-alias-markdown-code-block)",
				borderRadius: "6px",
				color: "var(--dsw-alias-label-primary)",
				fontFamily: "var(--ds-font-family-code)",
				fontSize: "11px",
				padding: "2px 8px",
				wordBreak: "break-all"
			},
			glassBlock: {
				display: "flex",
				flexDirection: "column",
				gap: "8px",
				marginTop: "4px",
				paddingTop: "12px",
				borderTop: "1px solid var(--dsw-alias-border-l2)"
			},
			glassDesc: {
				color: "var(--dsw-alias-label-tertiary)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			glassRow: {
				display: "flex",
				alignItems: "center",
				gap: "10px"
			},
			glassRowLabel: {
				color: "var(--dsw-alias-label-secondary)",
				flex: "none",
				fontSize: "12px",
				lineHeight: "18px",
				width: "92px"
			},
			glassHint: {
				color: "var(--dsw-alias-label-tertiary)",
				fontSize: "12px",
				lineHeight: "18px",
				marginLeft: "102px",
				marginTop: "-4px"
			},
			glassTrack: {
				position: "relative",
				display: "inline-flex",
				flex: "none",
				width: "44px",
				height: "24px",
				padding: 0,
				border: "1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent)",
				borderRadius: "12px",
				background: "color-mix(in srgb, var(--dsw-alias-bg-layer-2) 55%, transparent)",
				boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 1px 2px rgba(0, 0, 0, 0.25)",
				cursor: "pointer",
				transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease"
			},
			glassTrackOn: {
				borderColor: "transparent",
				background: "color-mix(in srgb, var(--dsw-alias-state-business-primary) 78%, transparent)",
				boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.28), 0 0 10px color-mix(in srgb, var(--dsw-alias-state-business-primary) 38%, transparent)"
			},
			glassThumb: {
				position: "absolute",
				top: "3px",
				left: "3px",
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				width: "16px",
				height: "16px",
				borderRadius: "50%",
				background: "linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.82))",
				boxShadow: "0 1px 2px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
				color: "var(--dsw-alias-state-business-primary)",
				fontSize: "10px",
				lineHeight: 1,
				transition: "transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)"
			},
			glassThumbOn: {
				transform: "translateX(22px)"
			},
			segGroup: {
				display: "inline-flex",
				overflow: "hidden",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "8px"
			},
			seg: {
				background: "transparent",
				border: "none",
				color: "var(--dsw-alias-label-secondary)",
				cursor: "pointer",
				font: "inherit",
				fontSize: "12px",
				lineHeight: "18px",
				padding: "2px 12px"
			},
			segActive: {
				background: "var(--dsw-alias-interactive-bg-active)",
				color: "var(--dsw-alias-label-primary)"
			},
			glassSlider: {
				flex: "0 1 150px",
				minWidth: "90px",
				margin: 0
			},
			glassNumber: {
				background: "transparent",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "6px",
				color: "var(--dsw-alias-label-primary)",
				font: "inherit",
				fontSize: "12px",
				lineHeight: "18px",
				padding: "1px 6px",
				textAlign: "right",
				width: "52px"
			},
			glassUnit: {
				color: "var(--dsw-alias-label-tertiary)",
				fontSize: "12px",
				marginLeft: "4px"
			}
		};

		/** Mini palette preview driven by one skin's token table. */
		function Swatch({ tokens }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: {
					...styles.swatch,
					background: tokens["--dsw-alias-bg-layer-1"],
					border: `1px solid ${tokens["--dsw-alias-border-l2"]}`
				},
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "70%",
							background: tokens["--dsw-alias-label-primary"],
							opacity: 0.85
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "45%",
							background: tokens["--dsw-alias-brand-primary"]
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "55%",
							background: tokens["--dsw-alias-label-secondary"],
							opacity: 0.55
						}
					})
				]
			});
		}

		/** "Default" chip: follow the built-in appearance (light + dark halves). */
		function DefaultSwatch() {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.defaultSwatch,
				children: [
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, background: "#f4f4f5" } }),
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, background: "#1c1c20" } })
				]
			});
		}

		/** One selectable skin card. */
		function SkinCard({ skin, selected, onSelect, t }) {
			return (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: (event) => {
					onSelect();
					// drop focus so a stale focus ring never outlives the selection
					event.currentTarget.blur();
				},
				"aria-pressed": selected,
				style: {
					...styles.card,
					...(selected ? styles.cardSelected : {})
				},
				children: [
					(0, react_jsx_runtime.jsx)(Swatch, { tokens: skin.tokens }),
					(0, react_jsx_runtime.jsx)("span", {
						style: {
							...styles.cardLabel,
							...(selected ? styles.cardLabelSelected : {})
						},
						children: t(`skin.${skin.id}`)
					})
				]
			});
		}

		/**
		 * Update-check row: silently checks once when the settings row
		 * mounts (host /catppuccin/check-update route, npm registry,
		 * 5-min cache), showing current/latest versions plus the channel
		 * and a copyable upgrade command when a newer release exists —
		 * and a git-pull hint when the package was installed from
		 * link/file/git. Plus a manual "check for updates" button. The
		 * mount check renders nothing until the result lands, so opening
		 * Settings never flickers.
		 */
		function UpdateRow({ t }) {
			const [state, setState] = react.useState({ idle: true });
			const check = (fromClick) => {
				if (fromClick) setState({ loading: true });
				fetch("/catppuccin/check-update")
					.then((response) => response.json())
					.then((payload) => setState(payload))
					.catch((error) => setState({ ok: false, code: "network", error: error instanceof Error ? error.message : String(error) }));
			};
			react.useEffect(() => {
				check(false);
			}, []);
			let detail = null;
			if (state.loading) detail = t("skin.updating");
			else if (state.ok === false) detail = `${t("skin.updateError")} (${state.code ?? ""}${state.error ? ` · ${state.error}` : ""})`;
			else if (state.outdated === false) detail = `${t("skin.updateUpToDate")} · ${t("skin.updateCurrent")} ${state.current}`;
			else if (state.latest) detail = `${t("skin.updateCurrent")} ${state.current} → ${t("skin.updateLatest")} ${state.latest} · ${t(state.channel === "beta" ? "skin.updateBeta" : "skin.updateLatestTag")}`;
			const registry = state.installSource === undefined || state.installSource === "registry";
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.updateRow,
				children: [
					(0, react_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => check(true),
						style: styles.updateButton,
						children: t("skin.checkUpdate")
					}),
					detail !== null ? (0, react_jsx_runtime.jsx)("span", {
						style: styles.updateDetail,
						children: detail
					}) : null,
					state.ok === true && state.outdated === true && state.latest ? (registry ? (0, react_jsx_runtime.jsx)("code", {
						style: styles.updateCommand,
						children: state.updateCommand
					}) : (0, react_jsx_runtime.jsx)("span", {
						style: styles.updateDetail,
						children: t("skin.updateGit")
					})) : null
				]
			});
		}

		/**
		 * Pastel-glow toggle row: three ultra-faint gradient washes over the
		 * frame plus hover halos and bubble glow. Stored in localStorage,
		 * applied via html[data-dsh-glow] so the whole layer can be turned
		 * off without touching the shipped CSS.
		 */
		function GlowRow({ t }) {
			const [enabled, setEnabled] = react.useState(() => isGlowEnabled());
			const toggle = () => {
				const next = !enabled;
				setEnabled(next);
				writeStorage(GLOW_KEY, next ? "on" : "off");
				applyGlow(next);
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.updateRow,
				children: [
					(0, react_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: toggle,
						"aria-pressed": enabled,
						style: {
							...styles.updateButton,
							...(enabled ? { borderColor: "var(--dsw-alias-brand-primary)", color: "var(--dsw-alias-brand-primary)" } : {})
						},
						children: t("skin.glowTitle")
					}),
					(0, react_jsx_runtime.jsx)("span", {
						style: styles.updateDetail,
						children: t("skin.glowHint")
					})
				]
			});
		}

		/**
		 * Glassmorphism row — same layout family as NoNameLeGo's: title +
		 * description, a track-style master switch, and — while enabled —
		 * segmented mode/preset pickers, three knobs with numeric inputs,
		 * hint lines and a reset-defaults button. Changes apply live; the
		 * module-level scheduleFlush debounces the host-state PUT.
		 */
		function GlassRow({ t }) {
			const [state, setState] = react.useState(() => readGlassState());
			const update = (next) => {
				const merged = { ...state, ...next };
				setState(merged);
				writeGlassState(merged);
				applyGlassState(merged);
				scheduleFlush();
			};
			const on = state.enabled;
			const dark = glassIsDark();
			const activePreset = GLASS_PRESETS.find((candidate) => candidate.blur === state.blur && candidate.frost === state.frost && candidate.brightness === state.brightness)?.id ?? "";
			const segmented = (options, activeValue, onSelect) => (0, react_jsx_runtime.jsx)("div", {
				role: "group",
				style: styles.segGroup,
				children: options.map((option) => (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": option.id === activeValue,
					onClick: () => onSelect(option.id),
					style: {
						...styles.seg,
						...(option.id === activeValue ? styles.segActive : {})
					},
					children: option.label
				}, option.id))
			});
			const knob = (label, min, max, step, value, unit, setter) => (0, react_jsx_runtime.jsxs)("div", {
				style: styles.glassRow,
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						style: styles.glassRowLabel,
						children: label
					}),
					(0, react_jsx_runtime.jsx)("input", {
						type: "range",
						min: String(min),
						max: String(max),
						step: String(step),
						value: String(value),
						onChange: (event) => setter(clampNumber(Number(event.target.value), min, max, value)),
						style: styles.glassSlider
					}),
					(0, react_jsx_runtime.jsx)("input", {
						type: "number",
						min: String(min),
						max: String(max),
						step: String(step),
						value: String(value),
						onChange: (event) => setter(clampNumber(Number(event.target.value), min, max, value)),
						style: styles.glassNumber
					}),
					(0, react_jsx_runtime.jsx)("span", {
						style: styles.glassUnit,
						children: unit
					})
				]
			});
			const bgMin = dark ? 0 : 50;
			const bgMax = dark ? 50 : 100;
			const bgDisplay = Math.min(bgMax, Math.max(bgMin, state.brightness));
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.glassBlock,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.title,
						children: t("skin.glassTitle")
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.glassDesc,
						children: t("skin.glassDesc")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.glassRow,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								style: styles.glassRowLabel,
								children: t("skin.glassEnable")
							}),
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "switch",
								"aria-checked": on,
								onClick: () => update({ enabled: !on }),
								style: {
									...styles.glassTrack,
									...(on ? styles.glassTrackOn : {})
								},
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										style: {
											...styles.glassThumb,
											...(on ? styles.glassThumbOn : {})
										},
										children: on ? "✓" : ""
									})
								]
							})
						]
					}),
					on ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								style: styles.glassRow,
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										style: styles.glassRowLabel,
										children: t("skin.glassMode")
									}),
									segmented([
										{ id: "mica", label: t("skin.glassModeMica") },
										{ id: "compat", label: t("skin.glassModeCompat") }
									], state.mode, (mode) => update({ mode }))
								]
							}),
							(0, react_jsx_runtime.jsx)("div", {
								style: styles.glassHint,
								children: t("skin.glassModeHint")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								style: styles.glassRow,
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										style: styles.glassRowLabel,
										children: t("skin.glassPreset")
									}),
									segmented(GLASS_PRESETS.map((candidate) => ({
										id: candidate.id,
										label: t(`skin.glassPreset${candidate.id.charAt(0).toUpperCase()}${candidate.id.slice(1)}`)
									})), activePreset, (id) => {
										const candidate = GLASS_PRESETS.find((item) => item.id === id);
										if (candidate !== undefined) update({ blur: candidate.blur, frost: candidate.frost, brightness: candidate.brightness });
									})
								]
							}),
							knob(t("skin.glassBlur"), 0, 40, 0.5, state.blur, "px", (blur) => update({ blur })),
							knob(t("skin.glassFrost"), 0, 100, 1, state.frost, "%", (frost) => update({ frost })),
							knob(t("skin.glassBrightness"), bgMin, bgMax, 1, bgDisplay, "%", (brightness) => update({ brightness })),
							(0, react_jsx_runtime.jsx)("div", {
								style: styles.glassHint,
								children: t(dark ? "skin.glassBrightnessDark" : "skin.glassBrightnessLight")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								style: styles.glassRow,
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										style: styles.glassRowLabel,
										children: null
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => update({ ...GLASS_DEFAULT }),
										style: {
											background: "transparent",
											border: "none",
											color: "var(--dsw-alias-state-business-primary)",
											cursor: "pointer",
											font: "inherit",
											fontSize: "12px",
											lineHeight: "18px",
											padding: 0
										},
										children: t("skin.glassReset")
									})
								]
							})
						]
					}) : null
				]
			});
		}

		/**
		 * Skin picker row registered into the Settings → General item slot,
		 * right after the built-in Appearance row: title + a "Default" chip and
		 * one swatch card per Catppuccin flavor.
		 */
		function SkinRow({ t, setSkin, useStore }) {
			const skin = useStore((s) => s.skin);
			const selected = SKINS.some((candidate) => candidate.id === skin) ? skin : null;
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.title,
						children: t("skin.title")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.grid,
						children: [
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: (event) => {
									setSkin(DEFAULT_SKIN);
									// drop focus so a stale focus ring never outlives the selection
									event.currentTarget.blur();
								},
								"aria-pressed": selected === null,
								style: {
									...styles.card,
									...(selected === null ? styles.cardSelected : {})
								},
								children: [
									(0, react_jsx_runtime.jsx)(DefaultSwatch, {}),
									(0, react_jsx_runtime.jsx)("span", {
										style: {
											...styles.cardLabel,
											...(selected === null ? styles.cardLabelSelected : {})
										},
										children: t("skin.default")
									})
								]
							}),
							SKINS.map((skinDefinition) => (0, react_jsx_runtime.jsx)(SkinCard, {
								skin: skinDefinition,
								selected: selected === skinDefinition.id,
								onSelect: () => setSkin(skinDefinition.id),
								t
							}, skinDefinition.id))
						]
					}),
					(0, react_jsx_runtime.jsx)(GlowRow, { t }),
					(0, react_jsx_runtime.jsx)(GlassRow, { t }),
					(0, react_jsx_runtime.jsx)(UpdateRow, { t })
				]
			});
		}
		//#endregion

		//#region dsh-catppuccin: client plugin body
		/**
		 * Required services: theme runtime (skins, switching), slots/locale
		 * (the settings row). Persistence is localStorage, so no settings
		 * transport is needed.
		 */
		const inject = [
			"slots",
			"locale",
			"theme"
		];

		/**
		 * Client plugin body: register the Catppuccin flavors into the theme
		 * runtime, restore the saved choice, keep the row's store in sync with
		 * theme/change, and register the picker into Settings → General.
		 * @param ctx - client cordis context.
		 */
		function apply(ctx) {
			const disposers = SKINS.map((skinDefinition) => ctx.theme.register(skinDefinition));
			ctx.effect(() => () => {
				for (const dispose of disposers) dispose();
			}, "dsh-catppuccin: theme registration");

			// User-message bubbles carry a brand tint so the two roles read
			// apart; assistant replies intentionally stay on the bare canvas.
			// Keyed on the stable CSS-module suffixes, colored from our own
			// injected theme variables so it adapts per flavor automatically.
			//
			// Every selector is boosted with :not(#dsh-catppuccin): the
			// shipped ui-* stylesheets are injected by React after ours, so a
			// plain attribute selector loses to the equally specific module
			// class and the tint silently dies. The :not(id) pseudo is a
			// no-op predicate that only raises specificity (1,1,0).
			//
			// The sheet is mounted only while one of our skins is active and
			// removed on the "Default" preference, so the built-in appearance
			// stays pixel-identical unless the user picked a Catppuccin skin.
			const boost = (selector) =>
				selector.split(",").map((part) => `${part.trim()}:not(#dsh-catppuccin)`).join(",");
			const SURFACE_RULES = [
				// Pastel glow layer (opt-in via the settings row toggle, keyed
				// on html[data-dsh-glow="on"]): three ultra-faint radial
				// gradients (mauve/sky/peach) wash over the frame, hover
				// states pick up a soft halo, user bubbles carry a faint
				// glow. All mix levels stay low so the flat pastel look is
				// preserved — this is atmosphere, not glass.
				[
					"[data-dsh-glow=\"on\"] [class$=\"_frame\"]",
					[
						"  background-image: radial-gradient(1500px 950px at 6% -14%, color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent), transparent 60%),",
						"    radial-gradient(1250px 850px at 106% 22%, color-mix(in srgb, var(--dsw-ctp-sky) 10%, transparent), transparent 60%),",
						"    radial-gradient(1150px 750px at 48% 122%, color-mix(in srgb, var(--dsw-ctp-peach) 8%, transparent), transparent 60%);"
					].join("\n")
				],
				[
					"[data-dsh-glow=\"on\"] [class$=\"uV2eYG_primary\"]:hover",
					"  box-shadow: 0 0 22px 4px color-mix(in srgb, var(--dsw-alias-brand-primary) 50%, transparent);"
				],
				[
					"[data-dsh-glow=\"on\"] [class$=\"uV2eYG_card\"]:hover",
					"  box-shadow: 0 0 18px 1px color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, transparent);"
				],
				[
					"[data-dsh-glow=\"on\"] [class$=\"_userStack\"] [class$=\"_bubble\"]",
					"  box-shadow: 0 0 14px 1px color-mix(in srgb, var(--dsw-alias-brand-primary) 20%, transparent);"
				],
				[
					"[data-dsh-glow=\"on\"] [class~=\"hHd-Xa_newSession\"]:hover",
					"  box-shadow: 0 0 12px 0 color-mix(in srgb, var(--dsw-alias-brand-primary) 25%, transparent);"
				],
				// user bubble tint matches the composer send button's idle
				// state: the shipped button is brand-colored but fades to
				// opacity .4 when the input is empty, so the bubble uses the
				// same 40% brand mix over the layer-2 surface
				[
					"[class$=\"_userStack\"] [class$=\"_bubble\"]",
					"  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 40%, var(--dsw-alias-bg-layer-2));"
				],
				// Latte (the only light flavor) tints at 30%: the pale
				// surface makes 40% look stronger than on dark flavors.
				// body[data-ds-dark-theme] is present on dark schemes only.
				[
					"body:not([data-ds-dark-theme]) [class$=\"_userStack\"] [class$=\"_bubble\"]",
					"  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, var(--dsw-alias-bg-layer-2));"
				],
				// composer command (plus) button: the InputBar add button, in
				// sky. Keyed on class suffix + aria-haspopup so model
				// selectors (which share the _trigger suffix) stay neutral.
				[
					"button[class$=\"_add\"][aria-haspopup=\"listbox\"]",
					"  color: var(--dsw-ctp-sky);"
				],
				// message reference chips: the shipped background is a
				// hardcoded deepseek blue; recolor from the brand
				[
					"[class$=\"_refChip\"]",
					"  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent);"
				],
				// reasoning body: warm peach tint to read apart from the
				// neutral answer text
				[
					"[class$=\"_thinkBody\"]",
					"  color: var(--dsw-ctp-sapphire);"
				],
				// tool call rows: the Think label in sapphire, executor
				// labels in peach
				[
					"[class$=\"_QWLzlG_title\"]",
					"  color: var(--dsw-ctp-sapphire);"
				],
				[
					"[class$=\"_o3BgMG_title\"]",
					"  color: var(--dsw-ctp-peach);"
				],
				// code block language tag (python/json/...): pink chip
				[
					"[class$=\"_infostring\"]",
					"  color: var(--dsw-ctp-pink);"
				],
				// message timestamp separators: soft lavender; the trailing
				// time+duration hint (hover-revealed at the end of an
				// assistant message) matches
				[
					"[class$=\"_timeStart\"], [class$=\"p-xYUq_timeEnd\"]",
					"  color: var(--dsw-ctp-lavender);"
				],
				// tool call summaries follow their label accent
				[
					"[class$=\"o3BgMG_summary\"]",
					"  color: var(--dsw-ctp-peach);"
				],
				[
					"[class$=\"QWLzlG_summary\"]",
					"  color: var(--dsw-ctp-sapphire);"
				],
				// context injection rows (shared _title class minus the tool
				// call labels) read as blue system notes
				[
					"[class$=\"_title_9cl6j_64\"]:not([class$=\"QWLzlG_title\"]):not([class$=\"o3BgMG_title\"])",
					"  color: var(--dsw-ctp-blue);"
				],
				// code block copy button warms to mauve on hover
				[
					"[class*=\"_copyButton\"]:hover",
					"  color: var(--dsw-alias-brand-primary);"
				],
				// message action rows (copy / feedback / branch / regenerate
				// icons next to timestamps and under messages): every button
				// warms to mauve on hover
				[
					"[class$=\"p-xYUq_actions\"] button:hover, [class$=\"Sxvs8a_actions\"] button:hover, [class$=\"_7yHdaG_actions\"] button:hover, [class$=\"osXY9a_actions\"] button:hover",
					"  color: var(--dsw-alias-brand-primary);"
				],
				// sidebar: mauve carries the selected-state meaning — the
				// active session's title stays mauve, others only warm on
				// hover (the row's own gray hover background stays)
				[
					"[class$=\"YDXeBa_selected\"] [class$=\"YDXeBa_title\"]",
					"  color: var(--dsw-alias-brand-primary);"
				],
				// hover follows the row, not the label: the shipped gray
				// background triggers on the row's :hover, so the mauve
				// text must trigger on the same ancestor to stay in sync
				[
					"[class$=\"YDXeBa_sessionRow\"]:hover [class$=\"YDXeBa_title\"], [class$=\"YDXeBa_projectRow\"]:hover [class$=\"YDXeBa_title\"]",
					"  color: var(--dsw-alias-brand-primary);"
				],
				[
					"[class$=\"YDXeBa_time\"]",
					"  color: var(--dsw-ctp-lavender);"
				],
				// whole new-session button warms on hover so label and the
				// leading plus icon follow together, scoped to the button
				// (matching the shipped gray hover's trigger area)
				[
					"[class~=\"hHd-Xa_newSession\"]:hover",
					"  color: var(--dsw-alias-brand-primary);"
				],
				// top-right session-log panel: header, title and close
				// button all warm to mauve on hover
				[
					"[class$=\"ydkMvW_header\"]:hover, [class$=\"ydkMvW_header\"]:hover [class$=\"ydkMvW_title\"], [class$=\"ydkMvW_close\"]:hover",
					"  color: var(--dsw-alias-brand-primary);"
				],
				// sidebar icon buttons (collapse, search, row actions): icons
				// warm to mauve on hover, echoing the text hovers above.
				// Word-matched because these carry modifier classes
				// (…_toggle / …_wide); the settings trigger hovers too.
				[
					"[class~=\"hHd-Xa_iconButton\"]:hover, [class~=\"qDHVXG_iconButton\"]:hover, [class~=\"qDHVXG_searchButton\"]:hover, [class~=\"YDXeBa_iconButton\"]:hover",
					"  color: var(--dsw-alias-brand-primary);"
				],
				[
					"[class~=\"VOzbGW_trigger\"]:hover",
					"  color: var(--dsw-alias-brand-primary);"
				],
				// top bar: current breadcrumb reads in brand mauve
				[
					"[class$=\"wSkVaW_crumbCurrent\"]",
					"  color: var(--dsw-alias-brand-primary);"
				],
				// homepage: headline in a single brand mauve (the gradient
				// was too loud), workspace label in mauve, the preview
				// badge in pink — lavender is reserved for time accents
				[
					"[class$=\"pXSMma_headlineText\"]",
					"  color: var(--dsw-alias-brand-primary);"
				],
				[
					"[class$=\"pXSMma_workspaceLabel\"]",
					"  color: var(--dsw-alias-brand-primary);"
				],
				[
					"[class$=\"pXSMma_previewBadge\"]",
					"  color: var(--dsw-ctp-pink);"
				],
				// hero workspace row mode seat ("标准模式") in blue, the
				// cool neighbor of lavender
				[
					"[class$=\"cubgiG_seat\"]",
					"  color: var(--dsw-ctp-blue);"
				],
				// the rest of the palette gets one seat each: breadcrumb
				// trail in teal, new-session label in sapphire, details
				// empty-state hint in rosewater, settings label in flamingo,
				// sidebar row action icons in maroon
				[
					"[class$=\"wSkVaW_crumb\"]",
					"  color: var(--dsw-ctp-teal);"
				],
				// new-session label keeps the default font color; only the
				// hover warms to mauve (see the button-scoped rule above)
				[
					"[class$=\"ydkMvW_empty\"]",
					"  color: var(--dsw-ctp-rosewater);"
				],
				// sidebar row action icons (hover-revealed …/＋ buttons) keep
				// the default color; only the hover warms to mauve (see the
				// icon-button hover rule above)
				// composer selectors: model effort in sky (echoing the
				// command accents; lavender was overused), workspace and
				// model labels warm to mauve on hover (constant color stays
				// neutral — earlier "cyan" complaints were about the
				// trigger itself, not hover)
				[
					"[class$=\"_7KE1Ra_triggerEffort\"]",
					"  color: var(--dsw-ctp-sky);"
				],
				// same ancestor-scoped hover: the shipped trigger's gray
				// background is on the trigger container
				[
					"[class$=\"Sh0Q9G_trigger\"]:hover [class$=\"Sh0Q9G_triggerLabel\"], [class$=\"_7KE1Ra_trigger\"]:hover [class$=\"_7KE1Ra_triggerLabel\"]",
					"  color: var(--dsw-alias-brand-primary);"
				],
				// diff blocks: the shipped DiffBlock rows carry no classes,
				// so added/removed lines get no colors at all. Tag each row
				// by its leading +/- and tint green/red from the state
				// tokens. :where() keeps the tag rules out of the boost.
				[
					"[data-diff] > div[data-diff-kind=\"add\"]",
					[
						"  background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 14%, transparent);",
						"  color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 72%, var(--dsw-alias-label-primary));"
					].join("\n")
				],
				[
					"[data-diff] > div[data-diff-kind=\"del\"]",
					[
						"  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 14%, transparent);",
						"  color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 72%, var(--dsw-alias-label-primary));"
					].join("\n")
				],
				// dropdown menus under the composer (model picker options,
				// command list rows): shipped hovers only gray the row
				// background — warm the text to mauve as well
				[
					"[class$=\"_7KE1Ra_option\"]:hover:not(:disabled), [class$=\"mufS8W_row\"]:hover",
					"  color: var(--dsw-alias-brand-primary);"
				],
				// workspace/model cards: border warms on hover, primary
				// button brightens
				[
					"[class$=\"uV2eYG_card\"]:hover",
					"  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent);"
				],
				[
					"[class$=\"uV2eYG_primary\"]:hover",
					"  filter: brightness(1.08);"
				],
				// the primary button doubles as the stop button while a run is
				// in flight (same element, aria-label flips to "停止"/"Stop"):
				// recolor to error red so stop reads at a glance
				[
					"[class$=\"uV2eYG_primary\"]:is([aria-label=\"停止\"],[aria-label=\"Stop\"])",
					[
						"  background: var(--dsw-alias-state-error-primary);",
						"  filter: none;"
					].join("\n")
				]
			].map(([selector, body]) => `${boost(selector)} {\n${body}\n}`).join("\n");
			const style = document.createElement("style");
			style.textContent = SURFACE_RULES;
			const syncSurfaceTint = () => {
				const active = SKINS.some((skinDefinition) => skinDefinition.id === ctx.theme.getTheme().preference);
				if (active && !style.isConnected) document.head.appendChild(style);
				if (!active && style.isConnected) style.remove();
			};
			syncSurfaceTint();
			ctx.on("theme/change", syncSurfaceTint);
			ctx.effect(() => () => {
				style.remove();
			}, "dsh-catppuccin: surface tint lifecycle");

			// The glass stylesheet is resident (html attribute-gated), and it
			// needs the same head-room as SURFACE_RULES: every selector
			// starts with [data-dsh-glass="on"], so boosting that one gate
			// with :not(#dsh-catppuccin-glass) adds an id level and out-ranks
			// the shipped ui-* sheets regardless of injection order.
			const glassStyle = document.createElement("style");
			glassStyle.textContent = GLASS_SHEET.replaceAll('[data-dsh-glass="on"]', '[data-dsh-glass="on"]:not(#dsh-catppuccin-glass)');
			document.head.appendChild(glassStyle);
			ctx.effect(() => () => {
				glassStyle.remove();
				stopSeams();
				removeFades();
			}, "dsh-catppuccin: glass lifecycle");

			// Tag DiffBlock rows (data-diff container) by leading +/- so the
			// tint rules above can color added vs removed lines.
			const diffObserver = new MutationObserver(() => {
				for (const row of document.querySelectorAll("[data-diff] > div")) {
					if (row.hasAttribute("data-diff-kind")) continue;
					const text = row.textContent ?? "";
					row.setAttribute("data-diff-kind", text.startsWith("+") ? "add" : text.startsWith("-") ? "del" : "none");
				}
			});
			diffObserver.observe(document.body, { childList: true, subtree: true });
			ctx.effect(() => () => {
				diffObserver.disconnect();
			}, "dsh-catppuccin: diff row tagging");


			// Restore the saved skin. The ThemeService adopts its durable
			// built-in preference from the Host settings scope asynchronously
			// after boot, and re-adopts it on every settings-document reload
			// — switching a model rewrites the settings doc and clobbers our
			// third-party preference back to the document's value ("system"
			// when never written, or a persisted light/dark). So instead of
			// a one-shot boot window, defend on every theme/change.
			//
			// The one seam that tells "the user clicked light/dark in the
			// Appearance row THIS session" apart from "adopt() copied the
			// settings document at boot/reload" is the setTheme wrapper:
			// adopt() writes the runtime preference directly and never goes
			// through setTheme. A built-in preference only wins while it
			// matches a live explicit pick; values adopted from the document
			// (livePick null) are stale for us — the Catppuccin row choice is
			// newer than the document's light/dark — so the flavor is
			// re-applied then. Picking a flavor clears the record.
			let liveBuiltinPick = null;
			const originalSetTheme = ctx.theme.setTheme;
			ctx.theme.setTheme = (id) => {
				liveBuiltinPick = id === "light" || id === "dark" || id === DEFAULT_SKIN ? id : null;
				originalSetTheme.call(ctx.theme, id);
			};
			const reassertSaved = () => {
				const current = ctx.theme.getTheme().preference;
				if ((current === "light" || current === "dark") && current === liveBuiltinPick) return;
				const latest = readSavedSkin();
				if (typeof latest === "string" && latest !== DEFAULT_SKIN && SKINS.some((skinDefinition) => skinDefinition.id === latest)) {
					ctx.theme.setTheme(latest);
				}
			};
			reassertSaved();

			// Apply the pastel-glow and glass layer states at boot (the
			// settings rows read the same storage).
			applyGlow(isGlowEnabled());
			applyGlassState(readGlassState());

			// Durable two-layer persistence: localStorage is the instant
			// layer, the module-level flushState/scheduleFlush push changes
			// to the host's state file (under $DSH_HOME), which survives
			// Desktop's per-launch port churn where localStorage always
			// starts empty. Hydrate once at boot per empty layer.
			const hydrateFromFile = async () => {
				try {
					const response = await fetch(STATE_ROUTE);
					if (!response.ok) return;
					const state = await response.json();
					const skin = state && typeof state.skin === "string" && SKINS.some((skinDefinition) => skinDefinition.id === state.skin) ? state.skin : null;
					if (readSavedSkin() === null && skin !== null) {
						writeSavedSkin(skin);
						if (ctx.theme.getTheme().preference === DEFAULT_SKIN) ctx.theme.setTheme(skin);
					}
					const glass = state && typeof state.glass === "object" && state.glass !== null ? sanitizeGlass(state.glass) : null;
					if (readStorage(GLASS_KEY) === null && glass !== null) {
						writeGlassState(glass);
						applyGlassState(glass);
					}
				} catch {
					// route absent (older host) — localStorage-only mode
				}
			};
			hydrateFromFile();

			const skinStore = createSkinStore();
			let skinBound;
			const syncSkin = (snapshot) => {
				skinBound?.sync(snapshot.preference, snapshot.revision);
			};
			ctx.on("theme/change", (snapshot) => {
				// re-apply the glass knobs on theme change: dark flips the
				// brightness knob's polarity, and the body marker lags a tick
				const glassState = readGlassState();
				if (glassState.enabled) applyGlassState(glassState, snapshot.active?.colorScheme === "dark");
				syncSkin(snapshot);
				const pref = snapshot.preference;
				// Record the built-in preference on every non-flavor
				// observation (boot, adopt() reloads, explicit Appearance
				// changes) BEFORE any re-assert, so turning the skin off
				// can hand the user back exactly what they had.
				rememberBuiltinPreference(pref);
				// If the preference moved to another plugin's third-party theme,
				// drop our stored choice so only the last-picked plugin restores
				// at boot (both plugins must implement this convention).
				if (pref !== DEFAULT_SKIN && pref !== "light" && pref !== "dark" && !SKINS.some((skinDefinition) => skinDefinition.id === pref)) {
					writeSavedSkin(DEFAULT_SKIN);
				}
				// Re-assert from a fresh task: a re-entrant setTheme inside the
				// dispatch is missed by other subscribers (ui-layout's
				// ThemePresenter), so the restored skin would never reach the DOM.
				scheduleFlush();
				setTimeout(() => {
					reassertSaved();
				}, 0);
			});

			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "dsh-catppuccin: settings row dictionaries");

			const skinInjected = (actions) => {
				skinBound = actions;
				syncSkin(ctx.theme.getTheme());
				return {
					setSkin: (id) => {
						// persist first: setTheme publishes a synchronous
						// theme/change, so the re-assert handler must
						// already see the new saved value (otherwise
						// toggling back to the default re-applies the old
						// flavor)
						writeSavedSkin(id);
						// turning the skin off restores the user's last
						// built-in preference instead of forcing "system"
						ctx.theme.setTheme(id === DEFAULT_SKIN ? readRestoredPreference() : id);
						scheduleFlush();
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "catppuccin",
				order: 19,
				store: skinStore,
				locale: SETTINGS_NS,
				inject: skinInjected
			}, SkinRow));

			ctx.effect(() => () => {
				if (stateTimer !== null) clearTimeout(stateTimer);
				// undo the setTheme wrapper so a stopped plugin leaves the
				// runtime as it found it
				ctx.theme.setTheme = originalSetTheme;
			}, "dsh-catppuccin: state flush timer");
		}
		//#endregion

		exports.SKINS = SKINS;
		exports.DEFAULT_SKIN = DEFAULT_SKIN;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
