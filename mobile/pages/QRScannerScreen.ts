import { Browser } from "webdriverio";
import { findFirst } from "./_utils";

export default class QRScannerScreen {
  constructor(private driver: Browser) {}

  async isLoaded(timeout = 15000) {
    await findFirst(this.driver, [
      "//*[@text='QR Code Scanner']",
      "//*[contains(@text,'QR')]",
      "~test-QR CODE SCANNER",
      "~test-QR Scanner",
    ], timeout);
    return true;
  }

  // Alias for backward compatibility
  async waitForLoaded(timeout = 15000) {
    return this.isLoaded(timeout);
  }

  async allowCameraPermissionIfPrompted() {
    const allow = await this.driver.$(
      'android=new UiSelector().resourceIdMatches(".*:id/permission_allow.*")'
    );
    if (await allow.isDisplayed().catch(() => false)) {
      await allow.click();
    }
  }
}
