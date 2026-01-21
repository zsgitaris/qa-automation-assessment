@mobile @extras @optional
Feature: Autofill login data
  The app provides a shortcut to autofill accepted usernames (and sometimes passwords).

  Background:
    Given I open the SauceDemo login page

  Scenario: Autofill fills the username field
    When I trigger login autofill for "standard_user"
    Then the username field should be "standard_user"

  Scenario: Autofill + login succeeds
    When I trigger login autofill for "standard_user"
    And I login with "standard_user" and "secret_sauce"
    Then I should see the inventory page

  Scenario: Autofill can be cleared
    When I trigger login autofill for "standard_user"
    And I clear the login fields
    Then the username field should be ""
    And the password field should be ""
