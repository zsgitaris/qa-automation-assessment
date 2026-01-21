@mobile @extras
Feature: Gestures (Mobile)

  Background:
    Given I am logged in
    Then I should see the Products page
    And I open the menu from products

  Scenario: Open Gestures screen
    When I open the Gestures screen
    Then the Gestures screen should load

  Scenario: Swipe gesture demo
    When I open the Gestures screen
    And I perform a swipe gesture demo
    Then the Gestures screen should load

  Scenario: Drag and drop gesture demo
    When I open the Gestures screen
    And I perform a drag and drop gesture demo
    Then the Gestures screen should load

  Scenario: Pinch zoom gesture demo
    When I open the Gestures screen
    And I perform a pinch zoom gesture demo
    Then the Gestures screen should load
