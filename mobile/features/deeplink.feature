@mobile @extras @requires_adb
Feature: Deep linking (Mobile)

  # Deep linking support was added in v2.1.0.
  # These scenarios are OPTIONAL and will be marked pending unless the env var exists.

  Background:
    Given I am logged in
    Then I should see the Products page

  Scenario Outline: Open deep link from environment variable
    When I open deep link from env "<envKey>"
    Then the app should show either Products or WebView screen

    Examples:
      | envKey            |
      | DEEPLINK_PRODUCTS |
      | DEEPLINK_WEBVIEW  |
      | DEEPLINK_CART     |
      | DEEPLINK_LOGIN    |
      | DEEPLINK_QR       |
      | DEEPLINK_GEO      |
