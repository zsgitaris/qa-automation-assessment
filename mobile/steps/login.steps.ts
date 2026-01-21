import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "expect";
import { MobileWorld } from "../support/world";
import { LoginScreen } from "../pages/LoginScreen";
import { ProductsScreen } from "../pages/ProductsScreen";

Given("I open the mobile app", async function (this: MobileWorld) {
  // Session is created in hooks; nothing else needed.
  expect(this.driver).toBeTruthy();
});

When("I login on mobile with {string} and {string}", async function (this: MobileWorld, user: string, pass: string) {
  const driver = this.driver!;
  const login = new LoginScreen(driver);
  await login.openLogin();
  await login.login(user, pass);
});

Then("I should see the products screen", async function (this: MobileWorld) {
  const products = new ProductsScreen(this.driver!);
  expect(await products.isLoaded()).toBe(true);
});

Then("I should see a mobile login error", async function (this: MobileWorld) {
  const login = new LoginScreen(this.driver!);
  const msg = await login.getErrorText();
  expect(msg.length).toBeGreaterThan(0);
});
