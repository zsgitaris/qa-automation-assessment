import type { Browser } from "webdriverio";

export async function findFirstExisting(
  driver: Browser,
  selectors: string[],
  timeout = 10000
) {
  const start = Date.now();
  let lastErr: unknown;

  while (Date.now() - start < timeout) {
    for (const sel of selectors) {
      try {
        const el = await driver.$(sel);
        const exists = await el.isExisting();
        if (exists) return el;
      } catch (e) {
        lastErr = e;
      }
    }
    await driver.pause(300);
  }

  throw new Error(
    `Element tidak ditemukan. Coba selectors: ${selectors.join(" | ")}\nLast error: ${String(
      lastErr
    )}`
  );
}

export function byTextContains(text: string): string {
  const safe = text.replace(/"/g, '\\"');
  return `android=new UiSelector().textContains("${safe}")`;
}

export function byText(text: string): string {
  const safe = text.replace(/"/g, '\\"');
  return `android=new UiSelector().text("${safe}")`;
}

export function byDescContains(text: string): string {
  const safe = text.replace(/"/g, '\\"');
  return `android=new UiSelector().descriptionContains("${safe}")`;
}

export function scrollIntoViewTextContains(text: string): string {
  const safe = text.replace(/"/g, '\\"');
  return `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("${safe}"))`;
}
