import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import XgenPipelinePage from "@pages/XgenPipelinePages/XgenPipelinePage";
import { modifySampleDataParameterised } from "@helper/util/modifyTheJsonValue";

setDefaultTimeout(60 * 3 * 1000);
let xgenPipelinelP = new XgenPipelinePage();

Given(`user navigate to the Pipeline page`, PipelinePageStep);
async function PipelinePageStep() {
    await xgenPipelinelP.navigateToPipelinePage();

};

Given(`user perform the clean up Pipeline {string}`, PipelineCleanUpActivity);
async function PipelineCleanUpActivity(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenPipelinelP.cleanUpThePipeline(jsonData);

};

Given(`user should be able to create a Pipeline for an user {string}`, createPipelineUser);
async function createPipelineUser(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    
    await xgenPipelinelP.addSelectTableRadioButtonEnterPipelineNameAndDescription(jsonData);
    await xgenPipelinelP.SelectDataSyncForPipeline()
    await xgenPipelinelP.joinSourceFlagtoSyncData();
    await xgenPipelinelP.SelectModelDataForPipeline()
    await xgenPipelinelP.joinSyncDataModelData();
    await xgenPipelinelP.createOrSave();
    await xgenPipelinelP.closeThePipeline();
}


Given(`user should be able to execute the Pipeline {string}`, executeThePipeline);
async function executeThePipeline(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenPipelinelP.executeThePipelineJobs(jsonData);

};



Given(`user should be able to monitor the job of the Pipeline {string}`, monitorThePipelineJob);
async function monitorThePipelineJob(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenPipelinelP.monitorThePipelineJobs(jsonData);
    await xgenPipelinelP.closeTheMonitorPage();

};


Given(`user setup unique data and navigate to the Pipeline page {string}`, setUpUniqueDataForStar1_modifyTheJsonValue);
async function setUpUniqueDataForStar1_modifyTheJsonValue(jsonfilename: string) {
    //The keyName -the value of which will be replaced by a  counter value //
    var keyName = `PipelineName`;
    modifySampleDataParameterised(jsonfilename,keyName);
    await xgenPipelinelP.navigateToPipelinePage();

};