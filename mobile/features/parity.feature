@mobile @parity
Feature: Mobile parity core flows (match web e2e)
  These scenarios mirror the web e2e coverage: Login -> Products -> Cart -> Checkout.

  Background:
    Given the user is on the login screen

  Scenario: Valid login navigates to products
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the products screen should be displayed

  Scenario: Invalid login shows error
    When the user logs in with username "invalid_user" and password "secret_sauce"
    Then an error message should be displayed

  Scenario: Add item to cart and verify in cart
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the products screen should be displayed
    When the user adds "Sauce Labs Backpack" to the cart
    And the user opens the cart
    Then the cart should contain "Sauce Labs Backpack"

  Scenario: Remove item from cart
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the products screen should be displayed
    When the user adds "Sauce Labs Backpack" to the cart
    And the user opens the cart
    Then the cart should contain "Sauce Labs Backpack"
    When the user removes "Sauce Labs Backpack" from the cart
    Then the cart should not contain "Sauce Labs Backpack"

  Scenario: Checkout completes successfully
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the products screen should be displayed
    When the user adds "Sauce Labs Backpack" to the cart
    And the user opens the cart
    Then the cart should contain "Sauce Labs Backpack"
    When the user starts checkout
    And the user fills checkout information first name "Zogi", last name "Ani", zip "12345"
    And the user finishes checkout
    Then checkout should be complete
