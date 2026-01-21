Feature: Mobile Cart Management (Sauce Labs Sample App)

  @mobile @regression
  Scenario: Add two items and remove one from cart
    Given I am logged in on mobile as "standard_user" with password "secret_sauce"
    When I add "Sauce Labs Backpack" to cart on mobile
    And I add "Sauce Labs Bike Light" to cart on mobile
    Then the cart badge should show "2"
    When I open the cart on mobile
    Then cart should contain "Sauce Labs Backpack" on mobile
    And cart should contain "Sauce Labs Bike Light" on mobile
    When I remove "Sauce Labs Backpack" from cart on mobile
    Then cart should not contain "Sauce Labs Backpack" on mobile
    And the cart badge should show "1"
