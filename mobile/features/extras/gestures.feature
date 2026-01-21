@mobile @extras
Feature: Gestures
  As a user
  I want to use the Gestures feature
  So that I can interact with the app using touch gestures

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I open the menu

  Scenario: Open Gestures screen from menu
    When I open the Gestures screen from the menu
    Then I should see the Gestures screen

  Scenario: Perform drag and drop
    When I open the Gestures screen from the menu
    And I perform a drag and drop gesture
    Then I should see the Gestures screen
