import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../../hooks/pageFixture";
import uxli_loginPage from "../../../pages/Uxli_Pages/uxli_loginPage";
import { getJsonDataUi } from '../../../helper/util/jsonFileReader';
import xgenLoginPage from "../../../pages/XgenLogin/xgenLoginPage";
let xgenloginPage = new xgenLoginPage(fixture.page);

let uxliPage = new uxli_loginPage(fixture.page);

setDefaultTimeout(60 * 1000 * 2);

Given("User navigates to the application for Testing UI", async function () {
  await fixture.page.goto(process.env.BASEURL);
  fixture.logger.info("Navigated to the application");
});

When("user click on the Add or Remove Elements link", async function () {
  await uxliPage.clickOnAddRemoveUrl();
});

Then("user should land on Add or Remove page", async function () {
  fixture.logger.info("===s===Add/Remove page =====");
  await uxliPage.landOnAddRemovePage();
});

Then(
  "user click on Add button to add and Remove button to remove",
  async function () {
    fixture.logger.info("===s===Click on Add and Rem =====");
    await uxliPage.landOnAddRemovePage();
  }
);

When(`user click on Basic auth link`, basicAuth);
async function basicAuth() {
  fixture.logger.info("===s=== Basic auth link =====");
  await uxliPage.clickOnBasicAuthLink();
}

When(`user fills the Pop up with username and password`,fillUserNameAndPassword);
async function fillUserNameAndPassword() {
  fixture.logger.info("===s=== Pop up with username and password =====");
  await uxliPage.fillPopUpWithCredentials("admin", "admin");
}

Then(`user should be able to login to the page successfully`, loginPopUpPage);
async function loginPopUpPage() {
  fixture.logger.info("===s===able to login to the page successfully  =====");
  await uxliPage.verifyLoginSuccess();
}

When('user clicks on the Broken Images link', async function () {
  await uxliPage.clickOnBrokenImagesLink();
});

Then('user should see the Broken Images page heading', async function () {
  await uxliPage.verifyBrokenImagesPageHeading();
});

When('user click on the link {string}', async function (jsonfilename: string) {
  console.log(`Step executed with parameter: ${jsonfilename}`);
  const jsonData = { env: null, ...getJsonDataUi(jsonfilename) };
  console.log(JSON.stringify(jsonData));
  await uxliPage.clickonelinkToVerifyTheCheckBox();
});

Then(`user verify the Checkbox {string}`, async function (filename: string) {
  
});




Then('user verify the Checkbox {string} by passing data from the json file', async function (jsonfilename: string) {
  console.log(`Step bivas tsteing : ${jsonfilename}`);
  const jsonData = getJsonDataUi(jsonfilename);
  console.log(JSON.stringify(jsonData));
  await uxliPage.verifyDataFromJsonFile(jsonData);
  
});

//=================================================//

Given('User navigates to the login page', async function () {
  await fixture.page.goto('https://xgenuat.uxli.com/'); // Replace with the actual login page URL
});

When(
  "User logs in using data from the JSON file {string}",
  async function (dataFile: string) {
    const jsonData = getJsonDataUi(dataFile);
    await xgenloginPage.login(jsonData[0].username, jsonData[0].password);
  }
);

Then("User should see the message {string}", async function (dataFile: string) {
  const jsonData = getJsonDataUi(dataFile);
  await xgenloginPage.verifyLoginMessage(jsonData[0].message);
});

When(
  "User selects the subscription {string}",
  async function (dataFile: string) {
    const jsonData = getJsonDataUi(dataFile);
    await xgenloginPage.selectSubscription(jsonData[0].subscription);
  }
);

Then(
  "User should see the {string} button",
  async function (buttonName: string) {
    await xgenloginPage.verifyButtonVisible(buttonName);
  }
);

When("User clicks on the {string} button", async function (buttonName: string) {
  await xgenloginPage.clickButton(buttonName);
});

Then("User should see the {string} page", async function (pageName: string) {
  await xgenloginPage.verifyPageHeading(pageName);
});

When(
  "User selects the {string} radio option",
  async function (radioOption: string) {
    await xgenloginPage.selectRadioOption(radioOption);
  }
);

Then(
  "User should see the welcome message {string}",
  async function (welcomeMessage: string) {
    await xgenloginPage.verifyWelcomeMessage(welcomeMessage);
  }
);

When("User logs out", async function () {
  await xgenloginPage.logout();
});

Then(
  "User should see the {string} button",
  async function (buttonName: string) {
    await xgenloginPage.verifyButtonVisible(buttonName);
  }
);


