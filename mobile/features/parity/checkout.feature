@mobile @parity
Feature: Checkout (Mobile parity)

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I add "Sauce Labs Backpack" to the cart
    And I open the cart

  Scenario: Start checkout opens information page
    When I start checkout
    Then I should see the checkout information page

  Scenario: Cancel checkout from information page returns to cart
    When I start checkout
    Then I should see the checkout information page
    When I cancel checkout
    Then I should see the cart page

  Scenario: Missing first name shows error
    When I start checkout
    And I enter checkout information with first name "" last name "Doe" postal code "12345"
    And I continue checkout
    Then I should see a checkout error message

  Scenario: Missing last name shows error
    When I start checkout
    And I enter checkout information with first name "John" last name "" postal code "12345"
    And I continue checkout
    Then I should see a checkout error message

  Scenario: Missing postal code shows error
    When I start checkout
    And I enter checkout information with first name "John" last name "Doe" postal code ""
    And I continue checkout
    Then I should see a checkout error message

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
    And the overview should contain "Sauce Labs Backpack"

  Scenario: Cancel checkout from overview returns to products
    When I start checkout
    And I enter checkout information with first name "John" last name "Doe" postal code "12345"
    And I continue checkout
    Then I should see the checkout overview page
    When I cancel checkout
    Then I should see the inventory page

  Scenario: Checkout with multiple items
    Given I add "Sauce Labs Bike Light" to the cart
    And I open the cart
    When I start checkout
    And I enter checkout information with first name "John" last name "Doe" postal code "12345"
    And I continue checkout
    Then I should see the checkout overview page
    And the overview should contain "Sauce Labs Backpack"
    And the overview should contain "Sauce Labs Bike Light"
