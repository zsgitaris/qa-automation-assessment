Feature: Mobile Multi-language (device locale)

  # These scenarios relaunch the app with language/locale capabilities via tags.

  @mobile @extras @i18n @lang_en
  Scenario: English locale shows English words
    Given I open the mobile app
    Then the login screen should contain word "Username"

  @mobile @extras @i18n @lang_de
  Scenario: German locale shows German words
    Given I open the mobile app
    Then the login screen should contain word "Benutzer"

  @mobile @extras @i18n @lang_es
  Scenario: Spanish locale shows Spanish words
    Given I open the mobile app
    Then the login screen should contain word "Usuario"
