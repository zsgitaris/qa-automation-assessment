import type { Browser } from "webdriverio";
import { pauseSlowmo, safeHideKeyboard } from "./_utils";

export class LoginScreen {
  constructor(private driver: Browser) {}

  get username() {
    return this.driver.$("~test-Username");
  }

  get password() {
    return this.driver.$("~test-Password");
  }

  get loginButton() {
    return this.driver.$("~test-LOGIN");
  }

  get errorMessage() {
    return this.driver.$("~test-Error message");
  }

  async isLoaded(timeout = 20000) {
    await this.username.waitForDisplayed({ timeout });
    return true;
  }

  // Alias for backward compatibility
  async waitForLoaded(timeout = 20000) {
    return this.isLoaded(timeout);
  }

  async openLogin(timeout = 20000) {
    await this.username.waitForDisplayed({ timeout });
  }

  async login(user: string, pass: string, timeout = 20000) {
    await this.openLogin(timeout);

    await this.username.clearValue();
    await this.username.setValue(user);
    await pauseSlowmo(this.driver);

    await this.password.clearValue();
    await this.password.setValue(pass);
    await pauseSlowmo(this.driver);

    await this.loginButton.click();
    await pauseSlowmo(this.driver);

    await safeHideKeyboard(this.driver);
  }

  async waitForError(timeout = 20000) {
    await this.errorMessage.waitForDisplayed({ timeout });
  }

  async getErrorText(timeout = 20000): Promise<string> {
    await this.waitForError(timeout);
    return (await this.errorMessage.getText()).trim();
  }

  async getUsernameValue(timeout = 20000): Promise<string> {
    await this.username.waitForDisplayed({ timeout });
    return (await this.username.getText()).trim();
  }

  async getPasswordValue(timeout = 20000): Promise<string> {
    await this.password.waitForDisplayed({ timeout });
    return (await this.password.getText()).trim();
  }

  async chooseAutofillUser(username: string, timeout = 20000) {
    const userEl = await this.driver.$(`//*[@text="${username}"]`);
    await userEl.waitForDisplayed({ timeout });
    await userEl.click();
    await pauseSlowmo(this.driver);
  }
}

export default LoginScreen;
