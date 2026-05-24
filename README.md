# JSON Dump

JSON Dump visualizes raw JSON as an interactive dump view inspired by `cfdump`. Open a saved `.json` file, an unsaved editor containing valid JSON, selected JSON text from any editor, or JSON straight from the clipboard and inspect nested data in a dedicated webview with collapsible tables and switchable key ordering.

![JSON Dump preview](images/preview.png)

## Features

- Open saved `.json` files directly from Explorer.
- Open an active unsaved editor as soon as its contents are valid JSON; no save step required.
- Open selected JSON text from the current editor with `JSON Dump: Selection`.
- Open valid JSON from the clipboard with `JSON Dump: Clipboard`.
- Renders `struct` and `arrays` as nested tables.
- Collapse or expand nested structures from the header row or the key column.
- Toggle between natural key order and `Sort Keys A->Z` from the editor title while the dump panel is active.
- Keeps scalar values easy to scan with distinct colors for strings, numbers, booleans, and nulls.

## Usage

1. Open a saved `.json` file from Explorer and run `JSON Dump`, or paste valid JSON into any editor tab and run `JSON Dump` from the editor title menu, editor title context menu, editor context menu, or the Command Palette.
2. To render only part of a document, select valid JSON text and run `JSON Dump: Selection` from the editor title context menu, the editor context menu, or the Command Palette.
3. To skip the editor entirely, copy valid JSON and run `JSON Dump: Clipboard` from the Command Palette, editor title context menu, or the editor context menu.
4. The viewer opens in a new tab.
5. Explore nested nodes in the webview, collapse or expand nodes by clicking their key columns or headers.
6. Use `Sort Keys A->Z` or `Natural Key Order` in the editor title while the dump panel is active.

## Changelog

Release notes are included with the extension changelog.