import { defineConfig } from "@playwright/test";

// Independent of existing suites: real app, local API double, no credentials.
const port = Number(process.env.BRAND_REVIEW_PORT ?? 3440);
export default defineConfig({
  testDir: "./tests",
  testMatch: "brand-revision.spec.ts",
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: `http://localhost:${port}`,
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node tests/support/brand-revision-server.mjs",
    url: `http://localhost:${port}/ciftlik`,
    reuseExistingServer: false,
    timeout: 120_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
