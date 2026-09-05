import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { DEFAULT_THEME_CONFIG } from "../../lib/theme-engine/types.ts";

// Test transport only. No application routes, real credentials, or database.
const port = Number(process.env.BRAND_REVIEW_PORT ?? 3440);
const apiPort = port + 1;
const requests = [];
let catalogMode = "error";
const normalRow = {
  id: "11111111-1111-4111-8111-111111111111", slug: "test-normal-badem", name: "Normal katalog bademi",
  base_price: 200, source: "ciftlik", certification: "kabia_secki", main_image_url: "/images/kabia-badem.jpeg",
  category: { slug: "cig-badem" }, product_variants: [{ id: "22222222-2222-4222-8222-222222222222", label: "500 g", price: 200, stock_quantity: 5 }],
  product_images: [], reviews: [], short_description: "Yalnızca test sunucusunun sentetik katalog yanıtı.",
};
const api = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${apiPort}`);
  res.setHeader("access-control-allow-origin", `http://localhost:${port}`);
  res.setHeader("access-control-allow-headers", req.headers["access-control-request-headers"] ?? "authorization, apikey, content-type");
  res.setHeader("access-control-allow-methods", "GET, HEAD, OPTIONS, POST, PATCH, DELETE");
  res.setHeader("content-type", "application/json");
  if (req.method === "OPTIONS") return res.end();
  if (url.pathname === "/__test/reset") { requests.length = 0; catalogMode = url.searchParams.get("catalog") ?? "error"; return res.end("{}"); }
  if (url.pathname === "/__test/requests") return res.end(JSON.stringify(requests));
  let body = "";
  for await (const chunk of req) body += chunk;
  requests.push({ method: req.method, path: url.pathname, query: url.search, body });
  if (url.pathname === "/rest/v1/rpc/get_published_site_theme") {
    return res.end(JSON.stringify(DEFAULT_THEME_CONFIG));
  }
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 409;
    return res.end(JSON.stringify({ message: "Test transport refuses mutations" }));
  }
  if (["/rest/v1/site_settings", "/rest/v1/addresses", "/rest/v1/orders", "/rest/v1/favorites", "/rest/v1/cart_items", "/rest/v1/payment_methods"].includes(url.pathname)) return res.end("[]");
  if (["/rest/v1/carts", "/rest/v1/profiles"].includes(url.pathname)) return res.end("null");
  if (url.pathname === "/rest/v1/products" && catalogMode !== "error") {
    const requestedSlug = url.searchParams.get("slug");
    const match = catalogMode === "success" && (!requestedSlug || requestedSlug === `eq.${normalRow.slug}`);
    const single = req.headers.accept?.includes("vnd.pgrst.object");
    return res.end(JSON.stringify(single ? (match ? normalRow : null) : (match ? [normalRow] : [])));
  }
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "No synthetic response registered" }));
});
await new Promise((resolve, reject) => {
  api.once("error", reject);
  api.listen(apiPort, "localhost", resolve);
});

const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--webpack", "--hostname", "localhost", "-p", String(port)], {
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_ENV: "development",
    NEXT_TELEMETRY_DISABLED: "1",
    NEXT_PUBLIC_SUPABASE_URL: `http://localhost:${apiPort}`,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "brand-revision-test-anon-key",
    SUPABASE_SERVICE_ROLE_KEY: "",
    KABIA_BRAND_PREVIEW: process.env.KABIA_BRAND_PREVIEW === "1" ? "1" : "0",
  },
});
let stopping = false;
function stop() {
  if (stopping) return;
  stopping = true;
  child.kill("SIGTERM");
  api.close();
}
process.on("SIGTERM", stop);
process.on("SIGINT", stop);
child.on("exit", (code) => {
  api.close();
  process.exitCode = code ?? 0;
});
