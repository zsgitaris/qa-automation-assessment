import type { Browser } from "webdriverio";
import { findFirst } from "./_utils";

export default class BiometricsScreen {
  constructor(private driver: Browser) {}

  async isLoaded(timeout = 15000) {
    await findFirst(this.driver, [
      "//*[@text='Biometrics']",
      "//*[contains(@text,'Bio')]",
      "~test-BIOMETRICS",
    ], timeout);
    return true;
  }

  async enable() {
    // Placeholder: depends on app version
    const toggle = await findFirst(this.driver, [
      "~test-biometric-toggle",
      "//*[@resource-id='biometrics_toggle']",
      "//*[@class='android.widget.Switch']",
    ], 8000);
    await toggle.click();
  }
}
