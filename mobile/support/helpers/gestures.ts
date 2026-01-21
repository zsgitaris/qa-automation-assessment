import type { Browser } from "webdriverio";

type Point = { x: number; y: number };

async function pause(driver: Browser, ms: number) {
  await driver.pause(ms);
}

export async function swipe(
  driver: Browser,
  from: Point,
  to: Point,
  durationMs = 600
) {
  // W3C actions for touch
  await driver.performActions([
    {
      type: "pointer",
      id: "finger1",
      parameters: { pointerType: "touch" },
      actions: [
        { type: "pointerMove", duration: 0, x: from.x, y: from.y },
        { type: "pointerDown", button: 0 },
        { type: "pause", duration: Math.max(100, Math.min(durationMs, 1200)) },
        { type: "pointerMove", duration: durationMs, x: to.x, y: to.y },
        { type: "pointerUp", button: 0 },
      ],
    },
  ] as any);
  await driver.releaseActions();
}

export async function dragAndDrop(
  driver: Browser,
  from: Point,
  to: Point,
  durationMs = 800
) {
  await swipe(driver, from, to, durationMs);
}

export async function pinchZoom(
  driver: Browser,
  center: Point,
  startDistance = 200,
  endDistance = 40,
  durationMs = 700
) {
  // Pinch (zoom out): two fingers move towards each other
  const halfStart = Math.floor(startDistance / 2);
  const halfEnd = Math.floor(endDistance / 2);

  const p1Start = { x: center.x - halfStart, y: center.y };
  const p2Start = { x: center.x + halfStart, y: center.y };

  const p1End = { x: center.x - halfEnd, y: center.y };
  const p2End = { x: center.x + halfEnd, y: center.y };

  await driver.performActions([
    {
      type: "pointer",
      id: "finger1",
      parameters: { pointerType: "touch" },
      actions: [
        { type: "pointerMove", duration: 0, x: p1Start.x, y: p1Start.y },
        { type: "pointerDown", button: 0 },
        { type: "pause", duration: 100 },
        { type: "pointerMove", duration: durationMs, x: p1End.x, y: p1End.y },
        { type: "pointerUp", button: 0 },
      ],
    },
    {
      type: "pointer",
      id: "finger2",
      parameters: { pointerType: "touch" },
      actions: [
        { type: "pointerMove", duration: 0, x: p2Start.x, y: p2Start.y },
        { type: "pointerDown", button: 0 },
        { type: "pause", duration: 100 },
        { type: "pointerMove", duration: durationMs, x: p2End.x, y: p2End.y },
        { type: "pointerUp", button: 0 },
      ],
    },
  ] as any);
  await driver.releaseActions();
}

export async function spreadZoom(
  driver: Browser,
  center: Point,
  startDistance = 40,
  endDistance = 220,
  durationMs = 700
) {
  // Spread (zoom in): two fingers move apart
  const halfStart = Math.floor(startDistance / 2);
  const halfEnd = Math.floor(endDistance / 2);

  const p1Start = { x: center.x - halfStart, y: center.y };
  const p2Start = { x: center.x + halfStart, y: center.y };

  const p1End = { x: center.x - halfEnd, y: center.y };
  const p2End = { x: center.x + halfEnd, y: center.y };

  await driver.performActions([
    {
      type: "pointer",
      id: "finger1",
      parameters: { pointerType: "touch" },
      actions: [
        { type: "pointerMove", duration: 0, x: p1Start.x, y: p1Start.y },
        { type: "pointerDown", button: 0 },
        { type: "pause", duration: 100 },
        { type: "pointerMove", duration: durationMs, x: p1End.x, y: p1End.y },
        { type: "pointerUp", button: 0 },
      ],
    },
    {
      type: "pointer",
      id: "finger2",
      parameters: { pointerType: "touch" },
      actions: [
        { type: "pointerMove", duration: 0, x: p2Start.x, y: p2Start.y },
        { type: "pointerDown", button: 0 },
        { type: "pause", duration: 100 },
        { type: "pointerMove", duration: durationMs, x: p2End.x, y: p2End.y },
        { type: "pointerUp", button: 0 },
      ],
    },
  ] as any);
  await driver.releaseActions();
}

export async function getViewportCenter(driver: Browser): Promise<Point> {
  const rect = await driver.getWindowRect();
  return { x: Math.floor(rect.width / 2), y: Math.floor(rect.height / 2) };
}

export async function getViewportPointsForSwipe(driver: Browser) {
  const rect = await driver.getWindowRect();
  const x = Math.floor(rect.width / 2);
  return {
    upFrom: { x, y: Math.floor(rect.height * 0.8) },
    upTo: { x, y: Math.floor(rect.height * 0.3) },
    downFrom: { x, y: Math.floor(rect.height * 0.3) },
    downTo: { x, y: Math.floor(rect.height * 0.8) },
  };
}
