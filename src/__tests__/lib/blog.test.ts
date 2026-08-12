import { describe, expect, it } from "vitest";
import { getMarkdownExcerpt } from "../../lib/blog";

describe("getMarkdownExcerpt", () => {
  it("returns the first Chinese body paragraph", () => {
    expect(
      getMarkdownExcerpt("## 标题\n\n这是正文第一段。\n\n这是第二段。"),
    ).toBe("这是正文第一段。");
  });

  it("joins wrapped English lines and removes inline Markdown", () => {
    expect(
      getMarkdownExcerpt(
        "## Heading\n\nA **short** paragraph with [a link](https://example.com)\nacross two lines.",
      ),
    ).toBe("A short paragraph with a link across two lines.");
  });

  it("skips fenced code before body text", () => {
    expect(
      getMarkdownExcerpt(
        "```ts\nconst hidden = true;\n```\n\nVisible paragraph.",
      ),
    ).toBe("Visible paragraph.");
  });

  it("truncates long text with an ellipsis", () => {
    expect(getMarkdownExcerpt("abcdefghijklmnop", 10)).toBe("abcdefghi…");
  });

  it("returns an empty string when no body text exists", () => {
    expect(getMarkdownExcerpt("# Heading\n\n![Cover](cover.webp)")).toBe("");
  });
});
