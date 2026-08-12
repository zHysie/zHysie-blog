#!/usr/bin/env node

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const SRC_DIR = join(process.cwd(), "src");
const I18N_DIR = join(SRC_DIR, "i18n");
const DEFAULT_LOCALE = "zh-CN";
const DEFAULT_FILE = join(I18N_DIR, `${DEFAULT_LOCALE}.json`);

const errors = [];

if (!existsSync(DEFAULT_FILE)) {
  errors.push(`Missing src/i18n/${DEFAULT_LOCALE}.json — default translation file not found`);
}

// Discover every locale dictionary and validate that each one is in key parity
// with the default source. This keeps the
// validator working no matter how many locales the project adds.
let source = {};
const localeFiles = existsSync(I18N_DIR)
  ? readdirSync(I18N_DIR).filter((f) => f.endsWith(".json"))
  : [];

try {
  source = JSON.parse(readFileSync(DEFAULT_FILE, "utf8"));
} catch (error) {
  errors.push(`Failed to load ${DEFAULT_LOCALE}.json: ${error.message}`);
}

const sourceKeys = Object.keys(source);

for (const file of localeFiles) {
  if (file === `${DEFAULT_LOCALE}.json`) continue;
  const locale = basename(file, ".json");
  let dict = {};
  try {
    dict = JSON.parse(readFileSync(join(I18N_DIR, file), "utf8"));
  } catch (error) {
    errors.push(`Failed to load ${file}: ${error.message}`);
    continue;
  }
  for (const key of sourceKeys) {
    if (!(key in dict)) {
      errors.push(`Missing ${locale} translation key: ${key}`);
    }
  }
  for (const key of Object.keys(dict)) {
    if (!(key in source)) {
      errors.push(`Extra ${locale} key missing from default source: ${key}`);
    }
  }
}

const helpersExist =
  existsSync(join(I18N_DIR, "routes.ts")) &&
  existsSync(join(I18N_DIR, "switcher.ts")) &&
  existsSync(join(I18N_DIR, "ui.ts"));
if (!helpersExist) {
  errors.push(
    "Missing i18n helpers: src/i18n/routes.ts, src/i18n/switcher.ts, or src/i18n/ui.ts not found",
  );
}

if (errors.length > 0) {
  console.error("❌ I18n validation failed:");
  for (const err of errors) {
    console.error(`   - ${err}`);
  }
  process.exit(1);
} else {
  const count = localeFiles.length;
  console.log(
    `✅ I18n validation passed — ${count} locale dictionar${count === 1 ? "y" : "ies"} in sync`,
  );
}
