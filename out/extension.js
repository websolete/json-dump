"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const path = require("path");
function activate(context) {
    let activePanel;
    const showDump = vscode.commands.registerCommand('jsonDump.showDump', async (uri) => {
        let parsed;
        if (uri) {
            // Triggered from explorer or tab context menu — read the whole file
            let raw;
            try {
                const bytes = await vscode.workspace.fs.readFile(uri);
                raw = Buffer.from(bytes).toString('utf8');
            }
            catch {
                vscode.window.showErrorMessage('JSON Dump: Could not read file.');
                return;
            }
            try {
                parsed = JSON.parse(raw);
            }
            catch {
                vscode.window.showErrorMessage('JSON Dump: File does not contain valid JSON.');
                return;
            }
        }
        else {
            // Triggered from editor context menu — use selection
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('JSON Dump: No active editor.');
                return;
            }
            const selection = editor.selection;
            const text = editor.document.getText(selection.isEmpty ? undefined : selection).trim();
            if (!text) {
                vscode.window.showErrorMessage('JSON Dump: Nothing selected.');
                return;
            }
            try {
                parsed = JSON.parse(text);
            }
            catch {
                vscode.window.showErrorMessage('JSON Dump: Selected text is not valid JSON.');
                return;
            }
        }
        const panel = vscode.window.createWebviewPanel('jsonDump', 'JSON Dump', vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
        });
        const cssUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'media', 'dump.css')));
        const jsUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'media', 'dump.js')));
        panel.webview.html = buildHtml(panel.webview, cssUri, jsUri, parsed);
        activePanel = panel;
        vscode.commands.executeCommand('setContext', 'jsonDump.isSortedAlpha', false);
        panel.onDidDispose(() => {
            if (activePanel === panel) {
                activePanel = undefined;
                vscode.commands.executeCommand('setContext', 'jsonDump.isSortedAlpha', false);
            }
        }, null, context.subscriptions);
    });
    const sortAlpha = vscode.commands.registerCommand('jsonDump.sortAlpha', () => {
        vscode.commands.executeCommand('setContext', 'jsonDump.isSortedAlpha', true);
        activePanel?.webview.postMessage({ command: 'setSort', alpha: true });
    });
    const sortNatural = vscode.commands.registerCommand('jsonDump.sortNatural', () => {
        vscode.commands.executeCommand('setContext', 'jsonDump.isSortedAlpha', false);
        activePanel?.webview.postMessage({ command: 'setSort', alpha: false });
    });
    context.subscriptions.push(showDump, sortAlpha, sortNatural);
}
function buildHtml(webview, cssUri, jsUri, data) {
    const nonce = getNonce();
    const json = JSON.stringify(data);
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy"
    content="default-src 'none';
             style-src ${webview.cspSource};
             script-src 'nonce-${nonce}';">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${cssUri}">
  <title>JSON Dump</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" src="${jsUri}"></script>
  <script nonce="${nonce}">
    renderDump(document.getElementById('root'), ${json});
  </script>
</body>
</html>`;
}
function getNonce() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
function deactivate() { }
//# sourceMappingURL=extension.js.map