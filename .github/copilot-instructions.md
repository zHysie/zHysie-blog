# Copilot instructions

This project is an AI-operable Astro personal site. Follow the canonical conventions —
do not improvise design or architecture.

## Read first

- `system/globals/` — design knowledge base (colors, typography, spacing,
  interaction, imagery, effects, responsiveness, accessibility, components,
  patterns). `组件规范.md` catalogs the library; `组合模式.md` has the reusable
  composition recipes.
- `src/registry.json` — components/sections/pages catalog.

## Rules

- **Design tokens only.** No hardcoded hex/rgb; no Tailwind palette classes
  (`bg-blue-500`). Use semantic tokens (`bg-primary`, `text-foreground`,
  `var(--muted-foreground)`). Palette is monochrome OKLCH.
- **Dark mode** uses the `.dark` class; never hand-invert colors.
- **Three tiers:** Components → Sections (`src/components/sections`) → Pages.
- **i18n:** Chinese public site (`zh-CN`) with unprefixed routes; English is retained
  in Starlight docs only. Add every public route once under `src/pages/`.
- **Preserve:** Git-based Markdown content, Cloudflare Pages, SEO/OG/RSS/
  sitemap/llms.txt, Pagefind, Starlight docs.

## Verify

Run `pnpm lint` (includes `pnpm check:kpis`) and `pnpm build` before finishing.
`check:kpis` is the source of truth and fails on off-system edits.
