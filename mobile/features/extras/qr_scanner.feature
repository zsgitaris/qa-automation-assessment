@mobile @extras
Feature: QR Code Scanner
  As a user
  I want to use the QR Code Scanner
  So that I can scan QR codes with my camera

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I open the menu

  Scenario: Open QR Code Scanner screen
    When I open the QR Code Scanner screen from the menu
    Then I should see the QR Code Scanner screen

  Scenario: QR Scanner handles camera permission prompt
    When I open the QR Code Scanner screen from the menu
    And I handle the camera permission prompt
    Then I should see the QR Code Scanner screen
