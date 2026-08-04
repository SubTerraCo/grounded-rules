#!/usr/bin/env node
/**
 * Validate subterra.manifest.yaml basics (no YAML parser dep — line checks).
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const govRoot = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const manifestPath = join(govRoot, "subterra.manifest.yaml");

if (!existsSync(manifestPath)) {
  console.error("Missing subterra.manifest.yaml");
  process.exit(1);
}

const text = readFileSync(manifestPath, "utf8");
const required = [
  "schemaVersion:",
  "appCode: ST",
  "appCode: BK",
  "role: app",
  "role: integration",
  "marketplace: apps",
  "marketplace: integrations",
  "sdk: \"@subterra/app-sdk\"",
  "sdk: \"@subterra/integration-sdk\"",
];

let failed = false;
for (const needle of required) {
  if (!text.includes(needle)) {
    console.error(`Manifest missing: ${needle}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("subterra.manifest.yaml OK");
