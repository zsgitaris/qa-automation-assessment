import type { Browser } from "webdriverio";
import { findFirstExisting } from "../support/helpers/selectors";

export default class BaseScreen {
  constructor(protected driver: Browser) {}

  protected async slowmo() {
    const ms = Number(process.env.SLOWMO || 0);
    if (ms > 0) await this.driver.pause(ms);
  }

  protected async find(selectors: string[], timeout = 10000) {
    return findFirstExisting(this.driver, selectors, timeout);
  }
}
