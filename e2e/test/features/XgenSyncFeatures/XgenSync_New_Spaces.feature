Feature: In a new Spaces-Create Connection on Sync page

    @xgen @e2e @sync @sync_011 @newSpace
    Scenario Outline: In a new Spaces, Create Connection XDF_PG_SALES_DATA,and perform Sync Activity, after cleanup activity
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the Home and Spaces pages after seeing the welcome message "<loginData>"
        When user navigate to the Sync page
        Then user cleanup the connection and create a new Connection and then perform Sync up activity "<data>"
        Then User delete the Space "<loginData>"
            And User logout from the application "Logout"
        Examples:
            | loginData                    | data                              |
            | LoginData-NewSpaceLoginUser1 | XgenSyncData-XdfPgSales_New_space |
