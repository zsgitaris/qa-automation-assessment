import type { Browser } from "webdriverio";

export default class AboutScreen {
  constructor(private driver: Browser) {}

  private byTextContains(text: string) {
    return this.driver.$(`android=new UiSelector().textContains("${text}")`);
  }

  async waitForLoaded(timeout = 20000) {
    // About screen usually renders a webview or native text.
    // We keep this tolerant: look for "ABOUT" header or "Sauce" text.
    const aboutHeader = this.driver.$("~test-ABOUT");
    if (await aboutHeader.isExisting()) {
      await aboutHeader.waitForDisplayed({ timeout });
      return;
    }

    const fallback = this.byTextContains("ABOUT");
    await fallback.waitForDisplayed({ timeout });
  }
}
