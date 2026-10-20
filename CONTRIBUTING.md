# Contributing

Thanks for considering contributing to dsh-catppuccin!

## Workflow

1. Fork the repository and create a feature branch off `main`.
2. Make your changes. Do not hand-edit theme colors — regenerate them with the
   generator script:
   ```sh
   node scripts/gen-themes.mjs
   ```
3. Commit and open a pull request.

## Theme colors

Theme data is generated from the official
[catppuccin/palette](https://github.com/catppuccin/palette) `palette.json`
(check it in under `palette/palette.json`). The Catppuccin color → `--dsw-alias-*`
token mapping lives in `scripts/gen-themes.mjs`. To change a color assignment,
edit the mapping there and re-run the script — never edit `themes/*.json`
or the token tables in `lib/client.js` by hand.

## Style

- Keep the browser bundle (`lib/client.js`) in the same hand-written
  `window.__ModuleLoader__` CJS format as the shipped ui-* packages; no build
  step required.
- Follow the Catppuccin [style guide](https://github.com/catppuccin/catppuccin)
  for any palette-related naming.

## Verification and releases

Run `npm test` to check client loading, generated bundle consistency, theme
restoration, and picker subscriptions. Tests use Node's built-in test runner
and need no installed dependencies. CI also runs them against the published
DSH 0.1.6-alpha.2 and 0.2.1-rc.2 ThemeRuntimes; set `DSH_THEME_CLIENT_PATH` to the package's
`lib/client.js` to run the same integration check locally. UI components and
the settings transport are stubbed; this is not a full browser boot test.

Publishing runs `prepublishOnly` to regenerate themes and run the regression
suite. To release, update `package.json` and `CHANGELOG.md`, commit the changes,
and push a matching `v<version>` tag. The publish workflow requires the
repository's `NPM_TOKEN` secret. Verify the official npm `latest` tag before
closing an issue that affects npm installations.

## License

All contributions are licensed under the MIT license.
