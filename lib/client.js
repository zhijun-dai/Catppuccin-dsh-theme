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
		let _runtime_client = require("@deepseek-ai/dsh-client-runtime/client");

		//#region dsh-catppuccin: definitions
		/** The settings row's locale namespace. */
		const SETTINGS_NS = "settings.catppuccin";
		/** localStorage key holding the selected theme id. */
		const STORAGE_KEY = "dsh-catppuccin:skin";
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
		const SKINS = [
  {
    "id": "catppuccin-latte",
    "name": "Latte",
    "colorScheme": "light",
    "tokens": {
      "--dsw-static-neutral-bluish-50": "color-mix(in srgb, #eff1f5 50%, #e6e9ef)",
      "--dsw-static-neutral-50": "color-mix(in srgb, #eff1f5 50%, #e6e9ef)",
      "--dsw-static-neutral-bluish-60": "#e6e9ef",
      "--dsw-static-neutral-60": "#e6e9ef",
      "--dsw-static-neutral-bluish-75": "color-mix(in srgb, #e6e9ef 50%, #ccd0da)",
      "--dsw-static-neutral-75": "color-mix(in srgb, #e6e9ef 50%, #ccd0da)",
      "--dsw-static-neutral-bluish-100": "#ccd0da",
      "--dsw-static-neutral-100": "#ccd0da",
      "--dsw-static-neutral-bluish-150": "color-mix(in srgb, #ccd0da 50%, #bcc0cc)",
      "--dsw-static-neutral-150": "color-mix(in srgb, #ccd0da 50%, #bcc0cc)",
      "--dsw-static-neutral-bluish-200": "#bcc0cc",
      "--dsw-static-neutral-200": "#bcc0cc",
      "--dsw-static-neutral-bluish-250": "color-mix(in srgb, #bcc0cc 50%, #acb0be)",
      "--dsw-static-neutral-250": "color-mix(in srgb, #bcc0cc 50%, #acb0be)",
      "--dsw-static-neutral-bluish-300": "#acb0be",
      "--dsw-static-neutral-300": "#acb0be",
      "--dsw-static-neutral-bluish-400": "color-mix(in srgb, #acb0be 50%, #9ca0b0)",
      "--dsw-static-neutral-400": "color-mix(in srgb, #acb0be 50%, #9ca0b0)",
      "--dsw-static-neutral-bluish-500": "#8c8fa1",
      "--dsw-static-neutral-500": "#8c8fa1",
      "--dsw-static-neutral-bluish-550": "color-mix(in srgb, #8c8fa1 50%, #7c7f93)",
      "--dsw-static-neutral-550": "color-mix(in srgb, #8c8fa1 50%, #7c7f93)",
      "--dsw-static-neutral-bluish-600": "#7c7f93",
      "--dsw-static-neutral-600": "#7c7f93",
      "--dsw-static-neutral-bluish-700": "color-mix(in srgb, #7c7f93 50%, #6c6f85)",
      "--dsw-static-neutral-700": "color-mix(in srgb, #7c7f93 50%, #6c6f85)",
      "--dsw-static-neutral-bluish-750": "#6c6f85",
      "--dsw-static-neutral-750": "#6c6f85",
      "--dsw-static-neutral-bluish-800": "color-mix(in srgb, #6c6f85 50%, #5c5f77)",
      "--dsw-static-neutral-800": "color-mix(in srgb, #6c6f85 50%, #5c5f77)",
      "--dsw-static-neutral-bluish-850": "#5c5f77",
      "--dsw-static-neutral-850": "#5c5f77",
      "--dsw-static-neutral-bluish-875": "color-mix(in srgb, #5c5f77 50%, #4c4f69)",
      "--dsw-static-neutral-875": "color-mix(in srgb, #5c5f77 50%, #4c4f69)",
      "--dsw-static-neutral-bluish-900": "#4c4f69",
      "--dsw-static-neutral-900": "#4c4f69",
      "--dsw-static-neutral-bluish-950": "#4c4f69",
      "--dsw-static-neutral-950": "#4c4f69",
      "--dsw-static-neutral-bluish-1000": "#4c4f69",
      "--dsw-static-neutral-1000": "#4c4f69",
      "--dsw-static-neutral-bluish-00": "#eff1f5",
      "--dsw-static-neutral-00": "#eff1f5",
      "--dsw-static-deepseek-50": "color-mix(in srgb, #8839ef 60%, #eff1f5)",
      "--dsw-static-deepseek-100": "color-mix(in srgb, #8839ef 40%, #eff1f5)",
      "--dsw-static-deepseek-200": "#7287fd",
      "--dsw-static-deepseek-300": "color-mix(in srgb, #8839ef 75%, #eff1f5)",
      "--dsw-static-deepseek-400": "#8839ef",
      "--dsw-static-deepseek-450": "#8839ef",
      "--dsw-static-deepseek-500": "#8839ef",
      "--dsw-static-deepseek-600": "color-mix(in srgb, #8839ef 65%, #4c4f69)",
      "--dsw-static-deepseek-800": "color-mix(in srgb, #8839ef 30%, #4c4f69)",
      "--dsw-static-deepseek-900": "color-mix(in srgb, #8839ef 18%, #4c4f69)",
      "--dsw-static-deepseek-700-delete": "color-mix(in srgb, #8839ef 45%, #4c4f69)",
      "--dsw-static-blue-50": "color-mix(in srgb, #1e66f5 60%, #eff1f5)",
      "--dsw-static-blue-75": "color-mix(in srgb, #1e66f5 38%, #eff1f5)",
      "--dsw-static-blue-100": "color-mix(in srgb, #1e66f5 28%, #eff1f5)",
      "--dsw-static-blue-300": "color-mix(in srgb, #1e66f5 78%, #eff1f5)",
      "--dsw-static-blue-400": "color-mix(in srgb, #1e66f5 88%, #eff1f5)",
      "--dsw-static-blue-450": "#8839ef",
      "--dsw-static-blue-500": "#8839ef",
      "--dsw-static-blue-600": "color-mix(in srgb, #1e66f5 70%, #4c4f69)",
      "--dsw-static-blue-800": "color-mix(in srgb, #1e66f5 50%, #4c4f69)",
      "--dsw-static-blue-900": "color-mix(in srgb, #1e66f5 35%, #4c4f69)",
      "--dsw-static-blue-950": "color-mix(in srgb, #1e66f5 25%, #4c4f69)",
      "--dsw-static-blue-50p": "color-mix(in srgb, #1e66f5 48%, #eff1f5)",
      "--dsw-static-green-100": "color-mix(in srgb, #40a02b 35%, #eff1f5)",
      "--dsw-static-green-400": "color-mix(in srgb, #40a02b 80%, #eff1f5)",
      "--dsw-static-green-500": "#40a02b",
      "--dsw-static-green-900": "color-mix(in srgb, #40a02b 35%, #4c4f69)",
      "--dsw-static-red-50": "color-mix(in srgb, #d20f39 45%, #eff1f5)",
      "--dsw-static-red-100": "color-mix(in srgb, #d20f39 28%, #eff1f5)",
      "--dsw-static-red-400": "color-mix(in srgb, #d20f39 78%, #eff1f5)",
      "--dsw-static-red-500": "#d20f39",
      "--dsw-static-red-600": "color-mix(in srgb, #d20f39 68%, #4c4f69)",
      "--dsw-static-red-900": "color-mix(in srgb, #d20f39 35%, #4c4f69)",
      "--dsw-static-amber-100": "color-mix(in srgb, #df8e1d 35%, #eff1f5)",
      "--dsw-static-amber-400": "color-mix(in srgb, #df8e1d 88%, #eff1f5)",
      "--dsw-static-amber-500": "#fe640b",
      "--dsw-static-amber-600": "#fe640b",
      "--dsw-static-amber-900": "color-mix(in srgb, #fe640b 40%, #4c4f69)",
      "--dsw-ctp-sky": "#04a5e5",
      "--dsw-ctp-peach": "#fe640b",
      "--dsw-ctp-lavender": "#7287fd",
      "--dsw-ctp-blue": "#1e66f5",
      "--dsw-ctp-pink": "#ea76cb",
      "--dsw-ctp-teal": "#179299",
      "--dsw-ctp-sapphire": "#209fb5",
      "--dsw-ctp-rosewater": "#dc8a78",
      "--dsw-ctp-flamingo": "#dd7878",
      "--dsw-ctp-maroon": "#e64553",
      "--dsw-alias-bg-base": "#eff1f5",
      "--dsw-alias-bg-layer-1": "#eff1f5",
      "--dsw-alias-bg-layer-2": "#e6e9ef",
      "--dsw-alias-bg-layer-3": "#ccd0da",
      "--dsw-alias-bg-overlay": "#eff1f5",
      "--dsw-alias-bg-mask-1": "rgba(220, 224, 232, 0.24)",
      "--dsw-alias-bg-mask-2": "rgba(220, 224, 232, 0.12)",
      "--dsw-alias-bg-mask-3": "rgba(220, 224, 232, 0.48)",
      "--dsw-alias-bg-module-platform": "#e6e9ef",
      "--dsw-alias-bg-multi-select": "#e6e9ef",
      "--dsw-alias-bg-skeleton": "rgba(204, 208, 218, 0.04)",
      "--dsw-alias-border-l1": "rgba(156, 160, 176, 0.3)",
      "--dsw-alias-border-l2": "rgba(140, 143, 161, 0.5)",
      "--dsw-alias-border-l3": "rgba(140, 143, 161, 0.6)",
      "--dsw-alias-border-l4": "rgba(140, 143, 161, 0.75)",
      "--dsw-alias-label-primary": "#4c4f69",
      "--dsw-alias-label-secondary": "#6c6f85",
      "--dsw-alias-label-tertiary": "#5c5f77",
      "--dsw-alias-label-caption": "#5c5f77",
      "--dsw-alias-label-dimmed": "#5c5f77",
      "--dsw-alias-brand-primary": "#8839ef",
      "--dsw-alias-brand-text": "#eff1f5",
      "--dsw-alias-button-primary-hover": "#7287fd",
      "--dsw-alias-button-primary-dimmed": "#e6e9ef",
      "--dsw-alias-button-elevated-fill": "#eff1f5",
      "--dsw-alias-button-floating-fill": "#eff1f5",
      "--dsw-alias-button-floating-hover": "#e6e9ef",
      "--dsw-alias-button-ghost-active-border": "#bcc0cc",
      "--dsw-alias-button-ghost-active-fill": "#e6e9ef",
      "--dsw-alias-button-ghost-active-hover": "#ccd0da",
      "--dsw-alias-state-business-primary": "#8839ef",
      "--dsw-alias-state-business-tertiary": "#e6e9ef",
      "--dsw-alias-state-error-primary": "#d20f39",
      "--dsw-alias-state-error-secondary": "#d20f39",
      "--dsw-alias-state-success-primary": "#40a02b",
      "--dsw-alias-state-success-secondary": "#40a02b",
      "--dsw-alias-state-success-tertiary": "#e6e9ef",
      "--dsw-alias-state-warn-label": "#fe640b",
      "--dsw-alias-state-warn-primary": "#fe640b",
      "--dsw-alias-state-warn-secondary": "#fe640b",
      "--dsw-alias-state-warn-tertiary": "#e6e9ef",
      "--dsw-alias-interactive-bg-hover": "rgba(204, 208, 218, 0.3)",
      "--dsw-alias-interactive-bg-active": "rgba(188, 192, 204, 0.4)",
      "--dsw-alias-interactive-bg-hover-accent": "rgba(136, 57, 239, 0.1)",
      "--dsw-alias-interactive-bg-hover-danger": "rgba(210, 15, 57, 0.05)",
      "--dsw-alias-interactive-bg-hover-solid": "#e6e9ef",
      "--dsw-alias-markdown-code-block": "#e6e9ef",
      "--dsw-alias-markdown-code-block-banner": "#e6e9ef",
      "--dsw-alias-markdown-code-segment-selected": "#eff1f5",
      "--dsw-alias-markdown-code-segment-unselected": "#e6e9ef",
      "--dsw-alias-markdown-citation": "#e6e9ef",
      "--dsw-alias-markdown-inline-code": "#eff1f5",
      "--dsw-alias-markdown-placeholder": "#e6e9ef",
      "--dsw-alias-markdown-tag": "#e6e9ef",
      "--dsw-alias-toast-bg": "#ccd0da",
      "--dsw-alias-tooltip-bg": "#bcc0cc",
      "--dsw-specific-sidebar-fill": "#e6e9ef",
      "--dsw-specific-sidebar-nav-item-active": "#bcc0cc",
      "--dsw-specific-sidebar-nav-item-active-accent": "rgba(136, 57, 239, 0.2)",
      "--dsw-specific-sidebar-nav-item-hover": "#ccd0da",
      "--dsw-specific-bubble": "#e6e9ef",
      "--dsw-specific-bubble-highlight": "#ccd0da",
      "--dsw-specific-input-major": "#eff1f5",
      "--dsw-specific-login-input": "#e6e9ef",
      "--dsw-specific-menu": "#e6e9ef",
      "--dsw-specific-selector": "#ccd0da",
      "--dsw-specific-tip": "#e6e9ef",
      "--dsw-alias-separator-primary": "rgba(136, 57, 239, 0.7)",
      "--dsw-alias-scrollbar-bg-l1": "#ccd0da",
      "--dsw-alias-scrollbar-bg-l2": "#bcc0cc",
      "--dsw-alias-scrollbar-hover-l1": "#acb0be",
      "--dsw-alias-scrollbar-hover-l2": "#acb0be",
      "--dsw-alias-bg-mask-photo": "rgba(0, 0, 0, 0.88)",
      "--dsw-alias-bg-mask-drop": "rgba(255, 255, 255, 0.7)",
      "--dsw-alias-border-inverted": "rgba(0, 0, 0, 0)",
      "--dsw-alias-border-inverted2": "rgba(0, 0, 0, 0)",
      "--dsw-alias-border-l2-darkmode-thin": "rgba(140, 143, 161, 0.35)",
      "--dsw-alias-brand-primary-invert": "#4c4f69",
      "--dsw-alias-brand-primary-new-colorprimary-new-color": "#8839ef",
      "--dsw-alias-button-contrast-fill": "#4c4f69",
      "--dsw-alias-button-info-fill": "#8839ef",
      "--dsw-alias-button-info-hover": "#c6a7f3",
      "--dsw-alias-button-primary-fill": "#8839ef",
      "--dsw-alias-button-tool-bar-fill": "rgba(140, 143, 161, 0.5)",
      "--dsw-alias-button-tool-bar-fill-invisible": "rgba(140, 143, 161, 0.36)",
      "--dsw-alias-button-tool-bar-hover": "rgba(124, 127, 147, 0.6)",
      "--dsw-alias-label-primary-bluish": "#4c4f69",
      "--dsw-alias-label-primary-dimmed": "#6c6f85",
      "--dsw-alias-label-primary-foreground": "#eff1f5",
      "--dsw-alias-label-primary-inverted": "#eff1f5",
      "--shiki-foreground": "#4c4f69",
      "--shiki-background": "#e6e9ef",
      "--shiki-token-constant": "#fe640b",
      "--shiki-token-string": "#40a02b",
      "--shiki-token-comment": "#8c8fa1",
      "--shiki-token-keyword": "#8839ef",
      "--shiki-token-parameter": "#e64553",
      "--shiki-token-function": "#1e66f5",
      "--shiki-token-string-expression": "#40a02b",
      "--shiki-token-punctuation": "#5c5f77",
      "--shiki-token-link": "#1e66f5",
      "--shiki-token-inserted": "#40a02b",
      "--shiki-token-deleted": "#d20f39",
      "--shiki-token-changed": "#fe640b"
    }
  },
  {
    "id": "catppuccin-frappe",
    "name": "Frappé",
    "colorScheme": "dark",
    "tokens": {
      "--dsw-static-neutral-bluish-50": "color-mix(in srgb, #c6d0f5 50%, #b5bfe2)",
      "--dsw-static-neutral-50": "color-mix(in srgb, #c6d0f5 50%, #b5bfe2)",
      "--dsw-static-neutral-bluish-60": "#b5bfe2",
      "--dsw-static-neutral-60": "#b5bfe2",
      "--dsw-static-neutral-bluish-75": "color-mix(in srgb, #b5bfe2 50%, #a5adce)",
      "--dsw-static-neutral-75": "color-mix(in srgb, #b5bfe2 50%, #a5adce)",
      "--dsw-static-neutral-bluish-100": "#a5adce",
      "--dsw-static-neutral-100": "#a5adce",
      "--dsw-static-neutral-bluish-150": "color-mix(in srgb, #a5adce 50%, #949cbb)",
      "--dsw-static-neutral-150": "color-mix(in srgb, #a5adce 50%, #949cbb)",
      "--dsw-static-neutral-bluish-200": "#949cbb",
      "--dsw-static-neutral-200": "#949cbb",
      "--dsw-static-neutral-bluish-250": "color-mix(in srgb, #949cbb 50%, #838ba7)",
      "--dsw-static-neutral-250": "color-mix(in srgb, #949cbb 50%, #838ba7)",
      "--dsw-static-neutral-bluish-300": "#838ba7",
      "--dsw-static-neutral-300": "#838ba7",
      "--dsw-static-neutral-bluish-400": "color-mix(in srgb, #838ba7 50%, #737994)",
      "--dsw-static-neutral-400": "color-mix(in srgb, #838ba7 50%, #737994)",
      "--dsw-static-neutral-bluish-500": "#626880",
      "--dsw-static-neutral-500": "#626880",
      "--dsw-static-neutral-bluish-550": "color-mix(in srgb, #626880 50%, #51576d)",
      "--dsw-static-neutral-550": "color-mix(in srgb, #626880 50%, #51576d)",
      "--dsw-static-neutral-bluish-600": "#51576d",
      "--dsw-static-neutral-600": "#51576d",
      "--dsw-static-neutral-bluish-700": "#414559",
      "--dsw-static-neutral-700": "#414559",
      "--dsw-static-neutral-bluish-750": "color-mix(in srgb, #414559 50%, #303446)",
      "--dsw-static-neutral-750": "color-mix(in srgb, #414559 50%, #303446)",
      "--dsw-static-neutral-bluish-800": "color-mix(in srgb, #414559 25%, #303446)",
      "--dsw-static-neutral-800": "color-mix(in srgb, #414559 25%, #303446)",
      "--dsw-static-neutral-bluish-850": "#303446",
      "--dsw-static-neutral-850": "#303446",
      "--dsw-static-neutral-bluish-875": "color-mix(in srgb, #303446 50%, #292c3c)",
      "--dsw-static-neutral-875": "color-mix(in srgb, #303446 50%, #292c3c)",
      "--dsw-static-neutral-bluish-900": "#292c3c",
      "--dsw-static-neutral-900": "#292c3c",
      "--dsw-static-neutral-bluish-950": "color-mix(in srgb, #292c3c 50%, #232634)",
      "--dsw-static-neutral-950": "color-mix(in srgb, #292c3c 50%, #232634)",
      "--dsw-static-neutral-bluish-1000": "#232634",
      "--dsw-static-neutral-1000": "#232634",
      "--dsw-static-neutral-bluish-00": "#c6d0f5",
      "--dsw-static-neutral-00": "#c6d0f5",
      "--dsw-static-deepseek-50": "color-mix(in srgb, #ca9ee6 55%, #c6d0f5)",
      "--dsw-static-deepseek-100": "color-mix(in srgb, #ca9ee6 35%, #c6d0f5)",
      "--dsw-static-deepseek-200": "#babbf1",
      "--dsw-static-deepseek-300": "color-mix(in srgb, #ca9ee6 70%, #303446)",
      "--dsw-static-deepseek-400": "#ca9ee6",
      "--dsw-static-deepseek-450": "#ca9ee6",
      "--dsw-static-deepseek-500": "#ca9ee6",
      "--dsw-static-deepseek-600": "color-mix(in srgb, #ca9ee6 60%, #303446)",
      "--dsw-static-deepseek-800": "color-mix(in srgb, #ca9ee6 30%, #303446)",
      "--dsw-static-deepseek-900": "color-mix(in srgb, #ca9ee6 20%, #303446)",
      "--dsw-static-deepseek-700-delete": "color-mix(in srgb, #ca9ee6 45%, #303446)",
      "--dsw-static-blue-50": "color-mix(in srgb, #8caaee 55%, #c6d0f5)",
      "--dsw-static-blue-75": "color-mix(in srgb, #8caaee 35%, #c6d0f5)",
      "--dsw-static-blue-100": "color-mix(in srgb, #8caaee 25%, #c6d0f5)",
      "--dsw-static-blue-300": "color-mix(in srgb, #8caaee 75%, #303446)",
      "--dsw-static-blue-400": "color-mix(in srgb, #8caaee 85%, #303446)",
      "--dsw-static-blue-450": "#ca9ee6",
      "--dsw-static-blue-500": "#ca9ee6",
      "--dsw-static-blue-600": "color-mix(in srgb, #8caaee 70%, #303446)",
      "--dsw-static-blue-800": "color-mix(in srgb, #8caaee 50%, #303446)",
      "--dsw-static-blue-900": "color-mix(in srgb, #8caaee 35%, #303446)",
      "--dsw-static-blue-950": "color-mix(in srgb, #8caaee 25%, #303446)",
      "--dsw-static-blue-50p": "color-mix(in srgb, #8caaee 45%, #c6d0f5)",
      "--dsw-static-green-100": "color-mix(in srgb, #a6d189 30%, #c6d0f5)",
      "--dsw-static-green-400": "color-mix(in srgb, #a6d189 75%, #303446)",
      "--dsw-static-green-500": "#a6d189",
      "--dsw-static-green-900": "color-mix(in srgb, #a6d189 35%, #303446)",
      "--dsw-static-red-50": "color-mix(in srgb, #e78284 40%, #c6d0f5)",
      "--dsw-static-red-100": "color-mix(in srgb, #e78284 25%, #c6d0f5)",
      "--dsw-static-red-400": "color-mix(in srgb, #e78284 75%, #303446)",
      "--dsw-static-red-500": "#e78284",
      "--dsw-static-red-600": "color-mix(in srgb, #e78284 65%, #303446)",
      "--dsw-static-red-900": "color-mix(in srgb, #e78284 35%, #303446)",
      "--dsw-static-amber-100": "color-mix(in srgb, #e5c890 30%, #c6d0f5)",
      "--dsw-static-amber-400": "color-mix(in srgb, #e5c890 85%, #303446)",
      "--dsw-static-amber-500": "#ef9f76",
      "--dsw-static-amber-600": "#ef9f76",
      "--dsw-static-amber-900": "color-mix(in srgb, #ef9f76 40%, #303446)",
      "--dsw-ctp-sky": "#99d1db",
      "--dsw-ctp-peach": "#ef9f76",
      "--dsw-ctp-lavender": "#babbf1",
      "--dsw-ctp-blue": "#8caaee",
      "--dsw-ctp-pink": "#f4b8e4",
      "--dsw-ctp-teal": "#81c8be",
      "--dsw-ctp-sapphire": "#85c1dc",
      "--dsw-ctp-rosewater": "#f2d5cf",
      "--dsw-ctp-flamingo": "#eebebe",
      "--dsw-ctp-maroon": "#ea999c",
      "--dsw-alias-bg-base": "#303446",
      "--dsw-alias-bg-layer-1": "#292c3c",
      "--dsw-alias-bg-layer-2": "#414559",
      "--dsw-alias-bg-layer-3": "#51576d",
      "--dsw-alias-bg-overlay": "#414559",
      "--dsw-alias-bg-mask-1": "rgba(35, 38, 52, 0.5)",
      "--dsw-alias-bg-mask-2": "rgba(35, 38, 52, 0.2)",
      "--dsw-alias-bg-mask-3": "rgba(35, 38, 52, 0.48)",
      "--dsw-alias-bg-module-platform": "#414559",
      "--dsw-alias-bg-multi-select": "#414559",
      "--dsw-alias-bg-skeleton": "rgba(81, 87, 109, 0.08)",
      "--dsw-alias-border-l1": "rgba(115, 121, 148, 0.25)",
      "--dsw-alias-border-l2": "rgba(131, 139, 167, 0.45)",
      "--dsw-alias-border-l3": "rgba(131, 139, 167, 0.55)",
      "--dsw-alias-border-l4": "rgba(131, 139, 167, 0.7)",
      "--dsw-alias-label-primary": "#c6d0f5",
      "--dsw-alias-label-secondary": "#a5adce",
      "--dsw-alias-label-tertiary": "#b5bfe2",
      "--dsw-alias-label-caption": "#b5bfe2",
      "--dsw-alias-label-dimmed": "#b5bfe2",
      "--dsw-alias-brand-primary": "#ca9ee6",
      "--dsw-alias-brand-text": "#232634",
      "--dsw-alias-button-primary-hover": "#babbf1",
      "--dsw-alias-button-primary-dimmed": "#414559",
      "--dsw-alias-button-elevated-fill": "#414559",
      "--dsw-alias-button-floating-fill": "#51576d",
      "--dsw-alias-button-floating-hover": "#626880",
      "--dsw-alias-button-ghost-active-border": "#626880",
      "--dsw-alias-button-ghost-active-fill": "#414559",
      "--dsw-alias-button-ghost-active-hover": "#51576d",
      "--dsw-alias-state-business-primary": "#ca9ee6",
      "--dsw-alias-state-business-tertiary": "#414559",
      "--dsw-alias-state-error-primary": "#e78284",
      "--dsw-alias-state-error-secondary": "#e78284",
      "--dsw-alias-state-success-primary": "#a6d189",
      "--dsw-alias-state-success-secondary": "#a6d189",
      "--dsw-alias-state-success-tertiary": "#414559",
      "--dsw-alias-state-warn-label": "#e5c890",
      "--dsw-alias-state-warn-primary": "#e5c890",
      "--dsw-alias-state-warn-secondary": "#e5c890",
      "--dsw-alias-state-warn-tertiary": "#414559",
      "--dsw-alias-interactive-bg-hover": "rgba(65, 69, 89, 0.45)",
      "--dsw-alias-interactive-bg-active": "rgba(81, 87, 109, 0.55)",
      "--dsw-alias-interactive-bg-hover-accent": "rgba(202, 158, 230, 0.14)",
      "--dsw-alias-interactive-bg-hover-danger": "rgba(231, 130, 132, 0.15)",
      "--dsw-alias-interactive-bg-hover-solid": "#51576d",
      "--dsw-alias-markdown-code-block": "#292c3c",
      "--dsw-alias-markdown-code-block-banner": "#414559",
      "--dsw-alias-markdown-code-segment-selected": "#414559",
      "--dsw-alias-markdown-code-segment-unselected": "#292c3c",
      "--dsw-alias-markdown-citation": "#414559",
      "--dsw-alias-markdown-inline-code": "#414559",
      "--dsw-alias-markdown-placeholder": "#414559",
      "--dsw-alias-markdown-tag": "#414559",
      "--dsw-alias-toast-bg": "#292c3c",
      "--dsw-alias-tooltip-bg": "#414559",
      "--dsw-specific-sidebar-fill": "#292c3c",
      "--dsw-specific-sidebar-nav-item-active": "#51576d",
      "--dsw-specific-sidebar-nav-item-active-accent": "rgba(202, 158, 230, 0.25)",
      "--dsw-specific-sidebar-nav-item-hover": "#414559",
      "--dsw-specific-bubble": "#414559",
      "--dsw-specific-bubble-highlight": "#51576d",
      "--dsw-specific-input-major": "#292c3c",
      "--dsw-specific-login-input": "#292c3c",
      "--dsw-specific-menu": "#414559",
      "--dsw-specific-selector": "#51576d",
      "--dsw-specific-tip": "#414559",
      "--dsw-alias-separator-primary": "rgba(202, 158, 230, 0.8)",
      "--dsw-alias-scrollbar-bg-l1": "#414559",
      "--dsw-alias-scrollbar-bg-l2": "#51576d",
      "--dsw-alias-scrollbar-hover-l1": "#626880",
      "--dsw-alias-scrollbar-hover-l2": "#626880",
      "--dsw-alias-bg-mask-photo": "rgba(0, 0, 0, 0.88)",
      "--dsw-alias-bg-mask-drop": "rgba(39, 39, 48, 0.7)",
      "--dsw-alias-border-inverted": "rgba(255, 255, 255, 0.06)",
      "--dsw-alias-border-inverted2": "rgba(255, 255, 255, 0.08)",
      "--dsw-alias-border-l2-darkmode-thin": "rgba(131, 139, 167, 0.3)",
      "--dsw-alias-brand-primary-invert": "#c6d0f5",
      "--dsw-alias-brand-primary-new-colorprimary-new-color": "#ca9ee6",
      "--dsw-alias-button-contrast-fill": "#c6d0f5",
      "--dsw-alias-button-info-fill": "#ca9ee6",
      "--dsw-alias-button-info-hover": "#6e5e86",
      "--dsw-alias-button-primary-fill": "#ca9ee6",
      "--dsw-alias-button-tool-bar-fill": "rgba(115, 121, 148, 0.5)",
      "--dsw-alias-button-tool-bar-fill-invisible": "rgba(115, 121, 148, 0.36)",
      "--dsw-alias-button-tool-bar-hover": "rgba(131, 139, 167, 0.6)",
      "--dsw-alias-label-primary-bluish": "#c6d0f5",
      "--dsw-alias-label-primary-dimmed": "#a5adce",
      "--dsw-alias-label-primary-foreground": "#232634",
      "--dsw-alias-label-primary-inverted": "#414559",
      "--shiki-foreground": "#c6d0f5",
      "--shiki-background": "#292c3c",
      "--shiki-token-constant": "#ef9f76",
      "--shiki-token-string": "#a6d189",
      "--shiki-token-comment": "#949cbb",
      "--shiki-token-keyword": "#ca9ee6",
      "--shiki-token-parameter": "#ea999c",
      "--shiki-token-function": "#8caaee",
      "--shiki-token-string-expression": "#a6d189",
      "--shiki-token-punctuation": "#a5adce",
      "--shiki-token-link": "#8caaee",
      "--shiki-token-inserted": "#a6d189",
      "--shiki-token-deleted": "#e78284",
      "--shiki-token-changed": "#ef9f76"
    }
  },
  {
    "id": "catppuccin-macchiato",
    "name": "Macchiato",
    "colorScheme": "dark",
    "tokens": {
      "--dsw-static-neutral-bluish-50": "color-mix(in srgb, #cad3f5 50%, #b8c0e0)",
      "--dsw-static-neutral-50": "color-mix(in srgb, #cad3f5 50%, #b8c0e0)",
      "--dsw-static-neutral-bluish-60": "#b8c0e0",
      "--dsw-static-neutral-60": "#b8c0e0",
      "--dsw-static-neutral-bluish-75": "color-mix(in srgb, #b8c0e0 50%, #a5adcb)",
      "--dsw-static-neutral-75": "color-mix(in srgb, #b8c0e0 50%, #a5adcb)",
      "--dsw-static-neutral-bluish-100": "#a5adcb",
      "--dsw-static-neutral-100": "#a5adcb",
      "--dsw-static-neutral-bluish-150": "color-mix(in srgb, #a5adcb 50%, #939ab7)",
      "--dsw-static-neutral-150": "color-mix(in srgb, #a5adcb 50%, #939ab7)",
      "--dsw-static-neutral-bluish-200": "#939ab7",
      "--dsw-static-neutral-200": "#939ab7",
      "--dsw-static-neutral-bluish-250": "color-mix(in srgb, #939ab7 50%, #8087a2)",
      "--dsw-static-neutral-250": "color-mix(in srgb, #939ab7 50%, #8087a2)",
      "--dsw-static-neutral-bluish-300": "#8087a2",
      "--dsw-static-neutral-300": "#8087a2",
      "--dsw-static-neutral-bluish-400": "color-mix(in srgb, #8087a2 50%, #6e738d)",
      "--dsw-static-neutral-400": "color-mix(in srgb, #8087a2 50%, #6e738d)",
      "--dsw-static-neutral-bluish-500": "#5b6078",
      "--dsw-static-neutral-500": "#5b6078",
      "--dsw-static-neutral-bluish-550": "color-mix(in srgb, #5b6078 50%, #494d64)",
      "--dsw-static-neutral-550": "color-mix(in srgb, #5b6078 50%, #494d64)",
      "--dsw-static-neutral-bluish-600": "#494d64",
      "--dsw-static-neutral-600": "#494d64",
      "--dsw-static-neutral-bluish-700": "#363a4f",
      "--dsw-static-neutral-700": "#363a4f",
      "--dsw-static-neutral-bluish-750": "color-mix(in srgb, #363a4f 50%, #24273a)",
      "--dsw-static-neutral-750": "color-mix(in srgb, #363a4f 50%, #24273a)",
      "--dsw-static-neutral-bluish-800": "color-mix(in srgb, #363a4f 25%, #24273a)",
      "--dsw-static-neutral-800": "color-mix(in srgb, #363a4f 25%, #24273a)",
      "--dsw-static-neutral-bluish-850": "#24273a",
      "--dsw-static-neutral-850": "#24273a",
      "--dsw-static-neutral-bluish-875": "color-mix(in srgb, #24273a 50%, #1e2030)",
      "--dsw-static-neutral-875": "color-mix(in srgb, #24273a 50%, #1e2030)",
      "--dsw-static-neutral-bluish-900": "#1e2030",
      "--dsw-static-neutral-900": "#1e2030",
      "--dsw-static-neutral-bluish-950": "color-mix(in srgb, #1e2030 50%, #181926)",
      "--dsw-static-neutral-950": "color-mix(in srgb, #1e2030 50%, #181926)",
      "--dsw-static-neutral-bluish-1000": "#181926",
      "--dsw-static-neutral-1000": "#181926",
      "--dsw-static-neutral-bluish-00": "#cad3f5",
      "--dsw-static-neutral-00": "#cad3f5",
      "--dsw-static-deepseek-50": "color-mix(in srgb, #c6a0f6 55%, #cad3f5)",
      "--dsw-static-deepseek-100": "color-mix(in srgb, #c6a0f6 35%, #cad3f5)",
      "--dsw-static-deepseek-200": "#b7bdf8",
      "--dsw-static-deepseek-300": "color-mix(in srgb, #c6a0f6 70%, #24273a)",
      "--dsw-static-deepseek-400": "#c6a0f6",
      "--dsw-static-deepseek-450": "#c6a0f6",
      "--dsw-static-deepseek-500": "#c6a0f6",
      "--dsw-static-deepseek-600": "color-mix(in srgb, #c6a0f6 60%, #24273a)",
      "--dsw-static-deepseek-800": "color-mix(in srgb, #c6a0f6 30%, #24273a)",
      "--dsw-static-deepseek-900": "color-mix(in srgb, #c6a0f6 20%, #24273a)",
      "--dsw-static-deepseek-700-delete": "color-mix(in srgb, #c6a0f6 45%, #24273a)",
      "--dsw-static-blue-50": "color-mix(in srgb, #8aadf4 55%, #cad3f5)",
      "--dsw-static-blue-75": "color-mix(in srgb, #8aadf4 35%, #cad3f5)",
      "--dsw-static-blue-100": "color-mix(in srgb, #8aadf4 25%, #cad3f5)",
      "--dsw-static-blue-300": "color-mix(in srgb, #8aadf4 75%, #24273a)",
      "--dsw-static-blue-400": "color-mix(in srgb, #8aadf4 85%, #24273a)",
      "--dsw-static-blue-450": "#c6a0f6",
      "--dsw-static-blue-500": "#c6a0f6",
      "--dsw-static-blue-600": "color-mix(in srgb, #8aadf4 70%, #24273a)",
      "--dsw-static-blue-800": "color-mix(in srgb, #8aadf4 50%, #24273a)",
      "--dsw-static-blue-900": "color-mix(in srgb, #8aadf4 35%, #24273a)",
      "--dsw-static-blue-950": "color-mix(in srgb, #8aadf4 25%, #24273a)",
      "--dsw-static-blue-50p": "color-mix(in srgb, #8aadf4 45%, #cad3f5)",
      "--dsw-static-green-100": "color-mix(in srgb, #a6da95 30%, #cad3f5)",
      "--dsw-static-green-400": "color-mix(in srgb, #a6da95 75%, #24273a)",
      "--dsw-static-green-500": "#a6da95",
      "--dsw-static-green-900": "color-mix(in srgb, #a6da95 35%, #24273a)",
      "--dsw-static-red-50": "color-mix(in srgb, #ed8796 40%, #cad3f5)",
      "--dsw-static-red-100": "color-mix(in srgb, #ed8796 25%, #cad3f5)",
      "--dsw-static-red-400": "color-mix(in srgb, #ed8796 75%, #24273a)",
      "--dsw-static-red-500": "#ed8796",
      "--dsw-static-red-600": "color-mix(in srgb, #ed8796 65%, #24273a)",
      "--dsw-static-red-900": "color-mix(in srgb, #ed8796 35%, #24273a)",
      "--dsw-static-amber-100": "color-mix(in srgb, #eed49f 30%, #cad3f5)",
      "--dsw-static-amber-400": "color-mix(in srgb, #eed49f 85%, #24273a)",
      "--dsw-static-amber-500": "#f5a97f",
      "--dsw-static-amber-600": "#f5a97f",
      "--dsw-static-amber-900": "color-mix(in srgb, #f5a97f 40%, #24273a)",
      "--dsw-ctp-sky": "#91d7e3",
      "--dsw-ctp-peach": "#f5a97f",
      "--dsw-ctp-lavender": "#b7bdf8",
      "--dsw-ctp-blue": "#8aadf4",
      "--dsw-ctp-pink": "#f5bde6",
      "--dsw-ctp-teal": "#8bd5ca",
      "--dsw-ctp-sapphire": "#7dc4e4",
      "--dsw-ctp-rosewater": "#f4dbd6",
      "--dsw-ctp-flamingo": "#f0c6c6",
      "--dsw-ctp-maroon": "#ee99a0",
      "--dsw-alias-bg-base": "#24273a",
      "--dsw-alias-bg-layer-1": "#1e2030",
      "--dsw-alias-bg-layer-2": "#363a4f",
      "--dsw-alias-bg-layer-3": "#494d64",
      "--dsw-alias-bg-overlay": "#363a4f",
      "--dsw-alias-bg-mask-1": "rgba(24, 25, 38, 0.5)",
      "--dsw-alias-bg-mask-2": "rgba(24, 25, 38, 0.2)",
      "--dsw-alias-bg-mask-3": "rgba(24, 25, 38, 0.48)",
      "--dsw-alias-bg-module-platform": "#363a4f",
      "--dsw-alias-bg-multi-select": "#363a4f",
      "--dsw-alias-bg-skeleton": "rgba(73, 77, 100, 0.08)",
      "--dsw-alias-border-l1": "rgba(110, 115, 141, 0.25)",
      "--dsw-alias-border-l2": "rgba(128, 135, 162, 0.45)",
      "--dsw-alias-border-l3": "rgba(128, 135, 162, 0.55)",
      "--dsw-alias-border-l4": "rgba(128, 135, 162, 0.7)",
      "--dsw-alias-label-primary": "#cad3f5",
      "--dsw-alias-label-secondary": "#a5adcb",
      "--dsw-alias-label-tertiary": "#b8c0e0",
      "--dsw-alias-label-caption": "#b8c0e0",
      "--dsw-alias-label-dimmed": "#b8c0e0",
      "--dsw-alias-brand-primary": "#c6a0f6",
      "--dsw-alias-brand-text": "#181926",
      "--dsw-alias-button-primary-hover": "#b7bdf8",
      "--dsw-alias-button-primary-dimmed": "#363a4f",
      "--dsw-alias-button-elevated-fill": "#363a4f",
      "--dsw-alias-button-floating-fill": "#494d64",
      "--dsw-alias-button-floating-hover": "#5b6078",
      "--dsw-alias-button-ghost-active-border": "#5b6078",
      "--dsw-alias-button-ghost-active-fill": "#363a4f",
      "--dsw-alias-button-ghost-active-hover": "#494d64",
      "--dsw-alias-state-business-primary": "#c6a0f6",
      "--dsw-alias-state-business-tertiary": "#363a4f",
      "--dsw-alias-state-error-primary": "#ed8796",
      "--dsw-alias-state-error-secondary": "#ed8796",
      "--dsw-alias-state-success-primary": "#a6da95",
      "--dsw-alias-state-success-secondary": "#a6da95",
      "--dsw-alias-state-success-tertiary": "#363a4f",
      "--dsw-alias-state-warn-label": "#eed49f",
      "--dsw-alias-state-warn-primary": "#eed49f",
      "--dsw-alias-state-warn-secondary": "#eed49f",
      "--dsw-alias-state-warn-tertiary": "#363a4f",
      "--dsw-alias-interactive-bg-hover": "rgba(54, 58, 79, 0.45)",
      "--dsw-alias-interactive-bg-active": "rgba(73, 77, 100, 0.55)",
      "--dsw-alias-interactive-bg-hover-accent": "rgba(198, 160, 246, 0.14)",
      "--dsw-alias-interactive-bg-hover-danger": "rgba(237, 135, 150, 0.15)",
      "--dsw-alias-interactive-bg-hover-solid": "#494d64",
      "--dsw-alias-markdown-code-block": "#1e2030",
      "--dsw-alias-markdown-code-block-banner": "#363a4f",
      "--dsw-alias-markdown-code-segment-selected": "#363a4f",
      "--dsw-alias-markdown-code-segment-unselected": "#1e2030",
      "--dsw-alias-markdown-citation": "#363a4f",
      "--dsw-alias-markdown-inline-code": "#363a4f",
      "--dsw-alias-markdown-placeholder": "#363a4f",
      "--dsw-alias-markdown-tag": "#363a4f",
      "--dsw-alias-toast-bg": "#1e2030",
      "--dsw-alias-tooltip-bg": "#363a4f",
      "--dsw-specific-sidebar-fill": "#1e2030",
      "--dsw-specific-sidebar-nav-item-active": "#494d64",
      "--dsw-specific-sidebar-nav-item-active-accent": "rgba(198, 160, 246, 0.25)",
      "--dsw-specific-sidebar-nav-item-hover": "#363a4f",
      "--dsw-specific-bubble": "#363a4f",
      "--dsw-specific-bubble-highlight": "#494d64",
      "--dsw-specific-input-major": "#1e2030",
      "--dsw-specific-login-input": "#1e2030",
      "--dsw-specific-menu": "#363a4f",
      "--dsw-specific-selector": "#494d64",
      "--dsw-specific-tip": "#363a4f",
      "--dsw-alias-separator-primary": "rgba(198, 160, 246, 0.8)",
      "--dsw-alias-scrollbar-bg-l1": "#363a4f",
      "--dsw-alias-scrollbar-bg-l2": "#494d64",
      "--dsw-alias-scrollbar-hover-l1": "#5b6078",
      "--dsw-alias-scrollbar-hover-l2": "#5b6078",
      "--dsw-alias-bg-mask-photo": "rgba(0, 0, 0, 0.88)",
      "--dsw-alias-bg-mask-drop": "rgba(39, 39, 48, 0.7)",
      "--dsw-alias-border-inverted": "rgba(255, 255, 255, 0.06)",
      "--dsw-alias-border-inverted2": "rgba(255, 255, 255, 0.08)",
      "--dsw-alias-border-l2-darkmode-thin": "rgba(128, 135, 162, 0.3)",
      "--dsw-alias-brand-primary-invert": "#cad3f5",
      "--dsw-alias-brand-primary-new-colorprimary-new-color": "#c6a0f6",
      "--dsw-alias-button-contrast-fill": "#cad3f5",
      "--dsw-alias-button-info-fill": "#c6a0f6",
      "--dsw-alias-button-info-hover": "#655785",
      "--dsw-alias-button-primary-fill": "#c6a0f6",
      "--dsw-alias-button-tool-bar-fill": "rgba(110, 115, 141, 0.5)",
      "--dsw-alias-button-tool-bar-fill-invisible": "rgba(110, 115, 141, 0.36)",
      "--dsw-alias-button-tool-bar-hover": "rgba(128, 135, 162, 0.6)",
      "--dsw-alias-label-primary-bluish": "#cad3f5",
      "--dsw-alias-label-primary-dimmed": "#a5adcb",
      "--dsw-alias-label-primary-foreground": "#181926",
      "--dsw-alias-label-primary-inverted": "#363a4f",
      "--shiki-foreground": "#cad3f5",
      "--shiki-background": "#1e2030",
      "--shiki-token-constant": "#f5a97f",
      "--shiki-token-string": "#a6da95",
      "--shiki-token-comment": "#939ab7",
      "--shiki-token-keyword": "#c6a0f6",
      "--shiki-token-parameter": "#ee99a0",
      "--shiki-token-function": "#8aadf4",
      "--shiki-token-string-expression": "#a6da95",
      "--shiki-token-punctuation": "#a5adcb",
      "--shiki-token-link": "#8aadf4",
      "--shiki-token-inserted": "#a6da95",
      "--shiki-token-deleted": "#ed8796",
      "--shiki-token-changed": "#f5a97f"
    }
  },
  {
    "id": "catppuccin-mocha",
    "name": "Mocha",
    "colorScheme": "dark",
    "tokens": {
      "--dsw-static-neutral-bluish-50": "color-mix(in srgb, #cdd6f4 50%, #bac2de)",
      "--dsw-static-neutral-50": "color-mix(in srgb, #cdd6f4 50%, #bac2de)",
      "--dsw-static-neutral-bluish-60": "#bac2de",
      "--dsw-static-neutral-60": "#bac2de",
      "--dsw-static-neutral-bluish-75": "color-mix(in srgb, #bac2de 50%, #a6adc8)",
      "--dsw-static-neutral-75": "color-mix(in srgb, #bac2de 50%, #a6adc8)",
      "--dsw-static-neutral-bluish-100": "#a6adc8",
      "--dsw-static-neutral-100": "#a6adc8",
      "--dsw-static-neutral-bluish-150": "color-mix(in srgb, #a6adc8 50%, #9399b2)",
      "--dsw-static-neutral-150": "color-mix(in srgb, #a6adc8 50%, #9399b2)",
      "--dsw-static-neutral-bluish-200": "#9399b2",
      "--dsw-static-neutral-200": "#9399b2",
      "--dsw-static-neutral-bluish-250": "color-mix(in srgb, #9399b2 50%, #7f849c)",
      "--dsw-static-neutral-250": "color-mix(in srgb, #9399b2 50%, #7f849c)",
      "--dsw-static-neutral-bluish-300": "#7f849c",
      "--dsw-static-neutral-300": "#7f849c",
      "--dsw-static-neutral-bluish-400": "color-mix(in srgb, #7f849c 50%, #6c7086)",
      "--dsw-static-neutral-400": "color-mix(in srgb, #7f849c 50%, #6c7086)",
      "--dsw-static-neutral-bluish-500": "#585b70",
      "--dsw-static-neutral-500": "#585b70",
      "--dsw-static-neutral-bluish-550": "color-mix(in srgb, #585b70 50%, #45475a)",
      "--dsw-static-neutral-550": "color-mix(in srgb, #585b70 50%, #45475a)",
      "--dsw-static-neutral-bluish-600": "#45475a",
      "--dsw-static-neutral-600": "#45475a",
      "--dsw-static-neutral-bluish-700": "#313244",
      "--dsw-static-neutral-700": "#313244",
      "--dsw-static-neutral-bluish-750": "color-mix(in srgb, #313244 50%, #1e1e2e)",
      "--dsw-static-neutral-750": "color-mix(in srgb, #313244 50%, #1e1e2e)",
      "--dsw-static-neutral-bluish-800": "color-mix(in srgb, #313244 25%, #1e1e2e)",
      "--dsw-static-neutral-800": "color-mix(in srgb, #313244 25%, #1e1e2e)",
      "--dsw-static-neutral-bluish-850": "#1e1e2e",
      "--dsw-static-neutral-850": "#1e1e2e",
      "--dsw-static-neutral-bluish-875": "color-mix(in srgb, #1e1e2e 50%, #181825)",
      "--dsw-static-neutral-875": "color-mix(in srgb, #1e1e2e 50%, #181825)",
      "--dsw-static-neutral-bluish-900": "#181825",
      "--dsw-static-neutral-900": "#181825",
      "--dsw-static-neutral-bluish-950": "color-mix(in srgb, #181825 50%, #11111b)",
      "--dsw-static-neutral-950": "color-mix(in srgb, #181825 50%, #11111b)",
      "--dsw-static-neutral-bluish-1000": "#11111b",
      "--dsw-static-neutral-1000": "#11111b",
      "--dsw-static-neutral-bluish-00": "#cdd6f4",
      "--dsw-static-neutral-00": "#cdd6f4",
      "--dsw-static-deepseek-50": "color-mix(in srgb, #cba6f7 55%, #cdd6f4)",
      "--dsw-static-deepseek-100": "color-mix(in srgb, #cba6f7 35%, #cdd6f4)",
      "--dsw-static-deepseek-200": "#b4befe",
      "--dsw-static-deepseek-300": "color-mix(in srgb, #cba6f7 70%, #1e1e2e)",
      "--dsw-static-deepseek-400": "#cba6f7",
      "--dsw-static-deepseek-450": "#cba6f7",
      "--dsw-static-deepseek-500": "#cba6f7",
      "--dsw-static-deepseek-600": "color-mix(in srgb, #cba6f7 60%, #1e1e2e)",
      "--dsw-static-deepseek-800": "color-mix(in srgb, #cba6f7 30%, #1e1e2e)",
      "--dsw-static-deepseek-900": "color-mix(in srgb, #cba6f7 20%, #1e1e2e)",
      "--dsw-static-deepseek-700-delete": "color-mix(in srgb, #cba6f7 45%, #1e1e2e)",
      "--dsw-static-blue-50": "color-mix(in srgb, #89b4fa 55%, #cdd6f4)",
      "--dsw-static-blue-75": "color-mix(in srgb, #89b4fa 35%, #cdd6f4)",
      "--dsw-static-blue-100": "color-mix(in srgb, #89b4fa 25%, #cdd6f4)",
      "--dsw-static-blue-300": "color-mix(in srgb, #89b4fa 75%, #1e1e2e)",
      "--dsw-static-blue-400": "color-mix(in srgb, #89b4fa 85%, #1e1e2e)",
      "--dsw-static-blue-450": "#cba6f7",
      "--dsw-static-blue-500": "#cba6f7",
      "--dsw-static-blue-600": "color-mix(in srgb, #89b4fa 70%, #1e1e2e)",
      "--dsw-static-blue-800": "color-mix(in srgb, #89b4fa 50%, #1e1e2e)",
      "--dsw-static-blue-900": "color-mix(in srgb, #89b4fa 35%, #1e1e2e)",
      "--dsw-static-blue-950": "color-mix(in srgb, #89b4fa 25%, #1e1e2e)",
      "--dsw-static-blue-50p": "color-mix(in srgb, #89b4fa 45%, #cdd6f4)",
      "--dsw-static-green-100": "color-mix(in srgb, #a6e3a1 30%, #cdd6f4)",
      "--dsw-static-green-400": "color-mix(in srgb, #a6e3a1 75%, #1e1e2e)",
      "--dsw-static-green-500": "#a6e3a1",
      "--dsw-static-green-900": "color-mix(in srgb, #a6e3a1 35%, #1e1e2e)",
      "--dsw-static-red-50": "color-mix(in srgb, #f38ba8 40%, #cdd6f4)",
      "--dsw-static-red-100": "color-mix(in srgb, #f38ba8 25%, #cdd6f4)",
      "--dsw-static-red-400": "color-mix(in srgb, #f38ba8 75%, #1e1e2e)",
      "--dsw-static-red-500": "#f38ba8",
      "--dsw-static-red-600": "color-mix(in srgb, #f38ba8 65%, #1e1e2e)",
      "--dsw-static-red-900": "color-mix(in srgb, #f38ba8 35%, #1e1e2e)",
      "--dsw-static-amber-100": "color-mix(in srgb, #f9e2af 30%, #cdd6f4)",
      "--dsw-static-amber-400": "color-mix(in srgb, #f9e2af 85%, #1e1e2e)",
      "--dsw-static-amber-500": "#fab387",
      "--dsw-static-amber-600": "#fab387",
      "--dsw-static-amber-900": "color-mix(in srgb, #fab387 40%, #1e1e2e)",
      "--dsw-ctp-sky": "#89dceb",
      "--dsw-ctp-peach": "#fab387",
      "--dsw-ctp-lavender": "#b4befe",
      "--dsw-ctp-blue": "#89b4fa",
      "--dsw-ctp-pink": "#f5c2e7",
      "--dsw-ctp-teal": "#94e2d5",
      "--dsw-ctp-sapphire": "#74c7ec",
      "--dsw-ctp-rosewater": "#f5e0dc",
      "--dsw-ctp-flamingo": "#f2cdcd",
      "--dsw-ctp-maroon": "#eba0ac",
      "--dsw-alias-bg-base": "#1e1e2e",
      "--dsw-alias-bg-layer-1": "#181825",
      "--dsw-alias-bg-layer-2": "#313244",
      "--dsw-alias-bg-layer-3": "#45475a",
      "--dsw-alias-bg-overlay": "#313244",
      "--dsw-alias-bg-mask-1": "rgba(17, 17, 27, 0.5)",
      "--dsw-alias-bg-mask-2": "rgba(17, 17, 27, 0.2)",
      "--dsw-alias-bg-mask-3": "rgba(17, 17, 27, 0.48)",
      "--dsw-alias-bg-module-platform": "#313244",
      "--dsw-alias-bg-multi-select": "#313244",
      "--dsw-alias-bg-skeleton": "rgba(69, 71, 90, 0.08)",
      "--dsw-alias-border-l1": "rgba(108, 112, 134, 0.25)",
      "--dsw-alias-border-l2": "rgba(127, 132, 156, 0.45)",
      "--dsw-alias-border-l3": "rgba(127, 132, 156, 0.55)",
      "--dsw-alias-border-l4": "rgba(127, 132, 156, 0.7)",
      "--dsw-alias-label-primary": "#cdd6f4",
      "--dsw-alias-label-secondary": "#a6adc8",
      "--dsw-alias-label-tertiary": "#bac2de",
      "--dsw-alias-label-caption": "#bac2de",
      "--dsw-alias-label-dimmed": "#bac2de",
      "--dsw-alias-brand-primary": "#cba6f7",
      "--dsw-alias-brand-text": "#11111b",
      "--dsw-alias-button-primary-hover": "#b4befe",
      "--dsw-alias-button-primary-dimmed": "#313244",
      "--dsw-alias-button-elevated-fill": "#313244",
      "--dsw-alias-button-floating-fill": "#45475a",
      "--dsw-alias-button-floating-hover": "#585b70",
      "--dsw-alias-button-ghost-active-border": "#585b70",
      "--dsw-alias-button-ghost-active-fill": "#313244",
      "--dsw-alias-button-ghost-active-hover": "#45475a",
      "--dsw-alias-state-business-primary": "#cba6f7",
      "--dsw-alias-state-business-tertiary": "#313244",
      "--dsw-alias-state-error-primary": "#f38ba8",
      "--dsw-alias-state-error-secondary": "#f38ba8",
      "--dsw-alias-state-success-primary": "#a6e3a1",
      "--dsw-alias-state-success-secondary": "#a6e3a1",
      "--dsw-alias-state-success-tertiary": "#313244",
      "--dsw-alias-state-warn-label": "#f9e2af",
      "--dsw-alias-state-warn-primary": "#f9e2af",
      "--dsw-alias-state-warn-secondary": "#f9e2af",
      "--dsw-alias-state-warn-tertiary": "#313244",
      "--dsw-alias-interactive-bg-hover": "rgba(49, 50, 68, 0.45)",
      "--dsw-alias-interactive-bg-active": "rgba(69, 71, 90, 0.55)",
      "--dsw-alias-interactive-bg-hover-accent": "rgba(203, 166, 247, 0.14)",
      "--dsw-alias-interactive-bg-hover-danger": "rgba(243, 139, 168, 0.15)",
      "--dsw-alias-interactive-bg-hover-solid": "#45475a",
      "--dsw-alias-markdown-code-block": "#181825",
      "--dsw-alias-markdown-code-block-banner": "#313244",
      "--dsw-alias-markdown-code-segment-selected": "#313244",
      "--dsw-alias-markdown-code-segment-unselected": "#181825",
      "--dsw-alias-markdown-citation": "#313244",
      "--dsw-alias-markdown-inline-code": "#313244",
      "--dsw-alias-markdown-placeholder": "#313244",
      "--dsw-alias-markdown-tag": "#313244",
      "--dsw-alias-toast-bg": "#181825",
      "--dsw-alias-tooltip-bg": "#313244",
      "--dsw-specific-sidebar-fill": "#181825",
      "--dsw-specific-sidebar-nav-item-active": "#45475a",
      "--dsw-specific-sidebar-nav-item-active-accent": "rgba(203, 166, 247, 0.25)",
      "--dsw-specific-sidebar-nav-item-hover": "#313244",
      "--dsw-specific-bubble": "#313244",
      "--dsw-specific-bubble-highlight": "#45475a",
      "--dsw-specific-input-major": "#181825",
      "--dsw-specific-login-input": "#181825",
      "--dsw-specific-menu": "#313244",
      "--dsw-specific-selector": "#45475a",
      "--dsw-specific-tip": "#313244",
      "--dsw-alias-separator-primary": "rgba(203, 166, 247, 0.8)",
      "--dsw-alias-scrollbar-bg-l1": "#313244",
      "--dsw-alias-scrollbar-bg-l2": "#45475a",
      "--dsw-alias-scrollbar-hover-l1": "#585b70",
      "--dsw-alias-scrollbar-hover-l2": "#585b70",
      "--dsw-alias-bg-mask-photo": "rgba(0, 0, 0, 0.88)",
      "--dsw-alias-bg-mask-drop": "rgba(39, 39, 48, 0.7)",
      "--dsw-alias-border-inverted": "rgba(255, 255, 255, 0.06)",
      "--dsw-alias-border-inverted2": "rgba(255, 255, 255, 0.08)",
      "--dsw-alias-border-l2-darkmode-thin": "rgba(127, 132, 156, 0.3)",
      "--dsw-alias-brand-primary-invert": "#cdd6f4",
      "--dsw-alias-brand-primary-new-colorprimary-new-color": "#cba6f7",
      "--dsw-alias-button-contrast-fill": "#cdd6f4",
      "--dsw-alias-button-info-fill": "#cba6f7",
      "--dsw-alias-button-info-hover": "#63547e",
      "--dsw-alias-button-primary-fill": "#cba6f7",
      "--dsw-alias-button-tool-bar-fill": "rgba(108, 112, 134, 0.5)",
      "--dsw-alias-button-tool-bar-fill-invisible": "rgba(108, 112, 134, 0.36)",
      "--dsw-alias-button-tool-bar-hover": "rgba(127, 132, 156, 0.6)",
      "--dsw-alias-label-primary-bluish": "#cdd6f4",
      "--dsw-alias-label-primary-dimmed": "#a6adc8",
      "--dsw-alias-label-primary-foreground": "#11111b",
      "--dsw-alias-label-primary-inverted": "#313244",
      "--shiki-foreground": "#cdd6f4",
      "--shiki-background": "#181825",
      "--shiki-token-constant": "#fab387",
      "--shiki-token-string": "#a6e3a1",
      "--shiki-token-comment": "#9399b2",
      "--shiki-token-keyword": "#cba6f7",
      "--shiki-token-parameter": "#eba0ac",
      "--shiki-token-function": "#89b4fa",
      "--shiki-token-string-expression": "#a6e3a1",
      "--shiki-token-punctuation": "#a6adc8",
      "--shiki-token-link": "#89b4fa",
      "--shiki-token-inserted": "#a6e3a1",
      "--shiki-token-deleted": "#f38ba8",
      "--shiki-token-changed": "#fab387"
    }
  }
];

		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"skin.title": "Catppuccin 主题",
			"skin.default": "默认",
			"skin.catppuccin-latte": "Latte",
			"skin.catppuccin-frappe": "Frappé",
			"skin.catppuccin-macchiato": "Macchiato",
			"skin.catppuccin-mocha": "Mocha"
		};

		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"skin.title": "Catppuccin theme",
			"skin.default": "Default",
			"skin.catppuccin-latte": "Latte",
			"skin.catppuccin-frappe": "Frappé",
			"skin.catppuccin-macchiato": "Macchiato",
			"skin.catppuccin-mocha": "Mocha"
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
					})
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
				// settings label keeps the default font color (only hovers
				// mauve via the trigger rule above)
				[
					"[class~=\"YDXeBa_iconButton\"]",
					"  color: var(--dsw-ctp-maroon);"
				],
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
			// built-in preference ("light"/"dark"/"system") from the Host
			// settings scope asynchronously after boot, which overwrites a
			// third-party preference restored too early. Re-assert the saved
			// skin for a short boot window (a handful of change events or a
			// few seconds), then yield to subsequent user actions.
			const saved = readSavedSkin();
			const savedValid = typeof saved === "string" && saved !== DEFAULT_SKIN && SKINS.some((skinDefinition) => skinDefinition.id === saved);
			let bootGuard = savedValid ? 3 : 0;
			const reassertSaved = () => {
				if (bootGuard <= 0) return;
				const current = ctx.theme.getTheme().preference;
				if (current === saved) return;
				bootGuard -= 1;
				ctx.theme.setTheme(saved);
			};
			reassertSaved();
			const bootWindow = setTimeout(() => {
				bootGuard = 0;
			}, 5000);
			ctx.effect(() => () => {
				clearTimeout(bootWindow);
			}, "dsh-catppuccin: boot restore window");

			const skinStore = createSkinStore();
			let skinBound;
			const syncSkin = (snapshot) => {
				skinBound?.sync(snapshot.preference, snapshot.revision);
			};
			ctx.on("theme/change", (snapshot) => {
				syncSkin(snapshot);
				// If the preference moved to another plugin's third-party theme,
				// drop our stored choice so only the last-picked plugin restores
				// at boot (both plugins must implement this convention).
				const pref = snapshot.preference;
				if (pref !== DEFAULT_SKIN && pref !== "light" && pref !== "dark" && !SKINS.some((skinDefinition) => skinDefinition.id === pref)) {
					writeSavedSkin(DEFAULT_SKIN);
				}
				// Re-assert from a fresh task: a re-entrant setTheme inside the
				// dispatch is missed by other subscribers (ui-layout's
				// ThemePresenter), so the restored skin would never reach the DOM.
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
						ctx.theme.setTheme(id);
						writeSavedSkin(id);
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
		}
		//#endregion

		exports.SKINS = SKINS;
		exports.DEFAULT_SKIN = DEFAULT_SKIN;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
