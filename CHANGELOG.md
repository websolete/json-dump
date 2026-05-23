# Changelog

All notable changes to JSON Dump will be documented in this file.

## 0.0.5

- Updated the dump panel title to include the active JSON file name, making it easier to distinguish open viewer tabs.
- Fixed a webview disposal registration pattern that could surface DisposableStore leak warnings in VS Code debug output.
- Added explicit TypeScript type configuration for Node and VS Code APIs so editor diagnostics align with the extension runtime.

## 0.0.4

- Added public GitHub repository metadata for Marketplace packaging and project links.
- Kept the Marketplace preview image in the README now that relative image rewriting can target the public repository.

## 0.0.3

- Limited dump rendering to `.json` documents and aligned the command surfaces with that behavior.
- Simplified string rendering in the webview by removing JSON-style double quotes and adding an explicit empty-string marker.
- Refreshed Marketplace assets and reduced the packaged icon size.

## 0.0.2

- Added an interactive JSON dump webview for selections and `.json` files.
- Added natural and alphabetical object key sorting for the active dump panel.
- Added Marketplace-facing assets, preview artwork, and extension documentation.