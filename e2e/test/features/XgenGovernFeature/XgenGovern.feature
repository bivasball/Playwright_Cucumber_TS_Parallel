Feature: Governe button and Navigations

    @xgen  @govern_01
    Scenario Outline: To verify user can create the Tag in Settings, and Adding those tags in the Govern Page
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        Then user navigate to Settings and set up the tags in Data Categories "<data>"
        Then the user navigate to Govern page and select Datamodel from the given artifacts "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                    |
            | LoginData-testdataForLoginUser1 | XgenGovernData-testdata |


    @xgen  @govern_02
    Scenario Outline: To verify user preview the data in Govern Page and add Quality Rules
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        Then user navigate to Settings and set up the tags in Data Categories "<data>"
        When the user navigate to Govern page and select Datamodel from the given artifacts "<data>"
        Then the user preview the data and Add Quality rules in Quality tab "<data>"
        When the user add some notes in the Notes tab "<data>"
        Then User logout from the application "Logout"
        Examples:
            | loginData                       | data                             |
            | LoginData-testdataForLoginUser1 | XgenGovernData-testdataModelStar |


