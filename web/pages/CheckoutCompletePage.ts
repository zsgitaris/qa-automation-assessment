import { Page, Locator } from "playwright";

export class CheckoutCompletePage {
  private readonly page: Page;

  private readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.locator(".complete-header");
  }

  async isLoaded(): Promise<boolean> {
    return await this.header.isVisible();
  }
}
