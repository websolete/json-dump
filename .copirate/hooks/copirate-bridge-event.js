#!/usr/bin/env node

// Copirate Ownership: extension-owned deployed hook script. Workspace copies are refreshed from the extension on deployment.

const fs = require('fs');
const http = require('http');
const path = require('path');
const crypto = require('crypto');

const ROUTE_CONFIG = {
  PreCompact: {
    routePath: '/events/pre-compact',
    allowedOutputFields: ['additionalContext'],
    timeoutMs: 1500
  },
  SubagentStart: {
    routePath: '/events/subagent-start',
    allowedOutputFields: ['additionalContext'],
    timeoutMs: 250
  },
  PreToolUse: {
    routePath: '/events/pre-tool-use',
    allowedOutputFields: ['additionalContext', 'toolPolicy'],
    timeoutMs: 300
  },
  PostToolUse: {
    routePath: '/events/post-tool-use',
    allowedOutputFields: ['additionalContext'],
    timeoutMs: 300
  }
};

let input = '';

function parseJson(rawValue) {
  try {
    if (typeof rawValue === 'string' && rawValue.trim().length > 0) {
      return JSON.parse(rawValue);
    }
  } catch {
    return null;
  }

  return null;
}

function resolveManifestPath() {
  const configuredPath = process.env.COPIRATE_HOOK_BRIDGE_MANIFEST_PATH
    || '.copirate/runtime/hook-bridge.json';
  return path.resolve(configuredPath);
}

function loadManifest() {
  try {
    const manifestPath = resolveManifestPath();
    const manifest = parseJson(fs.readFileSync(manifestPath, 'utf8'));
    if (!manifest || typeof manifest.baseUrl !== 'string') {
      return null;
    }

    return manifest;
  } catch {
    return null;
  }
}

function readHookEventName() {
  const eventName = process.env.COPIRATE_HOOK_EVENT_NAME;
  if (typeof eventName === 'string' && ROUTE_CONFIG[eventName]) {
    return eventName;
  }

  return null;
}

function buildRequestEnvelope(eventName, parsedInput, timeoutMs) {
  const rawInput = parsedInput && typeof parsedInput === 'object' ? parsedInput : {};
  const agent = rawInput.agent && typeof rawInput.agent === 'object' ? rawInput.agent : {};
  const session = rawInput.session && typeof rawInput.session === 'object' ? rawInput.session : {};
  const workspace = rawInput.workspace && typeof rawInput.workspace === 'object' ? rawInput.workspace : {};

  return {
    requestId: typeof rawInput.requestId === 'string' && rawInput.requestId.trim().length > 0
      ? rawInput.requestId
      : crypto.randomUUID(),
    hookEventName: eventName,
    timestamp: new Date().toISOString(),
    agent: {
      name: typeof agent.name === 'string' ? agent.name : (process.env.COPIRATE_AGENT_MODE || 'copirate'),
      mode: typeof agent.mode === 'string' ? agent.mode : (process.env.COPIRATE_AGENT_MODE || 'copirate'),
      subagentType: typeof agent.subagentType === 'string' ? agent.subagentType : null
    },
    session: {
      sessionId: typeof session.sessionId === 'string' ? session.sessionId : undefined,
      permissionMode: typeof session.permissionMode === 'string' ? session.permissionMode : 'unknown',
      permissionModeConfidence: typeof session.permissionModeConfidence === 'string'
        ? session.permissionModeConfidence
        : 'unknown'
    },
    workspace: {
      workspacePath: typeof workspace.workspacePath === 'string' ? workspace.workspacePath : process.cwd(),
      isTrusted: typeof workspace.isTrusted === 'boolean' ? workspace.isTrusted : true
    },
    payload: {
      raw: rawInput,
      normalized: rawInput
    },
    execution: {
      deadlineMs: timeoutMs,
      degradedModeAllowed: true
    }
  };
}

function postJson(url, payload, timeoutMs, manifest) {
  return new Promise((resolve, reject) => {
    const requestUrl = new URL(url);
    const requestBody = JSON.stringify(payload);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    };

    if (manifest && typeof manifest.token === 'string' && manifest.token.trim().length > 0) {
      headers.Authorization = `Bearer ${manifest.token}`;
      headers['X-Copirate-Hook-Token'] = manifest.token;
    }

    const request = http.request(
      {
        method: 'POST',
        hostname: requestUrl.hostname,
        port: requestUrl.port,
        path: requestUrl.pathname,
        timeout: timeoutMs,
        headers
      },
      (response) => {
        let responseBody = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          responseBody += chunk;
        });
        response.on('end', () => {
          const parsedResponse = parseJson(responseBody);
          if (!parsedResponse || typeof parsedResponse !== 'object') {
            return reject(new Error('Bridge returned malformed JSON output'));
          }

          return resolve(parsedResponse);
        });
      }
    );

    request.on('timeout', () => {
      request.destroy(new Error(`Bridge request timed out after ${timeoutMs}ms`));
    });
    request.on('error', reject);
    request.write(requestBody);
    request.end();
  });
}

function buildHookSpecificOutput(eventName, bridgeResponse) {
  const routeConfig = ROUTE_CONFIG[eventName];
  const hookSpecificOutput = {};

  if (!bridgeResponse || typeof bridgeResponse !== 'object') {
    return hookSpecificOutput;
  }

  if (bridgeResponse.status !== 'ok' && bridgeResponse.status !== 'degraded') {
    return hookSpecificOutput;
  }

  const adapterDirectives = bridgeResponse.adapterDirectives;
  if (!adapterDirectives || typeof adapterDirectives !== 'object') {
    return hookSpecificOutput;
  }

  for (const fieldName of routeConfig.allowedOutputFields) {
    const value = adapterDirectives[fieldName];
    if (typeof value === 'string' && value.trim().length > 0) {
      hookSpecificOutput[fieldName] = value;
    }
  }

  return hookSpecificOutput;
}

async function run() {
  const eventName = readHookEventName();
  if (!eventName) {
    process.stdout.write(JSON.stringify({ hookSpecificOutput: {} }));
    return;
  }

  const routeConfig = ROUTE_CONFIG[eventName];
  const parsedInput = parseJson(input);
  const manifest = loadManifest();

  if (!manifest) {
    process.stdout.write(JSON.stringify({ hookSpecificOutput: {} }));
    return;
  }

  const configuredTimeoutMs = Number(process.env.COPIRATE_HOOK_BRIDGE_TIMEOUT_MS || routeConfig.timeoutMs);
  const timeoutMs = Number.isFinite(configuredTimeoutMs)
    ? Math.max(50, Math.min(Math.trunc(configuredTimeoutMs), 2000))
    : routeConfig.timeoutMs;

  try {
    const requestEnvelope = buildRequestEnvelope(eventName, parsedInput, timeoutMs);
    const bridgeResponse = await postJson(
      `${manifest.baseUrl}${routeConfig.routePath}`,
      requestEnvelope,
      timeoutMs,
      manifest
    );

    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: buildHookSpecificOutput(eventName, bridgeResponse)
      })
    );
  } catch {
    process.stdout.write(JSON.stringify({ hookSpecificOutput: {} }));
  }
}

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  void run();
});

process.stdin.resume();
