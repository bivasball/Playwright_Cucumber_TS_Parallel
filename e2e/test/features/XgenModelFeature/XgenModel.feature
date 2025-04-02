Feature: Create Data ModelsModel

    @xgen @e2e @model @model_01
    Scenario Outline: To Create DIM_PRODUCTS Data Models
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Model page
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                    |
            | LoginData-testdataForLoginUser1 | XgenSyncData-XdfPgSales |

