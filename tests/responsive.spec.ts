import { expect, test } from "@playwright/test";

test("homepage renders without horizontal overflow", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const overflow = await page.evaluate(() => {
    const html = document.documentElement;
    return html.scrollWidth - html.clientWidth;
  });

  expect(overflow).toBeLessThanOrEqual(1);
});

test("quality and social proof sections appear and stay stable on scroll", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.getByRole("heading", { name: /Engineered in 5 precision layers/i }).scrollIntoViewIfNeeded();
  await expect(page.getByText("Quality Architecture")).toBeVisible();

  for (let i = 0; i < 8; i += 1) {
    await page.mouse.wheel(0, 650);
    await page.waitForTimeout(120);
  }

  await expect(page.getByRole("heading", { name: /Trusted by leading facade teams/i })).toBeVisible();

  const qualityBox = await page
    .getByRole("heading", { name: /Engineered in 5 precision layers/i })
    .boundingBox();
  const socialBox = await page
    .getByRole("heading", { name: /Trusted by leading facade teams/i })
    .boundingBox();

  expect(qualityBox).not.toBeNull();
  expect(socialBox).not.toBeNull();
});
