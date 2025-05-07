Feature: New Space, Source, Sync, Model and Pipeline Creation
    Create a new space, create a unique PostgreSQL source, create a unique Sync and a unique Pipeline
    and monitor the job of the Pipeline.


    @xgen @e2e @source_sync @newSpace @unik @pipeline99 @chained_03
    Scenario Outline: Create New space, create unique PostgreSQL source, create unique Sync ,create Model and a unique Pipeline
        Given User login to the application with a valid username, password and subscription "<data>"
        #---------creation of New Space------------------#
         Then User navigates through the Home, create a unique Spaces, with a welcome message "<data>"
        #---------creation of Source------------------#
        When User navigate to the Connect page and setup unique source name and unique description "<data>"
        Then user first do a cleanup and then create a PostgreSQL source, using data from "<data>"
        #---------creation of Sync------------------#
        When User navigate to the Sync page and setup unique Sync name and unique description "<data>"
        Then user cleanup the connection and create a new Connection and then perform Sync up activity "<data>"
        #---------creation of Model------------------#
        When user setup unique data and navigate to the Model page "<data>"
            And user perform the clean up activity "<data>"
        Then User should be able to create a Star Node data model, taking one from Source Node and one from Lookup Node, chained case "<data>"
            And user should be able to execute the Star Node model for Load Mode Full Load and see the Data Preview "<data>"
        #---------creation of Pipeline------------------#
        When user setup unique data and navigate to the Pipeline page "<data>"
            And user perform the clean up Pipeline "<data>"
        Then User should be able to create a Pipeline for an user in a new space "<data>"
            And user should be able to execute the Pipeline "<data>"
            And user should be able to monitor the job of the Pipeline "<data>"
            #---------Deletion of New Space------------------#
            # And User delete the created unique Space "<loginData>"
            And User logout from the application "Logout"
        Examples:
            | data                               |
            | Chained_Data-Source_Sync_Pipeline5 |
