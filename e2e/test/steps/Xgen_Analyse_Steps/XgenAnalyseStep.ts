import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import xgenAnalysePage from "@pages/Xgen_Analyse_Pages/XgenAnalysePage";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";

setDefaultTimeout(60 * 3 * 1000);
let xgenAnalysePg = new xgenAnalysePage();
let playwrightWrapper = new PlaywrightWrapper();


Given(`User is on the Analyse page {string}`, analysePageLanding);
async function analysePageLanding(jsonfilename: any) {
    console.log(`Step executed with data from file#######: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    console.log(JSON.stringify(jsonData));

    let databaseName = jsonData[0].databaseNameFromDropDown;
    let schemaName = `testing_` + jsonData[0].spaceName;
    let tableName = jsonData[0].tableNameFromDropDown;
    await xgenAnalysePg.navigateToXgenAnalysePage();
    await playwrightWrapper.clickOn_Dashboard_or_Chart_or_Dataset_or_SQLlab_toTolandToNewTab(`Dataset`);
    //await xgenAnalysePg.clickOnDataSetButton_landToNewTab(`Dataset`);
    await xgenAnalysePg.clickOnDataSetTab_onNewPage();
    await xgenAnalysePg.deleteDataSetIfPresent(tableName.toLowerCase());
    await xgenAnalysePg.clickOnDataSetTab_onNewPage();

    await xgenAnalysePg.clickOnDataSetPlusIconButton()
    await xgenAnalysePg.chooseTheDatabase(databaseName);
    await xgenAnalysePg.chooseTheSchema(schemaName.toLowerCase());
    await xgenAnalysePg.chooseTheTable(tableName.toLowerCase());
    await xgenAnalysePg.clickOnCreateDatasetButton();
    await xgenAnalysePg.clickOnDataSetTab_onNewPage();



    //--- shift to Parent Page ---//
    //await xgenAnalysePg.shiftToParentTab();
    await playwrightWrapper.shiftToParentTab_fromTheChildTab();
}

Given(`User navigates through Analyse to DataSet page and do the CleanUp {string}`, datasetPageAndCleanUp);
async function datasetPageAndCleanUp(jsonfilename: any) {
    console.log(`Step executed with data from file#######: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    console.log(JSON.stringify(jsonData));
    let tableName = jsonData[0].tableNameFromDropDown;
    await xgenAnalysePg.navigateToXgenAnalysePage();
    await playwrightWrapper.clickOn_Dashboard_or_Chart_or_Dataset_or_SQLlab_toTolandToNewTab(`Dataset`);
    await xgenAnalysePg.clickOnDataSetTab_onNewPage();
    await xgenAnalysePg.deleteDataSetIfPresent(tableName.toLowerCase());

}
Given(`User on the Dataset page and Create a new Dataset {string}`, datasetPageAndCreateNewDataSet);
async function datasetPageAndCreateNewDataSet(jsonfilename: any) {
    console.log(`Step executed with data from file#######: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    console.log(JSON.stringify(jsonData));

    let databaseName = jsonData[0].databaseNameFromDropDown;
    let schemaName = `testing_` + jsonData[0].spaceName;
    let tableName = jsonData[0].tableNameFromDropDown;
    await xgenAnalysePg.clickOnDataSetTab_onNewPage();
    await xgenAnalysePg.clickOnDataSetPlusIconButton()
    await xgenAnalysePg.chooseTheDatabase(databaseName);
    await xgenAnalysePg.chooseTheSchema(schemaName.toLowerCase());
    await xgenAnalysePg.chooseTheTable(tableName.toLowerCase());
    await xgenAnalysePg.clickOnCreateDatasetButton();
    await xgenAnalysePg.clickOnDataSetTab_onNewPage();
}

Given(`User navigates through Analyse to Chart page and do the CleanUp {string}`, analysePageThenLandToChartPage);
async function analysePageThenLandToChartPage(jsonfilename: any) {
    console.log(`Step executed with data from file#######: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    console.log(JSON.stringify(jsonData));
    let chartName = jsonData[0].chartName;
    //await xgenAnalysePg.navigateToXgenAnalysePage();
    //await playwrightWrapper.clickOn_Dashboard_or_Chart_or_Dataset_or_SQLlab_toTolandToNewTab(`Chart`);
    //await xgenAnalysePg.clickOnDataSetButton_landToNewTab(`Chart`);
    await xgenAnalysePg.clickOnCharts_onNewPage();
    await xgenAnalysePg.deleteTheChartIfPresent(chartName);
}

Given(`User on the Chart page and Create a new Chart {string}`, onChartPageUserCreateANewChart);
async function onChartPageUserCreateANewChart(jsonfilename: any) {
    console.log(`Step executed with data from file#######: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    let datasetForNewChart = `XDL_` + jsonData[0].modelName;
    let chartName = jsonData[0].chartName;
    await xgenAnalysePg.clickOnCharts_onNewPage();
    await xgenAnalysePg.clickOnCreateChartButton();
    await xgenAnalysePg.chooseDataSet_ForCreatingNewChart(`customers`);
    await xgenAnalysePg.chooseChartType(`Pie Chart`);
    await xgenAnalysePg.clickOnCreateChartButtonOnChartPage();
    await xgenAnalysePg.typeTheNameOfTheChartInTheInput(chartName);

    await xgenAnalysePg.dragFromLeft_Columns_to_Right_Query_Metric(`CompanyName`);
    await xgenAnalysePg.clickCountDistinctSaveButton_popup();
    await xgenAnalysePg.dragFromLeft_Columns_to_Right_Query_Dimensions(`City`);
    await xgenAnalysePg.clickOnCreateChartButtonOnChartPage_Below_Query_Column();
    await xgenAnalysePg.clickOnSaveButtonInTheChartPage_TopRight();
    await xgenAnalysePg.popup_Chart_Name_Input(chartName);
    await xgenAnalysePg.popupSaveChart_Save_Button();

    await xgenAnalysePg.clickOnCharts_onNewPage();

}

Given(`User switch from Child tab to Parent tab`, switchFromChildTabToParentTab);
async function switchFromChildTabToParentTab() {
    //--- shift to Parent Page ---//
    await playwrightWrapper.shiftToParentTab_fromTheChildTab();
}

Given(`User logout from the Child tab`, logoutFromTheChildTab);
async function logoutFromTheChildTab() {
    await xgenAnalysePg.userLogoutFromTheChildTab();
   
}