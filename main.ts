/**
 * Agent Payday entry program.
 *
 * Job: hand the launch receipt from the bot workspace to the grader's output
 * folder. Nothing else is touched -- no network, no timestamps, no invented
 * file names -- so two runs over the same receipt agree byte for byte.
 *
 * A receipt is only worth delivering if it actually names the launch, so the
 * file is parsed first: a missing field, a non-string field or an unfilled
 * placeholder stops the run before anything lands in the output folder.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const RECEIPT = 'LAUNCH.json';
const REQUIRED_FIELDS = ['mint', 'create_signature'] as const;

/** Values a template ships with; they mean "nobody filled this in yet". */
const UNFILLED = /^(|pending|todo|tbd|placeholder|changeme|x{3,})$/i;

function fail(reason: string): never {
  process.stderr.write(`payday-entry: ${reason}\n`);
  process.exit(1);
}

function sourcePath(): string {
  return resolve(process.env.MAKEFUN_BOT_DIR ?? '/bot', RECEIPT);
}

function targetPath(): string {
  return resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', RECEIPT);
}

/** Returns why the receipt is unusable, or null when it looks complete. */
function receiptProblem(raw: string): string | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    return `receipt is not valid JSON: ${(err as Error).message}`;
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return 'receipt is not a JSON object';
  }

  const receipt = parsed as Record<string, unknown>;
  for (const field of REQUIRED_FIELDS) {
    const value = receipt[field];
    if (value === undefined) return `receipt has no ${field}`;
    if (typeof value !== 'string') return `receipt field ${field} is not a string`;
    if (UNFILLED.test(value.trim())) return `receipt field ${field} is still a placeholder`;
  }

  return null;
}

const from = sourcePath();
const to = targetPath();

if (!existsSync(from)) {
  fail(`no receipt at ${from}`);
}

let raw: string;
try {
  raw = readFileSync(from, 'utf8');
} catch (err) {
  fail(`could not read ${from}: ${(err as Error).message}`);
}

const problem = receiptProblem(raw);
if (problem !== null) {
  fail(`${from} rejected, nothing written: ${problem}`);
}

try {
  mkdirSync(resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output'), { recursive: true });
} catch (err) {
  fail(`could not prepare the output folder: ${(err as Error).message}`);
}

try {
  copyFileSync(from, to);
} catch (err) {
  fail(`copy failed: ${(err as Error).message}`);
}

process.stdout.write(`payday-entry: receipt delivered to ${to}\n`);
