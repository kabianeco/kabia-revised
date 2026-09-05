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

test.beforeEach(async ({ request }) => { await request.get("http://localhost:3441/__test/reset"); });

const previewEnabled = process.env.KABIA_BRAND_PREVIEW === "1";
test('preview detail reaches only a persistent guest cart and cannot enter payment', async ({page, request}) => {
  const response = await page.goto('/shop/onizleme-kabia-ciftligi');
  if (!previewEnabled) { expect(response?.status()).toBe(404); return; }
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', {name:'Örnek Badem',exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:'Favorilere ekle',exact:true})).toHaveCount(0);
  await expect(page.getByRole('button',{name:'Değerlendirme yaz',exact:true})).toHaveCount(0);
  await page.getByRole('button',{name:'Sepete ekle',exact:true}).click();
  await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('kabia_cart')??'[]').length)).toBe(1);
  expect(await page.evaluate(()=>localStorage.getItem('kabia_recently_viewed'))).toBeNull();
  await page.goto('/sepet');
  await expect(page.getByRole('button',{name:'Ödemeye geç',exact:true})).toBeDisabled();
  await expect(page.getByText('Sepetinizde önizleme ürünü var.',{exact:false})).toBeVisible();
  await page.reload();
  await expect(page.getByText('Örnek Badem',{exact:true})).toBeVisible();
  await page.goto('/odeme');
  await expect(page).toHaveURL(/\/sepet$/);
  await expect(page.getByRole('textbox',{name:/Kart numarası/})).toHaveCount(0);
  const api = (await request.get('http://localhost:3441/__test/requests'));
  const calls=await api.json() as {method:string,path:string}[];
  expect(calls.filter(c=>['POST','PATCH','DELETE'].includes(c.method) && c.path!=='/rest/v1/rpc/get_published_site_theme')).toEqual([]);
});

const previewCartItem = {
  id: "onizleme-kabia-ciftligi__500 g", slug: "onizleme-kabia-ciftligi", name: "Örnek Badem", variant: "500 g", price: 100, quantity: 1,
  image: "/images/kabia-badem.jpeg", variantId: "kabia-preview:kabia-ciftligi:500g", productId: "kabia-preview:kabia-ciftligi",
};
const normalCartItem = { ...previewCartItem, id: "normal__500g", slug: "test-normal-badem", name: "Normal katalog bademi", productId: "11111111-1111-4111-8111-111111111111", variantId: "22222222-2222-4222-8222-222222222222" };

test("restored mixed carts stay blocked in either flag state; quantity and removal persist", async ({ page, request }) => {
  await page.goto("/ciftlik");
  await page.evaluate((items) => localStorage.setItem("kabia_cart", JSON.stringify(items)), [normalCartItem, previewCartItem]);
  await page.goto("/sepet");
  await expect(page.getByText("Sepetinizde önizleme ürünü var.", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Örnek Badem adedini artır" }).click();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("kabia_cart")!)[1].quantity)).toBe(2);
  await page.reload();
  await expect(page.getByRole("button", { name: "Ödemeye geç", exact: true })).toBeDisabled();
  await page.goto("/odeme");
  await expect(page).toHaveURL(/\/sepet$/);
  await page.getByRole("button", { name: "Kaldır — Örnek Badem" }).click();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("kabia_cart")!).map((item: {slug: string}) => item.slug))).toEqual([normalCartItem.slug]);
  await expect(page.getByText("Sepetinizde önizleme ürünü var.", { exact: false })).toHaveCount(0);
  const calls = await (await request.get("http://localhost:3441/__test/requests")).json();
  expect(calls.filter((call: {method:string;path:string}) => call.method !== "GET" && call.path !== "/rest/v1/rpc/get_published_site_theme")).toEqual([]);
});

test("actual auth subscription excludes preview-only cart and favorites from login migration", async ({ page, request }) => {
  await page.goto("/ciftlik");
  await page.evaluate((item) => {
    localStorage.setItem("kabia_cart", JSON.stringify([item]));
    localStorage.setItem("kabia_favorites", JSON.stringify([item.slug]));
  }, previewCartItem);
  await page.goto(previewEnabled ? "/shop/onizleme-kabia-ciftligi" : "/sepet");
  await expect(page.getByText("Örnek Badem", { exact: true }).first()).toBeVisible();
  await page.evaluate(() => {
    // Supabase's existing cross-tab auth channel, consumed by the real AuthProvider.
    const channel = new BroadcastChannel("sb-localhost-auth-token");
    channel.postMessage({ event: "SIGNED_IN", session: { user: { id: "33333333-3333-4333-8333-333333333333", email: "test@example.invalid", created_at: "2026-01-01T00:00:00Z" } } });
    channel.close();
  });
  await expect.poll(async () => {
    const calls = await (await request.get("http://localhost:3441/__test/requests")).json();
    return calls.some((call: {path:string}) => call.path === "/rest/v1/carts");
  }).toBe(true);
  if (previewEnabled) {
    await expect(page.getByRole("button", { name: "Sepete ekle", exact: true })).toBeDisabled();
    await expect(page.getByText("Önizleme ürünleri yalnızca misafir sepetinde denenebilir.")).toBeVisible();
  } else {
    await expect(page.getByText("Örnek Badem", { exact: true })).toHaveCount(0);
  }
  const calls = await (await request.get("http://localhost:3441/__test/requests")).json();
  expect(calls.filter((call: {method:string;path:string}) => call.method !== "GET" && call.path !== "/rest/v1/rpc/get_published_site_theme")).toEqual([]);
  expect(calls.filter((call: {path:string;query:string}) => call.query?.includes("onizleme") || call.query?.includes("kabia-preview"))).toEqual([]);
});

test("store gate selects before catalog reads and preserves off-state successful, empty and error results", async ({ page, request }) => {
  for (const mode of ["success", "empty", "error"]) {
    await request.get(`http://localhost:3441/__test/reset?catalog=${mode}`);
    await page.goto("/magaza");
    await expect(page.locator("[data-store-listing]")).toBeVisible();
    if (previewEnabled) {
      await expect(page.getByRole("heading", { name: "Örnek Badem", exact: true })).toBeVisible();
    } else {
      await expect(page.getByText("Örnek Badem", { exact: true })).toHaveCount(0);
      await expect(page.getByText(mode === "success" ? "Normal katalog bademi" : mode === "empty" ? "Mağaza şu an boş." : "Ürünler şu anda yüklenemiyor.", { exact: true })).toBeVisible();
    }
    const calls = await (await request.get("http://localhost:3441/__test/requests")).json();
    const catalogReads = calls.filter((call: {path:string}) => ["/rest/v1/products", "/rest/v1/producers"].includes(call.path));
    expect(catalogReads.length === 0).toBe(previewEnabled);
  }
  for (const path of ["/shop/onizleme-unknown", "/magaza/unknown-producer"]) expect((await page.goto(path))?.status()).toBe(404);
});

test("preview producer stores validate source slugs and avoid catalog reads including story metadata", async ({ page, request }) => {
  const slugs = ["kabia-ciftligi", "geyce-setce-findik", "ege-ceviz", "anadolu-bal", "akinci-ihlamur", "domates-salcasi", "elma-sirkesi", "alic-sirkesi", "eriste", "tarhana"];
  for (const slug of slugs) {
    const response = await page.goto(`/magaza/${slug}`);
    expect(response?.status()).toBe(previewEnabled ? 200 : 404);
    if (previewEnabled) {
      await expect(page.locator('[data-store-listing] h2')).toHaveCount(1);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      await expect(page.locator('[data-store-listing] a[href^="/shop/onizleme-"]').first()).toHaveAttribute('href', `/shop/onizleme-${slug}`);
    }
  }
  if (previewEnabled) {
    await page.goto('/ureticiler/geyce-setce-findik');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    const calls = await (await request.get('http://localhost:3441/__test/requests')).json();
    expect(calls.filter((call: {path:string}) => ['/rest/v1/products', '/rest/v1/producers'].includes(call.path))).toEqual([]);
  }
});

test("store category pair, sorting, mobile disclosure and stock controls share one listing", async ({ page }) => {
  test.skip(!previewEnabled, "local example catalog only; off-state result/layout covered separately");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/magaza');
  const store = page.locator('[data-store-listing]');
  await expect(store.locator('h2')).toHaveCount(10);
  await expect(store.getByRole('button', { name: 'Stokta yok', exact: true })).toBeDisabled();
  await store.getByRole('link', { name: 'Fiyat: azalan', exact: true }).click();
  await expect(store.locator('h2').first()).toHaveText('Örnek Tarhana');
  await store.getByRole('link', { name: 'Çiğ Badem', exact: true }).click();
  await expect(page).toHaveURL(/kategori=cig-badem&kaynak=ciftlik/);
  await expect(store.locator('h2')).toHaveCount(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(store.locator('aside').first()).toBeHidden();
  await store.locator('summary').click();
  await expect(store.getByRole('link', { name: 'Varsayılan', exact: true })).toBeVisible();
});
