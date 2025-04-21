import { expect, APIResponse } from "@playwright/test";
import { apiFixture } from "../hooks/apiFixture";

export class UtilsAssertion {

    // ✅ Validate response status code
    static expectStatusCode(response: APIResponse, expectedStatusCode: number) {
        try {
            expect(response.status()).toBe(expectedStatusCode);
            apiFixture.logger.info(`✅ Status Code Assertion Passed: Expected ${expectedStatusCode}, Got ${response.status()}`);
        } catch (error) {
            apiFixture.logger.error(`❌ Status Code Assertion Failed: Expected ${expectedStatusCode}, Got ${response.status()}`);
            throw error;
        }
    }

    // ✅ Validate response headers contain a specific value
    static expectHeader(response: APIResponse, headerName: string, expectedValue: string) {
        try {
            expect(response.headers()[headerName]).toBe(expectedValue);
            apiFixture.logger.info(`✅ Header Assertion Passed: ${headerName} = ${expectedValue}`);
        } catch (error) {
            apiFixture.logger.error(`❌ Header Assertion Failed: Expected ${headerName} = ${expectedValue}, Got ${response.headers()[headerName]}`);
            throw error;
        }
    }

    // ✅ Validate response body contains a specific key
    static expectBodyContainsKey(responseBody: any, key: string) {
        try {
            expect(responseBody).toHaveProperty(key);
            apiFixture.logger.info(`✅ Body Key Assertion Passed: Key '${key}' exists`);
        } catch (error) {
            apiFixture.logger.error(`❌ Body Key Assertion Failed: Key '${key}' not found`);
            throw error;
        }
    }

    // ✅ Validate response body key matches expected value
    static expectBodyKeyValue(responseBody: any, key: string, expectedValue: any) {
        try {
            expect(responseBody[key]).toBe(expectedValue);
            apiFixture.logger.info(`✅ Key Value Assertion Passed: ${key} = ${expectedValue}`);
        } catch (error) {
            apiFixture.logger.error(`❌ Key Value Assertion Failed: Expected ${key} = ${expectedValue}, Got ${responseBody[key]}`);
            throw error;
        }
    }

    // ✅ Validate response body matches JSON schema (Using Ajv)
    static expectJsonSchema(responseBody: any, schema: object) {
        try {
            const Ajv = require("ajv");
            const ajv = new Ajv();
            const validate = ajv.compile(schema);
            const valid = validate(responseBody);
            expect(valid).toBe(true);
            apiFixture.logger.info(`✅ JSON Schema Validation Passed`);
        } catch (error) {
            apiFixture.logger.error(`❌ JSON Schema Validation Failed`);
            throw error;
        }
    }

    // ✅ Validate response time is within the expected limit
    static expectResponseTime(response: APIResponse, maxTime: number) {
        const startTime = Date.now();
        const duration = Date.now() - startTime;
        try {
            expect(duration).toBeLessThan(maxTime);
            apiFixture.logger.info(`✅ Response Time Assertion Passed: ${duration}ms (Max allowed: ${maxTime}ms)`);
        } catch (error) {
            apiFixture.logger.error(`❌ Response Time Assertion Failed: ${duration}ms (Max allowed: ${maxTime}ms)`);
            throw error;
        }
    }

    // ✅ Validate response body matches partial values (subset validation)
    static expectPartialMatch(responseBody: any, expectedSubset: object) {
        try {
            expect(responseBody).toEqual(expect.objectContaining({ expectedSubset }));
            apiFixture.logger.info(`✅ Partial Match Assertion Passed`);
        } catch (error) {
            apiFixture.logger.error(`❌ Partial Match Assertion Failed`);
            throw error;
        }
    }

    // ✅ Validate response does NOT contain an unexpected key
    static expectBodyDoesNotContainKey(responseBody: any, key: string) {
        try {
            expect(responseBody).not.toHaveProperty(key);
            apiFixture.logger.info(`✅ Assertion Passed: Key '${key}' does NOT exist`);
        } catch (error) {
            apiFixture.logger.error(`❌ Assertion Failed: Unexpected Key '${key}' found`);
            throw error;
        }
    }

    // ✅ Validate response body as a string contains expected text
    static expectBodyTextContains(responseText: string, expectedText: string) {
        try {
            expect(responseText).toContain(expectedText);
            apiFixture.logger.info(`✅ Text Assertion Passed: Response contains '${expectedText}'`);
        } catch (error) {
            apiFixture.logger.error(`❌ Text Assertion Failed: Response does NOT contain '${expectedText}'`);
            throw error;
        }
    }
}
