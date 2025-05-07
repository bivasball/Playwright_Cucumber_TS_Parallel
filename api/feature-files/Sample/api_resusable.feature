Feature: API Testing

    Scenario: Send a GET request to retrieve data
        Given the API endpoint is "https://example.com/api/resource"
        When I send a GET request
        Then the response status should be 200
            And the response should contain "expected_data"

    Scenario: Send a POST request to create a new resource
        Given the API endpoint is "https://example.com/api/resource"
            And the request body contains "key" with value "value"
        When I send a POST request
        Then the response status should be 201
            And the response should contain the newly created resource

    Scenario: Send a PUT request to update an existing resource
        Given the API endpoint is "https://example.com/api/resource/1"
            And the request body contains updated values
        When I send a PUT request
        Then the response status should be 200
            And the response should reflect the changes

    Scenario: Send a PATCH request to partially update a resource
        Given the API endpoint is "https://example.com/api/resource/1"
            And the request body contains partial updates
        When I send a PATCH request
        Then the response status should be 200
            And the response should include the modified fields

    Scenario: Send a DELETE request to remove a resource
        Given the API endpoint is "https://example.com/api/resource/1"
        When I send a DELETE request
        Then the response status should be 204
            And the resource should no longer exist

