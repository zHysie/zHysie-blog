import type { CollectionEntry } from "astro:content";
import { getMarkdownExcerpt } from "./blog";
import { resolveRoute } from "../i18n/routes";
import type { Locale } from "./site-config";

export type TimelineItemKind = "post" | "daily";

export interface TimelineItem {
  id: string;
  kind: TimelineItemKind;
  date: Date;
  title: string;
  excerpt: string;
  href: string;
}

export interface TimelineMonthGroup {
  month: number;
  items: TimelineItem[];
}

export interface TimelineYearGroup {
  year: number;
  items: TimelineItem[];
  months: TimelineMonthGroup[];
  stats: {
    posts: number;
    daily: number;
    total: number;
  };
}

const kindOrder: Record<TimelineItemKind, number> = {
  post: 0,
  daily: 1,
};

export function compareTimelineItems(a: TimelineItem, b: TimelineItem) {
  const dateDifference = a.date.getTime() - b.date.getTime();
  if (dateDifference !== 0) return dateDifference;

  const kindDifference = kindOrder[a.kind] - kindOrder[b.kind];
  if (kindDifference !== 0) return kindDifference;

  return a.id.localeCompare(b.id, "zh-CN");
}

export function buildTimelineItems(
  posts: readonly CollectionEntry<"blog">[],
  daily: readonly CollectionEntry<"daily">[],
  locale: Locale,
): TimelineItem[] {
  const postItems: TimelineItem[] = posts
    .filter((post) => post.data.locale === locale && !post.data.draft)
    .map((post) => ({
      id: `post-${post.id}`,
      kind: "post",
      date: new Date(post.data.publishDate),
      title: post.data.title,
      excerpt:
        post.data.description?.trim() ||
        getMarkdownExcerpt(post.body ?? "", 120),
      href: resolveRoute(locale, `/posts/${post.id}`),
    }));

  const dailyItems: TimelineItem[] = daily.map((entry) => {
    const bodyExcerpt = getMarkdownExcerpt(entry.body ?? "", 120);

    return {
      id: `daily-${entry.id}`,
      kind: "daily",
      date: new Date(entry.data.publishDate),
      title: entry.data.title?.trim() || bodyExcerpt || "一则日常",
      excerpt:
        entry.data.title && bodyExcerpt !== entry.data.title ? bodyExcerpt : "",
      href: `${resolveRoute(locale, "/daily")}#daily-${entry.id}`,
    };
  });

  return [...postItems, ...dailyItems].sort(compareTimelineItems);
}

export function groupTimelineItems(items: readonly TimelineItem[]) {
  const byYear = new Map<number, TimelineItem[]>();

  for (const item of [...items].sort(compareTimelineItems)) {
    const year = item.date.getUTCFullYear();
    const yearItems = byYear.get(year) ?? [];
    yearItems.push(item);
    byYear.set(year, yearItems);
  }

  return [...byYear.entries()].map<TimelineYearGroup>(([year, yearItems]) => ({
    year,
    items: yearItems,
    months: Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      items: yearItems.filter((item) => item.date.getUTCMonth() === index),
    })),
    stats: {
      posts: yearItems.filter((item) => item.kind === "post").length,
      daily: yearItems.filter((item) => item.kind === "daily").length,
      total: yearItems.length,
    },
  }));
}

export function getUtcYearProgress(date: Date) {
  const year = date.getUTCFullYear();
  const start = Date.UTC(year, 0, 1);
  const end = Date.UTC(year + 1, 0, 1);
  return (date.getTime() - start) / (end - start);
}
