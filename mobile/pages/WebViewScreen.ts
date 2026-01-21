import type { Browser } from "webdriverio";
import { findFirst, pauseSlowmo, safeHideKeyboard } from "./_utils";

export default class WebViewScreen {
  constructor(private driver: Browser) {}

  get title() {
    return this.driver.$("~test-WEBVIEW");
  }

  async urlInput() {
    return findFirst(this.driver, [
      "~test-enter a https url here...",
      "~test-Enter a https url here...",
      "~test-URL",
      "//*[@text='https://www.google.com']",
      "//android.widget.EditText",
    ], 15000);
  }

  async goButton() {
    return findFirst(this.driver, [
      "~test-GO TO SITE",
      "~test-GO",
      "//*[@text='GO TO SITE']",
      "//*[@text='GO']",
    ], 15000);
  }

  async isLoaded(timeout = 15000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (await (await this.driver.$("~test-WEBVIEW")).isExisting()) return true;
      if (await (await this.driver.$("//android.widget.EditText")).isExisting()) return true;
      await this.driver.pause(250);
    }
    throw new Error("WebView screen did not load in time");
  }

  // Alias for backward compatibility
  async waitForLoaded(timeout = 15000) {
    return this.isLoaded(timeout);
  }

  async loadUrl(url: string) {
    const input = await this.urlInput();
    await input.click();
    await input.setValue(url);
    await safeHideKeyboard(this.driver);
    const go = await this.goButton();
    await go.click();
    await pauseSlowmo(this.driver);
  }

  async waitForWebContent(timeout = 20000) {
    const webview = await this.driver.$("//android.webkit.WebView");
    await webview.waitForExist({ timeout });
  }
}
