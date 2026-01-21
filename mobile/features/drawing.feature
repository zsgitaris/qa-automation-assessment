@mobile @extras
Feature: Drawing (Mobile)

  Background:
    Given I am logged in
    Then I should see the Products page
    And I open the menu from products

  Scenario: Open Drawing screen
    When I open the Drawing screen
    Then the Drawing screen should load

  Scenario: Draw something and clear
    When I open the Drawing screen
    And I draw on the canvas
    And I clear the drawing
    Then the Drawing screen should load
