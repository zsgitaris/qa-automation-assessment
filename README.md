# QA Automation Assessment (BDD + POM + Allure)

This repository demonstrates:
- **BDD with Gherkin (Cucumber)**
- **Web automation:** Playwright + TypeScript
- **Mobile automation:** Appium (via WebdriverIO `remote`) + TypeScript
- **POM (Page Object Model)**
- **Allure reporting** (Web & Mobile)

---

## Prerequisites
- **Node.js 18+**
- **Java JDK 17+** (required for Allure CLI and Android tooling)
- **Android Studio + Emulator** (for mobile tests)
- **Appium Server** (for mobile tests)

> Note: `npm install` runs a postinstall step that installs Playwright browsers automatically.

---

## Install
```bash
npm install
## Run (headless)
npm run test:web

## Run with UI (debug)

PowerShell

$env:HEADLESS="false"
$env:SLOWMO="200"
npm run test:web

#Allure report (Web)
npm run allure:generate:web
npm run allure:open:web

#Windows (PowerShell)

$env:WEB_BASE_URL="https://www.saucedemo.com"