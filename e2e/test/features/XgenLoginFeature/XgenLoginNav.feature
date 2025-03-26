Feature: UXLI Login and Navigation

  @uxli @e2e @test_006
  Scenario Outline: User logs into the application and navigates through the pages
    Given User logs into the application with username and password and sees the message and selects the subscription "<data>"
    Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<data>"
    Examples:
      | data                            |
      | LoginData-testdataForLoginScenario |