import { Given, When, Then } from "@cucumber/cucumber";
import expect from "expect";

import type { MobileWorld } from "../support/world";

import LoginScreen from "../pages/LoginScreen";
import ProductsScreen from "../pages/ProductsScreen";
import ProductDetailsScreen from "../pages/ProductDetailsScreen";
import CartScreen from "../pages/CartScreen";
import MenuScreen from "../pages/MenuScreen";
import CheckoutInfoScreen from "../pages/CheckoutInfoScreen";
import CheckoutOverviewScreen from "../pages/CheckoutOverviewScreen";
import CheckoutCompleteScreen from "../pages/CheckoutCompleteScreen";

function pages(world: MobileWorld) {
  const driver = world.driver!;
  const login = new LoginScreen(driver);
  const products = new ProductsScreen(driver);
  const details = new ProductDetailsScreen(driver);
  const cart = new CartScreen(driver);
  const menu = new MenuScreen(driver);
  const checkoutInfo = new CheckoutInfoScreen(driver);
  const checkoutOverview = new CheckoutOverviewScreen(driver);
  const checkoutComplete = new CheckoutCompleteScreen(driver);
  return { login, products, details, cart, menu, checkoutInfo, checkoutOverview, checkoutComplete };
}

Given("I open the app", async function (this: MobileWorld) {
  // App is already started by Appium. Just ensure it is responsive.
  await this.driver!.pause(250);
});

Given("I open the SauceDemo login page", async function (this: MobileWorld) {
  const { login } = pages(this);
  await login.openLogin(20000);
});

When(
  "I login with {string} and {string}",
  async function (this: MobileWorld, username: string, password: string) {
    const { login } = pages(this);
    await login.login(username, password);
  }
);

Then("I should see the inventory page", async function (this: MobileWorld) {
  const { products } = pages(this);
  expect(await products.isLoaded(25000)).toBe(true);
});

Then("I should see the products list", async function (this: MobileWorld) {
  const { products } = pages(this);
  expect(await products.productsListVisible(20000)).toBe(true);
});

Then("I should see a login error message", async function (this: MobileWorld) {
  const { login } = pages(this);
  await login.waitForError(15000);
});

Then(
  "I should see a login error message with text {string}",
  async function (this: MobileWorld, expectedError: string) {
    const { login } = pages(this);
    const actualError = await login.getErrorText(15000);
    expect(actualError).toContain(expectedError);
  }
);

Given(
  "I am logged in as {string} with password {string}",
  async function (this: MobileWorld, username: string, password: string) {
    const { login, products } = pages(this);
    await login.openLogin(20000);
    await login.login(username, password);
    expect(await products.isLoaded(25000)).toBe(true);
  }
);

When("I add {string} to the cart", async function (this: MobileWorld, itemName: string) {
  const { products } = pages(this);
  await products.addItemToCart(itemName);
});

When("I remove {string} from the cart", async function (this: MobileWorld, itemName: string) {
  const { products } = pages(this);
  await products.removeItemFromCart(itemName);
});

When("I open the cart", async function (this: MobileWorld) {
  const { products } = pages(this);
  await products.openCart();
});

Then("the cart should contain {string}", async function (this: MobileWorld, itemName: string) {
  const { cart } = pages(this);
  expect(await cart.hasItem(itemName, 20000)).toBe(true);
});

Then("the cart should not contain {string}", async function (this: MobileWorld, itemName: string) {
  const { cart } = pages(this);
  expect(await cart.hasItem(itemName, 8000)).toBe(false);
});

Then("the cart should be empty", async function (this: MobileWorld) {
  const { cart } = pages(this);
  expect(await cart.isEmpty(10000)).toBe(true);
});

When("I remove {string} from the cart in the cart", async function (this: MobileWorld, itemName: string) {
  const { cart } = pages(this);
  await cart.removeItem(itemName);
});

When("I continue shopping", async function (this: MobileWorld) {
  const { cart, products } = pages(this);
  await cart.continueShopping();
  expect(await products.isLoaded(25000)).toBe(true);
});

Then("the cart badge should show {string}", async function (this: MobileWorld, countStr: string) {
  const { products } = pages(this);
  const expected = Number(countStr);
  const actual = await products.getCartBadgeCount();
  expect(actual).toBe(expected);
});

Then("the cart badge should be hidden", async function (this: MobileWorld) {
  const { products } = pages(this);
  const actual = await products.getCartBadgeCount();
  expect(actual).toBe(0);
});

When("I open the product details for {string}", async function (this: MobileWorld, itemName: string) {
  const { products } = pages(this);
  await products.openProductDetails(itemName);
});

Then("I should see the product details page for {string}", async function (this: MobileWorld, itemName: string) {
  const { details } = pages(this);
  await details.isLoaded(20000);
  await details.assertItemTitle(itemName);
});

When("I add the item to the cart from product details", async function (this: MobileWorld) {
  const { details } = pages(this);
  await details.addToCart();
});

When("I remove the item from the cart from product details", async function (this: MobileWorld) {
  const { details } = pages(this);
  await details.removeFromCart();
});

When("I go back", async function (this: MobileWorld) {
  await this.driver!.back();
  await this.driver!.pause(500);
});

When("I go back to products", async function (this: MobileWorld) {
  const { details, products } = pages(this);
  await details.goBack();
  expect(await products.isLoaded(25000)).toBe(true);
});

When("I sort products by {string}", async function (this: MobileWorld, option: string) {
  const { products } = pages(this);
  await products.sortBy(option);
});

Then("the selected sort option should be {string}", async function (this: MobileWorld, option: string) {
  const { products } = pages(this);
  expect(await products.getSelectedSortLabel()).toBe(option);
});

When("I start checkout", async function (this: MobileWorld) {
  const { cart } = pages(this);
  await cart.openCheckout();
});

When("I attempt to start checkout", async function (this: MobileWorld) {
  const { cart } = pages(this);
  await cart.openCheckout();
});

Then("I should see the cart page", async function (this: MobileWorld) {
  const { cart } = pages(this);
  expect(await cart.isLoaded(20000)).toBe(true);
});

Then(
  "I should see a message {string}",
  async function (this: MobileWorld, expectedMessage: string) {
    const el = await this.driver!.$(`//*[@text="${expectedMessage}"]`);
    expect(await el.isDisplayed()).toBe(true);
  }
);

Then("I should see the checkout information page", async function (this: MobileWorld) {
  const { checkoutInfo } = pages(this);
  expect(await checkoutInfo.isLoaded(20000)).toBe(true);
});

When(
  "I enter checkout information with first name {string} last name {string} postal code {string}",
  async function (this: MobileWorld, first: string, last: string, postal: string) {
    const { checkoutInfo } = pages(this);
    await checkoutInfo.fill(first, last, postal);
  }
);

When("I continue checkout", async function (this: MobileWorld) {
  const { checkoutInfo } = pages(this);
  await checkoutInfo.continue();
});

Then("I should see the checkout overview page", async function (this: MobileWorld) {
  const { checkoutOverview } = pages(this);
  expect(await checkoutOverview.isLoaded(20000)).toBe(true);
});

Then("the overview should list {string}", async function (this: MobileWorld, itemName: string) {
  const { checkoutOverview } = pages(this);
  expect(await checkoutOverview.hasItem(itemName, 20000)).toBe(true);
});

When("I cancel checkout from the information page", async function (this: MobileWorld) {
  const { checkoutInfo, cart } = pages(this);
  await checkoutInfo.cancel();
  expect(await cart.isLoaded(20000)).toBe(true);
});

When("I cancel checkout from the overview page", async function (this: MobileWorld) {
  const { checkoutOverview, products } = pages(this);
  await checkoutOverview.cancel();
  expect(await products.isLoaded(25000)).toBe(true);
});

Then(
  "I should see a checkout error message with text {string}",
  async function (this: MobileWorld, expectedError: string) {
    const { checkoutInfo } = pages(this);
    const actualError = await checkoutInfo.getErrorText(15000);
    expect(actualError).toContain(expectedError);
  }
);

Then("I should see a checkout error message", async function (this: MobileWorld) {
  const { checkoutInfo } = pages(this);
  await checkoutInfo.getErrorText(15000);
});

When("I finish checkout", async function (this: MobileWorld) {
  const { checkoutOverview } = pages(this);
  await checkoutOverview.finish();
});

Then("I should see the checkout complete page", async function (this: MobileWorld) {
  const { checkoutComplete } = pages(this);
  expect(await checkoutComplete.isLoaded(20000)).toBe(true);
});

When("I go back home", async function (this: MobileWorld) {
  const { checkoutComplete, products } = pages(this);
  await checkoutComplete.backHome();
  expect(await products.isLoaded(25000)).toBe(true);
});

When("I open the menu", async function (this: MobileWorld) {
  const { products } = pages(this);
  await products.openMenu();
});

When("I logout", async function (this: MobileWorld) {
  const { menu, login } = pages(this);
  await menu.logout();
  expect(await login.isLoaded(20000)).toBe(true);
});

Then("I should see the login page", async function (this: MobileWorld) {
  const { login } = pages(this);
  expect(await login.isLoaded(20000)).toBe(true);
});
