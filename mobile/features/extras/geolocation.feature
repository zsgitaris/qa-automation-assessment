@mobile @extras
Feature: Geo Location
  As a user
  I want to use the Geo Location feature
  So that I can see my current coordinates

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I open the menu

  Scenario: Open Geo Location screen
    When I open the Geo Location screen from the menu
    Then I should see the Geo Location screen

  Scenario: Update location and verify coordinates
    When I open the Geo Location screen from the menu
    And I set the device location to latitude -6.2000 and longitude 106.8166
    Then I should see the Geo Location screen
