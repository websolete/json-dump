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

    panel.onDidDispose(() => {
      if (activePanel === panel) {
        activePanel = undefined;
      }
    });
  };

  const showRawDump = (sourceName: string, raw: string, invalidMessage: string) => {
    const json = tryParseJson(raw);
    if (json !== undefined) {
      openDump(sourceName, json);
      return;
    }

    const jsonl = tryParseJsonl(raw);
    if (jsonl) {
      if (jsonl.skipped > 0) {
        const lineWord = jsonl.skipped === 1 ? 'line' : 'lines';
        const recordWord = jsonl.records.length === 1 ? 'record' : 'records';
        vscode.window.showWarningMessage(
          `JSON Dump: Rendered ${jsonl.records.length} JSONL ${recordWord}, skipped ${jsonl.skipped} invalid ${lineWord}.`
        );
      }
      openDump(sourceName, jsonl.records);
      return;
    }

    vscode.window.showErrorMessage(invalidMessage);
  };

  const openDump = (sourceName: string, parsed: unknown) => {
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
      const ext = path.extname(targetPath).toLowerCase();
      if (ext !== '.json' && ext !== '.jsonl') {
        vscode.window.showErrorMessage('JSON Dump: Only .json and .jsonl files are supported from the explorer.');
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
    activePanel?.webview.postMessage({ command: 'setSort', alpha: true });
  });

  const sortNatural = vscode.commands.registerCommand('jsonDump.sortNatural', () => {
    activePanel?.webview.postMessage({ command: 'setSort', alpha: false });
  });

  const expandAll = vscode.commands.registerCommand('jsonDump.expandAll', () => {
    activePanel?.webview.postMessage({ command: 'setCollapsed', collapsed: false });
  });

  const collapseAll = vscode.commands.registerCommand('jsonDump.collapseAll', () => {
    activePanel?.webview.postMessage({ command: 'setCollapsed', collapsed: true });
  });

  context.subscriptions.push(showDump, showSelectionDump, showClipboardDump, sortAlpha, sortNatural, expandAll, collapseAll);
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

interface JsonlParseResult {
  records: unknown[];
  skipped: number;
}

/**
 * Parse JSON Lines (one JSON value per line). Blank lines are ignored and
 * individual invalid lines are skipped so a single malformed record does not
 * fail the whole dump. Returns undefined when the content is not JSONL at all
 * (no non-blank lines, or every non-blank line failed to parse).
 */
function tryParseJsonl(raw: string): JsonlParseResult | undefined {
  const records: unknown[] = [];
  let nonBlank = 0;
  let skipped = 0;

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === '') {
      continue;
    }

    nonBlank++;
    try {
      records.push(JSON.parse(trimmed));
    } catch {
      skipped++;
    }
  }

  if (nonBlank === 0 || records.length === 0) {
    return undefined;
  }

  return { records, skipped };
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
