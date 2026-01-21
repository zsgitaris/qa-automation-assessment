import { remote } from "webdriverio";
import type { Browser } from "webdriverio";

/**
 * Creates an Android driver for the Sauce Labs sample mobile app.
 *
 * NOTE: If you have issues like:
 *   - "Appium Settings app is not running after 30000ms"
 *
 * set SKIP_DEVICE_INIT=true (default below) to skip installing/running io.appium.settings.
 * Core flows (login/cart) do not require the Settings app.
 */
export async function createAndroidDriver(apkPath?: string): Promise<Browser> {
  const appPath = apkPath || process.env.APK_PATH;
  if (!appPath) {
    throw new Error(
      "APK_PATH is empty. Set APK_PATH env var or place APK in resources/android/sample.apk and set APK_PATH accordingly."
    );
  }

  const hostname = process.env.APPIUM_HOST || "127.0.0.1";
  const port = Number(process.env.APPIUM_PORT || 4723);

  // Default to skipping device init to avoid flaky io.appium.settings startup.
  const skipDeviceInit = (process.env.SKIP_DEVICE_INIT || "true").toLowerCase() !== "false";

  const driver = await remote({
    protocol: "http",
    hostname,
    port,
    path: "/",
    logLevel: "info",
    capabilities: {
      platformName: "Android",
      "appium:automationName": "UiAutomator2",
      "appium:deviceName": process.env.ANDROID_DEVICE_NAME || "Android Emulator",
      "appium:udid": process.env.ANDROID_UDID,
      "appium:app": appPath,
      "appium:appPackage": process.env.APP_PACKAGE || "com.swaglabsmobileapp",
      "appium:appActivity": process.env.APP_ACTIVITY || "com.swaglabsmobileapp.MainActivity",
      "appium:autoGrantPermissions": true,
      "appium:newCommandTimeout": 180,
      "appium:adbExecTimeout": 120000,
      "appium:uiautomator2ServerInstallTimeout": 180000,
      "appium:uiautomator2ServerLaunchTimeout": 180000,
      "appium:skipDeviceInitialization": skipDeviceInit,
      "appium:noReset": (process.env.NO_RESET || "false").toLowerCase() === "true"
    }
  });

  return driver;
}
