import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import xgenModelPage from "@pages/XgenModelPages/xgenModelPage";

setDefaultTimeout(60 * 3 * 1000);
let xgenmodelP = new xgenModelPage();

Given(`user navigate to the Model page`, modelPageStep);
async function modelPageStep() {
    await xgenmodelP.navigateToModelPage();

};

Given(`user perform the clean up activity {string}`, modelCleanUpActivity);
async function modelCleanUpActivity(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenmodelP.cleanUpTheModel(jsonData);

};

Given(`user should be able to create a linear data model for Load Mode Full Load,using data {string}`, createLinearModel);
async function createLinearModel(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    console.log(`the data from the json is : '${jsonData[0]}'`);
    await xgenmodelP.addSelectTableRadioButtonEnterModelNameAndDescription(jsonData);

    await xgenmodelP.clickSourceNodeSearchAndSelectSource(jsonData);
    await xgenmodelP.joinSourceObjectFromSourceNodeToModelName(jsonData);

    await xgenmodelP.clickSourceObject(jsonData[0].sourceObjectFromSourceNode);
    await xgenmodelP.clickSourceObjectAndSelectTheRequiredColumnOneByOne('city');
    await xgenmodelP.clickSourceObjectAndSelectTheRequiredColumnOneByOne('state');
    await xgenmodelP.exitFromSourceObject();

    await xgenmodelP.clickModelNameObject(jsonData[0].modelName);
    await xgenmodelP.clickModelNameAndSelectTheRequiredColumnOneByOne('city');
    await xgenmodelP.clickModelNameAndSelectTheRequiredColumnOneByOne('state');
    await xgenmodelP.exitFromModelNameObject();

    await xgenmodelP.createOrSave();
};

Given(`user should be able to execute the model for Load Mode Full Load {string}`, executeTheSingleModel);
async function executeTheSingleModel(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenmodelP.executeTheSingleModelFullLoad(jsonData);

};
