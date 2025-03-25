Feature: UXLI Login and Navigation

  @uxli @e2e @test_006
  Scenario Outline: User logs into the application and navigates through the pages
    Given User navigates to the login page
    When User logs in using data from the JSON file "<data>"
    Then User should see the message "<data>"
    When User selects the subscription "<data>"
    Then User should see the "Home" button
    When User clicks on the "Home" button
    Then User should see the "Spaces" button
    When User clicks on the "Spaces" button
    Then User should see the "Spaces" page
    When User selects the "Fitness" radio option
    Then User should see the welcome message "Welcome, Bivas!"
    When User logs out
    Then User should see the "Logout" button

    Examples:
      | data                            |
      | LoginData-testdataForLoginScenario |