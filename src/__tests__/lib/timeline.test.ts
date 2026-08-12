import type { CollectionEntry } from "astro:content";
import { describe, expect, it } from "vitest";
import {
  buildTimelineItems,
  compareTimelineItems,
  getUtcYearProgress,
  groupTimelineItems,
  type TimelineItem,
} from "../../lib/timeline";

function post(
  id: string,
  publishDate: string,
  overrides: Partial<CollectionEntry<"blog">["data"]> = {},
) {
  return {
    id,
    body: "正文第一段。",
    data: {
      title: id,
      locale: "zh-CN",
      publishDate: new Date(publishDate),
      draft: false,
      featured: false,
      category: "测试",
      tags: [],
      author: "zHysie",
      ...overrides,
    },
  } as CollectionEntry<"blog">;
}

function daily(id: string, publishDate: string) {
  return {
    id,
    body: "今天记下一件小事。",
    data: { title: id, publishDate: new Date(publishDate) },
  } as CollectionEntry<"daily">;
}

describe("timeline data", () => {
  it("merges all visible localized posts and daily entries in ascending order", () => {
    const items = buildTimelineItems(
      [
        post("later", "2026-08-10"),
        post("draft", "2026-01-01", { draft: true }),
      ],
      [daily("earlier", "2026-06-10")],
      "zh-CN",
    );

    expect(items.map((item) => item.id)).toEqual([
      "daily-earlier",
      "post-later",
    ]);
    expect(items[0].href).toBe("/daily#daily-earlier");
    expect(items[1].href).toBe("/posts/later");
  });

  it("uses kind then id for deterministic same-day ordering", () => {
    const date = new Date("2026-08-04T00:00:00.000Z");
    const items: TimelineItem[] = [
      {
        id: "daily-b",
        kind: "daily",
        date,
        title: "B",
        excerpt: "",
        href: "#",
      },
      { id: "post-z", kind: "post", date, title: "Z", excerpt: "", href: "#" },
      { id: "post-a", kind: "post", date, title: "A", excerpt: "", href: "#" },
    ];

    expect(items.sort(compareTimelineItems).map((item) => item.id)).toEqual([
      "post-a",
      "post-z",
      "daily-b",
    ]);
  });

  it("creates all twelve months and yearly totals", () => {
    const items = buildTimelineItems(
      [post("post", "2025-12-31")],
      [daily("daily", "2026-01-01")],
      "zh-CN",
    );
    const years = groupTimelineItems(items);

    expect(years.map((group) => group.year)).toEqual([2025, 2026]);
    expect(years[0].months).toHaveLength(12);
    expect(years[0].stats).toEqual({ posts: 1, daily: 0, total: 1 });
    expect(years[1].stats).toEqual({ posts: 0, daily: 1, total: 1 });
  });

  it("calculates UTC placement without local timezone drift", () => {
    expect(getUtcYearProgress(new Date("2026-01-01T00:00:00.000Z"))).toBe(0);
    expect(
      getUtcYearProgress(new Date("2026-12-31T00:00:00.000Z")),
    ).toBeGreaterThan(0.99);
  });
});
