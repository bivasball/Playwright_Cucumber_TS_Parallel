Feature: Testing the X-Y co-ordinate

    @xgen @e2e @Sampel @XY
    Scenario Outline: Testing the X-Y co-ordinate-To Create Data Pipelines 
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Pipeline page
        #And user perform the clean up Pipeline "<data>"
        Then Sample user should be able to create a Pipeline for an user Sample test "<data>"
            #And user should be able to execute the Pipeline "<data>"
           #And user should be able to monitor the job of the Pipeline "<data>"
            #And User logout from the application "Logout"
        Examples:
            | loginData                       | data                            |
            | LoginData-testdataForLoginUser1 | XgenPipelineData-createPipeline |
