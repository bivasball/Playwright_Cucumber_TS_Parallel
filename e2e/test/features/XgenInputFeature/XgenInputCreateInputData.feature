Feature: Create Data DataInputTemplate

    @xgen  @template_01
    Scenario Outline: To Create Data Input template for the user in Xgen
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Input Page
            And User perform the clean up activity for Input Page "<data>"
        Then user should be able to create a template and add the records and commit it "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                                  |
            | LoginData-testdataForLoginUser1 | XgenInputTemplateData-createInputData |

    @xgen  @template_02 @unik
    Scenario Outline: To Create UNIQUE Data Input template for the user in Xgen
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When User setup unique data and navigate to the Input page "<data>"
            And User perform the clean up activity for Input Page "<data>"
        Then user should be able to create a template and add the records and commit it "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                                  |
            | LoginData-testdataForLoginUser1 | XgenInputTemplateData-createInputDataUnik |