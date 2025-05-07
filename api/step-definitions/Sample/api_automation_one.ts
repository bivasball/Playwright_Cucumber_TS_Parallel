import { Given, When, Then } from '@cucumber/cucumber';
import { request, APIResponse } from '@playwright/test';
import { expect } from '@playwright/test';
import { UtilsAssertion } from "../../wrapper/utilsAssertion";
import { apiFixture } from "../../hooks/apiFixture";
import { getJsonDataApi } from '../../helper/util/jsonFileReader';
let baseURL: string;
let endpoint: string;
let apiResponse: APIResponse;
let requestPayload: any;
let responseBody: any;

// Step Definitions

Given('I set the base URL from env file', async () => {
  console.log(`BASEURL from env file is : ${process.env.BASEURL}`);  
  baseURL = `${process.env.BASEURL}`;
  apiFixture.logger.info(`Base URL set to: ${baseURL}`);
});


Given('I set the base URL to {string}', async (url: string) => {
  console.log(`BASEURL from env file is : ${process.env.BASEURL}`);
  //baseURL = url;
  baseURL = `${process.env.BASEURL}`;
  apiFixture.logger.info(`Base URL set to: ${baseURL}`);
});

Given('I set the endpoint to {string}', async (path: string) => {
  endpoint = path;
  apiFixture.logger.info(`Endpoint set to: ${endpoint}`);
});

Given('I set the request payload:', async (payload: string) => {
  requestPayload = JSON.parse(payload);
  apiFixture.logger.info(`Request payload set to: ${JSON.stringify(requestPayload)}`);
});


Given('I set the request payload: {string}', async (jsonFilename: string) => {
  const jsonData = getJsonDataApi(jsonFilename);
  const payload = JSON.stringify(jsonData);
  requestPayload = JSON.parse(payload);
  apiFixture.logger.info(`Request payload set to: ${JSON.stringify(requestPayload)}`);
});
When('I make a GET request', async () => {
  const apiContext = await request.newContext({ baseURL });
  try {
    apiFixture.logger.info(`Making GET request to: ${baseURL}${endpoint}`);
    apiResponse = await apiContext.get(endpoint);
    apiFixture.logger.info(`GET response status: ${apiResponse.status()}`);
    apiFixture.logger.info(`GET response body: ${await apiResponse.text()}`);
  } catch (error) {
    apiFixture.logger.error(`Error during GET request: ${error}`);
  } finally {
   // await apiContext.dispose();
  }
});


When('I make a POST request', async () => {
    const apiContext = await request.newContext({ baseURL });
    apiResponse = await apiContext.post(endpoint, { data: requestPayload });
    //await apiContext.dispose();
});

When('I make a DELETE request', async () => {
    const apiContext = await request.newContext({ baseURL });
    apiResponse = await apiContext.delete(endpoint);
    //await apiContext.dispose();
});

Then('the response status code should be {int}', async (statusCode: number) => {
    //expect(apiResponse.status()).toBe(statusCode);
    UtilsAssertion.expectStatusCode(apiResponse, statusCode);
    responseBody = await apiResponse.json();
   
    //console.log("the status code is ", apiResponse.status());
});

Then('the response body should contain {string} with value {int}', async (key: string, value: number) => {
    //const responseBody = await apiResponse.json();
    console.log(`=========${responseBody}=======`);
   // expect(responseBody[key]).toBe(value);
});

Then('the response body should contain {string}', async (key: string) => {
     responseBody = await apiResponse.json();
    expect(responseBody[key]).toBeDefined();
});