Feature: Checkout (SauceDemo)

  Scenario: Complete checkout flow
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    Then the cart should contain "Sauce Labs Backpack"

    When I start checkout
    Then I should see the checkout information page

    When I fill checkout information with first name "Zogi" last name "Ani" postal code "12345"
    And I continue to checkout overview
    Then I should see the checkout overview page

    When I finish checkout
    Then I should see the checkout complete page
