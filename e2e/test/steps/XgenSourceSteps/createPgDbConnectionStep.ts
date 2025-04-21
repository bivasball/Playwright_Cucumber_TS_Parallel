import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import createPgDbConnectionPage from "@pages/XgenSource/createPgDbConnectionPage";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import { modifySampleDataParameterised } from "@helper/util/modifyTheJsonValue";


setDefaultTimeout(60 * 1000 * 2 );
let createPgDbConnection = new createPgDbConnectionPage();

Given(`user navigate to the Connect page`, navigateToConnectPage);
async function navigateToConnectPage() {
    console.log("===Navigate to Connect page===");
    await createPgDbConnection.navigateToLoginPageforPgDB();
};

When('user first do a cleanup and then create a PostgreSQL source, using data from {string}',connectionUsingData);
 async function connectionUsingData (jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await createPgDbConnection.createPgDbConnectionWithData(jsonData);
}

Then('user edit the source with password by click on save and validate the source, using data from {string}',verifyDataConnectionCreated);
 async function verifyDataConnectionCreated(jsonfilename: string) {
    console.log("Step: Verifying the source database connection creation.");
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await createPgDbConnection.editTheSourceReEnterThePaswordAndSaveThenValidate(jsonData);
}

Given(`user navigate to the Connect page and setup unique source name {string}`, setUpUniqueDataFor1);
async function setUpUniqueDataFor1(jsonfilename: string) {
    //The keyName -the value of which will be replaced by a  counter value //
    var keyName = `sourcename`;
    modifySampleDataParameterised(jsonfilename,keyName);
    await createPgDbConnection.navigateToLoginPageforPgDB();

};

