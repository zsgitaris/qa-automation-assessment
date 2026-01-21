import { Browser } from "webdriverio";
import { findFirst, pauseSlowmo } from "./_utils";

export default class DrawingScreen {
  constructor(private driver: Browser) {}

  async isLoaded(timeout = 15000) {
    await findFirst(this.driver, [
      "//*[@text='Drawing']",
      "//*[contains(@text,'Drawing')]",
      "~test-DRAWING",
    ], timeout);
    return true;
  }

  // Alias for backward compatibility
  async waitForLoaded(timeout = 15000) {
    return this.isLoaded(timeout);
  }

  async drawSauceBolt() {
    const size = await this.driver.getWindowSize();
    const centerX = Math.floor(size.width / 2);
    const centerY = Math.floor(size.height / 2);

    const points = [
      { x: centerX, y: centerY - 100 },
      { x: centerX - 50, y: centerY },
      { x: centerX + 20, y: centerY },
      { x: centerX - 30, y: centerY + 100 }
    ];

    await this.driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: points[0].x, y: points[0].y },
          { type: "pointerDown", button: 0 },
          { type: "pointerMove", duration: 200, x: points[1].x, y: points[1].y },
          { type: "pointerMove", duration: 200, x: points[2].x, y: points[2].y },
          { type: "pointerMove", duration: 200, x: points[3].x, y: points[3].y },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await this.driver.releaseActions();
    await pauseSlowmo(this.driver);
  }

  async clearCanvas() {
    const clear = await this.driver.$("~test-CLEAR");
    if (await clear.isExisting()) {
      await clear.click();
      await pauseSlowmo(this.driver);
    }
  }
}
