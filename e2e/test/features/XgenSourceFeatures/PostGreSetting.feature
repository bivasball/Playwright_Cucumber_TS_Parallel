Feature: Setting up PostgreSQL Source

    @xgen @e2e @pgress @test_002
    Scenario Outline: Set up a PostgreSQL source using JSON data
        Given User logs into the application with username and password and sees the message and selects the subscription "<data>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<data>"
        Given user navigate to the Connect page
        When user create a PostgreSQL source using data from "<data>"
            And User logout from the application "Logout"
        Examples:
            | data                                     |
            | XgenSourceData-testdataForPgDbConnection |

    @xgen @e2e @pgress @test_003
    Scenario Outline: Set up a PostgreSQL source and Validate using JSON data
        Given User logs into the application with username and password and sees the message and selects the subscription "<data>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<data>"
        Given user navigate to the Connect page
        When user create a PostgreSQL source using data from "<data>"
        Then user edit the source with password by click on save and validate the source "<data>"
            And User logout from the application "Logout"
        Examples:
            | data                                     |
            | XgenSourceData-testdataForPgDbConnection |