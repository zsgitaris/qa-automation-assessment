import type { Browser } from "webdriverio";
import { pauseSlowmo } from "./_utils";

export default class ProductDetailsScreen {
  constructor(private driver: Browser) {}

  get backButton() {
    return this.driver.$("~test-BACK TO PRODUCTS");
  }

  get addToCartButton() {
    return this.driver.$("~test-ADD TO CART");
  }

  get removeButton() {
    return this.driver.$("~test-REMOVE");
  }

  get itemTitle() {
    // On details page, item title often uses same id as list
    return this.driver.$("~test-Item title");
  }

  async isLoaded(timeout = 20000) {
    await this.backButton.waitForDisplayed({ timeout });
    return true;
  }

  async assertItemTitle(itemName: string, timeout = 20000) {
    await this.itemTitle.waitForDisplayed({ timeout });
    const txt = (await this.itemTitle.getText()).trim();
    if (txt !== itemName) {
      throw new Error(`Expected details title to be "${itemName}" but got "${txt}"`);
    }
  }

  async addToCart(timeout = 20000) {
    if (await this.removeButton.isExisting()) return;
    await this.addToCartButton.waitForDisplayed({ timeout });
    await this.addToCartButton.click();
    await pauseSlowmo(this.driver);
  }

  async removeFromCart(timeout = 20000) {
    if (!(await this.removeButton.isExisting())) return;
    await this.removeButton.waitForDisplayed({ timeout });
    await this.removeButton.click();
    await pauseSlowmo(this.driver);
  }

  async goBack(timeout = 20000) {
    await this.backButton.waitForDisplayed({ timeout });
    await this.backButton.click();
    await pauseSlowmo(this.driver);
  }
}
