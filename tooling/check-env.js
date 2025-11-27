#!/usr/bin/env node

const { execSync } = require('child_process');

const MIN_NODE = { major: 20, minor: 10, patch: 0 };
const MIN_PNPM = { major: 10, minor: 17, patch: 0 };

function parseVersion(raw) {
  const [major = 0, minor = 0, patch = 0] = raw
    .replace(/^v/, '')
    .trim()
    .split('.')
    .map((part) => Number.parseInt(part, 10) || 0);
  return { major, minor, patch };
}

function isAtLeast(current, required) {
  if (current.major !== required.major) {
    return current.major > required.major;
  }
  if (current.minor !== required.minor) {
    return current.minor > required.minor;
  }
  return current.patch >= required.patch;
}

function ensureNode() {
  const current = parseVersion(process.version);
  if (!isAtLeast(current, MIN_NODE)) {
    console.error(
      `Node ${MIN_NODE.major}.${MIN_NODE.minor}.x or newer is required. Current: ${process.version}`,
    );
    process.exit(1);
  }
}

function ensurePnpm() {
  let raw = '';
  try {
    raw = execSync('pnpm --version', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (error) {
    console.error('pnpm is required but not found in PATH. Install from https://pnpm.io/installation');
    process.exit(1);
  }

  const current = parseVersion(raw);
  if (!isAtLeast(current, MIN_PNPM)) {
    console.error(
      `pnpm ${MIN_PNPM.major}.${MIN_PNPM.minor}.x or newer is required. Current: ${raw.trim()}`,
    );
    process.exit(1);
  }
}

ensureNode();
ensurePnpm();
