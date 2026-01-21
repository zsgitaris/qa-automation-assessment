import type { Browser } from "webdriverio";
import { pauseSlowmo } from "./_utils";

export default class CheckoutCompleteScreen {
  constructor(private driver: Browser) {}

  get title() {
    return this.driver.$("~test-CHECKOUT: COMPLETE!");
  }

  get backHomeButton() {
    return this.driver.$("~test-BACK HOME");
  }

  async isLoaded(timeout = 15000) {
    await this.title.waitForDisplayed({ timeout });
    return true;
  }

  // Alias for backward compatibility
  async waitForLoaded(timeout = 15000) {
    return this.isLoaded(timeout);
  }

  async backHome(timeout = 15000) {
    await this.backHomeButton.waitForDisplayed({ timeout });
    await this.backHomeButton.click();
    await pauseSlowmo(this.driver);
  }
}
