import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "playwright/test";

import { WebWorld } from "../support/world";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutInfoPage } from "../pages/CheckoutInfoPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

Given(
  'I am logged in as {string} with password {string}',
  async function (this: WebWorld, user: string, pass: string) {
    const page = this.page!;
    const login = new LoginPage(page);

    await login.goto(this.baseUrl);
    await login.login(user, pass);

    await expect(page.locator(".title")).toHaveText(/Products/);
  }
);

When(
  'I add {string} to the cart',
  async function (this: WebWorld, itemName: string) {
    const page = this.page!;
    const inventory = new InventoryPage(page);

    await inventory.addItemToCart(itemName);
  }
);

When("I open the cart", async function (this: WebWorld) {
  const page = this.page!;
  const inventory = new InventoryPage(page);

  await inventory.openCart();
});

Then(
  'the cart should contain {string}',
  async function (this: WebWorld, itemName: string) {
    const page = this.page!;
    const cart = new CartPage(page);

    await expect(await cart.hasItem(itemName)).toBeTruthy();
  }
);

When("I start checkout", async function (this: WebWorld) {
  const page = this.page!;
  const cart = new CartPage(page);

  await cart.checkout();
});

Then("I should see the checkout information page", async function (this: WebWorld) {
  const page = this.page!;
  const checkout = new CheckoutInfoPage(page);

  await expect(await checkout.isLoaded()).toBeTruthy();
});

When(
  'I fill checkout information with first name {string} last name {string} postal code {string}',
  async function (this: WebWorld, first: string, last: string, zip: string) {
    const page = this.page!;
    const checkout = new CheckoutInfoPage(page);

    await checkout.fillInformation(first, last, zip);
  }
);

When("I continue to checkout overview", async function (this: WebWorld) {
  const page = this.page!;
  const checkout = new CheckoutInfoPage(page);

  await checkout.continue();
});

Then("I should see the checkout overview page", async function (this: WebWorld) {
  const page = this.page!;
  const overview = new CheckoutOverviewPage(page);

  await expect(await overview.isLoaded()).toBeTruthy();
});

When("I finish checkout", async function (this: WebWorld) {
  const page = this.page!;
  const overview = new CheckoutOverviewPage(page);

  await overview.finish();
});

Then("I should see the checkout complete page", async function (this: WebWorld) {
  const page = this.page!;
  const complete = new CheckoutCompletePage(page);

  await expect(await complete.isLoaded()).toBeTruthy();
});
