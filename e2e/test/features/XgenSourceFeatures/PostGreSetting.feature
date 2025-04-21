Feature: Setting up PostgreSQL Source.Recreate the source if exists.Create a new unique source.

    @xgen @e2e @pgress @test_002 @pg1
    Scenario Outline: To Set up a PostgreSQL source, first do a cleanup and then Validate and create a PostgreSQL source
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        Given user navigate to the Connect page
        When user first do a cleanup and then create a PostgreSQL source, using data from "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                                     |
            | LoginData-testdataForLoginUser1 | XgenSourceData-testdataForPgDbConnection |

    @xgen @e2e @pgress @test_002 @pg2
    Scenario Outline: To Set up a UNIQUE PostgreSQL source, do a cleanup and First Validate and create a PostgreSQL source
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        Given user navigate to the Connect page and setup unique source name "<data>"
        When user first do a cleanup and then create a PostgreSQL source, using data from "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                                |
            | LoginData-testdataForLoginUser1 | XgenSourceData-PgDbConnectionUnique |



    @xgen @e2e @pgress @test_003 @pg3
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

    @xgen @e2e @pgress @unik @pg4
    Scenario Outline: To Set up a UNIQUE PostgreSQL source,then edit the source and Validate the source
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        Given user navigate to the Connect page and setup unique source name "<data>"
        When user first do a cleanup and then create a PostgreSQL source, using data from "<data>"
        Then user edit the source with password by click on save and validate the source, using data from "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                                |
            | LoginData-testdataForLoginUser1 | XgenSourceData-PgDbConnectionUnique |