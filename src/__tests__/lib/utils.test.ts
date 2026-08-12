import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatNumericDate,
  formatDateShort,
  slugify,
  truncate,
  capitalize,
  groupBy,
  calcReadingTime,
} from "../../lib/utils";

describe("formatDate", () => {
  it("formats a Chinese long date", () => {
    expect(formatDate(new Date("2025-01-15"), "zh-CN")).toBe("2025年1月15日");
  });
});

describe("formatDateShort", () => {
  it("formats a short Chinese date", () => {
    expect(formatDateShort(new Date("2025-01-15"), "zh-CN")).toBe(
      "2025年1月15日",
    );
  });
});

describe("formatNumericDate", () => {
  it("formats a locale-independent numeric date", () => {
    expect(formatNumericDate(new Date("2026-08-08"))).toBe("2026/8/8");
  });
});

describe("slugify", () => {
  it("slugifies a plain string", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  it("strips accents and punctuation", () => {
    expect(slugify("Apa kabar?")).toBe("apa-kabar");
  });

  it("normalizes diacritics", () => {
    expect(slugify("café résumé")).toBe("cafe-resume");
  });
});

describe("truncate", () => {
  it("truncates a long string", () => {
    expect(truncate("Hello World", 5)).toBe("Hello…");
  });

  it("leaves a short string untouched", () => {
    expect(truncate("Hi", 10)).toBe("Hi");
  });
});

describe("capitalize", () => {
  it("capitalizes the first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("handles empty strings", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("groupBy", () => {
  it("groups items by a key", () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 1 }];
    const grouped = groupBy(items, "a");
    expect(grouped["1"]).toHaveLength(2);
    expect(grouped["2"]).toHaveLength(1);
  });
});

describe("calcReadingTime", () => {
  it("counts words and estimates minutes", () => {
    const result = calcReadingTime("word ".repeat(200).trim());
    expect(result.words).toBe(200);
    expect(result.minutes).toBe(1);
  });

  it("returns at least one minute for short content", () => {
    const result = calcReadingTime("hello world");
    expect(result.minutes).toBe(1);
    expect(result.words).toBe(2);
  });
});
