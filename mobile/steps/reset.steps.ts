import { When, Then } from "@cucumber/cucumber";
import type { MobileWorld } from "../support/world";
import ProductsScreen from "../pages/ProductsScreen";
import MenuScreen from "../pages/MenuScreen";

When("I reset app state from the menu", async function (this: MobileWorld) {
  const products = new ProductsScreen(this.driver);
  await products.openMenu(20000);
  const menu = new MenuScreen(this.driver);
  await menu.resetAppState(20000);
});

Then("the cart badge should be cleared", async function (this: MobileWorld) {
  const products = new ProductsScreen(this.driver);
  // Menu may remain open; press back just in case
  try { await this.driver.back(); } catch {}
  const badge = (await products.getCartBadgeText()).trim();
  if (badge !== "") {
    // Some builds hide badge element instead of empty text
    // We'll accept 0 or empty
    const n = Number(badge);
    if (Number.isFinite(n)) {
      if (n !== 0) throw new Error(`Expected badge 0/empty but got "${badge}"`);
    } else {
      throw new Error(`Expected badge empty but got "${badge}"`);
    }
  }
});
