import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import xgenDataInputPage from "@pages/XgenInputTemplateDataPages/XgenInputTemplateDataPage";

setDefaultTimeout(60 * 3 * 1000);
let xgendatainput = new xgenDataInputPage();



Given(`user navigate to the DataInput Page`, DataInputPageStep);
async function DataInputPageStep() {
    await xgendatainput.navigateToDataInputPage();

};

Given(`user perform the clean up activity {string}`, InputDataCleanUpActivity);
async function InputDataCleanUpActivity(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgendatainput.cleanUpTheInputData(jsonData);

};

Given(`user should be able to create a template and add the records and commit it {string}`, CreateInputData);
async function CreateInputData(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgendatainput.addSelectNameandDescription(jsonData);
    await xgendatainput.addRecordSaveCommit();
};