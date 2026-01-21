@mobile @parity
Feature: Login (Mobile parity)
  As a user
  I want to login to the mobile app
  So that I can browse products and checkout

  Background:
    Given I open the SauceDemo login page

  # --- Positive Cases ---

  Scenario: Valid login navigates to inventory
    When I login with "standard_user" and "secret_sauce"
    Then I should see the inventory page

  Scenario: Performance Glitch User logs in successfully after delay
    When I login with "performance_glitch_user" and "secret_sauce"
    Then I should see the inventory page

  Scenario: Problem User logs in successfully
    When I login with "problem_user" and "secret_sauce"
    Then I should see the inventory page

  # --- Negative Cases ---

  Scenario: Locked Out User cannot login
    When I login with "locked_out_user" and "secret_sauce"
    Then I should see a login error message with text "Sorry, this user has been locked out."

  Scenario: Invalid password shows an error
    When I login with "standard_user" and "wrong_password"
    Then I should see a login error message with text "Username and password do not match any user in this service"

  Scenario: Invalid username shows an error
    When I login with "wrong_user" and "secret_sauce"
    Then I should see a login error message with text "Username and password do not match any user in this service"

  Scenario: Empty username and password shows an error
    When I login with "" and ""
    Then I should see a login error message with text "Username is required"

  Scenario: Empty password shows an error
    When I login with "standard_user" and ""
    Then I should see a login error message with text "Password is required"

  Scenario: Empty username shows an error
    When I login with "" and "secret_sauce"
    Then I should see a login error message with text "Username is required"

  # --- Other Cases ---

  Scenario: Logout returns to login
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I logout
    Then I should see the login page
