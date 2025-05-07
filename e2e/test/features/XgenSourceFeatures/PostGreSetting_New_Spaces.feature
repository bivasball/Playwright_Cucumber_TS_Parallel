Feature: In a new Spaces- Setting up PostgreSQL Source.Recreate the source if exists.Create a new unique source.


    @xgen @e2e @pgress @unik @newSpace @pgns_02
    Scenario Outline: Create New space,create unique PostgreSQL source after validate the source
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the Home and Spaces pages after seeing the welcome message "<loginData>"
        Given user navigate to the Connect page and setup unique source name "<data>"
        When user first do a cleanup and then create a PostgreSQL source, using data from "<data>"
       
        #Then User delete the Space "<loginData>"
            And User logout from the application "Logout"
        Examples:
            | loginData                    | data                                |
            | LoginData-NewSpaceLoginUser1 | XgenSourceData-PgDbConnectionUnique |