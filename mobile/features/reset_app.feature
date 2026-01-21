@mobile @extras
Feature: Reset App State (Mobile)

  Background:
    Given I am logged in
    Then I should see the Products page

  Scenario Outline: Reset app state clears cart badge
    When I add "<item>" to cart
    Then I should see cart badge "1"
    When I reset app state from the menu
    Then the cart badge should be cleared

    Examples:
      | item                     |
      | Sauce Labs Backpack      |
      | Sauce Labs Bike Light    |
      | Sauce Labs Bolt T-Shirt  |
