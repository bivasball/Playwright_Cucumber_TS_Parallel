import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import xgenDataInputPage from "@pages/XgenInputPages/XgenInputTemplateDataPage";
import { modifySampleDataParameterised } from "@helper/util/modifyTheJsonValue";

setDefaultTimeout(60 * 3 * 1000);
let xgendatainput = new xgenDataInputPage();



Given(`user navigate to the Input Page`, DataInputPageStep);
async function DataInputPageStep() {
    await xgendatainput.navigateToDataInputPage();

};

Given(`User perform the clean up activity for Input Page {string}`, InputDataCleanUpActivity);
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
    await xgendatainput.clickOnAddInputDataPlusIcon(jsonData);
    await xgendatainput.addRecordAndSave(1,"sales");
    await xgendatainput.addRecordAndSave(2,"hr");
    await xgendatainput.addRecordAndSave(3,"marketing");
    await xgendatainput.commitTheRecord();
    await xgendatainput.closeTheDataInputPage();


};



Given(`User setup unique data and navigate to the Input page {string}`, unikDataInputPageStep);
async function unikDataInputPageStep(jsonfilename: string) {
    //The keyName -the value of which will be replaced by a  counter value //
        var keyName = `datainputName`;
        modifySampleDataParameterised(jsonfilename,keyName);
    await xgendatainput.navigateToDataInputPage();

};