Feature: Checkout E2E for all users (expected outcomes)

  @e2e_all_users
  Scenario Outline: Checkout flow outcome for "<username>"
    Given I am logged in as "<username>" with password "secret_sauce"
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    Then the cart should contain "Sauce Labs Backpack"
    When I start checkout
    Then I should see the checkout information page
    When I fill checkout information with first name "<first>" last name "<last>" postal code "<zip>"
    And I click Continue on the checkout information page
    Then checkout outcome for "<username>" should be "<outcome>"

    Examples:
      | username                | first | last | zip   | outcome          |
      | standard_user           | Zogi  | Ani  | 12345 | complete         |
      | performance_glitch_user | Zogi  | Ani  | 12345 | complete         |
      | visual_user             | Zogi  | Ani  | 12345 | complete         |
      | problem_user            | Zogi  | Ani  | 12345 | blocked_lastname |
      | error_user              | Zogi  | Ani  | ABCDE | blocked_finish   |
