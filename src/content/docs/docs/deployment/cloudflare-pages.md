---
title: Cloudflare Pages
description: Deploying to Cloudflare Pages and managing your live site.
sidebar:
  order: 1
---

## Automatic Deployments

Every push to `master` can trigger a Cloudflare Pages deployment. The CI pipeline also runs linting, type checking, and security scans before building.

The `release.yml` workflow handles production deployments from version tags.

## Preview Deployments

Pull requests can get preview deployments, so changes can be reviewed before merging to `master`.

## Manual Deployment

```bash
pnpm build

# Deploy via wrangler
npx wrangler pages deploy dist --project-name=zhysie-blog --branch=master

# Or via Cloudflare Dashboard
# Project: astro-cloudflare
```

## Required Secrets

Set these in your Cloudflare Pages dashboard or GitHub repository:

| Secret           | Purpose                                                            |
| ---------------- | ------------------------------------------------------------------ |
| `CF_API_TOKEN`   | Cloudflare API token for deployments                               |
| `CF_ACCOUNT_ID`  | Your Cloudflare account ID                                         |
| `SITE_URL`       | Canonical URL of your site                                         |
| `CLEANUP_SECRET` | Bearer token guarding the R2 cleanup endpoint (only if you use R2) |

## R2 Media (optional)

The `R2_MEDIA` binding in `wrangler.jsonc` connects to a Cloudflare R2 bucket for
larger media assets. The secret-guarded `functions/api/cleanup.ts` worker can
prune orphaned objects. Remove the binding and worker if you don't need R2.

## Branch Configuration

- **`master`** — Production builds
- **Feature branches** — Preview builds triggered from pull requests
