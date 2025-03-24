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