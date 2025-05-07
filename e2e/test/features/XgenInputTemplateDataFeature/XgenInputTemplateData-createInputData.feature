Feature: Create Data DataInputTemplate

    @xgen  @template_01
    Scenario Outline: To Create Data Input template for the user in Xgen
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the DataInput Page
        #And user perform the clean up activity "<data>"
        Then user should be able to create a template and add the records and commit it "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                                  |
            | LoginData-testdataForLoginUser1 | XgenInputTemplateData-createInputData |