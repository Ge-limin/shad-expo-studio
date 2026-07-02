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
    console.error(`Fix: nvm install ${MIN_NODE.major} && nvm use ${MIN_NODE.major} (or install from https://nodejs.org)`);
    process.exit(1);
  }
}

function ensurePnpm() {
  let raw = '';
  try {
    raw = execSync('pnpm --version', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (error) {
    console.error('pnpm is required but not found in PATH.');
    console.error('Fix: corepack enable (ships with Node, picks up the pinned pnpm automatically)');
    process.exit(1);
  }

  const current = parseVersion(raw);
  if (!isAtLeast(current, MIN_PNPM)) {
    console.error(
      `pnpm ${MIN_PNPM.major}.${MIN_PNPM.minor}.x or newer is required. Current: ${raw.trim()}`,
    );
    console.error('Fix: corepack enable (picks up the pinned version from package.json)');
    process.exit(1);
  }
}

ensureNode();
ensurePnpm();
