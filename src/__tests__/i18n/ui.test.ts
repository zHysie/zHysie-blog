import { describe, it, expect } from "vitest";
import { t, translations } from "../../i18n/ui";

describe("t()", () => {
  it("returns the Chinese string for a known key", () => {
    expect(t("zh-CN", "nav.home")).toBe("首页");
  });

  it("returns the key as fallback when missing", () => {
    expect(t("zh-CN", "nonexistent.key")).toBe("nonexistent.key");
  });

  it("exposes the active locale dictionary", () => {
    expect(translations["zh-CN"]).toBeDefined();
    expect(Object.keys(translations["zh-CN"] ?? {}).length).toBeGreaterThan(0);
  });
});
