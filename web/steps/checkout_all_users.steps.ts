import { Then, When } from "@cucumber/cucumber";
import { expect } from "playwright/test";

import { WebWorld } from "../support/world";
import { CheckoutInfoPage } from "../pages/CheckoutInfoPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

When("I click Continue on the checkout information page", async function (this: WebWorld) {
  const page = this.page!;
  const info = new CheckoutInfoPage(page);
  await info.continue();
});

Then(
  'checkout outcome for {string} should be {string}',
  async function (this: WebWorld, username: string, outcome: string) {
    const page = this.page!;
    const info = new CheckoutInfoPage(page);
    const overview = new CheckoutOverviewPage(page);
    const complete = new CheckoutCompletePage(page);

    // 1) Expected block at info page (problem_user)
    if (outcome === "blocked_lastname") {
      const lastVal = await info.getLastNameValue();
      await expect(lastVal).toBe("");

      const err = await info.getErrorText();
      await expect(err.toLowerCase()).toContain("last name is required");
      return;
    }

    // 2) For outcomes that must reach overview
    await expect(await overview.isLoaded()).toBeTruthy();

    // Click Finish for both complete and blocked_finish
    await overview.finish();

    if (outcome === "blocked_finish") {
      // error_user: should remain on overview (not complete)
      await page.waitForTimeout(600);
      await expect(page.url().toLowerCase()).toContain("checkout-step-two");
      await expect(await complete.isLoaded()).toBeFalsy();
      return;
    }

    // 3) Complete checkout
    await expect(await complete.isLoaded()).toBeTruthy();
  }
);
