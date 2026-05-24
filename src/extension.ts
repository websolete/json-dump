import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  let activePanel: vscode.WebviewPanel | undefined;

  const showParsedDump = (sourceName: string, parsed: unknown) => {
    const panelTitle = `JSON Dump: ${sourceName}`;

    const panel = vscode.window.createWebviewPanel(
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

    activePanel = panel;
    void vscode.commands.executeCommand('setContext', 'jsonDump.isSortedAlpha', false);

    panel.onDidDispose(() => {
      if (activePanel === panel) {
        activePanel = undefined;
        void vscode.commands.executeCommand('setContext', 'jsonDump.isSortedAlpha', false);
      }
    });
  };

  const showRawDump = (sourceName: string, raw: string, invalidMessage: string) => {
    const parsed = tryParseJson(raw);
    if (parsed === undefined) {
      vscode.window.showErrorMessage(invalidMessage);
      return;
    }

    try {
      showParsedDump(sourceName, parsed);
    } catch {
      vscode.window.showErrorMessage('JSON Dump: Could not open the dump viewer.');
    }
  };

  const showDump = vscode.commands.registerCommand('jsonDump.showDump', async (uri?: vscode.Uri) => {
    const editor = vscode.window.activeTextEditor;
    const activeDocument = editor?.document;
    const document = uri
      ? activeDocument?.uri.toString() === uri.toString()
        ? activeDocument
        : vscode.workspace.textDocuments.find(candidate => candidate.uri.toString() === uri.toString())
      : activeDocument;
    const targetUri = uri ?? document?.uri;

    if (!targetUri) {
      vscode.window.showErrorMessage('JSON Dump: Open a document with valid JSON first.');
      return;
    }

    let raw: string;
    let sourceName: string;
    if (document && document.uri.toString() === targetUri.toString()) {
      raw = document.getText();
      sourceName = getDocumentLabel(document);
    } else {
      const targetPath = targetUri.fsPath;
      if (path.extname(targetPath).toLowerCase() !== '.json') {
        vscode.window.showErrorMessage('JSON Dump: Only .json files are supported from the explorer.');
        return;
      }

      try {
        const bytes = await vscode.workspace.fs.readFile(targetUri);
        raw = Buffer.from(bytes).toString('utf8');
        sourceName = path.basename(targetPath);
      } catch {
        vscode.window.showErrorMessage('JSON Dump: Could not read file.');
        return;
      }
    }

    showRawDump(sourceName, raw, 'JSON Dump: Content does not contain valid JSON.');
  });

  const showSelectionDump = vscode.commands.registerCommand('jsonDump.showSelectionDump', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('JSON Dump: Select valid JSON first.');
      return;
    }

    const selection = editor.selections.find(candidate => !candidate.isEmpty);
    if (!selection) {
      vscode.window.showErrorMessage('JSON Dump: Select valid JSON first.');
      return;
    }

    const raw = editor.document.getText(selection);
    if (!raw.trim()) {
      vscode.window.showErrorMessage('JSON Dump: Selected text is empty.');
      return;
    }

    showRawDump(
      `${getDocumentLabel(editor.document)} (selection)`,
      raw,
      'JSON Dump: Selected text does not contain valid JSON.'
    );
  });

  const showClipboardDump = vscode.commands.registerCommand('jsonDump.showClipboardDump', async () => {
    const raw = await vscode.env.clipboard.readText();
    if (!raw.trim()) {
      vscode.window.showErrorMessage('JSON Dump: Clipboard is empty.');
      return;
    }

    showRawDump('Clipboard', raw, 'JSON Dump: Clipboard does not contain valid JSON.');
  });

  const sortAlpha = vscode.commands.registerCommand('jsonDump.sortAlpha', () => {
    vscode.commands.executeCommand('setContext', 'jsonDump.isSortedAlpha', true);
    activePanel?.webview.postMessage({ command: 'setSort', alpha: true });
  });

  const sortNatural = vscode.commands.registerCommand('jsonDump.sortNatural', () => {
    vscode.commands.executeCommand('setContext', 'jsonDump.isSortedAlpha', false);
    activePanel?.webview.postMessage({ command: 'setSort', alpha: false });
  });

  context.subscriptions.push(showDump, showSelectionDump, showClipboardDump, sortAlpha, sortNatural);
}

function getDocumentLabel(document: vscode.TextDocument): string {
  return document.isUntitled ? document.fileName : path.basename(document.fileName);
}

function tryParseJson(raw: string): unknown | undefined {
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
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
