#!/usr/bin/env node
/**
 * Build a Playwright --grep pattern from CI_OPS ROADMAP features in active QA / build.
 *
 * Generic Dewey @N-#### tags only. Product-specific prefixes (for example @B-)
 * stay in the product repo — pass them via PLAYWRIGHT_EXTRA_TAGS or PLAYWRIGHT_GREP.
 *
 * Env: see playwright-kit/TAG_CONTRACT.md
 */
import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const DEFAULT_ACTIVE_STATUSES = /🧪 QA|🔄 In progress|📋 Proposed/;
export const DEFAULT_FALLBACK = "@N-|@core";
export const DEFAULT_EXTRA_TAGS = ["@core"];
export const DEFAULT_ROADMAP_CANDIDATES = [
  "Docs/Working Docs-Features-Incidents/ROADMAP.md",
  "docs/Working Docs-Features-Incidents/ROADMAP.md",
];

/**
 * @param {string} roadmap
 * @param {RegExp} [activeStatuses]
 * @returns {string[]}
 */
export function collectFeatureTags(
  roadmap,
  activeStatuses = DEFAULT_ACTIVE_STATUSES,
) {
  const tags = new Set();
  for (const line of roadmap.split("\n")) {
    if (!activeStatuses.test(line)) continue;
    const match = line.match(/N-\d{4}/);
    if (match) tags.add(`@${match[0]}`);
  }
  return [...tags];
}

/**
 * @param {string[]} tags
 * @param {string[]} [extraTags]
 * @param {string} [fallback]
 * @returns {string}
 */
export function buildGrepPattern(
  tags,
  extraTags = DEFAULT_EXTRA_TAGS,
  fallback = DEFAULT_FALLBACK,
) {
  const merged = [...new Set([...tags, ...extraTags.filter(Boolean)])];
  if (merged.length === 0) return fallback;
  if (tags.length === 0) return fallback;
  return merged.join("|");
}

/**
 * @param {string} [raw]
 * @returns {string[]}
 */
export function parseExtraTags(raw) {
  if (raw == null || raw.trim() === "") return [...DEFAULT_EXTRA_TAGS];
  return raw
    .split("|")
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * @param {string} cwd
 * @param {string | undefined} roadmapEnv
 * @returns {string | null}
 */
export function resolveRoadmapPath(cwd, roadmapEnv) {
  if (roadmapEnv) {
    const abs = isAbsolute(roadmapEnv) ? roadmapEnv : join(cwd, roadmapEnv);
    return existsSync(abs) ? abs : null;
  }
  for (const rel of DEFAULT_ROADMAP_CANDIDATES) {
    const abs = join(cwd, rel);
    if (existsSync(abs)) return abs;
  }
  return null;
}

/**
 * @param {{ cwd?: string, env?: NodeJS.ProcessEnv }} [opts]
 * @returns {string}
 */
export function resolveGrepPattern(opts = {}) {
  const env = opts.env ?? process.env;
  const cwd = opts.cwd ?? process.cwd();
  const fallback = env.PLAYWRIGHT_GREP_FALLBACK || DEFAULT_FALLBACK;
  const extraTags = parseExtraTags(env.PLAYWRIGHT_EXTRA_TAGS);
  const roadmapPath = resolveRoadmapPath(cwd, env.PLAYWRIGHT_ROADMAP);
  if (!roadmapPath) return fallback;
  const tags = collectFeatureTags(readFileSync(roadmapPath, "utf8"));
  return buildGrepPattern(tags, extraTags, fallback);
}

const invokedPath = process.argv[1];
const isMain =
  invokedPath !== undefined &&
  resolve(invokedPath) === resolve(fileURLToPath(import.meta.url));

if (isMain) {
  process.stdout.write(resolveGrepPattern());
}
