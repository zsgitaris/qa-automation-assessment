import type { Browser } from "webdriverio";

export default class QRCodeScannerScreen {
  constructor(private driver: Browser) {}

  private byTextContains(text: string) {
    return this.driver.$(`android=new UiSelector().textContains("${text}")`);
  }

  async waitForLoaded(timeout = 20000) {
    const header = this.driver.$("~test-QR CODE SCANNER");
    const h = (await header.isExisting()) ? header : this.byTextContains("QR CODE");
    await h.waitForDisplayed({ timeout });
  }

  async allowCameraPermissionIfPrompted() {
    // Android permission dialog button texts vary by OS language/version.
    const allow = await this.driver.$(
      'android=new UiSelector().resourceIdMatches(".*:id/permission_allow.*")'
    );
    if (await allow.isDisplayed().catch(() => false)) {
      await allow.click();
    }
  }
}
