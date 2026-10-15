import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { siteConfig } from "../../config/site.config";
import { t } from "../../i18n/ui";
import { getMarkdownExcerpt } from "../../lib/blog";
import type { Locale } from "../../lib/site-config";

type OgKind =
  "home" | "page" | "blog" | "blog-list";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(value: string, limit = 110) {
  return value.length > limit
    ? `${value.slice(0, limit - 1).trimEnd()}…`
    : value;
}

function svgTemplate({
  kind,
  title,
  description,
  accent,
}: {
  kind: OgKind;
  title: string;
  description: string;
  accent: string;
}) {
  const altAccent =
    kind === "home"
      ? siteConfig.branding.colors.secondary
      : siteConfig.branding.colors.accent;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accent}" />
      <stop offset="100%" stop-color="${altAccent}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <circle cx="980" cy="120" r="180" fill="${siteConfig.branding.colors.background}" fill-opacity="0.08" />
  <circle cx="1120" cy="540" r="220" fill="${siteConfig.branding.colors.background}" fill-opacity="0.06" />
  <circle cx="140" cy="530" r="190" fill="${siteConfig.branding.colors.background}" fill-opacity="0.06" />
  <text x="80" y="92" fill="${siteConfig.branding.colors.background}" fill-opacity="0.82" font-size="28" font-family="Noto Sans SC, Arial, sans-serif" font-weight="700">${escapeXml(siteConfig.name)}</text>
  <text x="80" y="270" fill="${siteConfig.branding.colors.background}" font-size="64" font-family="Noto Serif SC, serif" font-weight="700">${escapeXml(title)}</text>
  <text x="80" y="350" fill="${siteConfig.branding.colors.background}" fill-opacity="0.9" font-size="30" font-family="Noto Sans SC, Arial, sans-serif" font-weight="500">${escapeXml(truncate(description, 120))}</text>
  <text x="80" y="560" fill="${siteConfig.branding.colors.background}" fill-opacity="0.72" font-size="22" font-family="JetBrains Mono, monospace">${escapeXml(siteConfig.url.replace(/^https?:\/\//, ""))}</text>
</svg>`;
}

function resolveMeta(kind: OgKind, locale: string, slug: string[]) {
  if (kind === "home") {
    return {
      title: siteConfig.name,
      description: siteConfig.description,
      accent: siteConfig.branding.colors.primary,
    };
  }

  if (kind === "blog-list") {
    return {
      title: "文章",
      description: "记录学习、开发、写作与日常观察。",
      accent: siteConfig.branding.colors.primary,
    };
  }

  if (kind === "blog") {
    const post = BLOG_BY_ID[slug[1] ?? ""];
    return {
      title: post?.title ?? siteConfig.name,
      description: post?.description ?? siteConfig.description,
      accent: siteConfig.branding.colors.primary,
    };
  }

  if (kind === "page") {
    if (slug[1] === "timeline") {
      return {
        title: t(locale as Locale, "timeline.title"),
        description: t(locale as Locale, "timeline.lead"),
        accent: siteConfig.branding.colors.primary,
      };
    }

    if (slug[1] === "daily") {
      return {
        title: t(locale as Locale, "daily.title"),
        description: t(locale as Locale, "daily.lead"),
        accent: siteConfig.branding.colors.accent,
      };
    }

    const page = PAGE_BY_LOCALE_AND_SLUG[`${slug[0] ?? ""}/${slug[1] ?? ""}`];
    return {
      title: page?.title ?? siteConfig.name,
      description: page?.description ?? siteConfig.description,
      accent: siteConfig.branding.colors.accent,
    };
  }

  return {
    title: siteConfig.name,
    description: siteConfig.description,
    accent: siteConfig.branding.colors.primary,
  };
}

const [BLOG, PAGES] = (await Promise.all([
  getCollection("blog"),
  getCollection("pages"),
])) as [
  CollectionEntry<"blog">[],
  CollectionEntry<"pages">[],
];

const BLOG_BY_ID: Record<string, { title: string; description: string }> =
  Object.fromEntries(
    BLOG.filter((entry: CollectionEntry<"blog">) => !entry.data.draft).map(
      (entry: CollectionEntry<"blog">) => [
        entry.id,
        {
          title: entry.data.title,
          description:
            entry.data.description?.trim() ||
            getMarkdownExcerpt(entry.body ?? "", 160) ||
            siteConfig.description,
        },
      ],
    ),
  );

const PAGE_BY_LOCALE_AND_SLUG: Record<
  string,
  { title: string; description: string }
> = Object.fromEntries(
  PAGES.map((entry: CollectionEntry<"pages">) => [
    `${entry.data.locale}/${entry.data.slug}`,
    { title: entry.data.title, description: entry.data.description },
  ]),
);

export async function getStaticPaths() {
  const paths: Array<{
    params: { slug: string };
    props: { kind: OgKind; locale: string; slug: string[] };
  }> = [];

  const listKinds: OgKind[] = ["home", "blog-list"];
  for (const locale of siteConfig.i18n.locales) {
    for (const kind of listKinds) {
      paths.push({
        params: { slug: `${kind}/${locale}` },
        props: { kind, locale, slug: [] },
      });
    }

    paths.push({
      params: { slug: `page/${locale}/daily` },
      props: { kind: "page", locale, slug: [locale, "daily"] },
    });
    paths.push({
      params: { slug: `page/${locale}/timeline` },
      props: { kind: "page", locale, slug: [locale, "timeline"] },
    });
  }

  for (const entry of BLOG.filter(
    (blog: CollectionEntry<"blog">) => !blog.data.draft,
  )) {
    paths.push({
      params: { slug: `blog/${entry.data.locale}/${entry.id}` },
      props: {
        kind: "blog",
        locale: entry.data.locale,
        slug: [entry.data.locale, entry.id],
      },
    });
  }

  for (const entry of PAGES) {
    paths.push({
      params: { slug: `page/${entry.data.locale}/${entry.data.slug}` },
      props: {
        kind: "page",
        locale: entry.data.locale,
        slug: [entry.data.locale, entry.data.slug],
      },
    });
  }

  return paths;
}

export async function GET({
  props,
}: {
  props: { kind: OgKind; locale: string; slug: string[] };
}) {
  const meta = resolveMeta(props.kind, props.locale, props.slug);
  return new Response(
    svgTemplate({
      kind: props.kind,
      title: meta.title,
      description: meta.description,
      accent: meta.accent,
    }),
    {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
