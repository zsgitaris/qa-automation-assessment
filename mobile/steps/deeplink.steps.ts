import { When, Then } from "@cucumber/cucumber";
import type { MobileWorld } from "../support/world";
import { execSync } from "node:child_process";
import ProductsScreen from "../pages/ProductsScreen";
import WebViewScreen from "../pages/WebViewScreen";

/**
 * Deep link support exists in the app (added in v2.1.0), but the exact URI schemes vary by build.
 * To run these scenarios, set the env var named in the feature (e.g. DEEPLINK_PRODUCTS).
 */
When("I open deep link from env {string}", async function (this: MobileWorld, envKey: string) {
  const url = process.env[envKey];
  if (!url) return "pending";

  const udid = process.env.ANDROID_UDID;
  if (!udid) throw new Error("Missing ANDROID_UDID for deep link");

  // Best-effort ADB VIEW intent
  const cmd = `adb -s ${udid} shell am start -W -a android.intent.action.VIEW -d "${url}"`;
  execSync(cmd, { stdio: "ignore" });
});

Then("the app should show either Products or WebView screen", async function (this: MobileWorld) {
  const products = new ProductsScreen(this.driver);
  const webview = new WebViewScreen(this.driver);

  const ok =
    (await products.isLoaded(10000).then(() => true).catch(() => false)) ||
    (await webview.isLoaded(10000).then(() => true).catch(() => false));

  if (!ok) throw new Error("Neither Products nor WebView screen is visible after deep link");
});
