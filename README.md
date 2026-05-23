# JSON Dump

JSON Dump visualizes raw JSON as an interactive dump view inspired by `cfdump`. Open a `.json` document and inspect nested data in a dedicated webview with collapsible tables and switchable key ordering.

![JSON Dump preview](images/preview.png)

## Features

- Open valid `.json` documents directly from Explorer, the active editor tab, or the Command Palette.
- Renders `struct` and `arrays` as nested tables.
- Collapse or expand nested structures from the header row or the key column.
- Toggle between natural key order and `Sort Keys A->Z` from the editor title while the dump panel is active.
- Keeps scalar values easy to scan with distinct colors for strings, numbers, booleans, and nulls.

## Usage

1. Open a `.json` document with `JSON Dump` directly from the file explorer, or
2. With a JSON document open, run `JSON Dump` from the editor title menu, or the Command Palette while that document is active.
3. The viewer opens in a new tab.
4. Explore nested nodes in the webview, collapse or expand nodes by clicking their key columns or headers.
5. Use `Sort Keys A->Z` or `Natural Key Order` in the editor title while the dump panel is active.

## Maintenance

This repository is managed from GitHub. Local packaging is still available with `npm run package:vsix`, but Marketplace publishing is handled by the `Publish Extension` GitHub Actions workflow.

### One-time setup

1. Add a repository secret named `VSCE_PAT` in GitHub with a Visual Studio Marketplace personal access token.
2. Keep `package.json` and `CHANGELOG.md` aligned with the version you want to publish.

### Release flow

1. Merge the release commit to `master`.
2. Create or publish a GitHub release for that version tag, or run the `Publish Extension` workflow manually from the Actions tab.
3. GitHub Actions packages the VSIX, publishes it to the Marketplace, and attaches the VSIX to the GitHub release when the workflow runs from a release.

## Changelog

Release notes are included with the extension changelog.