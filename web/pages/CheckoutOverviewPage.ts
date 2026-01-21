import { Page, Locator } from "playwright";

export class CheckoutOverviewPage {
  private readonly page: Page;

  private readonly title: Locator;
  private readonly finishBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.locator(".title");
    this.finishBtn = this.page.locator("#finish");
  }

  async isLoaded(): Promise<boolean> {
    const t = await this.title.innerText();
    return t.toLowerCase().includes("overview");
  }

  async finish() {
    await this.finishBtn.click();
  }
}
