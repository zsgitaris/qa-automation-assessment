import type { Browser } from "webdriverio";

export default class CheckoutInformationScreen {
  constructor(private driver: Browser) {}

  private async slowmo() {
    const ms = Number(process.env.SLOWMO || 0);
    if (ms > 0) await this.driver.pause(ms);
  }

  get firstName() {
    return this.driver.$("~test-First Name");
  }

  get lastName() {
    return this.driver.$("~test-Last Name");
  }

  get postalCode() {
    // pada sebagian build labelnya Zip/Postal Code
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

  async waitForLoaded(timeout = 20000) {
    // indikator minimal: first name input atau tombol CONTINUE
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (await this.firstName.isExisting()) return;
      if (await this.continueButton.isExisting()) return;
      await this.driver.pause(300);
    }
    throw new Error("CheckoutInformationScreen tidak ter-load (First Name / CONTINUE tidak ditemukan).");
  }

  async fill(first: string, last: string, zip: string, timeout = 20000) {
    await this.waitForLoaded(timeout);

    await this.firstName.clearValue();
    await this.firstName.setValue(first);
    await this.slowmo();

    await this.lastName.clearValue();
    await this.lastName.setValue(last);
    await this.slowmo();

    // kalau selector Zip/Postal Code tidak ada, coba fallback by textContains
    if (await this.postalCode.isExisting()) {
      await this.postalCode.clearValue();
      await this.postalCode.setValue(zip);
    } else {
      const el = await this.driver.$('android=new UiSelector().textContains("Zip")');
      if (await el.isExisting()) {
        await el.click();
        await this.driver.keys(zip);
      }
    }
    await this.slowmo();
  }

  async continue(timeout = 20000) {
    await this.waitForLoaded(timeout);
    await this.continueButton.click();
    await this.slowmo();
  }

  async getErrorText(timeout = 20000): Promise<string> {
    await this.errorMessage.waitForDisplayed({ timeout });
    return ((await this.errorMessage.getText()) || "").trim();
  }
}
