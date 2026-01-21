@mobile @extras
Feature: QR Code Scanner (Mobile)

  Background:
    Given I am logged in
    Then I should see the Products page
    And I open the menu from products

  Scenario: Open QR Scanner screen
    When I open the QR Scanner screen
    Then the QR Scanner screen should load
