@mobile @parity
Feature: Products (Mobile parity)

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"

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

  Scenario: Add a different item to cart updates badge
    When I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "1"

  Scenario: Add another item to cart updates badge
    When I add "Sauce Labs Onesie" to the cart
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

  @optional
  Scenario: Sort products by name A to Z
    When I sort products by "Name (A to Z)"
    Then the product sort should be "Name (A to Z)"

  @optional
  Scenario: Sort products by price low to high
    When I sort products by "Price (low to high)"
    Then the product sort should be "Price (low to high)"

  @optional
  Scenario: Add item from details updates badge
    When I open the product details for "Sauce Labs Backpack"
    And I add the current item to the cart
    Then the cart badge should show "1"
