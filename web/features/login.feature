Feature: Web Login (SauceDemo)

  Background:
    Given I open SauceDemo login page

  Scenario Outline: Successful login for valid users
    When I login as "<username>" with password "secret_sauce"
    Then I should be redirected to the products page

    Examples:
      | username      |
      | standard_user |
      | problem_user  |
      | error_user    |
      | visual_user   |

  @slow
  Scenario Outline: Successful login for performance users
    When I login as "<username>" with password "secret_sauce"
    Then I should be redirected to the products page

    Examples:
      | username                |
      | performance_glitch_user |

  Scenario: Locked out user cannot login
    When I login as "locked_out_user" with password "secret_sauce"
    Then I should see an error message containing "locked out"

  # =========================
  # Additional negative cases
  # =========================

  Scenario: Empty username should show validation error
    When I login as "" with password "secret_sauce"
    Then I should see an error message containing "Username is required"

  Scenario: Empty password should show validation error
    When I login as "standard_user" with password ""
    Then I should see an error message containing "Password is required"

  Scenario Outline: Invalid credentials should be rejected
    When I login as "<username>" with password "<password>"
    Then I should see an error message containing "Username and password do not match"

    Examples:
      | username      | password     |
      | standard_user | wrong_pass   |
      | invalid_user  | secret_sauce |
