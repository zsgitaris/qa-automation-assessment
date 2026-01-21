@mobile @parity
Feature: Cart (Mobile parity)

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"

  Scenario: Added item appears in cart
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    Then the cart should contain "Sauce Labs Backpack"

  Scenario: Remove item from cart updates badge
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    Then the cart badge should show "1"
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart should not contain "Sauce Labs Backpack"
    And the cart badge should be hidden

  Scenario: Remove one of multiple items updates badge
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "2"
    And I open the cart
    When I remove "Sauce Labs Bike Light" from the cart
    Then the cart badge should show "1"
    And the cart should contain "Sauce Labs Backpack"

  Scenario: Continue shopping returns to products
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    When I continue shopping
    Then I should see the inventory page

  Scenario: Cart persists when navigating back
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    Then the cart should contain "Sauce Labs Backpack"
    When I go back
    And I open the cart
    Then the cart should contain "Sauce Labs Backpack"

  Scenario: Cart shows multiple items
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Onesie" to the cart
    And I open the cart
    Then the cart should contain "Sauce Labs Backpack"
    And the cart should contain "Sauce Labs Onesie"

  Scenario: Remove all items empties cart
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Onesie" to the cart
    And I open the cart
    When I remove "Sauce Labs Backpack" from the cart
    And I remove "Sauce Labs Onesie" from the cart
    Then the cart should be empty
    And the cart badge should be hidden

  Scenario: Open cart from products and return
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    When I go back
    Then I should see the inventory page

  Scenario: Cart badge matches number of added items
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    And I add "Sauce Labs Onesie" to the cart
    Then the cart badge should show "3"
