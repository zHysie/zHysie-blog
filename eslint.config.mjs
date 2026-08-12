/* eslint.config.mjs — Flat Config for ESLint v9+ */
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: [
      "dist/",
      ".astro/",
      ".wrangler/",
      ".codex-runtime/",
      ".agents/",
      ".cursor/",
      ".github/skills/",
      ".firecrawl/",
      ".impeccable/",
      ".playwright-cli/",
      ".playwright-mcp/",
      "backups/",
      "materials/",
      "output/",
      "test-results/",
      // astro-eslint-parser intermittently crashes while preprocessing this
      // valid dynamic-script component in a full-repository run. Astro's own
      // compiler still checks it through `pnpm run type-check` and `pnpm build`.
      "src/components/layout/Analytics.astro",
      "functions/",
      "scripts/",
      "**/*.d.ts",
      "**/*.cjs",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  prettier,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-unused-expressions": "off",
      "no-unused-vars": "warn",
      "no-console": "warn",
      "prefer-const": "error",
    },
  },
];
