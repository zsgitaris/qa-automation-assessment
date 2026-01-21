import type { Browser } from "webdriverio";
import { pauseSlowmo, scrollToText } from "./_utils";

export default class CheckoutOverviewScreen {
  constructor(private driver: Browser) {}

  get title() {
    return this.driver.$("~test-CHECKOUT: OVERVIEW");
  }

  get finishButton() {
    return this.driver.$("~test-FINISH");
  }

  get cancelButton() {
    return this.driver.$("~test-CANCEL");
  }

  async isLoaded(timeout = 15000) {
    await this.title.waitForDisplayed({ timeout });
    return true;
  }

  // Alias for backward compatibility
  async waitForLoaded(timeout = 15000) {
    return this.isLoaded(timeout);
  }

  async finish(timeout = 15000) {
    await this.finishButton.waitForDisplayed({ timeout });
    await this.finishButton.click();
    await pauseSlowmo(this.driver);
  }

  async cancel(timeout = 15000) {
    await this.cancelButton.waitForDisplayed({ timeout });
    await this.cancelButton.click();
    await pauseSlowmo(this.driver);
  }

  async hasItem(itemName: string, timeout = 8000) {
    await scrollToText(this.driver, itemName, timeout);
    const el = await this.driver.$(`//*[@text="${itemName}"]`);
    return el.isDisplayed();
  }
}
