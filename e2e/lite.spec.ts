import { test } from "@playwright/test";
import { bakePiSteps, getPiByDigits } from "./test.utils";

test.describe("PI Oven Lite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/lite");
  });

  test("should bake the same result as `Math.PI`", async ({ page }) => {
    await bakePiSteps(
      page,
      Math.PI.toString().slice(2).length,
      Math.PI.toString()
    );
  });

  test("should bake 100 digits of PI", async ({ page }) => {
    await bakePiSteps(page, 100, getPiByDigits(100));
  });

  test("should bake 1000 digits of PI", async ({ page }) => {
    await bakePiSteps(page, 1000, getPiByDigits(1000));
  });

  test("should bake 10000 digits of PI", async ({ page }) => {
    await bakePiSteps(page, 10000, getPiByDigits(10000));
  });
});
