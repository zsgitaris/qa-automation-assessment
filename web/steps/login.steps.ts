import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";

import { WebWorld } from "../support/world";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

Given("I open SauceDemo login page", async function (this: WebWorld) {
  const page = this.page!;
  const login = new LoginPage(page);

  // simpan ke world biar bisa dipakai step berikutnya
  (this as any).loginPage = login;

  // pakai baseUrl dari world (biasanya https://www.saucedemo.com/)
  await login.goto(this.baseUrl);
});

When(
  "I login as {string} with password {string}",
  async function (this: WebWorld, username: string, password: string) {
    const login: LoginPage = (this as any).loginPage ?? new LoginPage(this.page!);
    await login.login(username, password);
  }
);

Then("I should be redirected to the products page", async function (this: WebWorld) {
  const page = this.page!;
  const inventory = new InventoryPage(page);

  await expect(await inventory.isLoaded()).toBeTruthy();
});

Then(
  "I should see an error message containing {string}",
  async function (this: WebWorld, text: string) {
    const login: LoginPage = (this as any).loginPage ?? new LoginPage(this.page!);
    const err = await login.getErrorText();

    expect(err.toLowerCase()).toContain(text.toLowerCase());
  }
);
