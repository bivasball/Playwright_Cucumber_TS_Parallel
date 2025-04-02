Feature: Setting up PostgreSQL Source

    @xgen @e2e @pgress @test_002
    Scenario Outline: Set up a PostgreSQL source first do a cleanup and then create a PostgreSQL source
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        Given user navigate to the Connect page
        When user first do a cleanup and then create a PostgreSQL source, using data from "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                                     |
            | LoginData-testdataForLoginUser1 | XgenSourceData-testdataForPgDbConnection |

    @xgen @e2e @pgress @test_003
    Scenario Outline: Set up a PostgreSQL source,then edit the source and Validate the source
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        Given user navigate to the Connect page
        When user first do a cleanup and then create a PostgreSQL source, using data from "<data>"
        Then user edit the source with password by click on save and validate the source, using data from "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                                     |
            | LoginData-testdataForLoginUser1 | XgenSourceData-testdataForPgDbConnection |