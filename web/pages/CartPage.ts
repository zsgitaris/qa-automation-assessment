import type { Page } from "playwright";

export class CartPage {
  constructor(private readonly page: Page) {}

  async hasItem(itemName: string): Promise<boolean> {
    const item = this.page.locator(".cart_item").filter({ hasText: itemName });
    return await item.count() > 0;
  }

  async checkout() {
    await this.page.locator("#checkout").click();
  }
}
