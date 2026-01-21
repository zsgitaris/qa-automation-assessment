@mobile @extras
Feature: Geo Location (Mobile)

  Background:
    Given I am logged in
    Then I should see the Products page
    And I open the menu from products

  Scenario: Open Geo Location screen
    When I open the Geo Location screen
    Then the Geo Location screen should load

  Scenario Outline: Set device geo location
    When I open the Geo Location screen
    And I set geo location to latitude <lat> and longitude <lon>
    Then the Geo Location screen should load

    Examples:
      | lat        | lon        |
      | -6.200000  | 106.816666  |
      | 37.774929  | -122.419418 |
      | -7.797068  | 110.370529  |
