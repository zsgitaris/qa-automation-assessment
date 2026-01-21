Feature: Mobile Menu (Sauce Labs Sample App)

  @mobile @smoke
  Scenario: Logout from products screen should return to login
    Given I am logged in on mobile as "standard_user" with password "secret_sauce"
    When I logout from mobile app
    Then I should see the mobile login screen
