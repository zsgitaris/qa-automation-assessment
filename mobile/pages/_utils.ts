import type { Browser } from "webdriverio";

export async function pauseSlowmo(driver: Browser) {
  const ms = Number(process.env.SLOWMO || 0);
  if (ms > 0) await driver.pause(ms);
}

// Try multiple selectors until one exists
export async function findFirst(driver: Browser, selectors: string[], timeout = 15000) {
  const start = Date.now();
  let lastErr: any;
  while (Date.now() - start < timeout) {
    for (const sel of selectors) {
      try {
        const el = await driver.$(sel);
        if (await el.isExisting()) return el;
      } catch (e) {
        lastErr = e;
      }
    }
    await driver.pause(250);
  }
  const msg = `Could not find any selector within ${timeout}ms. Tried: ${selectors.join(" | ")}`;
  const err = new Error(msg);
  (err as any).cause = lastErr;
  throw err;
}

export async function clickFirst(driver: Browser, selectors: string[], timeout = 15000) {
  const el = await findFirst(driver, selectors, timeout);
  await el.waitForDisplayed({ timeout });
  await el.click();
  await pauseSlowmo(driver);
}

export async function textExists(driver: Browser, text: string, timeout = 15000) {
  // Android: try UiSelector first (fast), then xpath fallback
  const sels = [
    `android=new UiSelector().text("${text}")`,
    `//*[@text="${text}"]`,
  ];
  const el = await findFirst(driver, sels, timeout);
  await el.waitForDisplayed({ timeout });
  return el;
}

export async function safeHideKeyboard(driver: Browser) {
  try {
    // @ts-ignore
    await driver.hideKeyboard();
  } catch {}
}

/**
 * Scrolls to an element with the given text using Android UiScrollable.
 */
export async function scrollToText(driver: Browser, text: string, timeout = 15000) {
  try {
    const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${text}"))`;
    const el = await driver.$(selector);
    await el.waitForExist({ timeout });
    return el;
  } catch (e) {
    // Fallback: if scrollable fails, just try to find the element
    const el = await driver.$(`//*[@text="${text}"]`);
    if (await el.isExisting()) return el;
    throw e;
  }
}
