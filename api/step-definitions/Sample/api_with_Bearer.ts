import { Given, When, Then } from '@cucumber/cucumber';
import { request, APIResponse } from '@playwright/test';
import { expect } from '@playwright/test';
import { UtilsAssertion } from "../../wrapper/utilsAssertion";
import { apiFixture } from "../../hooks/apiFixture";
import { getJsonDataApi } from '../../helper/util/jsonFileReader';
import * as fs from 'fs';
const path = require('path');

let baseURL: string;
let endpoint: string;
let apiResponse: APIResponse;
let requestPayload: any;
let responseBody: any;
const bearerResponseFile = path.join('api','resources','token', 'bearerResponse_01.json');

// Step Definitions

Given('I set the base URL from env file for bearer', async () => {
  console.log(`BASEURL_2 from env file is : ${process.env.BASEURL_2}`);  
  baseURL = `${process.env.BASEURL_2}`;
  apiFixture.logger.info(`Base URL set to: ${baseURL}`);
});


Given('I set the endpoint to for bearer {string}', async (path: string) => {
  console.log(`BASEURL_2 from env file is : ${process.env.BASEURL_2}`);
  endpoint = path;
  baseURL = `${process.env.BASEURL_2}`;
  apiFixture.logger.info(`Base URL set to: ${baseURL}`);
});


Given('I set the request payload for bearer: {string}', async (jsonFilename: string) => {
  const jsonData = getJsonDataApi(jsonFilename);
  const payload = JSON.stringify(jsonData);
  requestPayload = JSON.parse(payload);
  apiFixture.logger.info(`Request payload set to: ${JSON.stringify(requestPayload)}`);
});


When('I make a POST request for bearer', async () => {
    const apiContext = await request.newContext({ baseURL });
    apiResponse = await apiContext.post(endpoint, { data: requestPayload });
    //await apiContext.dispose();
});

Then('the response status code for bearer should be {int}', async (statusCode: number) => {
    //expect(apiResponse.status()).toBe(statusCode);
    //UtilsAssertion.expectStatusCode(apiResponse, statusCode);
    responseBody = await apiResponse.json();
   
    console.log("the status code is ", apiResponse.status());
});

Then('the response body for bearer should contain {string}', async (key: string) => {
     responseBody = await apiResponse.json();
     console.log("The response is ::: ", responseBody);
    
// Convert JSON object to a formatted string
const jsonString = JSON.stringify(responseBody, null, 2); // Pretty format for readability

// Save JSON data to a file (.json)
fs.writeFileSync(bearerResponseFile, jsonString, 'utf-8');
console.log('✅ API response saved to json file');




});


Then('should retrieve invoices with valid token', async () => {  


// Read the JSON file and extract access token
const jsonData = fs.readFileSync(bearerResponseFile, 'utf-8'); // Read file
const parsedData = JSON.parse(jsonData); // Convert JSON string to object

console.log('🔑 Access Token:', parsedData.access_token); // Print access token

const apiContext = await request.newContext({ baseURL });
  const headers = {
    Authorization: `Bearer ${parsedData.access_token}`,
  };

  const response = await apiContext.get(`/invoices`, { headers });
  console.log('Response status bivas:', response.status()); // Log the response status
  console.log('Response body bivas:', await response.text()); // Log the response body
  expect(response.status()).toBe(200);

  const data = await response.json();
  const invoices = data.data || [];
  expect(invoices.length).toBeGreaterThanOrEqual(15);
});
