import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import createPgDbConnectionPage from "@pages/XgenSource/createPgDbConnectionPage";
import uploadingFilePage from "@pages/XgenSource/uploadingFilePage";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import { modifySampleDataParameterised } from "@helper/util/modifyTheJsonValue";


setDefaultTimeout(60 * 1000 * 2 );
let createPgDbConnection = new createPgDbConnectionPage();
let uploadingFile = new uploadingFilePage();

Given(`user click on upload File button`, clickonuploadfile);
async function clickonuploadfile() {
    console.log("===Navigate to Connect page===");
    await uploadingFile.clickonUploadFileButton();
};


Given(`user should be able to upload the file. {string}`, uploadTheFile);
async function uploadTheFile(jsonfilename: any) {
    console.log("===Navigate to upload pop up ===");
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await uploadingFile.uploadfiles(jsonData);
};

Given(`user cleanup and upload the file. {string}`, cleanUpAnduploadTheFile);
async function cleanUpAnduploadTheFile(jsonfilename: any) {
    console.log("===Navigate to upload pop up ===");
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await uploadingFile.cleanUpAnduploadfiles(jsonData);
};

Given(`user navigate to the Connect page and setup unique source name for CategoryForecast {string}`, setUpUniqueDataFor2);
Given(`user navigate to the Connect page and setup unique source name for Company Data {string}`, setUpUniqueDataFor2);
Given(`user navigate to the Connect page and setup unique source name for Company Survey {string}`, setUpUniqueDataFor2);
async function setUpUniqueDataFor2(jsonfilename: string) {
    //The keyName -the value of which will be replaced by a  counter value //
    var keyName = `SourceName`;
    modifySampleDataParameterised(jsonfilename,keyName);
    await createPgDbConnection.navigateToLoginPageforPgDB();

};
