// To add a language: extend this union, add the code to
// SITE_CONFIG.locales, add label/prefix entries below, create a matching
// translations file in src/i18n, and add localized content and route handling.
export type Locale = "zh-CN";

export const SITE_CONFIG = {
  url: "https://zhysie.com",
  /** Default locale for fallback. */
  defaultLocale: "zh-CN" as const,
  /** Supported locales. */
  locales: ["zh-CN"] as const,
  /** Human-readable locale labels. */
  localeLabels: {
    "zh-CN": "简体中文",
  } as const,
  /** Short locale codes for URL prefixes. */
  localePrefixes: {
    "zh-CN": "zh-cn",
  } as const,
  /** Site name for metadata and JSON-LD. */
  name: "zHysie",
  /** Short description for metadata. */
  description: "zHysie 的个人网站：记录学习、开发、写作与日常。",
} as const;
