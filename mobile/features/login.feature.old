@mobile @parity
Feature: Login (Mobile parity)
  As a user
  I want to login to the mobile app
  So that I can browse products and checkout

  Background:
    Given I open the SauceDemo login page

  Scenario: Valid login navigates to inventory
    When I login with "standard_user" and "secret_sauce"
    Then I should see the inventory page

  Scenario: Invalid password shows an error
    When I login with "standard_user" and "wrong_password"
    Then I should see a login error message

  Scenario: Invalid username shows an error
    When I login with "wrong_user" and "secret_sauce"
    Then I should see a login error message

  Scenario: Invalid username and password shows an error
    When I login with "wrong_user" and "wrong_password"
    Then I should see a login error message

  Scenario: Empty username and password shows an error
    When I login with "" and ""
    Then I should see a login error message

  Scenario: Empty username shows an error
    When I login with "" and "secret_sauce"
    Then I should see a login error message

  Scenario: Empty password shows an error
    When I login with "standard_user" and ""
    Then I should see a login error message

  Scenario: Logout returns to login
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I logout
    Then I should see the login page
