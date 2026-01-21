import { Page, Locator } from "playwright";

export class CheckoutInfoPage {
  private readonly page: Page;

  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = this.page.locator("#first-name");
    this.lastName = this.page.locator("#last-name");
    this.postalCode = this.page.locator("#postal-code");
    this.continueBtn = this.page.locator("#continue");
  }

  async isLoaded(): Promise<boolean> {
    return await this.firstName.isVisible();
  }

  async fillInformation(first: string, last: string, zip: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
  }

  async continue() {
    await this.continueBtn.click();
  }

  //  MULAI DARI SINI
  async getLastNameValue(): Promise<string> {
    return await this.lastName.inputValue();
  }

  async getErrorText(): Promise<string> {
    const err = this.page.locator("[data-test='error']");
    await err.waitFor({ state: "visible" });
    return await err.innerText();
  }
}
