Feature: In a new Spaces- Setting up PostgreSQL Source.Recreate the source if exists.Create a new unique source.


    @xgen @e2e @source_sync  @unik @newSpace @chained_01
    Scenario Outline: Create New space,create unique PostgreSQL source,create unique Sync
        Given User login to the application with a valid username, password and subscription "<loginData>"
        Then User navigates through the Home, create a unique Spaces, with a welcome message "<loginData>"
        When User navigate to the Connect page and setup unique source name and unique description "<data>"
        Then user first do a cleanup and then create a PostgreSQL source, using data from "<data>"

        When User navigate to the Sync page and setup unique Sync name and unique description "<data>"
        Then user cleanup the connection and create a new Connection and then perform Sync up activity "<data>"

            And User delete the created unique Space "<loginData>"
            And User logout from the application "Logout"
        Examples:
            | loginData                             | data                       |
            | LoginData-NewAndUniqueSpaceLoginUser1 | Chained_Data-Source_Sync_1 |




    @xgen @e2e @source_sync  @unik @newSpace @chained_02
    Scenario Outline: Create New space,create unique PostgreSQL source,create unique Sync, create unique Model
        Given User login to the application with a valid username, password and subscription "<loginData>"
        Then User navigates through the Home, create a unique Spaces, with a welcome message "<loginData>"
        When User navigate to the Connect page and setup unique source name and unique description "<data>"
        Then user first do a cleanup and then create a PostgreSQL source, using data from "<data>"

        When User navigate to the Sync page and setup unique Sync name and unique description "<data>"
        Then user cleanup the connection and create a new Connection and then perform Sync up activity "<data>"

        When user setup unique data and navigate to the Model page "<data>"
            And user perform the clean up activity "<data>"
        Then User should be able to create a Star Node data model, taking one from Source Node and one from Lookup Node, chained case "<data>"
            And user should be able to execute the Star Node model for Load Mode Full Load and see the Data Preview "<data>"
            #And User delete the created unique Space "<loginData>"
            And User logout from the application "Logout"
        Examples:
            | loginData                             | data                             |
            | LoginData-NewAndUniqueSpaceLoginUser1 | Chained_Data-Source_Sync_Model_1 |




    @chained_029999 @below-to-used-while-debug
    Scenario Outline: Data Preview, To Create UNIQUE Data Models using STAR NODE,Taking one table from Source Node and one table from Lookup Node, to Model name, for Load Mode type Full Load
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user setup unique data and navigate to the Model page "<dataStar>"
            And user perform the clean up activity "<dataStar>"
        Then User should be able to create a Star Node data model, taking one from Source Node and one from Lookup Node, chained case "<dataStar>"
            And user should be able to execute the Star Node model for Load Mode Full Load and see the Data Preview "<dataStar>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | dataStar                         |
            | LoginData-chained_ForLoginUser1 | Chained_Data-Source_Sync_Model_1 |
