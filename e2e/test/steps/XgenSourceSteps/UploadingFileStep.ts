import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import createPgDbConnectionPage from "@pages/XgenSource/createPgDbConnectionPage";
import uploadingFilePage from "@pages/XgenSource/uploadingFilePage";
import { getJsonDataUi } from "@helper/util/jsonFileReader";


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