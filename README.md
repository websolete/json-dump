# JSON Dump

JSON Dump turns raw JSON into an interactive dump view inspired by `cfdump`. Open a `.json` document and inspect nested data in a dedicated webview with collapsible tables and switchable key ordering.

![JSON Dump preview](images/preview.png)

## Features

- Open valid `.json` documents directly from Explorer, the active editor tab, or the Command Palette.
- Render objects as `struct` tables and arrays as indexed tables.
- Collapse or expand nested structures from the header row or the key column.
- Toggle between natural key order and `Sort Keys A->Z` from the webview toolbar.
- Keep scalar values easy to scan with distinct colors for strings, numbers, booleans, and nulls.

## Usage

1. Open a `.json` document.
2. Run `JSON Dump` from Explorer, the editor title menu, or the Command Palette while that document is active.
3. Explore nested nodes in the webview.
4. Use `Sort Keys A->Z` or `Natural Key Order` in the editor title while the dump panel is active.

## What It Looks Like

JSON Dump keeps the familiar CF-style dump shape while staying focused on JSON:

- Objects render as blue `struct` tables.
- Arrays render as amber indexed tables.
- Boolean values display as `YES` and `NO` for quick scanning.
- Empty objects and arrays are clearly marked.

## Changelog

Release notes are included with the extension changelog.