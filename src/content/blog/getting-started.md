---
title: "Astro 与 Cloudflare 入门"
description: "记录这个博客如何用 Astro、Markdown 与 Cloudflare Pages 组成一条可维护的发布链路。"
locale: "zh-CN"
publishDate: 2026-06-25
draft: false
category: "技术实践"
tags:
  - Astro
  - Cloudflare
  - 静态站点
author: "zHysie"
translationKey: "getting-started"
---

## 为什么选择这套组合

这个博客的目标不是堆叠功能，而是让内容可以长期保存、修改和发布。**Astro** 负责生成静态页面，**Markdown 与 Git** 保存内容历史，**Cloudflare Pages** 负责把构建结果发布到网络。

## 内容集合做了什么

文章不是散落在项目里的任意文件。`src/content.config.ts` 为标题、发布日期、标签和作者等字段规定了结构，因此构建时就能发现缺失或错误的数据。

```typescript
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    locale: z.enum(["zh-CN"]),
    publishDate: z.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    author: z.string().default("zHysie"),
  }),
});
```

## 写作与发布

新文章放在 `src/content/blog/`，草稿保留 `draft: true`，准备好后再改为 `false`。每次发布前会检查类型、样式、链接、搜索索引与生产构建，避免“本地看起来正常”成为唯一标准。

## 接下来

这套结构仍会继续调整。重要的不是一次性搭完，而是让每次修改都有清晰边界，并且能被下一次写作继续使用。
