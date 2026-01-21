import type { Browser } from "webdriverio";
import BaseScreen from "./BaseScreen";
import { byTextContains } from "../support/helpers/selectors";

type Outcome = "success" | "failure";

export default class BiometricScreen extends BaseScreen {
  constructor(driver: Browser) {
    super(driver);
  }

  async triggerBiometricLogin(timeout = 20000) {
    // On some apps this is a button on login screen; on others it's in menu
    const btn = await this.find(
      [
        "~test-Biometric",
        "~test-Biometrics",
        "~test-Fingerprint",
        byTextContains("Biometric"),
        byTextContains("Touch"),
        byTextContains("Face"),
        byTextContains("Fingerprint"),
      ],
      timeout
    );
    await btn.click();
    await this.slowmo();
  }

  async resolveBiometricPrompt(outcome: Outcome, timeout = 20000) {
    // 1) If the app shows its own mock dialog with buttons, click it
    const successTexts = ["Success", "Match", "OK", "Authenticate", "Continue"];
    const failureTexts = ["Fail", "Failure", "No match", "Cancel", "Try again", "Not now"];

    const texts = outcome === "success" ? successTexts : failureTexts;

    for (const t of texts) {
      const el = await this.driver.$(byTextContains(t));
      if (await el.isExisting()) {
        await el.click();
        await this.slowmo();
        return;
      }
    }

    // 2) Try Android emulator fingerprint API
    const anyDriver: any = this.driver as any;
    if (typeof anyDriver.fingerPrint === "function") {
      await anyDriver.fingerPrint(outcome === "success" ? 1 : 999);
      await this.slowmo();
      return;
    }

    // 3) Fallback: just wait a bit (some setups auto-resolve)
    await this.driver.pause(Math.min(timeout, 1500));
  }
}
