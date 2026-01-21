@mobile @extras @optional
Feature: Biometrics
  Some versions of the app include Touch/Face ID login.

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"

  Scenario: Open Biometrics screen from menu
    When I open the menu
    And I open the Biometrics screen
    Then I should see the Biometrics screen

  Scenario: Enable biometrics and authenticate (mock)
    When I open the menu
    And I open the Biometrics screen
    And I enable biometric login
    And I logout
    When I authenticate with biometrics
    Then I should see the inventory page
