import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import type { Browser } from "webdriverio";

export class MobileWorld extends World {
  driver?: Browser;
  apkPath: string;

  constructor(options: IWorldOptions) {
    super(options);
    this.apkPath = process.env.APK_PATH || "";
  }
}

setWorldConstructor(MobileWorld);
