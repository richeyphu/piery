import { test, expect } from "@playwright/test";

test("should have heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "πery" })).toBeVisible();
});
