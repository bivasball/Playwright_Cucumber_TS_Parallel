Feature: To test various Action of herokuapp page

  Background:
    Given User navigates to the application for Testing UI

  @uxli @e2e @test_001
  Scenario: Verify Add Remove Button functionality
    When user click on the Add or Remove Elements link
    Then user should land on Add or Remove page
      And user click on Add button to add and Remove button to remove

  @uxli @e2e @test_002
  Scenario: Verify Login with Basic Auth
    When user click on Basic auth link
      And user fills the Pop up with username and password
    Then user should be able to login to the page successfully

  @uxli @e2e @test_003
  Scenario: Verify Broken Images page navigation
    When user clicks on the Broken Images link
    Then user should see the Broken Images page heading

  @uxli @e2e @test_004
  Scenario: Verify Checkbox
    When user click on the link "<data>"
    #Then user verify the Checkbox
    Examples:
      | data                            |
      | AccountData-testdataForScenario |

  @uxli @e2e @test_005
  Scenario: Verify to read the data from json file
    When user click on the link "<data>"
    Then user verify the Checkbox "<data>" by passing data from the json file

    Examples:
      | data                            |
      | AccountData-testdataForScenario |