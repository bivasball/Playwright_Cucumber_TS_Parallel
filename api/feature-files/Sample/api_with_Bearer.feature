Feature: API Automation Example

    @api @apitest1j @bearer1
    Scenario Outline: Validate Post request to get the token
        Given I set the base URL from env file for bearer
            And I set the endpoint to for bearer "/users/login"
            And I set the request payload for bearer: "<jsonData>"
        When I make a POST request for bearer
        Then the response status code for bearer should be 201
            And the response body for bearer should contain "Access Token"
        Then should retrieve invoices with valid token

        Examples:
            | jsonData              |
            | Sample-testdataforApiBearer |

    @api @apitest4j @bearer2
    Scenario Outline: Validate GET call using bearer token from previous scenario
     Given I set the base URL from env file for bearer
        Then should retrieve invoices with valid token