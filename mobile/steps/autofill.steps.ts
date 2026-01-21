import { When, Then } from "@cucumber/cucumber";
import expect from "expect";
import type { MobileWorld } from "../support/world";
import LoginScreen from "../pages/LoginScreen";

When("the user autofills username {string}", async function (this: MobileWorld, username: string) {
  const login = new LoginScreen(this.driver);
  await login.openLogin(20000);
  await login.chooseAutofillUser(username, 20000);
});

Then("the username field should contain {string}", async function (this: MobileWorld, username: string) {
  const login = new LoginScreen(this.driver);
  const u = (await login.getUsernameValue()).trim();
  expect(u).toBe(username);
});

Then("the password field should not be empty", async function (this: MobileWorld) {
  const login = new LoginScreen(this.driver);
  const p = (await login.getPasswordValue()).trim();
  expect(p.length).toBeGreaterThan(0);
});
