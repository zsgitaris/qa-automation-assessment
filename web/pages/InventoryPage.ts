import { Page, Locator } from "playwright";

export class InventoryPage {
  private readonly page: Page;

  private readonly title: Locator;
  private readonly cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.locator(".title");
    this.cart = this.page.locator(".shopping_cart_link");
  }

  async isLoaded(): Promise<boolean> {
    return await this.title.isVisible();
  }

  async addItemToCart(itemName: string) {
    const itemCard = this.page
      .locator(".inventory_item")
      .filter({ has: this.page.locator(".inventory_item_name", { hasText: itemName }) });

    await itemCard.locator("button:has-text('Add to cart')").click();
  }

  async openCart() {
    await this.cart.click();
  }
}
