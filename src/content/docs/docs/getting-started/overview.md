---
title: Overview
description: What the zHysie blog provides and how it is built.
sidebar:
  order: 1
---

A production-ready marketing, blog, and docs site built with **Astro** and **Cloudflare Pages**. Content is managed with Git and Markdown — no CMS or database required.

## Features

- **Chinese public site** — `zh-CN` is the only public locale; development docs remain English
- **Git-based content** — edit Markdown in `src/content`; deploy on merge
- **Performance** — Astro's zero-JS architecture with static generation and Cloudflare CDN
- **Docs** — Starlight-powered documentation with full-text search
- **SEO** — JSON-LD structured data, sitemaps, Open Graph meta, `robots.txt`, and dynamic `llms.txt`

## Tech Stack

| Layer     | Technology                                                        |
| --------- | ----------------------------------------------------------------- |
| Framework | [Astro](https://astro.build) v7                                   |
| Docs      | [Starlight](https://starlight.astro.build)                        |
| Styling   | [Tailwind CSS](https://tailwindcss.com) v4                        |
| Hosting   | [Cloudflare Pages](https://pages.cloudflare.com)                  |
| Media     | [Cloudflare R2](https://developers.cloudflare.com/r2/) (optional) |

## Next Steps

Read the [Quick Start](../getting-started/quick-start) guide to get the project running locally.
