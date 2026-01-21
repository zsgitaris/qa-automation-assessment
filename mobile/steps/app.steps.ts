import { When, Then } from "@cucumber/cucumber";
import { expect } from "expect";
import type { MobileWorld } from "../support/world";

import ProductsScreen from "../pages/ProductsScreen";
import CartScreen from "../pages/CartScreen";
import CheckoutInformationScreen from "../pages/CheckoutInformationScreen";
import CheckoutOverviewScreen from "../pages/CheckoutOverviewScreen";
import CheckoutCompleteScreen from "../pages/CheckoutCompleteScreen";
import MenuScreen from "../pages/MenuScreen";
import LoginScreen from "../pages/LoginScreen";

// -------- Cart --------

When("I open the cart on mobile", async function (this: MobileWorld) {
  const products = new ProductsScreen(this.driver!);
  await products.openCart(20000);
});

Then("I should see the cart screen", async function (this: MobileWorld) {
  const cart = new CartScreen(this.driver!);
  await cart.waitForLoaded(20000);
  expect(await cart.isLoaded(20000)).toBe(true);
});

Then(
  "cart should contain {string} on mobile",
  async function (this: MobileWorld, itemName: string) {
    const cart = new CartScreen(this.driver!);
    await cart.waitForLoaded(20000);
    expect(await cart.hasItem(itemName, 15000)).toBe(true);
  }
);

Then(
  "cart should not contain {string} on mobile",
  async function (this: MobileWorld, itemName: string) {
    const cart = new CartScreen(this.driver!);
    await cart.waitForLoaded(20000);
    expect(await cart.hasItem(itemName, 6000)).toBe(false);
  }
);

When(
  "I remove {string} from cart on mobile",
  async function (this: MobileWorld, itemName: string) {
    const cart = new CartScreen(this.driver!);
    await cart.removeItem(itemName, 25000);
  }
);

// -------- Checkout --------

When("I proceed to checkout on mobile", async function (this: MobileWorld) {
  const cart = new CartScreen(this.driver!);
  await cart.openCheckout(20000);
});

When(
  "I fill checkout info on mobile with first name {string} last name {string} postal code {string}",
  async function (this: MobileWorld, first: string, last: string, zip: string) {
    const info = new CheckoutInformationScreen(this.driver!);
    await info.fill(first, last, zip, 20000);
    await info.continue(20000);
  }
);

Then(
  "I should see a checkout error containing {string}",
  async function (this: MobileWorld, expected: string) {
    const info = new CheckoutInformationScreen(this.driver!);
    const msg = await info.getErrorText(20000);
    expect(msg.toLowerCase()).toContain(expected.toLowerCase());
  }
);

When("I finish checkout on mobile", async function (this: MobileWorld) {
  const overview = new CheckoutOverviewScreen(this.driver!);
  await overview.finish(20000);
});

Then(
  "I should see the checkout complete screen on mobile",
  async function (this: MobileWorld) {
    const complete = new CheckoutCompleteScreen(this.driver!);
    await complete.waitForLoaded(20000);
    expect(await complete.backHomeButton.isExisting()).toBe(true);
  }
);

// -------- Menu --------

When("I logout from mobile app", async function (this: MobileWorld) {
  const products = new ProductsScreen(this.driver!);
  await products.openMenu(20000);

  const menu = new MenuScreen(this.driver!);
  await menu.logout(20000);
});

Then("I should see the mobile login screen", async function (this: MobileWorld) {
  const login = new LoginScreen(this.driver!);
  await login.openLogin(20000);
  expect(await login.username.isDisplayed()).toBe(true);
});
