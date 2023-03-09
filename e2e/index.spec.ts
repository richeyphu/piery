import { test, expect } from "@playwright/test";

test.describe("Page Heading", () => {
  test("should have `index` heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "π" })).toBeVisible();
  });

  test("should have `lite` heading", async ({ page }) => {
    await page.goto("/lite");
    await expect(page.getByRole("heading", { name: "π" })).toBeVisible();
  });

  test("should have `stats` heading", async ({ page }) => {
    await page.goto("/stats");
    await expect(page.getByRole("heading", { name: "π" })).toBeVisible();
  });
});
