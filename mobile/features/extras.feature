@mobile @extras
Feature: Mobile Extras

  Scenario: Open WebView screen from menu
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I open the menu
    And I open the "WEBVIEW" screen from the menu
    Then I should see the WebView screen

  Scenario: Open QR Code Scanner screen from menu
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I open the menu
    And I open the "QR CODE SCANNER" screen from the menu
    Then I should see the QR Code Scanner screen

  Scenario: Open Geo Location screen from menu
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I open the menu
    And I open the "GEO LOCATION" screen from the menu
    Then I should see the Geo Location screen

  Scenario: Open Drawing screen and draw
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I open the menu
    And I open the "DRAWING" screen from the menu
    And I draw a simple line
    Then I should still be on the Drawing screen

  Scenario: Open About screen from menu
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I open the menu
    And I open the "ABOUT" screen from the menu
    Then I should see the About screen

  Scenario: Logout returns to login
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I open the menu
    And I logout
    Then I open the SauceDemo login page

  Scenario: Reset App State keeps you logged in but clears cart
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"
    When I open the menu
    And I reset app state
    Then the cart badge should show "0"