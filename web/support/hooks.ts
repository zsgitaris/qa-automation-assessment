import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  Status,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { chromium, type Browser } from "playwright";
import { WebWorld } from "./world";

import fs from "fs";
import path from "path";

setDefaultTimeout(60_000);

let browser: Browser;

function safeName(name: string) {
  return name.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").toLowerCase();
}

BeforeAll(async () => {
  const headless = process.env.HEADLESS !== "false"; // default: headless
  const slowMo = Number(process.env.SLOWMO || 0); // default: 0ms

  browser = await chromium.launch({
    headless,
    slowMo,
  });
});

AfterAll(async () => {
  await browser?.close();
});

Before(async function (this: WebWorld, scenario) {
  this.browser = browser;

  const scenarioName = safeName(scenario.pickle.name);
  (this as any).scenarioName = scenarioName;

  // Prepare artifacts folders
  const artifactsDir = path.join(process.cwd(), "artifacts");
  const tracesDir = path.join(artifactsDir, "traces");
  const videosDir = path.join(artifactsDir, "videos");
  fs.mkdirSync(tracesDir, { recursive: true });
  fs.mkdirSync(videosDir, { recursive: true });

  // Create context (optional video)
  const recordVideo = process.env.VIDEO === "true";
  this.context = await browser.newContext(
    recordVideo
      ? { recordVideo: { dir: videosDir, size: { width: 1280, height: 720 } } }
      : {}
  );

  this.page = await this.context.newPage();

  // Collect console logs (useful when error)
  (this as any).consoleLogs = [];
  this.page.on("console", (msg) => {
    (this as any).consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
  });

  // Start trace per scenario (optional)
  if (process.env.TRACE === "true") {
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    });
  }
});

After(async function (this: WebWorld, scenario) {
  const scenarioName = (this as any).scenarioName || "scenario";

  // Keep reference before closing context
  const page = this.page;
  const ctx = this.context;
  const video = page?.video();

  // If failed: attach screenshot + url + console logs
  if (scenario.result?.status === Status.FAILED && page) {
    try {
      const screenshot = await page.screenshot({ fullPage: true });
      await this.attach(screenshot, "image/png");
    } catch {}

    try {
      await this.attach(`URL: ${page.url()}`, "text/plain");
    } catch {}

    try {
      const logs: string[] = (this as any).consoleLogs || [];
      if (logs.length) {
        await this.attach(logs.join("\n"), "text/plain");
      }
    } catch {}
  }

  // Stop trace and attach trace zip (optional)
  if (process.env.TRACE === "true" && ctx) {
    const tracePath = path.join(process.cwd(), "artifacts", "traces", `${scenarioName}.zip`);
    try {
      await ctx.tracing.stop({ path: tracePath });
      await this.attach(fs.readFileSync(tracePath), "application/zip");
    } catch {}
  }

  // Close context (this will finalize video)
  await ctx?.close();

  // Attach video (optional)
  if (process.env.VIDEO === "true" && video) {
    try {
      const videoPath = await video.path();
      await this.attach(fs.readFileSync(videoPath), "video/webm");
    } catch {}
  }
});
