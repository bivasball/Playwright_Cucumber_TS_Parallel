Feature: To upload the files like CategoryForecast.xlsx, company_data.csv and Company Survey.xlsx

    @xgen @e2e @uploadFiles @upload_01 @test_004
    Scenario Outline: To upload CategoryForecast.xlsx file, after cleanup activity
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Connect page
        Then user cleanup and upload the file. "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                            |
            | LoginData-testdataForLoginUser1 | XgenSourceData-testdataForecast |

    @xgen @e2e @uploadFiles @upload_02 @test_005
    Scenario Outline: To upload company_data.csv file, after cleanup activity
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Connect page
        Then user cleanup and upload the file. "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                              |
            | LoginData-testdataForLoginUser1 | XgenSourceData-testdataCompayData |


    @xgen @e2e @uploadFiles @upload_03 @test_006
    Scenario Outline: To upload Company Survey.xlsx file, after cleanup activity
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Connect page
        Then user cleanup and upload the file. "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                                 |
            | LoginData-testdataForLoginUser1 | XgenSourceData-testdataCompanySurvey |
