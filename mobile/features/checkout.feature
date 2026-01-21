@mobile @parity
Feature: Checkout (Mobile parity)
  As a logged-in user with items in cart
  I want to complete the checkout process
  So that I can purchase the items

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I add "Sauce Labs Backpack" to the cart
    And I open the cart

  # --- Positive Cases ---

  Scenario: Start checkout opens information page
    When I start checkout
    Then I should see the checkout information page

  Scenario: Happy path checkout completes
    When I start checkout
    And I enter checkout information with first name "John" last name "Doe" postal code "12345"
    And I continue checkout
    Then I should see the checkout overview page
    When I finish checkout
    Then I should see the checkout complete page

  Scenario: Back home returns to products and clears badge
    When I start checkout
    And I enter checkout information with first name "John" last name "Doe" postal code "12345"
    And I continue checkout
    When I finish checkout
    Then I should see the checkout complete page
    When I go back home
    Then I should see the inventory page
    And the cart badge should be hidden

  Scenario: Checkout overview shows the item
    When I start checkout
    And I enter checkout information with first name "John" last name "Doe" postal code "12345"
    And I continue checkout
    Then I should see the checkout overview page
    And the overview should list "Sauce Labs Backpack"

  Scenario: Checkout with multiple items
    Given I add "Sauce Labs Bike Light" to the cart
    And I open the cart
    When I start checkout
    And I enter checkout information with first name "John" last name "Doe" postal code "12345"
    And I continue checkout
    Then I should see the checkout overview page
    And the overview should list "Sauce Labs Backpack"
    And the overview should list "Sauce Labs Bike Light"

  # --- Negative/Edge Cases (Information Page) ---

  Scenario: Missing first name shows error
    When I start checkout
    And I enter checkout information with first name "" last name "Doe" postal code "12345"
    And I continue checkout
    Then I should see a checkout error message with text "First Name is required"

  Scenario: Missing last name shows error
    When I start checkout
    And I enter checkout information with first name "John" last name "" postal code "12345"
    And I continue checkout
    Then I should see a checkout error message with text "Last Name is required"

  Scenario: Missing postal code shows error
    When I start checkout
    And I enter checkout information with first name "John" last name "Doe" postal code ""
    And I continue checkout
    Then I should see a checkout error message with text "Postal Code is required"

  Scenario: Cancel checkout from information page returns to cart
    When I start checkout
    Then I should see the checkout information page
    When I cancel checkout from the information page
    Then I should see the cart page

  # --- Negative/Edge Cases (Overview Page) ---

  Scenario: Cancel checkout from overview returns to products
    When I start checkout
    And I enter checkout information with first name "John" last name "Doe" postal code "12345"
    And I continue checkout
    Then I should see the checkout overview page
    When I cancel checkout from the overview page
    Then I should see the inventory page
