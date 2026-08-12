import { expect, test } from "@playwright/test";

test.describe("immersive timeline", () => {
  test("renders the combined archive without the regular site chrome", async ({
    page,
  }) => {
    await page.goto("/timeline", { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("heading", { name: "时光", level: 1 }),
    ).toHaveCount(1);
    await expect(page.locator(".timeline-event__card").first()).toBeVisible();
    const summary = page.locator(".timeline-year-summary[data-active]");
    await expect(summary.locator("[data-summary-month]")).toHaveText("MARCH");
    await expect(summary).toContainText("POSTS");
    await expect(summary).toContainText("MOMENTS");
    await expect(summary).toContainText("THINKINGS");
    await expect(summary).toContainText("YEARLY TOTAL");
    await expect(page.locator(".header")).toHaveCount(0);
    await expect(page.locator("footer")).toHaveCount(0);
  });

  test("opens search and switches theme from the floating tools", async ({
    page,
  }) => {
    await page.goto("/timeline", { waitUntil: "domcontentloaded" });

    await page.locator("[data-search-trigger]").click();
    await expect(page.locator("#search-modal")).toBeVisible();
    await page.keyboard.press("Escape");

    const themeToggle = page.locator("[data-theme-toggle]");
    const before = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    await themeToggle.click();
    await expect
      .poll(() =>
        page.evaluate(() =>
          document.documentElement.classList.contains("dark"),
        ),
      )
      .toBe(!before);
  });

  test("uses vertical wheel input to move one sticky track horizontally", async ({
    page,
  }) => {
    await page.goto("/timeline", { waitUntil: "domcontentloaded" });

    const track = page.locator("[data-timeline-track]");
    const canvas = page.locator(".timeline-canvas");
    const before = await track.evaluate(
      (element) => element.getBoundingClientRect().x,
    );
    const beforeScroll = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 1800);
    await expect
      .poll(() =>
        track.evaluate((element) => element.getBoundingClientRect().x),
      )
      .toBeLessThan(before - 100);
    const after = await track.evaluate(
      (element) => element.getBoundingClientRect().x,
    );
    const afterScroll = await page.evaluate(() => window.scrollY);
    const horizontalPerVertical =
      Math.abs(after - before) / Math.abs(afterScroll - beforeScroll);
    expect(horizontalPerVertical).toBeGreaterThan(0.62);
    expect(horizontalPerVertical).toBeLessThan(0.72);
    await expect(canvas).toHaveCSS("position", "sticky");
    expect(
      await canvas.evaluate((element) => element.getBoundingClientRect().y),
    ).toBe(0);
  });

  test("persists HQ mode and supports keyboard activation", async ({
    page,
  }) => {
    await page.goto("/timeline", { waitUntil: "domcontentloaded" });

    const quality = page.locator("[data-quality-toggle]");
    await quality.focus();
    await page.keyboard.press("Space");
    await expect(quality).toHaveAttribute("aria-pressed", "true");
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-quality-toggle]")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("keeps the horizontal canvas without page overflow on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/timeline", { waitUntil: "domcontentloaded" });

    await expect(page.locator(".timeline-scroll")).toBeVisible();
    await expect(page.locator(".timeline-canvas")).toHaveCSS(
      "position",
      "sticky",
    );
    const widths = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(widths.content).toBeLessThanOrEqual(widths.viewport + 1);
  });

  test("keeps the complete archive visible with reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/timeline", { waitUntil: "domcontentloaded" });

    const cards = page.locator(".timeline-static a");
    await expect(cards.first()).toBeVisible();
    await expect(cards.last()).toBeVisible();
    await expect(page.locator(".timeline-scroll")).toBeHidden();
  });
});
