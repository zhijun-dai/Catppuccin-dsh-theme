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
		/** localStorage key for the glass layer toggle (off default). */
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
			"skin.glassHint": "磨砂玻璃面板（关闭即还原实体面板）"
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
			"skin.glassHint": "Frosted translucent panes — off restores solid panels"
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

		/** Apply (or remove) the glass layer on the document root. */
		function applyGlass(enabled) {
			if (enabled) document.documentElement.dataset.dshGlass = "on";
			else delete document.documentElement.dataset.dshGlass;
		}

		/** Glass layer state, default off. */
		function isGlassEnabled() {
			return readStorage(GLASS_KEY) === "on";
		}
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
		 * 5-min cache), showing current/latest versions and the copyable
		 * upgrade command when a newer release exists — plus a manual
		 * "check for updates" button. The mount check renders nothing
		 * until the result lands, so opening Settings never flickers.
		 */
		function UpdateRow({ t }) {
			const [state, setState] = react.useState({ idle: true });
			const check = (fromClick) => {
				if (fromClick) setState({ loading: true });
				fetch("/catppuccin/check-update")
					.then((response) => (response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`))))
					.then((payload) => setState(payload))
					.catch((error) => setState({ error: error instanceof Error ? error.message : String(error) }));
			};
			react.useEffect(() => {
				check(false);
			}, []);
			let detail = null;
			if (state.loading) detail = t("skin.updating");
			else if (state.error) detail = `${t("skin.updateError")} (${state.error})`;
			else if (state.ok === false) detail = `${t("skin.updateError")} (${state.error ?? ""})`;
			else if (state.upToDate) detail = `${t("skin.updateUpToDate")} · ${t("skin.updateCurrent")} ${state.current}`;
			else if (state.latest) detail = `${t("skin.updateCurrent")} ${state.current} → ${t("skin.updateLatest")} ${state.latest}`;
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
					state.ok === true && state.upToDate === false && state.latest ? (0, react_jsx_runtime.jsx)("code", {
						style: styles.updateCommand,
						children: state.command
					}) : null
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
		 * Glassmorphism toggle row — same on/off shape as the glow toggle,
		 * but for the frosted translucent panes (off by default).
		 */
		function GlassRow({ t }) {
			const [enabled, setEnabled] = react.useState(() => isGlassEnabled());
			const toggle = () => {
				const next = !enabled;
				setEnabled(next);
				writeStorage(GLASS_KEY, next ? "on" : "off");
				applyGlass(next);
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
						children: t("skin.glassTitle")
					}),
					(0, react_jsx_runtime.jsx)("span", {
						style: styles.updateDetail,
						children: t("skin.glassHint")
					})
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
				// ---- glass layer (opt-in, parallels the glow layer) ----
				// Frosted translucent panes with the standard glass recipe:
				// theme-token translucent fill, hairline rim, white top-edge
				// highlight, soft drop shadow. off == the stock UI, exactly.
				[
					"[data-dsh-glass=\"on\"] body",
					[
						"  --dsh-glass-card: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 52%, transparent);",
						"  --dsh-glass-rim: color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent);",
						"  --dsh-glass-edge: inset 0 1px 0 rgba(255, 255, 255, 0.42);",
						"  --dsh-glass-drop: 0 10px 32px color-mix(in srgb, var(--dsw-alias-bg-mask-2) 38%, transparent);"
					].join("\n")
				],
				[
					"[data-dsh-glass=\"on\"] body[data-ds-dark-theme]",
					[
						"  --dsh-glass-rim: color-mix(in srgb, var(--dsw-alias-label-primary) 24%, transparent);",
						"  --dsh-glass-edge: inset 0 1px 0 rgba(255, 255, 255, 0.08);",
						"  --dsh-glass-drop: 0 10px 32px rgba(2, 6, 14, 0.45);"
					].join("\n")
				],
				[
					"[data-dsh-glass=\"on\"] [class$=\"_sidebarCol\"], [data-dsh-glass=\"on\"] [class$=\"wSkVaW_root\"], [data-dsh-glass=\"on\"] [class$=\"ydkMvW_root\"], [data-dsh-glass=\"on\"] [class$=\"uV2eYG_card\"]",
					[
						"  background: var(--dsh-glass-card);",
						"  border: 1px solid var(--dsh-glass-rim);",
						"  box-shadow: var(--dsh-glass-edge), var(--dsh-glass-drop);",
						"  backdrop-filter: blur(var(--dsh-glass-blur, 14px));"
					].join("\n")
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
			applyGlass(isGlassEnabled());

			// Durable two-layer persistence: localStorage is the instant
			// layer, the host's catppuccin-state.json (under $DSH_HOME)
			// survives Desktop's per-launch port churn where localStorage
			// always starts empty. Hydrate once at boot when localStorage
			// has no choice, then debounce-flush every change to the file.
			const STATE_ROUTE = "/catppuccin/state";
			let stateTimer = null;
			const flushState = () => {
				const saved = readSavedSkin();
				fetch(STATE_ROUTE, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ version: 1, skin: saved })
				}).catch(() => {
					// best-effort; localStorage still holds the choice
				});
			};
			const scheduleFlush = () => {
				if (stateTimer !== null) clearTimeout(stateTimer);
				stateTimer = setTimeout(() => {
					stateTimer = null;
					flushState();
				}, 300);
			};
			const hydrateFromFile = async () => {
				if (readSavedSkin() !== null) return;
				try {
					const response = await fetch(STATE_ROUTE);
					if (!response.ok) return;
					const state = await response.json();
					const skin = state && typeof state.skin === "string" && SKINS.some((skinDefinition) => skinDefinition.id === state.skin) ? state.skin : null;
					if (skin !== null) {
						writeSavedSkin(skin);
						if (ctx.theme.getTheme().preference === DEFAULT_SKIN) ctx.theme.setTheme(skin);
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
