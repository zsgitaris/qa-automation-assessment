# Mobile Extra Test Pack (Sample App 2.7.1)

## Tags & behaviour

- `@permissions`: run driver with `autoGrantPermissions=false` so permission dialogs appear.
- `@lang_en`, `@lang_de`, `@lang_es`, `@lang_nl`: relaunch app with `appium:language` & `appium:locale` (via hooks).

## Useful env vars

- `APK_PATH`: required. Path to your `.apk`
- `ANDROID_UDID`: default `emulator-5554`
- `APP_PACKAGE`: default `com.swaglabsmobileapp` (used for deep links + permission shell commands)
- `DEEPLINK_URL`: default `swaglabs://swag-overview/0,2`
- `AUTO_GRANT_PERMISSIONS`: default `true` (overridden by `@permissions`)
- `NO_RESET`: default `false`
- `SLOWMO`: slow down actions in ms (e.g. `SLOWMO=250`)

## Running

```bash
# run all mobile tests
npm run test:mobile

# run only extras
npx cucumber-js -c cucumber.mobile.js --tags "@extras"

# run only permissions flows
npx cucumber-js -c cucumber.mobile.js --tags "@permissions"

# run i18n scenarios (re-launches app per scenario)
npx cucumber-js -c cucumber.mobile.js --tags "@i18n"
```
