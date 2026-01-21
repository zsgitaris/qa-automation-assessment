import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export class LoginPage {
  private readonly page: Page;

  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;

    this.username = this.page.locator("#user-name");
    this.password = this.page.locator("#password");
    this.loginBtn = this.page.locator("#login-button");
    this.errorMsg = this.page.locator("[data-test='error']");
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async open() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async getErrorText(): Promise<string> {
    return await this.errorMsg.innerText();
  }

  async assertOnProductsPage() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.locator(".title")).toHaveText("Products");
  }

  async assertErrorContains(text: string) {
    await expect(this.errorMsg).toBeVisible();
    await expect(this.errorMsg).toContainText(text);
  }
}
