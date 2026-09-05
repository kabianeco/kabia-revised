import { expect, test } from "@playwright/test";

const states = [
  ["2019", null, "Burada badem olmaz dediler. Biz toprağa kulak verdik.", "resim22.jpg"],
  ["2021", null, "946 çukur, 946 söz.", "marina-ilk-dikim.jpeg"],
  ["2022", null, "Bir kış sonra, yamaç yeşile durdu.", "marinada-2022.jpeg"],
  ["2023", null, "İki yaz sonra, dal sürgün verdi.", "marinada-2023.jpeg"],
  ["2024", null, "Kar altında, sabır çalışır.", "marinada-2024.jpeg"],
  ["2025", "Erken bahar", "Hava sıcaktı, bahçe sabredemedi.", "marinada-2025-ilkcicek.jpeg"],
  ["2025", "Don", "Dört gün, dört gece — tam çiçekte yakalandık.", "marinada-2025-don.jpeg"],
] as const;

for (const width of [390, 1280]) {
  test(`farm states preserve stage/image/approach geometry at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto("/ciftlik");
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    const stage = page.locator("[data-farm-timeline-stage]");
    await expect(stage).toBeVisible();
    await expect(page.getByRole("button", { name: "2019", exact: true })).toHaveAttribute("aria-pressed", "true");
    const geometry = () => page.evaluate(() => {
      const box = (selector: string) => {
        const rect = document.querySelector(selector)!.getBoundingClientRect();
        return { y: rect.y + window.scrollY, height: rect.height };
      };
      return {
        stage: box("[data-farm-timeline-stage]"),
        image: box('[data-farm-timeline-panel][aria-hidden="false"] [data-farm-timeline-image]'),
        substeps: box("[data-farm-timeline-substeps]"),
        approach: box("[data-farm-approach]"),
      };
    });
    const baseline = await geometry();
    for (const [year, substep, title, image] of states) {
      await page.getByRole("button", { name: year, exact: true }).click();
      if (substep) await page.getByRole("button", { name: substep, exact: true }).click();
      const active = page.locator('[data-farm-timeline-panel][aria-hidden="false"]');
      await expect(active.getByRole("heading")).toHaveText(title);
      await expect(active.locator("img")).toHaveAttribute("src", new RegExp(encodeURIComponent(image)));
      await expect.poll(() => active.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      const measured = await geometry();
      for (const part of ["stage", "image", "substeps", "approach"] as const) {
        expect(measured[part].height, `${year}/${substep} ${part} height`).toBeCloseTo(baseline[part].height, 1);
        expect(measured[part].y, `${year}/${substep} ${part} y`).toBeCloseTo(baseline[part].y, 1);
      }
      for (const panel of await page.locator('[data-farm-timeline-panel][aria-hidden="true"]').all()) {
        await expect(panel).toHaveAttribute("inert", "");
      }
    }
    await expect(page.getByRole("button", { name: "2026", exact: true })).toHaveCount(0);
    await expect(page.locator("[data-farm-approach]").getByRole("link")).toHaveAttribute("href", "/toprak");
  });
}

test("farm keyboard selection and reduced motion keep inactive controls inaccessible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ciftlik");
  const year = page.getByRole("button", { name: "2025", exact: true });
  await year.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Erken bahar", exact: true })).toHaveAttribute("aria-pressed", "true");
  const frost = page.getByRole("button", { name: "Don", exact: true });
  await frost.focus();
  await page.keyboard.press("Space");
  await expect(frost).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "2019", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("[data-farm-timeline-substeps]")).toHaveAttribute("inert", "");
  const active = page.locator('[data-farm-timeline-panel][aria-hidden="false"]');
  expect(await active.evaluate((el) => getComputedStyle(el).transitionProperty)).toBe("none");
});
