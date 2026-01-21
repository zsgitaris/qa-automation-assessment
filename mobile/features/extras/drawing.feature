@mobile @extras
Feature: Drawing
  As a user
  I want to use the drawing canvas
  So that I can draw shapes like the Sauce Bolt

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I open the menu

  Scenario: Open Drawing screen
    When I open the Drawing screen from the menu
    Then I should see the Drawing screen

  Scenario: Draw Sauce Bolt and clear canvas
    When I open the Drawing screen from the menu
    And I draw the Sauce Bolt on the canvas
    And I clear the canvas
    Then I should see the Drawing screen
