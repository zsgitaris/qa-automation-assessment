import type { Browser } from "webdriverio";
import { findFirst } from "./_utils";

export default class GeoLocationScreen {
  constructor(private driver: Browser) {}

  async isLoaded(timeout = 15000) {
    await findFirst(this.driver, [
      "//*[@text='Geo Location']",
      "//*[contains(@text,'Geo')]",
      "~test-GEO LOCATION",
    ], timeout);
    return true;
  }

  // Alias for backward compatibility
  async waitForLoaded(timeout = 15000) {
    return this.isLoaded(timeout);
  }

  async readCoordinatesText() {
    const el = await findFirst(this.driver, [
      "~test-location",
      "//*[@resource-id='location']",
      "//*[contains(@text,',')]",
    ], 8000);
    return el.getText();
  }

  async setLocation(lat: number, lon: number, alt = 0) {
    await this.driver.setGeoLocation({ latitude: lat, longitude: lon, altitude: alt });
  }
}
