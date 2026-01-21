@mobile @parity
Feature: Products (Mobile parity)
  As a logged-in user
  I want to view and manage products
  So that I can select items for purchase

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"

  # --- Positive Cases ---

  Scenario: Products list is visible
    Then I should see the inventory page
    And I should see the products list

  Scenario: Open product details and go back
    When I open the product details for "Sauce Labs Backpack"
    Then I should see the product details page for "Sauce Labs Backpack"
    When I go back
    Then I should see the inventory page

  Scenario: Add a single item to cart updates badge
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

  Scenario: Add two items increases badge
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "2"

  Scenario: Remove item from products decreases badge
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "2"
    When I remove "Sauce Labs Bike Light" from the cart
    Then the cart badge should show "1"

  # --- Sorting Scenarios (Positive) ---

  Scenario: Sort products by Name A to Z
    When I sort products by "Name (A to Z)"
    Then the selected sort option should be "Name (A to Z)"
    # Add assertion to verify order if possible, but for now, rely on the visual check in the step definition

  Scenario: Sort products by Name Z to A
    When I sort products by "Name (Z to A)"
    Then the selected sort option should be "Name (Z to A)"

  Scenario: Sort products by Price Low to High
    When I sort products by "Price (low to high)"
    Then the selected sort option should be "Price (low to high)"

  Scenario: Sort products by Price High to Low
    When I sort products by "Price (high to low)"
    Then the selected sort option should be "Price (high to low)"

  # --- Product Details Scenarios (Positive) ---

  Scenario: Add item from details updates badge
    When I open the product details for "Sauce Labs Backpack"
    And I add the item to the cart from product details
    Then the cart badge should show "1"

  Scenario: Remove item from details updates badge
    Given I add "Sauce Labs Backpack" to the cart
    And I open the product details for "Sauce Labs Backpack"
    When I remove the item from the cart from product details
    Then the cart badge should be hidden
