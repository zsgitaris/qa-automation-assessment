Feature: Known issues users (SauceDemo demo accounts)

  @known_issue
  Scenario: problem_user - last name input cannot be filled
    Given I am logged in as "problem_user" with password "secret_sauce"
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    When I start checkout
    Then I should see the checkout information page
    When I try to fill last name with "Ani"
    Then last name field should remain empty

  @known_issue
  Scenario: error_user - Finish button does not complete checkout
    Given I am logged in as "error_user" with password "secret_sauce"
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    When I start checkout
    Then I should see the checkout information page
    When I fill checkout information with first name "Zogi" last name "Ani" postal code "ABCDE"
    And I continue to checkout overview
    Then I should see the checkout overview page
    When I finish checkout
    Then I should stay on the overview page
