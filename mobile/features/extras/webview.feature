@mobile @extras
Feature: WebView
  As a user
  I want to use the WebView feature
  So that I can browse external sites within the app

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I open the menu

  Scenario: Open WebView from menu
    When I open the WebView screen from the menu
    Then I should see the WebView screen

  Scenario: Load a website in WebView
    When I open the WebView screen from the menu
    And I set the WebView url to "https://www.saucelabs.com"
    Then the WebView page should be loaded
