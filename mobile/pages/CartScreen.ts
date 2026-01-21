import { Browser } from "webdriverio";
import { pauseSlowmo, scrollToText } from "./_utils";

export class CartScreen {
  constructor(private driver: Browser) {}

  get title() {
    return this.driver.$("~test-YOUR CART");
  }

  get checkoutButton() {
    return this.driver.$("~test-CHECKOUT");
  }

  get continueShoppingButton() {
    return this.driver.$("~test-CONTINUE SHOPPING");
  }

  get emptyCartMessage() {
    return this.driver.$('//*[@text="Your cart is empty"]');
  }

  async isLoaded(timeout = 20000) {
    await this.title.waitForDisplayed({ timeout });
    return true;
  }

  // Alias for backward compatibility with older step definitions
  async waitForLoaded(timeout = 20000) {
    return this.isLoaded(timeout);
  }

  async hasItem(itemName: string, timeout = 15000) {
    await this.isLoaded(timeout);
    await scrollToText(this.driver, itemName, timeout);
    const item = await this.driver.$(`//*[@text="${itemName}"]`);
    return await item.isExisting();
  }

  async isEmpty(timeout = 10000) {
    await this.isLoaded(timeout);
    // Force cast to any to bypass strict Promise<number> vs number check
    const items: any = await this.driver.$$("~test-Item");
    const count = items.length;
    return count === 0;
  }

  async removeItem(itemName: string, timeout = 20000) {
    await this.isLoaded(timeout);
    await scrollToText(this.driver, itemName, timeout);
    const removeBtn = await this.driver.$(
      `//*[@text="${itemName}"]/ancestor::*[contains(@content-desc,"test-Item")][1]//*[@content-desc="test-REMOVE"]`
    );
    if (await removeBtn.isExisting()) {
      await removeBtn.click();
      await pauseSlowmo(this.driver);
      return;
    }
    const fallback = await this.driver.$("~test-REMOVE");
    if (await fallback.isExisting()) {
      await fallback.click();
      await pauseSlowmo(this.driver);
      return;
    }
    throw new Error(`Remove button for "${itemName}" not found in cart`);
  }

  async removeAllItems(timeout = 20000) {
    await this.isLoaded(timeout);
    while (true) {
      // Force cast to any to bypass strict Promise<number> vs number check
      const removes: any = await this.driver.$$("~test-REMOVE");
      const count = removes.length;
      if (count === 0) break;
      await removes[0].click();
      await pauseSlowmo(this.driver);
    }
  }

  async openCheckout(timeout = 20000) {
    await this.checkoutButton.waitForDisplayed({ timeout });
    await this.checkoutButton.click();
    await pauseSlowmo(this.driver);
  }

  /**
   * Alias for compatibility with checkout.steps.ts
   */
  async startCheckout(timeout = 20000) {
    return this.openCheckout(timeout);
  }

  async continueShopping(timeout = 20000) {
    await this.continueShoppingButton.waitForDisplayed({ timeout });
    await this.continueShoppingButton.click();
    await pauseSlowmo(this.driver);
  }
}

export default CartScreen;
