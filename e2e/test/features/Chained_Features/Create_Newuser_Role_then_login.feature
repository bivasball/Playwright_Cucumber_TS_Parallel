Feature: Create a New user, create a new Role, and assign the Role to the User, then verify the access. And then Cleanup the Role and user


    @xgen  @user-Role  @user_role @chained_04
    Scenario Outline: To verify admin user able to perform cleanup of User,Role and re-create a User and assign Role.The new user should be able to login and verify the access.
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
            And user perform the clean up activity for creation of a new User "<data>"
            And user perform the clean up activity for User Roles "<data>"
        Then user navigate to Settings, create a new Role and sets Subscription "<data>"
        Then user navigate to Settings and creates users and assign role "<data>"
        Then User logout from the application "Logout"
        #-------New User logs into the application and change the password, and relogins to the application-----
        Given new User logs into the application and change the password "<data>"
        Then new User logs into the application with valid username and valid password "<data>"
            And verify the new user should be able to view and click- Home,Space and Settings "<data>"
            And verify the new user should not be able to view any Active Space and select "<data>"
        Then new User logout from the application "Logout"
        #-------doing the cleanup of the user and role created in the above scenario-----
        Given User logs into the application with username and password and sees the message and selects the subscription "<loginData>"
            And user perform the clean up activity for creation of a new User "<data>"
            And user perform the clean up activity for User Roles "<data>"
        Then User logout from the application "Logout"
        Examples:
            | loginData                       | data                                 |
            | LoginData-testdataForLoginUser1 | Chained_Data-CreateUserRolethenLogin |