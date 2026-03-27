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

  log('\n✅ Databrook OS installed!\n');
  log('Next steps:');
  log('  1. Edit AGENT.md — fill in Mission, Coding Rules, Testing Rules');
  log('  2. Fill in .agent-os/product/mission.md');
  log('  3. Fill in .agent-os/product/tech-stack.md');
  log('  4. Open in VS Code and start with /create-spec in Copilot Chat\n');
}

function update() {
  log('\n🔄 Updating Databrook OS v' + VERSION + '...\n');

  // Overwrite workflow files but preserve product/ and specs/
  copyDir(TEMPLATE_DIR, path.join(TARGET, '.agent-os'), '.agent-os', true);

  // Re-create symlink if missing
  const githubDir = path.join(TARGET, '.github');
  fs.mkdirSync(githubDir, { recursive: true });
  ensureSymlink('../AGENT.md', path.join(githubDir, 'copilot-instructions.md'), '.github/copilot-instructions.md');

  log('\n✅ Databrook OS updated!\n');
  log('Preserved: .agent-os/product/** and .agent-os/specs/**\n');
}

function help() {
  log(`
Databrook OS v${VERSION}

Usage:
  npx github:kim2783/Databrook-os install   Install into current project
  npx github:kim2783/Databrook-os update    Update workflow files (preserves product/ & specs/)
  npx github:kim2783/Databrook-os --help    Show this help
  npx github:kim2783/Databrook-os --version Show version
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
