import { test, expect } from "@playwright/test";

test.describe("contact page", () => {
  test("shows verified contact methods", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "保持联系" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /发送邮件至/ }),
    ).toHaveAttribute("href", "mailto:milzamsz@gmail.com");
  });
});
