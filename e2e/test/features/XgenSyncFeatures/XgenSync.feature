Feature: Create Connection on Sync page

    @xgen @e2e @sync @sync_01
    Scenario Outline: To Create Connection XDF_PG_SALES_DATA,and perform Sync Activity, after cleanup activity
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Sync page
        Then user cleanup the connection and create a new Connection and perform Sync up,by testdata "<data>"

            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                    |
            | LoginData-testdataForLoginUser1 | XgenSyncData-XdfPgSales |

