Feature: Create Data ModelsModel

    @xgen @e2e @model @model_01
    Scenario Outline: To Create Data Models for single Source Node to Model name for Load Mode type Full Load
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Model page
            And user perform the clean up activity "<data>"
        Then user should be able to create a linear data model for Load Mode Full Load,using data "<data>"
            And user should be able to execute the model for Load Mode Full Load "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                            |
            | LoginData-testdataForLoginUser1 | XgenModelData-createLinearModel |

    @xgen @e2e @model @model_02
    Scenario Outline: To Create Data Models using JOIN NODE,Taking one table from Source Node and one table from Lookup Node, to Model name, for Load Mode type Full Load
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Model page
            And user perform the clean up activity "<data>"
        Then user should be able to create a data model,taking one table from Source Node and one table from Lookup Node "<data>"
            And user should be able to execute the model for Load Mode Full Load "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                            |
            | LoginData-testdataForLoginUser1 | XgenModelData-OneSNode_onePnode |


    @xgen @e2e @model @star @model_03
    Scenario Outline: To Create Data Models using STAR NODE,Taking one table from Source Node and one table from Lookup Node, to Model name, for Load Mode type Full Load
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Model page
            And user perform the clean up activity "<dataStar>"
        Then user should be able to create a Star Node data model, taking one from Source Node and one from Lookup Node "<dataStar>"
            And user should be able to execute the Star Node model for Load Mode Full Load "<dataStar>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | dataStar                                 |
            | LoginData-testdataForLoginUser1 | XgenModelData-StarNodeoneSourcetwoLookup |


    @xgen @e2e @model @star @unik @model_04
    Scenario Outline: Data Preview, To Create UNIQUE Data Models using STAR NODE,Taking one table from Source Node and one table from Lookup Node, to Model name, for Load Mode type Full Load
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user setup unique data and navigate to the Model page "<dataStar>"
            And user perform the clean up activity "<dataStar>"
        Then user should be able to create a Star Node data model, taking one from Source Node and one from Lookup Node "<dataStar>"
            And user should be able to execute the Star Node model for Load Mode Full Load and see the Data Preview "<dataStar>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | dataStar                             |
            | LoginData-testdataForLoginUser1 | XgenModelData-UniqueStarNodeoneStwoL |