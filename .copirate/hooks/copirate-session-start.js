#!/usr/bin/env node

// Copirate Ownership: extension-owned deployed hook script. Workspace copies are refreshed from the extension on deployment.

const fs = require('fs');
const path = require('path');

const scriptStart = Date.now();
let input = '';

function parseHookInput(rawInput) {
  try {
    if (rawInput.trim().length > 0) {
      return JSON.parse(rawInput);
    }
  } catch {
    // Hooks should stay non-blocking for malformed input on this reminder-only path.
  }

  return null;
}

function getSafeEnvironmentSnapshot() {
  const env = process.env;
  const visibleVariableNames = Object.keys(env)
    .filter((key) => {
      return key.startsWith('VSCODE_')
        || key.startsWith('COPILOT_')
        || key.startsWith('CHAT_')
        || key.startsWith('COPIRATE_')
        || key === 'SHELL'
        || key === 'COMSPEC'
        || key === 'TERM'
        || key === 'PWD'
        || key === 'INIT_CWD'
        || key === 'HOME'
        || key === 'USERPROFILE';
    })
    .sort();

  return {
    visibleVariableNames,
    shellIndicators: {
      shell: env.SHELL || null,
      comspec: env.COMSPEC || null,
      term: env.TERM || null,
      pwd: env.PWD || null,
      initCwd: env.INIT_CWD || null,
      home: env.HOME || env.USERPROFILE || null
    }
  };
}

function writeDiagnosticProbe(parsedInput) {
  const diagnosticsPath = process.env.COPIRATE_HOOK_DIAGNOSTICS_PATH;
  if (!diagnosticsPath) {
    return;
  }

  const resolvedPath = path.resolve(diagnosticsPath);
  const probe = {
    hookEventName: 'SessionStart',
    observedAt: new Date().toISOString(),
    elapsedMs: Date.now() - scriptStart,
    runtime: {
      cwd: process.cwd(),
      execPath: process.execPath,
      argv: process.argv,
      pid: process.pid,
      ppid: process.ppid,
      platform: process.platform,
      nodeVersion: process.version
    },
    environment: getSafeEnvironmentSnapshot(),
    input: {
      hadInput: Boolean(parsedInput),
      topLevelKeys: parsedInput && typeof parsedInput === 'object' ? Object.keys(parsedInput).sort() : []
    },
    timeoutProbe: {
      configuredDelayMs: Number(process.env.COPIRATE_HOOK_DIAGNOSTIC_DELAY_MS || 0),
      note: 'This probe captures runtime evidence and optional delay timing. Actual VS Code hook timeout behavior must still be validated by running the hook inside VS Code.'
    }
  };

  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  fs.writeFileSync(resolvedPath, JSON.stringify(probe, null, 2), 'utf8');
}

function resolveAgentMode(parsedInput) {
  if (parsedInput && typeof parsedInput === 'object') {
    const parsedAgent = parsedInput.agent;
    if (parsedAgent && typeof parsedAgent === 'object') {
      if (typeof parsedAgent.mode === 'string' && parsedAgent.mode.trim().length > 0) {
        return parsedAgent.mode.toLowerCase();
      }

      if (typeof parsedAgent.name === 'string' && parsedAgent.name.trim().length > 0) {
        return parsedAgent.name.toLowerCase();
      }
    }
  }

  return (process.env.COPIRATE_AGENT_MODE || 'copirate').toLowerCase();
}

function extractToolNamesFromHookInput(parsedInput) {
  if (!parsedInput || typeof parsedInput !== 'object') {
    return [];
  }

  const candidateLists = [
    parsedInput.tools,
    parsedInput.availableTools,
    parsedInput.toolManifest && parsedInput.toolManifest.tools,
    parsedInput.agent && parsedInput.agent.tools,
    parsedInput.session && parsedInput.session.tools
  ];
  const names = new Set();

  for (const candidateList of candidateLists) {
    if (!Array.isArray(candidateList)) {
      continue;
    }

    for (const candidate of candidateList) {
      if (typeof candidate === 'string' && candidate.trim().length > 0) {
        names.add(candidate.trim());
      } else if (candidate && typeof candidate === 'object') {
        const candidateName = candidate.name || candidate.toolName || candidate.id || candidate.referenceName;
        if (typeof candidateName === 'string' && candidateName.trim().length > 0) {
          names.add(candidateName.trim());
        }
      }
    }
  }

  return Array.from(names);
}

function buildToolManifestGuidance(toolNames) {
  const guidance = [
    'Fail-loud tool manifest rule: if this session exposes only notebook/Jupyter tools, exposes no file/search/repo tools, or lacks Copirate gateway tools, explicitly report a Copirate tool manifest failure before substantive work.'
  ];

  if (toolNames.length === 0) {
    return guidance;
  }

  const hasCopirateTool = toolNames.some((name) => name.startsWith('copirate_') || name.includes('edgeinformation.copirate/'));
  const hasFileOrSearchTool = toolNames.some((name) => /read|file|search|grep|list/i.test(name));
  const notebookToolCount = toolNames.filter((name) => /notebook|jupyter|kernel/i.test(name)).length;
  const notebookOnly = notebookToolCount > 0 && notebookToolCount === toolNames.length;

  if (toolNames.length > 128) {
    guidance.push(`Observed hook tool metadata contains ${toolNames.length} tools, which exceeds the global safety threshold. Treat this as tool proliferation unless the active custom-agent allowlist is confirmed.`);
  }

  if (notebookOnly || !hasCopirateTool || !hasFileOrSearchTool) {
    guidance.push(`Observed hook tool metadata is suspicious: total=${toolNames.length}, copirate=${hasCopirateTool}, fileOrSearch=${hasFileOrSearchTool}, notebook=${notebookToolCount}. Stop and surface the mismatch instead of continuing silently.`);
  }

  return guidance;
}

async function maybeDelayForDiagnostics() {
  const delayMs = Number(process.env.COPIRATE_HOOK_DIAGNOSTIC_DELAY_MS || 0);
  if (!Number.isFinite(delayMs) || delayMs <= 0) {
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, delayMs));
}

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', async () => {
  const parsedInput = parseHookInput(input);
  const agentMode = resolveAgentMode(parsedInput);
  const diagnosticMode = (process.env.COPIRATE_HOOK_DIAGNOSTIC_MODE || '').toLowerCase();
  const observedToolNames = extractToolNamesFromHookInput(parsedInput);
  const guidance = [
    'Copirate SessionStart hook active.',
    'If Copirate tools are visible in this session, automatically run the arrr preload mechanics before substantive work: confirm Copirate tool visibility, preload relevant memory context, then continue.',
    'If Copirate tools are not visible yet, do not assume availability or force errors; continue with prompt-visible guidance and retry visibility on the first Copirate-specific step.',
    'Use Memory-First Protocol and whisper-aware boundaries before expensive work.',
    'If the session is running with reduced human friction, such as Bypass Approvals or Autopilot, self-select bounded workflow choices and routine continuation checkpoints without waiting for a human confirmation turn.',
    'Do not self-select destructive, irreversible, security-sensitive, or semantically decisive branch points.',
    'Require explicit verification before declaring completion.'
  ];

  guidance.push(...buildToolManifestGuidance(observedToolNames));

  if (agentMode.includes('cf')) {
    guidance.push('For CF work, resolve workspace metadata first and keep compatibility/fallback guidance explicit for runtime-sensitive snippets.');
  }

  if (diagnosticMode === 'probe') {
    writeDiagnosticProbe(parsedInput);
    await maybeDelayForDiagnostics();
  }

  const output = {
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: guidance.join(' ')
    }
  };

  process.stdout.write(JSON.stringify(output));
});

process.stdin.resume();
