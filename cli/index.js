#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const VERSION = require('../package.json').version;
const command = process.argv[2];

// Paths relative to this script's location (the downloaded template)
const TEMPLATE_DIR = path.join(__dirname, '..', 'template', '.agent-os');
const AGENT_MD_TEMPLATE = path.join(__dirname, '..', 'AGENT.md');

// Target: the project the user ran npx from
const TARGET = process.cwd();

// Directories preserved during updates (user-owned content)
const PRESERVED = ['.agent-os/product', '.agent-os/specs'];

// ── Helpers ──────────────────────────────────────────────────────────────────

function log(msg) {
  process.stdout.write(msg + '\n');
}

function isPreserved(relPath) {
  return PRESERVED.some((p) => relPath.startsWith(p));
}

function writeVersionFile() {
  const versionPath = path.join(TARGET, '.agent-os', '.version');
  fs.writeFileSync(versionPath, VERSION + '\n', 'utf8');
  log('  ✓ .agent-os/.version (' + VERSION + ')');
}

function readInstalledVersion() {
  try {
    return fs.readFileSync(path.join(TARGET, '.agent-os', '.version'), 'utf8').trim();
  } catch (_) {
    return null;
  }
}

/**
 * Copy src directory tree into dest, skipping files that:
 *  - already exist AND the relPath matches a preserved prefix (update mode)
 * @param {string} src
 * @param {string} dest
 * @param {string} relBase  relative prefix used for preserved-path checks
 * @param {boolean} isUpdate  if true, skip preserved paths that already exist
 */
function copyDir(src, dest, relBase, isUpdate) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    const rel = path.join(relBase, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, rel, isUpdate);
    } else {
      if (isUpdate && isPreserved(rel) && fs.existsSync(destPath)) {
        log(`  ~ skipped (preserved) ${rel}`);
        continue;
      }
      if (!isUpdate && fs.existsSync(destPath)) {
        log(`  ~ skipped (exists)    ${rel}`);
        continue;
      }
      fs.copyFileSync(srcPath, destPath);
      log(`  ✓ ${rel}`);
    }
  }
}

function ensureSymlink(target, linkPath, label) {
  try {
    if (fs.lstatSync(linkPath).isSymbolicLink()) {
      log(`  ~ skipped (exists)    ${label}`);
      return;
    }
  } catch (_) {
    // doesn't exist yet — fall through
  }
  fs.symlinkSync(target, linkPath);
  log(`  ✓ ${label} → ${target}`);
}

// ── Commands ─────────────────────────────────────────────────────────────────

function install() {
  log('\n🚀 Installing Databrook OS v' + VERSION + '...\n');

  // 1. Copy .agent-os/ template files
  copyDir(TEMPLATE_DIR, path.join(TARGET, '.agent-os'), '.agent-os', false);

  // 2. Copy AGENT.md if not present
  const agentMdDest = path.join(TARGET, 'AGENT.md');
  if (!fs.existsSync(agentMdDest)) {
    fs.copyFileSync(AGENT_MD_TEMPLATE, agentMdDest);
    log('  ✓ AGENT.md');
  } else {
    log('  ~ skipped (exists)    AGENT.md');
  }

  // 3. Create .github/copilot-instructions.md symlink → ../AGENT.md
  const githubDir = path.join(TARGET, '.github');
  fs.mkdirSync(githubDir, { recursive: true });
  ensureSymlink('../AGENT.md', path.join(githubDir, 'copilot-instructions.md'), '.github/copilot-instructions.md');

  // 4. Write version file
  writeVersionFile();

  log('\n✅ Databrook OS installed!\n');
  log('Next steps:');
  log('  1. Edit AGENT.md — fill in Mission, Coding Rules, Testing Rules');
  log('  2. Fill in .agent-os/product/mission.md');
  log('  3. Fill in .agent-os/product/tech-stack.md');
  log('  4. Open in VS Code and start with /create-spec in Copilot Chat\n');
}

function update() {
  const prev = readInstalledVersion();
  const fromLabel = prev ? ' (from v' + prev + ')' : '';
  log('\n🔄 Updating Databrook OS v' + VERSION + fromLabel + '...\n');

  // Overwrite workflow files but preserve product/ and specs/
  copyDir(TEMPLATE_DIR, path.join(TARGET, '.agent-os'), '.agent-os', true);

  // Re-create symlink if missing
  const githubDir = path.join(TARGET, '.github');
  fs.mkdirSync(githubDir, { recursive: true });
  ensureSymlink('../AGENT.md', path.join(githubDir, 'copilot-instructions.md'), '.github/copilot-instructions.md');

  // Always write version file (not preserved)
  writeVersionFile();

  log('\n✅ Databrook OS updated!\n');
  log('Preserved: .agent-os/product/** and .agent-os/specs/**\n');
}

function verify() {
  log('\n🔍 Verifying Databrook OS installation...\n');
  let passed = 0;
  let failed = 0;

  function check(label, ok, hint) {
    if (ok) {
      log('  ✅ ' + label);
      passed++;
    } else {
      log('  ❌ ' + label + (hint ? '  →  ' + hint : ''));
      failed++;
    }
  }

  const agentOsDir = path.join(TARGET, '.agent-os');
  const agentMd    = path.join(TARGET, 'AGENT.md');
  const copilotLink = path.join(TARGET, '.github', 'copilot-instructions.md');
  const versionFile = path.join(TARGET, '.agent-os', '.version');

  check('.agent-os/ exists',          fs.existsSync(agentOsDir), 'run: npx -y github:Kim2783/Databrook-os install');
  check('AGENT.md exists',            fs.existsSync(agentMd),    'run: npx -y github:Kim2783/Databrook-os install');

  let symlinkOk = false;
  try {
    symlinkOk = fs.lstatSync(copilotLink).isSymbolicLink() && readlink(copilotLink) === '../AGENT.md';
  } catch (_) {}
  check('.github/copilot-instructions.md is symlink → ../AGENT.md', symlinkOk,
    'run: npx -y github:Kim2783/Databrook-os install');

  const installedVersion = readInstalledVersion();
  check('.agent-os/.version present',  !!installedVersion, 'run: npx -y github:Kim2783/Databrook-os install');

  const commandsDir = path.join(agentOsDir, 'commands');
  const instrDir    = path.join(agentOsDir, 'instructions', 'core');
  check('.agent-os/commands/ populated',          fs.existsSync(commandsDir) && fs.readdirSync(commandsDir).length > 0);
  check('.agent-os/instructions/core/ populated', fs.existsSync(instrDir)    && fs.readdirSync(instrDir).length    > 0);

  log('');
  if (installedVersion) log('  Installed version: v' + installedVersion);
  log('  Template version:  v' + VERSION);
  if (installedVersion && installedVersion !== VERSION) {
    log('  ⚠️  Version mismatch — run update to upgrade');
  }
  log('');

  if (failed === 0) {
    log('✅ All checks passed (' + passed + '/' + (passed + failed) + ')\n');
  } else {
    log('❌ ' + failed + ' check(s) failed. See hints above.\n');
    process.exit(1);
  }
}

function readlink(linkPath) {
  try { return fs.readlinkSync(linkPath); } catch (_) { return null; }
}

function help() {
  log(`
Databrook OS v${VERSION}

Usage:
  npx github:Kim2783/Databrook-os install   Install into current project
  npx github:Kim2783/Databrook-os update    Update workflow files (preserves product/ & specs/)
  npx github:Kim2783/Databrook-os verify    Check installation health
  npx github:Kim2783/Databrook-os --help    Show this help
  npx github:Kim2783/Databrook-os --version Show version
`);
}

// ── Dispatch ─────────────────────────────────────────────────────────────────

switch (command) {
  case 'install':
    install();
    break;
  case 'update':
    update();
    break;
  case 'verify':
    verify();
    break;
  case '--version':
  case '-v':
    log(VERSION);
    break;
  case '--help':
  case '-h':
  case undefined:
    help();
    break;
  default:
    log(`Unknown command: ${command}`);
    help();
    process.exit(1);
}
