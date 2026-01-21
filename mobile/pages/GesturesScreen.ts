import { Browser } from "webdriverio";
import { findFirst, pauseSlowmo } from "./_utils";

export default class GesturesScreen {
  constructor(private driver: Browser) {}

  async isLoaded(timeout = 15000) {
    await findFirst(this.driver, [
      "~test-GESTURES",
      "~test-Gestures",
      "//*[@text='Gestures']",
      "//*[contains(@text,'Gesture')]",
    ], timeout);
    return true;
  }

  // Alias for backward compatibility
  async waitForLoaded(timeout = 15000) {
    return this.isLoaded(timeout);
  }

  async dragAndDrop() {
    const dragElement = await this.driver.$("~test-drag-l");
    const dropZone = await this.driver.$("~test-drop-l");

    if (await dragElement.isExisting() && await dropZone.isExisting()) {
      const dragLocation = await dragElement.getLocation();
      const dropLocation = await dropZone.getLocation();

      await this.driver.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: dragLocation.x, y: dragLocation.y },
            { type: "pointerDown", button: 0 },
            { type: "pointerMove", duration: 1000, x: dropLocation.x, y: dropLocation.y },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);
      await this.driver.releaseActions();
      await pauseSlowmo(this.driver);
    }
  }
}
