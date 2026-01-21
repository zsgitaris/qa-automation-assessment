@mobile @extras @optional
Feature: Multi-language

  Scenario: App renders localized strings when device language changes
    Given I open the SauceDemo login page
    When I set the device language to "es"
    Then the login button should be localized
