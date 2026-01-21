import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "expect";
import { MobileWorld } from "../support/world";
import { LoginScreen } from "../pages/LoginScreen";
import { ProductsScreen } from "../pages/ProductsScreen";

Given("I am logged in on mobile as {string} with password {string}", async function (this: MobileWorld, user: string, pass: string) {
  const driver = this.driver!;
  const login = new LoginScreen(driver);
  await login.openLogin();
  await login.login(user, pass);
  const products = new ProductsScreen(driver);
  expect(await products.isLoaded()).toBe(true);
});

When("I add {string} to cart on mobile", async function (this: MobileWorld, itemName: string) {
  const products = new ProductsScreen(this.driver!);
  await products.addItemToCart(itemName);
});

Then("the cart badge should show {string}", async function (this: MobileWorld, expected: string) {
  const products = new ProductsScreen(this.driver!);
  const badge = await products.cartBadgeText();
  expect(badge).toContain(expected);
});
