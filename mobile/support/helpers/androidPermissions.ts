import type { Browser } from "webdriverio";
import { findFirstExisting } from "./selectors";

type Choice = "allow" | "deny";

async function tapIfExists(driver: Browser, selectors: string[], timeout = 3000): Promise<boolean> {
  const end = Date.now() + timeout;
  while (Date.now() < end) {
    for (const sel of selectors) {
      try {
        const el = await driver.$(sel);
        if (await el.isExisting()) {
          await el.click();
          return true;
        }
      } catch {}
    }
    await driver.pause(200);
  }
  return false;
}

export async function handleAndroidPermissionDialog(
  driver: Browser,
  choice: Choice,
  timeout = 12000
): Promise<void> {
  // Android 10+ permission controller
  const allowSelectors = [
    "id=com.android.permissioncontroller:id/permission_allow_foreground_only_button",
    "id=com.android.permissioncontroller:id/permission_allow_button",
    "id=com.android.permissioncontroller:id/permission_allow_one_time_button",
    "id=com.android.packageinstaller:id/permission_allow_button",
    "id=android:id/button1", // generic OK
  ];

  const denySelectors = [
    "id=com.android.permissioncontroller:id/permission_deny_button",
    "id=com.android.packageinstaller:id/permission_deny_button",
    "id=android:id/button2", // generic cancel
  ];

  const allowFound = await tapIfExists(
    driver,
    choice === "allow" ? allowSelectors : denySelectors,
    timeout
  );

  if (allowFound) return;

  // If dialog exists but selectors differ, do a best-effort by searching visible text
  const fallbackText =
    choice === "allow"
      ? ["Allow", "ALLOW", "Saat digunakan", "Izinkan", "While using the app", "Only this time"]
      : ["Deny", "DENY", "Tolak", "Jangan izinkan", "Don't allow", "Cancel"];

  const el = await findFirstExisting(
    driver,
    fallbackText.map((t) => `android=new UiSelector().textContains("${t.replace(/"/g, '\\"')}")`),
    3000
  );
  await el.click();
}

export async function revokePermission(
  driver: Browser,
  appPackage: string,
  permission: string
) {
  // Requires Appium UiAutomator2 and an emulator/device that allows shell.
  await driver.execute("mobile: shell", {
    command: "pm",
    args: ["revoke", appPackage, permission],
  } as any);
}

export async function grantPermission(
  driver: Browser,
  appPackage: string,
  permission: string
) {
  await driver.execute("mobile: shell", {
    command: "pm",
    args: ["grant", appPackage, permission],
  } as any);
}
