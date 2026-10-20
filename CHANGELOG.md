# Changelog

## 0.2.6

- Respect explicit Light, Dark, and System choices in the built-in Appearance
  row, including across restarts. Clear the saved Catppuccin flavor before the
  synchronous theme event, and prevent delayed durable-state hydration from
  overriding an explicit built-in choice.
- Keep a newly selected third-party theme when delayed durable-state hydration
  returns an older Catppuccin flavor.
- Add regression coverage for client boot without the removed runtime module
  (#3), settings reloads after model switches (#2), picker subscriptions,
  Default selection, and switching to another theme plugin.
- Run those checks with the published DSH 0.1.6-alpha.2 and 0.2.1-rc.2
  ThemeRuntimes in CI.
- Regenerate and test the client before publishing; reject release tags that
  do not match the package version.

## 0.2.5

- Fix Web UI boot on DSH versions whose client module table no longer includes
  `@deepseek-ai/dsh-client-runtime` (#3). Use a plugin-owned listener set with
  React's `useSyncExternalStore` and inject the current renderer, locale,
  theme, and settings providers.

## 0.2.4

- Add configurable glassmorphism and channel-aware update checks.

## 0.2.2

- Restore the selected flavor after settings reloads triggered by model
  switches (#2), persist before switching themes, and add durable host storage
  for Desktop launches that change the local port.
