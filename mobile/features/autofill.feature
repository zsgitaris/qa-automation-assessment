@mobile @extras
Feature: Autofill (Mobile)

  # Autofill was introduced in v2.5.0.

  Background:
    Given I am on the login page

  Scenario Outline: Autofill with accepted usernames
    When I autofill credentials with username "<username>"
    Then login fields should be populated

    Examples:
      | username          |
      | standard_user     |
      | locked_out_user   |
      | problem_user      |
      | performance_glitch_user |
      | error_user        |
      | visual_user       |
