Feature: Settings button and Navigations

    @xgen @e2e @settings
    Scenario Outline: User set up the tags in Settings for Data Categories
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        Then user navigate to Settings and set up the tags in Data Categories "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                      |
            | LoginData-testdataForLoginUser1 | XgenSettingsData-testdata |