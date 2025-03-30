Feature: To upload the files

    @xgen @e2e @uploadFiles @upload_01 @test_004
    Scenario Outline: To upload CategoryForecast.xlsx file
        Given User logs into the application with username and password and sees the message and selects the subscription "<data>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<data>"
        Given user navigate to the Connect page
        When user click on upload File button
        Then user should be able to upload the file. "<data>"
            And User logout from the application "Logout"
        Examples:
            | data                            |
            | XgenSourceData-testdataForecast |
