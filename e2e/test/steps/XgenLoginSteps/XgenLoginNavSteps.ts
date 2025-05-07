import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import xgenLoginPage from "../../../pages/XgenLogin/xgenLoginPage";
import { getJsonDataUi } from "../../../helper/util/jsonFileReader";
import { modifySampleDataParameterised } from "@helper/util/modifyTheJsonValue";
import { fixture } from "@hooks/pageFixture";
import path from 'path';
import fs from 'fs';
import { test } from '@playwright/test';

let xgenloginPage = new xgenLoginPage();
setDefaultTimeout(60 * 1000 * 2);
const  sessionStoragePath = path.resolve('e2e', 'helper', 'auth', 'admin.json');

Given(
  `User logs into the application with username and password and sees the message and selects the subscription {string}`,
  loginAndNavigate
);
async function loginAndNavigate(jsonfilename: any) {
  console.log(`Step executed with data from json file: ${jsonfilename}`);
  const jsonData = getJsonDataUi(jsonfilename);
  console.log(JSON.stringify(jsonData));

  // Navigate to the login page
  await xgenloginPage.navigateToLoginPage();

  // Log in with username and password
  await xgenloginPage.login(jsonData);

  // Verify the login message
  await xgenloginPage.verifyLoginMessage(jsonData);

  // Select the subscription
  await xgenloginPage.selectSubscription(jsonData);
}

Then('User navigates through the Home and Spaces pages after seeing the welcome message {string}', navigateAndChooseSpace);
Then('User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message {string}', navigateAndChooseSpace);
async function navigateAndChooseSpace(dataFile: any) {
  const jsonData = getJsonDataUi(dataFile);

  // Verify and click the "Home" button
  await xgenloginPage.verifyButtonVisible("Home");
  await xgenloginPage.clickButton("Home");

  // Verify and click the "Spaces" button
  await xgenloginPage.verifyButtonVisible("Spaces");
  await xgenloginPage.clickButton("Spaces");

  // Verify the "Spaces" page
  await xgenloginPage.verifyPageHeading("Spaces");


  //---------------------call the function if space exits---------------------

  await xgenloginPage.creatSpaceIfNotPresent(jsonData);
  // Select the "required Space button" radio option --we are passing the description--//
  await xgenloginPage.closeTheSpaceModule();
  await xgenloginPage.clickButton("Spaces");

  let requiredSpaceButton = jsonData[0].spaceDescription;
  await xgenloginPage.selectRadioOption(requiredSpaceButton);

  // Verify the welcome message
  await xgenloginPage.verifyWelcomeMessage(jsonData);
}



When(
  'User logout from the application {string}',
  async function (logoutButton: string) {
    // Log out
    await xgenloginPage.logout();
  }
);


Then('User delete the Space {string}', navigateAndDeleteSpace);
async function navigateAndDeleteSpace(dataFile: any) {
  const jsonData = getJsonDataUi(dataFile);

  // Verify and click the "Home" button
  await xgenloginPage.verifyButtonVisible("Home");
  await xgenloginPage.clickButton("Home");

  // Verify and click the "Spaces" button
  await xgenloginPage.verifyButtonVisible("Spaces");
  await xgenloginPage.clickButton("Spaces");
  //---------------------Delete the space---------------------
  await xgenloginPage.deleteSpaceIfPresent(jsonData);
  await xgenloginPage.closeTheSpaceModule();
}

Given(
  `User login to the application with a valid username, password and subscription {string}`,
  loginAndNavigateAndSelectSubscription
);
async function loginAndNavigateAndSelectSubscription(jsonfilename: any) {
  console.log(`Step executed with data from json file: ${jsonfilename}`);
  const jsonData = getJsonDataUi(jsonfilename);
  console.log(JSON.stringify(jsonData));

  // Navigate to the login page
  await xgenloginPage.navigateToLoginPage();

  // Log in with username and password
  await xgenloginPage.login(jsonData);

  // Verify the login message
  await xgenloginPage.verifyLoginMessage(jsonData);

  // Select the subscription
  await xgenloginPage.selectSubscription(jsonData);
}


Then('User navigates through the Home, create a unique Spaces, with a welcome message {string}', navigateAndCreateUniqueSpace);
async function navigateAndCreateUniqueSpace(jsonfilename: any) {
  //setup a unique space name and description--//
  //The keyName -the value of which will be replaced by a  counter value //
  // keeping both Space Name and Description same for now--//
  var keyName = `spaceName`;
  modifySampleDataParameterised(jsonfilename, keyName);

  const jsonData = getJsonDataUi(jsonfilename);

  // Verify and click the "Home" button
  await xgenloginPage.verifyButtonVisible("Home");
  await xgenloginPage.clickButton("Home");

  // Verify and click the "Spaces" button
  await xgenloginPage.verifyButtonVisible("Spaces");
  await xgenloginPage.clickButton("Spaces");

  // Verify the "Spaces" page
  await xgenloginPage.verifyPageHeading("Spaces");






  await xgenloginPage.createUniqueSpaceIfNotPresentKeepingBothNameAndDescriptionSame(jsonData);
  // Select the "required Space button" radio option --we are passing the description--//
  await xgenloginPage.closeTheSpaceModule();
  await xgenloginPage.clickButton("Spaces");

  let requiredSpaceButton = jsonData[0].spaceName;
  await xgenloginPage.selectRadioOption(requiredSpaceButton);

  // Verify the welcome message
  await xgenloginPage.verifyWelcomeMessage(jsonData);
}



Then('User delete the created unique Space {string}', navigateAndDeleteSpace_createdSpaceisUnique);
async function navigateAndDeleteSpace_createdSpaceisUnique(dataFile: any) {
  const jsonData = getJsonDataUi(dataFile);

  // Verify and click the "Home" button
  await xgenloginPage.verifyButtonVisible("Home");
  await xgenloginPage.clickButton("Home");

  // Verify and click the "Spaces" button
  await xgenloginPage.verifyButtonVisible("Spaces");
  await xgenloginPage.clickButton("Spaces");
  //---------------------Delete the created unique space---------------------
  await xgenloginPage.deleteTheUniqueCreatedSpaceIfPresent(jsonData);
  await xgenloginPage.closeTheSpaceModule();
}


Given(
  `User logs into the application with username and password and save the login session {string}`,
  loginAndNavigateAndSaveSession
);
async function loginAndNavigateAndSaveSession(jsonfilename: any) {
  console.log(`Step executed with data from json file: ${jsonfilename}`);
  const jsonData = getJsonDataUi(jsonfilename);
  console.log(JSON.stringify(jsonData));

  // Navigate to the login page
  await xgenloginPage.navigateToLoginPage();

  // Log in with username and password
  await xgenloginPage.login(jsonData);

  // Verify the login message
  await xgenloginPage.verifyLoginMessage(jsonData);

  // Save the login session 
  if (!fs.existsSync(sessionStoragePath)) {
    throw new Error(`Storage state file not found: ${sessionStoragePath}`);
}
await fixture.page.context().storageState({ path: sessionStoragePath });

  console.log(`Login session saved for user: ${jsonData[0].username}`);
  // Verify the login message
  // Select the subscription
  await xgenloginPage.selectSubscription(jsonData);
}

Given(
  `User logs into the application with saved session {string}`,
  userLandUsingSavedSession
);
async function userLandUsingSavedSession(jsonfilename: any) {
  console.log(`Step executed with data from json file: ${jsonfilename}`);
  const jsonData = getJsonDataUi(jsonfilename);
  console.log(JSON.stringify(jsonData));

  // load the save session from storage//
  //test.use({ storageState: sessionStoragePath });
  // Navigate to the login page
  await xgenloginPage.navigateHomePage();  
  // Select the subscription
  
}


Then('User navigates through the Home, and select the required Space {string}', navigateAndLoginWithGivenSpaceFromJsonfile);
async function navigateAndLoginWithGivenSpaceFromJsonfile(jsonfilename: any) {
  
  const jsonData = getJsonDataUi(jsonfilename);

  // Verify and click the "Home" button
  await xgenloginPage.verifyButtonVisible("Home");
  await xgenloginPage.clickButton("Home");

  // Verify and click the "Spaces" button
  await xgenloginPage.verifyButtonVisible("Spaces");
  await xgenloginPage.clickButton("Spaces");

  // Verify the "Spaces" page
  await xgenloginPage.verifyPageHeading("Spaces"); 

  let requiredSpaceButton = jsonData[0].spaceName;
  await xgenloginPage.selectRadioOption(requiredSpaceButton);

  // Verify the welcome message
  await xgenloginPage.verifyWelcomeMessage(jsonData);
}


Then('User navigates through Roles and User for administration {string}', navigateRoleAndUser);
async function navigateRoleAndUser(jsonfilename: any) {
  const jsonData = getJsonDataUi(jsonfilename);
  await xgenloginPage.verifyRolesAndUsers();
  await xgenloginPage.cleanUpTheRoles(`VAS12`);


}


Given(
  `new User logs into the application and change the password {string}`,
  newlyCreatedUserChangeThePassword
);
async function newlyCreatedUserChangeThePassword(jsonfilename: any) {
  console.log(`Step executed with data from json file: ${jsonfilename}`);
  const jsonData = getJsonDataUi(jsonfilename);
  console.log(JSON.stringify(jsonData));
  let username = jsonData[0].email;
  let password = jsonData[0].password; 
  let subscription = jsonData[0].subscription;

  await xgenloginPage.navigateToLoginPage();
  await xgenloginPage.newUserlogin(username,password);
  await xgenloginPage.newUserChangePassword(password)

  //await xgenloginPage.newUserlogin(username,password);
 // await xgenloginPage.newuser_selectSubscription(subscription);

}

Given(
  `new User logs into the application with valid username and valid password {string}`,
  newlyCreatedUserlogin
);
async function newlyCreatedUserlogin(jsonfilename: any) {
  console.log(`Step executed with data from json file: ${jsonfilename}`);
  const jsonData = getJsonDataUi(jsonfilename);
  console.log(JSON.stringify(jsonData));
  let username = jsonData[0].email;
  let password = jsonData[0].password;  
  let subscription = jsonData[0].subscription;

  await xgenloginPage.newUserlogin(username,password);
  await xgenloginPage.newuser_selectSubscription(subscription);

}
When(
  'new User logout from the application {string}',
  async function (logoutButton: string) {
    // Log out
    await xgenloginPage.logout();
  }
);

When(
  'verify the new user should not be able to view any Active Space and select {string}',notAbleToviewSpace);
  async function notAbleToviewSpace(jsonfilename: any) {
    await xgenloginPage.clickonTheSpaces();
    await xgenloginPage.verifyTheNumberOfSpaceItemDisabled();
    await xgenloginPage.closeTheSpaceModule();

    
  }
  

  When(
    'verify the new user should be able to view and click- Home,Space and Settings {string}',abletoViewAndclick);
    async function abletoViewAndclick(jsonfilename: any) {
      await xgenloginPage.userAbleToView(`Home`);
      await xgenloginPage.userAbleToView(`Spaces`);
      await xgenloginPage.userAbleToView(`Settings`);
      await xgenloginPage.userNot_AbleToView(`Sync`);
      await xgenloginPage.userNot_AbleToView(`Input`);
      await xgenloginPage.userNot_AbleToView(`Analyse`);
      await xgenloginPage.userNot_AbleToView(`Govern`);
      await xgenloginPage.userNot_AbleToView(`Pipeline`);
      await xgenloginPage.userNot_AbleToView(`Source`);
      
  
      
    }