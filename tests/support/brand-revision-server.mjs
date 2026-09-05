import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { DEFAULT_THEME_CONFIG } from "../../lib/theme-engine/types.ts";

// Test transport only. No application routes, real credentials, or database.
const port = Number(process.env.BRAND_REVIEW_PORT ?? 3440);
const apiPort = port + 1;
const requests = [];
const api = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${apiPort}`);
  res.setHeader("access-control-allow-origin", `http://localhost:${port}`);
  res.setHeader("access-control-allow-headers", "authorization, apikey, content-type, x-client-info, prefer, x-supabase-api-version");
  res.setHeader("access-control-allow-methods", "GET, HEAD, OPTIONS, POST, PATCH, DELETE");
  res.setHeader("content-type", "application/json");
  if (req.method === "OPTIONS") return res.end();
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
  if (url.pathname === "/rest/v1/site_settings") return res.end("[]");
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
    NEXT_PUBLIC_KABIA_PREVIEW_FIXTURES: "0",
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
