import type { Browser } from "webdriverio";
import { pauseSlowmo, safeHideKeyboard } from "./_utils";

export default class CheckoutInfoScreen {
  constructor(private driver: Browser) {}

  get title() {
    return this.driver.$("~test-CHECKOUT: INFORMATION");
  }

  get firstName() {
    return this.driver.$("~test-First Name");
  }

  get lastName() {
    return this.driver.$("~test-Last Name");
  }

  get postalCode() {
    return this.driver.$("~test-Zip/Postal Code");
  }

  get continueButton() {
    return this.driver.$("~test-CONTINUE");
  }

  get cancelButton() {
    return this.driver.$("~test-CANCEL");
  }

  get errorMessage() {
    return this.driver.$("~test-Error message");
  }

  async isLoaded(timeout = 15000) {
    await this.title.waitForDisplayed({ timeout });
    return true;
  }

  // Alias for backward compatibility
  async waitForLoaded(timeout = 15000) {
    return this.isLoaded(timeout);
  }

  async fill(first: string, last: string, zip: string) {
    await this.firstName.setValue(first);
    await safeHideKeyboard(this.driver);
    await pauseSlowmo(this.driver);

    await this.lastName.setValue(last);
    await safeHideKeyboard(this.driver);
    await pauseSlowmo(this.driver);

    await this.postalCode.setValue(zip);
    await safeHideKeyboard(this.driver);
    await pauseSlowmo(this.driver);
  }

  async continue(timeout = 15000) {
    await this.continueButton.waitForDisplayed({ timeout });
    await this.continueButton.click();
    await pauseSlowmo(this.driver);
  }

  async cancel(timeout = 15000) {
    await this.cancelButton.waitForDisplayed({ timeout });
    await this.cancelButton.click();
    await pauseSlowmo(this.driver);
  }

  async getErrorText(timeout = 8000) {
    await this.errorMessage.waitForDisplayed({ timeout });
    return this.errorMessage.getText();
  }
}
