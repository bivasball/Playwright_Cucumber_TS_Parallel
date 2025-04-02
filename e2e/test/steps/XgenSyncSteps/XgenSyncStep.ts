import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import createPgDbConnectionPage from "@pages/XgenSource/createPgDbConnectionPage";
import uploadingFilePage from "@pages/XgenSource/uploadingFilePage";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import xgenSyncPage from "@pages/XgenSyncPages/xgenSyncPage";

setDefaultTimeout(35 * 60 * 1000); // Set timeout to 35 minutes
let createPgDbConnection = new createPgDbConnectionPage();
let uploadingFile = new uploadingFilePage();
let xgenSync = new xgenSyncPage();

Given(`user navigate to the Sync page`, syncPageStep);
async function syncPageStep() {
    await xgenSync.navigateToSyncPage();

};

Given(`user cleanup the connection and create a new Connection and perform Sync up,by testdata {string}`,{ timeout: 30*60*1000 }, syncPageSteps);
async function syncPageSteps(jsonfilename: any) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenSync.cleanUpTheSyncConnection(jsonData);
    console.log(`Step executed for Clean up Connection`);
    await xgenSync.createConnectionAndPerformSyncUp(jsonData);
    console.log(`Step executed for Create Connection and perform sync activity`);
    await xgenSync.doTheSyncAtion(jsonData);
    console.log(`Step executed for Sync Action`);

};
