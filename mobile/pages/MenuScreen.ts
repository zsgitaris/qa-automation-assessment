import type { Browser } from "webdriverio";
import { findFirst, pauseSlowmo } from "./_utils";

export class MenuScreen {
  constructor(private driver: Browser) {}

  private async tapMenuItem(labels: string[], timeout = 15000) {
    const selectors = labels.flatMap((l) => [
      `~test-${l}`,
      `~test-${l.toUpperCase()}`,
      `//*[@text="${l}"]`,
      `//*[contains(@text,"${l}")]`,
      `//*[contains(@content-desc,"${l}")]`,
    ]);
    const el = await findFirst(this.driver, selectors, timeout);
    await el.click();
    await pauseSlowmo(this.driver);
  }

  async logout(timeout = 20000) {
    await this.tapMenuItem(["LOGOUT", "Logout"], timeout);
  }

  /**
   * Added for compatibility with reset.steps.ts
   */
  async resetAppState(timeout = 20000) {
    await this.tapMenuItem(["RESET APP STATE", "Reset App State", "RESET"], timeout);
  }

  async openWebView(timeout = 20000) {
    await this.tapMenuItem(["WEBVIEW", "Webview", "WebView"], timeout);
  }

  async openGestures(timeout = 20000) {
    await this.tapMenuItem(["GESTURES", "Gestures"], timeout);
  }

  async openQRScanner(timeout = 20000) {
    await this.tapMenuItem(["QR CODE SCANNER", "QR CODE", "QR"], timeout);
  }

  async openDrawing(timeout = 20000) {
    await this.tapMenuItem(["DRAWING", "Drawing"], timeout);
  }

  async openGeoLocation(timeout = 20000) {
    await this.tapMenuItem(["GEO LOCATION", "GEOLOCATION", "Geo Location"], timeout);
  }

  async openBiometrics(timeout = 20000) {
    await this.tapMenuItem(["BIOMETRICS", "Biometrics", "TOUCH ID", "FACE ID"], timeout);
  }
}

export default MenuScreen;
