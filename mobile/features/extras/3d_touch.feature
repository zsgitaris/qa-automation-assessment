@mobile @extras @optional @ios_only
Feature: 3D Touch / Force Touch (iOS)

  Scenario: Open quick actions (iOS 3D Touch)
    Given I open the app
    When I trigger iOS quick actions
    Then I should see a quick action menu
