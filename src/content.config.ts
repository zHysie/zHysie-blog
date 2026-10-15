import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";

// The public site is Chinese-first. English is retained only inside Starlight docs.
const localeSchema = z.enum(["zh-CN"]);

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\.[^/.]+$/, ""),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      locale: localeSchema,
      publishDate: z.date(),
      updatedAt: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      category: z.string().default("未分类"),
      tags: z.array(z.string()).default([]),
      author: z.string().default("zHysie"),
      authorId: z.string().optional(),
      uid: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .optional(),
      faqs: z
        .array(z.object({ question: z.string(), answer: z.string() }))
        .optional(),
      toc: z.boolean().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      svgSlug: z.string().optional(),
      translationKey: z.string().optional(),
    }),
});

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

const pageSectionSchema = z.object({
  type: z.enum(["hero", "cta", "features", "faq", "trust"]),
  title: z.string().optional(),
  content: z.string().optional(),
  ctaText: z.string().optional(),
  ctaHref: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        icon: z.string().optional(),
      }),
    )
    .optional(),
});

const pages = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/pages",
    generateId: ({ entry }) => entry.replace(/\.[^/.]+$/, ""),
  }),
  schema: z.object({
    locale: localeSchema,
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    sections: z.array(pageSectionSchema).default([]),
    order: z.number().default(0),
    translationKey: z.string().optional(),
  }),
});

const authors = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/authors",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),
    social: z
      .object({
        twitter: z.string().optional(),
        github: z.string().optional(),
        linkedin: z.string().optional(),
        email: z.string().optional(),
      })
      .optional(),
  }),
});

const faqs = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/faqs",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().optional(),
    order: z.number().default(0),
    locale: localeSchema,
  }),
});

const stack = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/stack",
    generateId: ({ entry }) => entry.replace(/\.[^/.]+$/, ""),
  }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    version: z.string(),
    url: z.string().url(),
    icon: z.string(),
    colorOklch: z.string(),
    order: z.number().default(0),
  }),
});

const settings = defineCollection({
  loader: glob({
    pattern: "settings.yml",
    base: "./src/content",
    generateId: ({ entry }) => entry.replace(/\.[^/.]+$/, ""),
  }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    url: z.string().optional(),
    defaultLocale: localeSchema.default("zh-CN"),
    analyticsProvider: z.enum(["none", "gtm", "umami"]).default("none"),
    gtmId: z.string().optional(),
    umamiUrl: z.string().optional(),
    umamiId: z.string().optional(),
    mapLatitude: z.string().optional(),
    mapLongitude: z.string().optional(),
    orgName: z.string().optional(),
    orgEmail: z.string().optional(),
  }),
});

const daily = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/daily",
    generateId: ({ entry }) => entry.replace(/\.[^/.]+$/, ""),
  }),
  schema: z.object({
    title: z.string().optional(),
    publishDate: z.date(),
  }),
});

export const collections = {
  blog,
  docs,
  pages,
  settings,
  authors,
  faqs,
  stack,
  daily,
};
