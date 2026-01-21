@mobile @extras
Feature: WebView (Mobile)

  Background:
    Given I am logged in
    Then I should see the Products page
    And I open the menu from products

  Scenario: Open WebView from menu
    When I open the WebView screen
    Then the WebView screen should load
