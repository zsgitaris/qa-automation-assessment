@mobile @extras @requires_biometrics
Feature: Biometrics (Mobile)

  Background:
    Given I am logged in
    Then I should see the Products page
    And I open the menu from products

  Scenario: Open Biometrics screen
    When I open the Biometrics screen
    Then the Biometrics screen should load

  Scenario: Attempt fingerprint simulation (optional)
    When I open the Biometrics screen
    Then biometric fingerprint simulation should be attempted
