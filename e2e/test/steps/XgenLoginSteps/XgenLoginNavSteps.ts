import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../../hooks/pageFixture";
import xgenLoginPage from "../../../pages/XgenLogin/xgenLoginPage";
import { getJsonDataUi } from "../../../helper/util/jsonFileReader";

let xgenloginPage = new xgenLoginPage(fixture.page);
setDefaultTimeout(60 * 1000 * 2);

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

Then(
  'User navigates through the "Home" and "Spaces" pages, selects the "Fitness" radio option, and sees the welcome message {string}',
  async function (dataFile: any) {
    const jsonData = getJsonDataUi(dataFile);

    // Verify and click the "Home" button
    await xgenloginPage.verifyButtonVisible("Home");
    await xgenloginPage.clickButton("Home");

    // Verify and click the "Spaces" button
    await xgenloginPage.verifyButtonVisible("Spaces");
    await xgenloginPage.clickButton("Spaces");

    // Verify the "Spaces" page
    await xgenloginPage.verifyPageHeading("Spaces");

    // Select the "Fitness" radio option
    await xgenloginPage.selectRadioOption("Fitness");

    // Verify the welcome message
    await xgenloginPage.verifyWelcomeMessage(jsonData);
  }
);


When(
  'User logout from the application {string}',
  async function (logoutButton: string) {
    

    // Log out
    await xgenloginPage.logout();
    
    // Verify the "Logout" button is visible
    await xgenloginPage.verifyButtonVisible(logoutButton);

    
  }
);