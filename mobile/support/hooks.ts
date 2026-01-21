import { After, Before, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { MobileWorld } from "./world";
import { createAndroidDriver } from "./driver";

setDefaultTimeout(120_000);

Before(async function (this: MobileWorld) {
  this.driver = await createAndroidDriver(this.apkPath);
});

After(async function (this: MobileWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.driver) {
    const png = await this.driver.takeScreenshot();
    // takeScreenshot returns base64 png string
    await this.attach(Buffer.from(png, "base64"), "image/png");
  }
  await this.driver?.deleteSession();
});
