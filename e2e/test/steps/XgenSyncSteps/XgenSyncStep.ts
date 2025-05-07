import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import createPgDbConnectionPage from "@pages/XgenSource/createPgDbConnectionPage";
import uploadingFilePage from "@pages/XgenSource/uploadingFilePage";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import xgenSyncPage from "@pages/XgenSyncPages/xgenSyncPage";
import { modifySampleDataParameterised } from "@helper/util/modifyTheJsonValue";

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

Given(`user cleanup the connection and create a new Connection and then perform Sync up activity {string}`,{ timeout: 30*60*1000 }, syncPageStepsActivity);
async function syncPageStepsActivity(jsonfilename: any) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenSync.cleanUpTheSyncConnection(jsonData);
    console.log(`Step executed for Clean up Connection`);
    let syncNamedata = jsonData[0].syncName;
    let descriptionData = jsonData[0].SyncDescription;
    //Note : selectSource==SourceDescription ( created in PG connection)
    let selectSourceData = jsonData[0].SourceDescription;
    let selectDestinationData = jsonData[0].selectDestination;
    
    await xgenSync.clickAddLink();
    await xgenSync.fillSyncDetails(syncNamedata, descriptionData);
    await xgenSync.selectSource(selectSourceData);
    await xgenSync.selectDestination(selectDestinationData);
   
   
    await xgenSync.enableTheEntityBySlidingTheMuiSwitch(`categories`);
    await xgenSync.checkTheBoxOfPrimaryKey(`categories`,`CategoryID`);
    await xgenSync.enableTheEntityBySlidingTheMuiSwitch(`customers`);
    await xgenSync.checkTheBoxOfPrimaryKey(`customers`,`CustomerID`);
    await xgenSync.createSync();
    await xgenSync.verifySuccess(syncNamedata);
    await xgenSync.doTheSyncAtion(jsonData);
    console.log(`Step executed for Sync Action`);

};

Given(`User navigate to the Sync page and setup unique Sync name and unique description {string}`, setUpUniqueSourceNameAndUniqueDescription);
async function setUpUniqueSourceNameAndUniqueDescription(jsonfilename: string) {
    //The keyName -the value of which will be replaced by a  counter value //
    var keyName = `syncName`;
    modifySampleDataParameterised(jsonfilename,keyName);
    var keyDescription = `SyncDescription`;
    modifySampleDataParameterised(jsonfilename,keyDescription);
    await xgenSync.navigateToSyncPage();

};