#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PATTERNS = [
  /ignore\s+all\s+previous\s+instructions/i,
  /ignore\s+previous\s+instructions/i,
  /disregard\s+(the\s+)?(above|prior)\s+instructions/i,
  /reveal\s+(your\s+)?(system|developer)\s+prompt/i,
  /you\s+are\s+now\s+in\s+developer\s+mode/i,
  /jailbreak/i,
  /do\s+anything\s+now\s*\(?dan\)?/i,
  /override\s+safety/i,
  /bypass\s+(guardrails|safety)/i,
  /execute\s+arbitrary\s+commands/i
];

const ALLOWED_EXTENSIONS = new Set([
  '.md', '.txt', '.rst', '.adoc',
  '.yml', '.yaml', '.json',
  '.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx',
  '.py', '.sh', '.cs', '.html', '.css'
]);

const IGNORE_PATH_SEGMENTS = new Set([
  '.git', 'node_modules', 'dist', 'build', 'coverage', 'assets'
]);

function shouldScan(filePath) {
  const normalized = filePath.split(path.sep).join('/');
  const segments = normalized.split('/');

  if (segments.some((s) => IGNORE_PATH_SEGMENTS.has(s))) {
    return false;
  }

  const ext = path.extname(filePath).toLowerCase();
  return ALLOWED_EXTENSIONS.has(ext);
}

function getTrackedFiles() {
  const output = execSync('git ls-files', { encoding: 'utf8' });
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter(shouldScan);
}

function scanFile(filePath) {
  const findings = [];
  const contents = fs.readFileSync(filePath, 'utf8');
  const lines = contents.split(/\r?\n/);

  lines.forEach((line, idx) => {
    PATTERNS.forEach((pattern) => {
      if (pattern.test(line)) {
        findings.push({
          filePath,
          lineNumber: idx + 1,
          line: line.trim(),
          rule: pattern.toString()
        });
      }
    });
  });

  return findings;
}

function main() {
  const files = getTrackedFiles();
  let findings = [];

  files.forEach((filePath) => {
    try {
      findings = findings.concat(scanFile(filePath));
    } catch (error) {
      console.error(`Error scanning ${filePath}: ${error.message}`);
      process.exitCode = 2;
    }
  });

  if (findings.length === 0) {
    console.log(`Prompt injection scan passed. Scanned ${files.length} files.`);
    return;
  }

  console.error(`Prompt injection scan failed with ${findings.length} finding(s):`);
  findings.forEach((f) => {
    console.error(`- ${f.filePath}:${f.lineNumber} matched ${f.rule}`);
    console.error(`  ${f.line}`);
  });

  process.exitCode = 1;
}

main();
