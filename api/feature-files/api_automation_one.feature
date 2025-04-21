Feature: API Automation Example

    @api @apitest1
    Scenario: Validate GET request
        Given I set the base URL from env file
            And I set the endpoint to "/posts/1"
        When I make a GET request
        Then the response status code should be 200
            And the response body should contain "id" with value 1
            And the response body should contain "title"

    @api @apitest2
    Scenario: Validate POST request
        Given I set the base URL from env file
            And I set the endpoint to "/posts"
            And I set the request payload:
            """
            {
                "title": "foo",
                "body": "bar",
                "userId": 1
            }
            """
        When I make a POST request
        Then the response status code should be 201
            And the response body should contain "id"


    @api @apitest3
    Scenario: Validate DELETE request
        Given I set the base URL from env file
            And I set the endpoint to "/posts/1"
        When I make a DELETE request
        Then the response status code should be 200


    @api @apitest4
    Scenario Outline: Validate POST request
        Given I set the base URL from env file
            And I set the endpoint to "/posts"
            And I set the request payload: "<jsonData>"
        When I make a POST request
        Then the response status code should be 201
            And the response body should contain "id"
        Examples:
            | jsonData                |
            | module11-testdataforApi |