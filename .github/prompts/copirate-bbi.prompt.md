---
name: copirate-bbi
description: 'Bump version, build extension, and install for quick development iterations'
---

<!-- deployment_hash: 93f36629 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: workflow | language: any | difficulty: beginner -->
<!-- estimated_time: 2-3 minutes -->
<!-- tags: build, version, deployment, development, automation -->

# Copirate BBI - Bump, Build, Install

> **Invocation**: `/copirate-bbi` in Copilot chat
>
> **Role**: You are a build automation specialist helping with rapid development iterations.

## Purpose

Quick workflow for bumping version, building the extension, and installing it in VS Code. Perfect for testing changes during active development.

## Workflow

### Step 1: Keep Preflight Minimal

Do not run separate validation passes before the build unless the user directly requests a separate pre-build check such as tests, `get_errors`, or a compile task.

**Default behavior:**
- Go straight to cleanup and build/install
- Rely on the build command itself to report success or failure
- Only inspect errors separately if the build command fails or reports a problem

### Step 2: Clean Old VSIX Files

Before building, remove old .vsix packages (keep last 3 builds):

```bash
ls -t *.vsix 2>/dev/null | tail -n +4 | xargs -r rm -f && ls *.vsix 2>/dev/null | wc -l
```

**What this does:**
- Lists all .vsix files by modification time (newest first)
- Keeps the 3 most recent builds
- Removes older builds to prevent clutter
- Reports how many .vsix files remain

**On Windows PowerShell (if bash fails):**
```powershell
Get-ChildItem *.vsix | Sort-Object LastWriteTime -Descending | Select-Object -Skip 3 | Remove-Item -Force; (Get-ChildItem *.vsix).Count
```

### Step 3: Run Build Command

Execute the build command with version bump:

```bash
npm run full:patch
```

**What this does:**
- Bumps patch version (e.g., 1.18.39 → 1.18.40)
- Compiles TypeScript with full validation
- Packages extension (.vsix)
- Installs in VS Code

### Step 4: Monitor Build Output

**Watch for:**
- ✅ Old .vsix cleanup (kept last 3 builds)
- ✅ Version bump confirmation (e.g., 1.18.39 → 1.18.40)
- ✅ Compilation success
- ✅ Package creation
- ✅ Installation success
- ❌ Any errors or warnings

**Validation rule:**
1. If the terminal output reports successful build, package, and install completion, treat BBI as successful.
2. After a reported success, do not run extra verification steps just to reconfirm what the terminal already reported.
3. Only run `get_errors`, extra compile commands, git checks, or artifact inspection when the user directly requests one of those extra checks.
4. If the terminal output reports failure or stops before package and install success are reported, summarize the failing step and the relevant error lines.

### Step 5: Report Results

Provide a concise summary:

```
✅ BBI Complete - v1.18.40
- Cleanup: Kept 3 most recent .vsix files
- Version: 1.18.39 → 1.18.40
- Compilation: Success (per terminal output)
- Package: copirate-1.18.40.vsix
- Installation: Success (per terminal output)
- Next: Reload VS Code window to activate
```

**If errors occurred:**
```
❌ BBI Failed - Build Errors
- Error 1: [description]
- Error 2: [description]
- Action: Fix errors and run /copirate-bbi again
```

## Command Variations

### Quick Build (Full Patch - Default)
```bash
npm run full:patch
```
- Version bump (patch)
- Complete validation
- Packages and installs
- **Recommended for /copirate-bbi**

### Quick Build Without Version Bump
```bash
npm run dev:quick
```
- No version change
- Faster iteration
- Use when testing without needing new version

### Clean Build
```bash
npm run clean:all && npm install && npm run full:patch
```
- Nuclear option
- Clears all artifacts
- Fresh install with version bump

## Usage Notes

**When to use /copirate-bbi:**
- After making code changes
- Testing new features
- Quick iteration cycles with version tracking
- Want automatic version bump + cleanup

**When NOT to use /copirate-bbi:**
- No changes made
- Want to test without version bump (use `npm run dev:quick`)
- Making multiple rapid tests before committing to version bump

**VSIX Cleanup Strategy:**
- Automatically keeps last 3 builds
- Prevents workspace clutter from frequent iterations
- Older builds are safely removed before new build starts

**Terminal-First Completion Policy:**
- Successful terminal output is the authoritative completion signal for `/copirate-bbi`
- Avoid redundant end-of-run validation loops after a reported success
- Escalate only when the terminal reports failure, ambiguity, or an interrupted build/install

## Success Criteria

- [x] Old .vsix files cleaned (kept last 3)
- [x] Version bumped (patch increment)
- [x] TypeScript compiled without errors
- [x] Extension packaged
- [x] Extension installed
- [x] User informed to reload window

---

**Document Status**: Active prompt for build automation
**Last Updated**: March 6, 2026
**Version**: 1.1.0
