@mobile @extras @optional @manual
Feature: Deep linking

  Scenario: Open Products via deep link
    When I open a deep link to "products"
    Then I should see the inventory page
