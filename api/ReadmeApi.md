# to run api gherkin test by tag name
npm run test-api -- --tags="@apitest1


// Assertions
    UtilsAssertion.expectStatusCode(response, 200);
    UtilsAssertion.expectHeader(response, "content-type", "application/json");
    UtilsAssertion.expectBodyContainsKey(responseBody, "id");
    UtilsAssertion.expectBodyKeyValue(responseBody, "status", "active");
    UtilsAssertion.expectResponseTime(response, 500);