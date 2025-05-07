import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import XgenCustomRolesUsersPage from "@pages/XgenCustomRolesUsersPages/XgenCustomRolesUsersPage";

setDefaultTimeout(60 * 3 * 1000);
let xgenCustomPg = new XgenCustomRolesUsersPage();


Given(`user perform the clean up activity for User Roles {string}`, modelCleanUpActivity);
async function modelCleanUpActivity(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    console.log(JSON.stringify(jsonData));
    await xgenCustomPg.verifyRolesAndUsers();
  await xgenCustomPg.cleanUpTheRoles(jsonData[0].roleName);

};


Given(`user navigate to Settings and sets user roles Permission {string}`, customrolespage);
async function customrolespage(jsonfilename: any) {
    console.log(`Step executed with data from govern json file#######: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    console.log(JSON.stringify(jsonData));
    await xgenCustomPg.clickOnRolesSettings();
    await xgenCustomPg.createRoleinSubscription(jsonData);
}
Given(`user navigate to Settings and creates users {string}`, customuserspage);
async function customuserspage(jsonfilename: any) {
    console.log(`Step executed with data from govern json file#######: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    console.log(JSON.stringify(jsonData));
    await xgenCustomPg.clickOnUserSettings();
    await xgenCustomPg.createUserinSubscription(jsonData);
}

Given(`user navigate to Settings, create a new Role and sets Subscription {string}`, createRoleAndSetRolePermission);
async function createRoleAndSetRolePermission(jsonfilename: any) {
    console.log(`Step executed with data from govern json file#######: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    console.log(JSON.stringify(jsonData));
    //await xgenCustomPg.clickOnRolesSettings();
    await xgenCustomPg.createRoleinSubscription(jsonData);
}

Given(`user perform the clean up activity for creation of a new User {string}`, cleanUpTheUser);
async function cleanUpTheUser(jsonfilename: any) {
    console.log(`Step executed with data from govern json file#######: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    let UserFirstLastName = jsonData[0].firstName + " " + jsonData[0].lastName;
    console.log(JSON.stringify(jsonData));
    await xgenCustomPg.clickOnUserSettings();
    await xgenCustomPg.cleanUpTheUser(UserFirstLastName);
}

Given(`user navigate to Settings and creates users and assign role {string}`, creatuserAssingSubscriptionAndRole);
async function creatuserAssingSubscriptionAndRole(jsonfilename: any) {
    console.log(`Step executed with data from govern json file#######: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    console.log(JSON.stringify(jsonData));
    await xgenCustomPg.clickOnUserSettings();
    await xgenCustomPg.createUserinSubscription(jsonData);
}