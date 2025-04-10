Feature: Create Data ModelsModel

    @xgen @e2e @model @view  @view_01
    Scenario Outline: To Create Data Models for single Source Node to Model name for Load Mode Standard View
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Model page
            And user perform the clean up activity "<data>"
        Then user should be able to create a linear data model for Load Mode Standard View,using data "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                                |
            | LoginData-testdataForLoginUser1 | XgenModelData-createLinearModelView |


    @xgen @e2e @model @view @unik @view_02
    Scenario Outline: To Create Unique Data Models for single Source Node to Model name for Load Mode Standard View
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user sets up unique data for View and navigates to the Model page "<data>"
            And user perform the clean up activity "<data>"
        Then user should be able to create a linear data model for Load Mode Standard View,using data "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                                      |
            | LoginData-testdataForLoginUser1 | XgenModelData-UniqueCreateLinearModelView |
