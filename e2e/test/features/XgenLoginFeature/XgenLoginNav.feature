Feature: UXLI Login and Navigation

  @xgen @e2e @test_001
  Scenario Outline: User logs into the application and navigates through the pages
    Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
    Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
    And User logout from the application "Logout"
    Examples:
      | loginData                       |
      | LoginData-testdataForLoginUser1 |