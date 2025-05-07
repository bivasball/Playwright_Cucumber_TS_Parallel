Feature: UXLI Login and Navigation

    @xgen @e2e @sample @auth @loadsession
    Scenario Outline: User logs into the application and navigates through the pages by admin
        Given User logs into the application with saved session "<loginData>"
        #Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        #When the user click on Govern page "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                      |
            | LoginData-testdataForLoginUser1 | SampleData-Governtestdata |

    @xgen @e2e @sample @savesession
    Scenario Outline: User logs into the application and navigates through the pages
        Given User logs into the application with username and password and save the login session "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
            #When the user click on Govern page "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                      |
            | LoginData-testdataForLoginUser1 | SampleData-Governtestdata |



  # the below is kept , will be user later, if required
  
   # @xgen @e2e @govern_021
    Scenario Outline: To verify user create a new model and create the Tag in Settings, and Adding those tags in the Govern Page
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Model page
            And user perform the clean up activity "<data>"
        Then user should be able to create a linear data model for Load Mode Full Load,using data "<data>"
            And user should be able to execute the model for Load Mode Full Load "<data>"
        Then user navigate to Settings and set up the tags in Data Categories "<data>"
        Then the user navigate to Govern page and select Datamodel from the given artifacts "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                    |
            | LoginData-testdataForLoginUser1 | XgenGovernData-testdata |


    #@xgen @end2end @govern_011 @unik
    Scenario Outline: To verify, user create a new STAR model and create the Tag in Settings, Preview and Execute DQ rule in Govern Page
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user setup unique data and navigate to the Model page "<data>"
            And user perform the clean up activity "<data>"
        Then user should be able to create a Star Node data model, taking one from Source Node and one from Lookup Node "<data>"
            And user should be able to execute the Star Node model for Load Mode Full Load and see the Data Preview "<data>"
        Then user navigate to Settings and set up the tags in Data Categories "<data>"
        Then the user navigate to Govern page and select Datamodel from the given artifacts "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                           |
            | LoginData-testdataForLoginUser1 | XgenGovernData-modelStarUnique |


    #@xgen @end2end @newSpace @gov112
    Scenario Outline: To verify, user create a new STAR model and create the Tag in Settings, Preview and Execute DQ rule in Govern Page
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the Home and Spaces pages after seeing the welcome message "<loginData>"
        Then User delete the Space "<loginData>"

            And User logout from the application "Logout"
        Examples:
            | loginData                    | data                           |
            | LoginData-NewSpaceLoginUser1 | XgenGovernData-modelStarUnique |  



 #login with existing Space- the below Gherkin can be used #
 #Then User navigates through the Home, and select the required Space "<data>"                   
# adding a test comment

    @xgen @e2e @sample @RoleDelete
    Scenario Outline: User logs into the application and navigates through the pages
        Given User logs into the application with username and password and save the login session "<loginData>"
        #Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
            When User navigates through Roles and User for administration "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                      |
            | LoginData-testdataForLoginUser1 | SampleData-Governtestdata |
