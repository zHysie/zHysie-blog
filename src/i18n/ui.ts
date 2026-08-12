import type { Locale } from "../lib/site-config";
import zhCN from "./zh-CN.json";

export type TranslationDict = Record<string, string>;

// Add new locales here alongside their JSON file.
export const translations: Partial<Record<Locale, TranslationDict>> = {
  "zh-CN": zhCN,
};

/**
 * Get a translated string for the given locale and key.
 * Falls back to the key itself if not found (fail loud during dev).
 */
export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? key;
}
