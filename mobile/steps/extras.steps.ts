import { When, Then } from "@cucumber/cucumber";
import type { MobileWorld } from "../support/world";

import LoginScreen from "../pages/LoginScreen";
import ProductsScreen from "../pages/ProductsScreen";
import MenuScreen from "../pages/MenuScreen";
import WebViewScreen from "../pages/WebViewScreen";
import QRScannerScreen from "../pages/QRScannerScreen";
import GeoLocationScreen from "../pages/GeoLocationScreen";
import DrawingScreen from "../pages/DrawingScreen";
import GesturesScreen from "../pages/GesturesScreen";

When("I open the menu", async function (this: MobileWorld) {
  const products = new ProductsScreen(this.driver!);
  await products.openMenu();
});

When("I open the Drawing screen from the menu", async function (this: MobileWorld) {
  const menu = new MenuScreen(this.driver!);
  await menu.openDrawing();
});

When("I open the WebView screen from the menu", async function (this: MobileWorld) {
  const menu = new MenuScreen(this.driver!);
  await menu.openWebView();
});

When("I open the Geo Location screen from the menu", async function (this: MobileWorld) {
  const menu = new MenuScreen(this.driver!);
  await menu.openGeoLocation();
});

When("I open the QR Code Scanner screen from the menu", async function (this: MobileWorld) {
  const menu = new MenuScreen(this.driver!);
  await menu.openQRScanner();
});

When("I open the Gestures screen from the menu", async function (this: MobileWorld) {
  const menu = new MenuScreen(this.driver!);
  await menu.openGestures();
});

Then("I should see the Drawing screen", async function (this: MobileWorld) {
  const drawing = new DrawingScreen(this.driver!);
  await drawing.isLoaded();
});

When("I draw the Sauce Bolt on the canvas", async function (this: MobileWorld) {
  const drawing = new DrawingScreen(this.driver!);
  await drawing.drawSauceBolt();
});

When("I clear the canvas", async function (this: MobileWorld) {
  const drawing = new DrawingScreen(this.driver!);
  await drawing.clearCanvas();
});

Then("I should see the WebView screen", async function (this: MobileWorld) {
  const webview = new WebViewScreen(this.driver!);
  await webview.isLoaded();
});

When("I set the WebView url to {string}", async function (this: MobileWorld, url: string) {
  const webview = new WebViewScreen(this.driver!);
  await webview.loadUrl(url);
});

Then("the WebView page should be loaded", async function (this: MobileWorld) {
  const webview = new WebViewScreen(this.driver!);
  await webview.waitForWebContent();
});

Then("I should see the Geo Location screen", async function (this: MobileWorld) {
  const geo = new GeoLocationScreen(this.driver!);
  await geo.isLoaded();
});

When("I set the device location to latitude {float} and longitude {float}", async function (this: MobileWorld, lat: number, lon: number) {
  const geo = new GeoLocationScreen(this.driver!);
  await geo.setLocation(lat, lon);
});

Then("I should see the QR Code Scanner screen", async function (this: MobileWorld) {
  const qr = new QRScannerScreen(this.driver!);
  await qr.isLoaded();
});

When("I handle the camera permission prompt", async function (this: MobileWorld) {
  const qr = new QRScannerScreen(this.driver!);
  await qr.allowCameraPermissionIfPrompted();
});

Then("I should see the Gestures screen", async function (this: MobileWorld) {
  const gestures = new GesturesScreen(this.driver!);
  await gestures.isLoaded();
});

When("I perform a drag and drop gesture", async function (this: MobileWorld) {
  const gestures = new GesturesScreen(this.driver!);
  await gestures.dragAndDrop();
});
