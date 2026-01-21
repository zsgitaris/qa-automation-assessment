import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "expect";
import type { MobileWorld } from "../support/world";

import ProductsScreen from "../pages/ProductsScreen";
import CartScreen from "../pages/CartScreen";
import CheckoutInformationScreen from "../pages/CheckoutInformationScreen";
import CheckoutOverviewScreen from "../pages/CheckoutOverviewScreen";
import CheckoutCompleteScreen from "../pages/CheckoutCompleteScreen";

Given("I have {string} in my cart", async function (this: MobileWorld, itemName: string) {
  const products = new ProductsScreen(this.driver);
  await products.isLoaded(20000);
  await products.addToCart(itemName, 20000);
  const badge = await products.getCartBadgeCount(5000);
  expect(badge).toBeGreaterThan(0);
});

When("I start checkout from the cart", async function (this: MobileWorld) {
  const products = new ProductsScreen(this.driver);
  await products.openCart(20000);
  const cart = new CartScreen(this.driver);
  await cart.waitForLoaded(20000);
  await cart.startCheckout(20000);
});

When(
  "I fill checkout info first name {string} last name {string} zip {string}",
  async function (this: MobileWorld, first: string, last: string, zip: string) {
    const info = new CheckoutInformationScreen(this.driver);
    await info.waitForLoaded(20000);
    await info.fill(first, last, zip, 20000);
  }
);

When("I continue checkout", async function (this: MobileWorld) {
  const info = new CheckoutInformationScreen(this.driver);
  await info.continue(20000);
});

Then("I should be on the checkout overview page", async function (this: MobileWorld) {
  const overview = new CheckoutOverviewScreen(this.driver);
  await overview.waitForLoaded(20000);
});

When("I finish checkout", async function (this: MobileWorld) {
  const overview = new CheckoutOverviewScreen(this.driver);
  await overview.finish(20000);
});

Then("I should see the checkout complete page", async function (this: MobileWorld) {
  const complete = new CheckoutCompleteScreen(this.driver);
  await complete.waitForLoaded(20000);
});

Then("I should see checkout error message", async function (this: MobileWorld) {
  const info = new CheckoutInformationScreen(this.driver);
  const msg = await info.getErrorText(15000);
  expect(msg.trim().length).toBeGreaterThan(0);
});
