# Mobile test suite (Appium + WebdriverIO + Cucumber)

## Quick start (local Android emulator)

1) Start Appium server (example):
- `appium --address 127.0.0.1 --port 4723`

2) Set env vars (PowerShell):
```powershell
$env:APK_PATH="$pwd\resources\android\sample.apk"
$env:ANDROID_UDID="emulator-5554"
$env:SLOWMO="300"
# Optional:
# $env:APP_PACKAGE="com.swaglabsmobileapp"
# $env:APP_ACTIVITY="com.swaglabsmobileapp.MainActivity"
```

3) Run:
- `npm run test:mobile`

## Tags

- Run only parity tests:
  - `npm run test:mobile -- --tags "@parity"`
- Run extras:
  - `npm run test:mobile -- --tags "@extras"`

## Optional tests

### Biometrics
Enable fingerprint simulation (may require emulator support):
- `setx ENABLE_BIOMETRICS_TESTS 1`

### Deep links
Deep-link scenarios are `pending` unless you set the env var used by the scenario.
Example:
- `setx DEEPLINK_PRODUCTS "your-scheme://products"`
