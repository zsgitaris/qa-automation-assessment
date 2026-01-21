import type { Browser } from "webdriverio";
import { pauseSlowmo, scrollToText } from "./_utils";

export class ProductsScreen {
  constructor(private driver: Browser) {}

  // Header
  get title() {
    return this.driver.$("~test-PRODUCTS");
  }

  get menuButton() {
    return this.driver.$("~test-Menu");
  }

  get cartButton() {
    return this.driver.$("~test-Cart");
  }

  get cartBadge() {
    return this.driver.$("~test-Cart badge");
  }

  // Sorting
  get sortButton() {
    return this.driver.$("~test-Modal Selector Button");
  }

  async isLoaded(timeout = 20000) {
    await this.title.waitForDisplayed({ timeout });
    return true;
  }

  // Alias for backward compatibility
  async waitForLoaded(timeout = 20000) {
    return this.isLoaded(timeout);
  }

  async openMenu(timeout = 20000) {
    await this.menuButton.waitForDisplayed({ timeout });
    await this.menuButton.click();
    await pauseSlowmo(this.driver);
  }

  async openCart(timeout = 20000) {
    await this.cartButton.waitForDisplayed({ timeout });
    await this.cartButton.click();
    await pauseSlowmo(this.driver);
  }

  /**
   * Updated to accept an optional timeout argument for compatibility with checkout.steps.ts
   */
  async getCartBadgeCount(timeout: any = 20000): Promise<number> {
    const exists = await this.cartBadge.isExisting();
    if (!exists) return 0;
    const visible = await this.cartBadge.isDisplayed();
    if (!visible) return 0;
    const text = (await this.cartBadge.getText()).trim();
    const n = Number(text);
    return Number.isFinite(n) ? n : 0;
  }

  /**
   * Alias for compatibility with cart.steps.ts and reset.steps.ts
   */
  async cartBadgeText(): Promise<string> {
    const exists = await this.cartBadge.isExisting();
    if (!exists) return "";
    return (await this.cartBadge.getText()).trim();
  }

  /**
   * Alias for compatibility with reset.steps.ts
   */
  async getCartBadgeText(): Promise<string> {
    return this.cartBadgeText();
  }

  private async itemNameEl(itemName: string, timeout = 20000) {
    await scrollToText(this.driver, itemName);
    const el = await this.driver.$(`android=new UiSelector().text("${itemName}")`);
    await el.waitForDisplayed({ timeout });
    return el;
  }

  private addRemoveBtnXPath(itemName: string) {
    return `//*[@text="${itemName}"]/ancestor::*[contains(@content-desc,"test-Item") or @class="android.view.ViewGroup"][1]//*[@content-desc="test-ADD TO CART" or @content-desc="test-REMOVE" or contains(@text,"ADD TO CART") or contains(@text,"REMOVE")][1]`;
  }

  async addItemToCart(itemName: string, timeout = 20000) {
    await this.itemNameEl(itemName, timeout);
    const btn = await this.driver.$(this.addRemoveBtnXPath(itemName));
    await btn.waitForDisplayed({ timeout });
    const label = (await btn.getText()).trim().toUpperCase();
    if (label.includes("REMOVE")) return;
    await btn.click();
    await pauseSlowmo(this.driver);
  }

  /**
   * Alias for compatibility with checkout.steps.ts
   */
  async addToCart(itemName: string, timeout = 20000) {
    return this.addItemToCart(itemName, timeout);
  }

  async removeItemFromCart(itemName: string, timeout = 20000) {
    await this.itemNameEl(itemName, timeout);
    const btn = await this.driver.$(this.addRemoveBtnXPath(itemName));
    await btn.waitForDisplayed({ timeout });
    const label = (await btn.getText()).trim().toUpperCase();
    if (label.includes("ADD")) return;
    await btn.click();
    await pauseSlowmo(this.driver);
  }

  async openProductDetails(itemName: string, timeout = 20000) {
    const nameEl = await this.itemNameEl(itemName, timeout);
    await nameEl.click();
    await pauseSlowmo(this.driver);
  }

  async sortBy(optionLabel: string, timeout = 20000) {
    await this.sortButton.waitForDisplayed({ timeout });
    await this.sortButton.click();
    await pauseSlowmo(this.driver);

    const option = await this.driver.$(`//*[@text="${optionLabel}"] | //*[@content-desc="${optionLabel}"]`);
    await option.waitForDisplayed({ timeout });
    await option.click();
    await pauseSlowmo(this.driver);
  }

  async getSelectedSortLabel(): Promise<string> {
    const txt = (await this.sortButton.getText()).trim();
    return txt;
  }

  async productsListVisible(timeout = 20000) {
    const anyItem = await this.driver.$("~test-Item title");
    await anyItem.waitForDisplayed({ timeout });
    return true;
  }
}

export default ProductsScreen;
