Feature: Create Data PipelinesPipeline

    @xgen @e2e @pipeline @pipeline_01
    Scenario Outline: To Create Data Pipelines for an user based on user id
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user navigate to the Pipeline page
        And user perform the clean up Pipeline "<data>"
        Then user should be able to create a Pipeline for an user "<data>"
            And user should be able to execute the Pipeline "<data>"
            And user should be able to monitor the job of the Pipeline "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                       | data                            |
            | LoginData-testdataForLoginUser1 | XgenPipelineData-createPipeline |

    @xgen @e2e @unik @pipeline @pipeline_02
    Scenario Outline: To Create UNIQUE Data Pipeline for an user based on user id
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
        Then User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message "<loginData>"
        When user setup unique data and navigate to the Pipeline page "<data>"
            And user perform the clean up Pipeline "<data>"
        Then user should be able to create a Pipeline for an user "<data>"
            And user should be able to execute the Pipeline "<data>"
            And user should be able to monitor the job of the Pipeline "<data>"
            And User logout from the application "Logout"
        Examples:
            | loginData                    | data                                |
            | LoginData-loginbyautomation1 | XgenPipelineData-createUnikPipeline |

