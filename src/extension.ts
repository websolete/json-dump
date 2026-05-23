import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  let activePanel: vscode.WebviewPanel | undefined;

  const showDump = vscode.commands.registerCommand('jsonDump.showDump', async (uri?: vscode.Uri) => {
    const editor = vscode.window.activeTextEditor;
    const document = uri ? undefined : editor?.document;
    const targetUri = uri ?? document?.uri;

    if (!targetUri) {
      vscode.window.showErrorMessage('JSON Dump: Open a .json document first.');
      return;
    }

    const targetPath = uri ? targetUri.fsPath : document?.fileName ?? '';
    if (path.extname(targetPath).toLowerCase() !== '.json') {
      vscode.window.showErrorMessage('JSON Dump: Only .json documents are supported.');
      return;
    }

    let raw: string;
    if (document && document.uri.toString() === targetUri.toString()) {
      raw = document.getText();
    } else {
      try {
        const bytes = await vscode.workspace.fs.readFile(targetUri);
        raw = Buffer.from(bytes).toString('utf8');
      } catch {
        vscode.window.showErrorMessage('JSON Dump: Could not read file.');
        return;
      }
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      vscode.window.showErrorMessage('JSON Dump: File does not contain valid JSON.');
      return;
    }

    let panel: vscode.WebviewPanel;
    try {
      const panelTitle = `JSON Dump: ${path.basename(targetPath)}`;

      panel = vscode.window.createWebviewPanel(
        'jsonDump',
        panelTitle,
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
        }
      );

      const cssUri = panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(context.extensionPath, 'media', 'dump.css'))
      );
      const jsUri = panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(context.extensionPath, 'media', 'dump.js'))
      );

      panel.webview.html = buildHtml(panel.webview, cssUri, jsUri, panelTitle, parsed);
    } catch {
      vscode.window.showErrorMessage('JSON Dump: Could not open the dump viewer.');
      return;
    }

    activePanel = panel;
    vscode.commands.executeCommand('setContext', 'jsonDump.isSortedAlpha', false);

    panel.onDidDispose(() => {
      if (activePanel === panel) {
        activePanel = undefined;
        vscode.commands.executeCommand('setContext', 'jsonDump.isSortedAlpha', false);
      }
    });
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

function buildHtml(
  webview: vscode.Webview,
  cssUri: vscode.Uri,
  jsUri: vscode.Uri,
  title: string,
  data: unknown
): string {
  const nonce = getNonce();
  const json = serializeForInlineScript(data);

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
  <title>${title}</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" src="${jsUri}"></script>
  <script nonce="${nonce}">
    const root = document.getElementById('root');
    if (root) {
      renderDump(root, ${json});
    }
  </script>
</body>
</html>`;
}

function serializeForInlineScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function getNonce(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function deactivate() {}
