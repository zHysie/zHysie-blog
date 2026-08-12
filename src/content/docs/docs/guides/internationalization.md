---
title: Language Boundaries
description: How the Chinese public site and English development documentation are separated.
sidebar:
  order: 2
---

The public site has one locale: **Simplified Chinese (`zh-CN`)**. English is retained only for the Starlight development documentation under `/docs`.

## Public Site

The public locale is declared consistently in:

1. `astro.config.ts`
2. `src/config/i18n.config.ts`
3. `src/lib/site-config.ts`
4. `src/content.config.ts`
5. `src/i18n/zh-CN.json`

Public routes are unprefixed. There are no placeholder `[locale]` copies and Chinese content is not stored under an English locale code.

```astro
---
import { t } from "../i18n/ui";
const locale = "zh-CN" as const;
---

<p>{t(locale, "nav.home")}</p>
```

## Development Documentation

Starlight uses an English root locale inside its own integration configuration. Documentation files stay directly in `src/content/docs/docs/`, so `/docs` renders with `lang="en"` while the public site renders with `lang="zh-CN"`.

Changing this boundary requires synchronized updates to routing, content schemas, metadata, RSS, sitemap, tests, and Starlight configuration. Do not add a public locale by creating placeholder routes alone.
