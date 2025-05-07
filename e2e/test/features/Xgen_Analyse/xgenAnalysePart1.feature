Feature: Analyse section
    To visualize the data in the application


    @xgen @e2e @analyse  @ana1
    Scenario Outline: Xgen Analyse page navigation,then create a new Dataset and Chart
        Given User login to the application with a valid username, password and subscription "<data>"
        #--------select the existing---------#
        Then User navigates through the Home, and select the required Space "<data>"
        #--------Clean up and create a new DataSet---------#
        Given User navigates through Analyse to DataSet page and do the CleanUp "<data>"
        Then User on the Dataset page and Create a new Dataset "<data>"
        #--------Clean up and create a new Chart---------#
        Then User navigates through Analyse to Chart page and do the CleanUp "<data>"
        Then User on the Chart page and Create a new Chart "<data>"
        #--------logout from the child tab---------#
        Then User logout from the Child tab
        #--------Switch to parent tab ---------#
        Then User switch from Child tab to Parent tab
            #--------logout from parent tab ---------#
            And User logout from the application "Logout"
        Examples:
            | data                            |
            | XgenAnalyse-testdataFor_Analyse |

    @xgen @e2e @analyse  @wip2 @unik
    Scenario Outline: Starting from Souce,Synce,Model.Xgen Analyse page navigation
        Given User login to the application with a valid username, password and subscription "<data>"
        Then User navigates through the Home, create a unique Spaces, with a welcome message "<data>"
        When User navigate to the Connect page and setup unique source name and unique description "<data>"
        Then user first do a cleanup and then create a PostgreSQL source, using data from "<data>"

        When User navigate to the Sync page and setup unique Sync name and unique description "<data>"
        Then user cleanup the connection and create a new Connection and then perform Sync up activity "<data>"

        When user setup unique data and navigate to the Model page "<data>"
            And user perform the clean up activity "<data>"
        Then User should be able to create a Star Node data model, taking one from Source Node and one from Lookup Node, chained case "<data>"
            And user should be able to execute the Star Node model for Load Mode Full Load and see the Data Preview "<data>"

        Given User is on the Analyse page "<data>"
        Then User navigates through Analyse to Chart page and do the CleanUp "<data>"
        Then User on the Chart page and Create a new Chart "<data>"

            #And User delete the created unique Space "<loginData>"
            And User logout from the application "Logout"
        Examples:
            | data                                 |
            | XgenAnalyse-testdataFor_Analyse_unik |