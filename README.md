# JSON Dump

![JSON Dump preview](images/preview.png)

JSON Dump turns raw JSON into an interactive dump view inspired by `cfdump`. Open a `.json` file or a selected JSON snippet and inspect nested data in a dedicated webview with collapsible tables and switchable key ordering.

## Features

- Open valid JSON from the editor selection or directly from a `.json` file.
- Render objects as `struct` tables and arrays as indexed tables.
- Collapse or expand nested structures from the header row or the key column.
- Toggle between natural key order and `Sort Keys A->Z` from the webview toolbar.
- Keep scalar values easy to scan with distinct colors for strings, numbers, booleans, and nulls.

## Usage

1. Select JSON in the editor, or right-click a `.json` file in Explorer.
2. Run `JSON Dump` from the context menu.
3. Explore nested nodes in the webview.
4. Use `Sort Keys A->Z` or `Natural Key Order` in the editor title while the dump panel is active.

## What It Looks Like

JSON Dump keeps the familiar CF-style dump shape while staying focused on JSON:

- Objects render as blue `struct` tables.
- Arrays render as amber indexed tables.
- Boolean values display as `YES` and `NO` for quick scanning.
- Empty objects and arrays are clearly marked.

## Commands

| Command | Description |
| --- | --- |
| `JSON Dump` | Open the selected JSON or target `.json` file in the dump viewer. |
| `Sort Keys A->Z` | Sort object keys alphabetically in the active dump viewer. |
| `Natural Key Order` | Restore the original object key order in the active dump viewer. |

## Development

```powershell
npm install
npm run compile
```

To regenerate the Marketplace icon and preview image:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\generate-marketplace-assets.ps1
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release notes.