import { fixture } from "@hooks/pageFixture";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import GlobalActions from "@helper/wrapper/GlobalActions";
import { TIMEOUT } from "playwright.config";
import { Browser, BrowserContext } from "@playwright/test";
import { loggers } from "winston";
let context: BrowserContext;

let playwrightWrapper = new PlaywrightWrapper();
let globalAction = new GlobalActions();



export default class xgenAnalysePage {
    private multipleTab: any;
    private allPages: any;

    constructor() {
        // Initialize multipleTab if needed
        this.multipleTab = null;
    }

    //---locators---//

    getAnalysePage(): string {
        return `//span[text()="Analyse"]`;
    }

    getDatasetButton(): string {
        return `//p[text()="Dataset"]/parent::button`;
    }
    getDatabaseInput(): string {
        return `//input[contains(@aria-label,"Select database")]`;
    }

    getDataSetsTrashIconButton(row: number): string {
        return `//tbody[@role="rowgroup"]/tr[${row}]/td[8]//span[@aria-label="trash"]`;

    }
    getDataSetsTrashPopup(DataSetName: string): string {
        return ``;
    }
    getDeleteInputText(): string {
        return `//label[contains(text(),"DELETE")]/following-sibling::input`;
    }
    getDeleteButtonInThePopUp(): string {
        return `//span[text()="delete"]/parent::button`;
    }


    //--locators end--//



    async navigateToXgenAnalysePage() {
        await globalAction.waitAndClick(this.getAnalysePage());
    }


    async clickOnDataSetButton_landToNewTab(choiceTab:string) {


         [this.multipleTab] = await Promise.all([
            fixture.page.waitForEvent("popup"), // Wait for new tab
            //fixture.page.click(`//p[text()="Dataset"]/parent::button`) // Click the link
            fixture.page.click(`//p[text()="${choiceTab}"]/parent::button`) // Click the link

        ]);

        this.multipleTab.waitForLoadState(`networkidle`);
         this.allPages = this.multipleTab.context().pages();
        //Assiging the new tab to fixture.page -- so that it can be used in globalAction class and so on --//   
        fixture.page = this.allPages[1];
        //await allPages[1].bringToFront(); // Focus on second tab
        await fixture.page.bringToFront(); // Focus on second tab
        let titleofthNewpage = await fixture.page.title();
        console.log(`the title of the parent page is :`, titleofthNewpage);
        const currentURLNew = this.allPages[1].url();
        console.log('Current URL:', currentURLNew);

    }


    async chooseTheDatabase(databaseName: string) {
        await globalAction.clickForce(`//div[contains(@aria-label,"Select database")]`);
        //await globalAction.waitAndClick(`(//span[text()="TESTING_DW_29_75" ])[1]`);
        await globalAction.waitAndClick(`(//span[text()="${databaseName}" ])[1]`);

    }
    //label[text()="Schema"]/parent::span/following-sibling::div/div//input

    async chooseTheSchema(schemaName: string) {
        await globalAction.click(`//div[contains(@aria-label,"Select schema")]`);
        //await globalAction.click(`//span[text()="testing_fitness"]`);
        await globalAction.click(`//span[text()="${schemaName}"]`);

    }

    async chooseTheTable(tableName: string) {
        await globalAction.click(`//div[contains(@aria-label,"Select table")]`);
        //await globalAction.click(`(//span[@title="EMPLOYEES"])[1]`);
        await globalAction.click(`(//span[@title="${tableName}"])[1]`);

    }

    async clickOnCreateDatasetButton() {
        await globalAction.click(`//span[text()="Create dataset and create chart"]/parent::button`);
        await playwrightWrapper.loadingWebPage();
    }

    async clickOnDataSetTab_onNewPage() {
        await globalAction.waitAndClick(`//a[text()="Datasets"]`);

    }
    async clickOnCharts_onNewPage() {
        await globalAction.waitAndClick(`//a[text()="Charts"]`);

    }
    async deleteDataSetIfPresent(DataSetName: string) {

        let ifDataSetIfPresentTheRowNum = await playwrightWrapper.getTheRowNumberFromDataSetPage(DataSetName);
        console.log(`====================`, ifDataSetIfPresentTheRowNum);
        if (ifDataSetIfPresentTheRowNum > 0) {
            console.log("DataSet already exists, Need to delete the existing");
            fixture.logger.info(`DataSet already exists, Need to delete the existing`);
            await globalAction.click(this.getDataSetsTrashIconButton(ifDataSetIfPresentTheRowNum));
            await globalAction.typeWithDelay(this.getDeleteInputText(), "DELETE", 100);
            await globalAction.click(this.getDeleteButtonInThePopUp());

        } else {
            console.log("No need for deletion as DataSet is not present");
            fixture.logger.info(`No need for deletion as DataSet is not present`);

        }

    }




    async clickOnDataSetPlusIconButton() {
        await globalAction.click(`//button[text()="Dataset"]`);
        await playwrightWrapper.loadingWebPage();
    }


    async shiftToParentTab() {
        fixture.page = this.allPages[0];
        await fixture.page.bringToFront(); // Focus on parent tab

        let titleofParentpage = await fixture.page.title();
        console.log(`the title of the parent page is :`, titleofParentpage);
        const currentURL = fixture.page.url();
        console.log('Current URL:', currentURL);
    }

    async deleteTheChartIfPresent(chartName: string) {
        let ifChartIfPresentTheRowNum = await playwrightWrapper.getTheRowNumberFromChartPage(chartName);
        console.log(`====================`, ifChartIfPresentTheRowNum);
        if (ifChartIfPresentTheRowNum > 0) {
            console.log("Chart already exists, Need to delete the existing");
            fixture.logger.info(`Chart already exists, Need to delete the existing`);
            let threeDots = `//div[@class="superset-list-view chart-list-view"]//div[@class="body "]/div/div[${ifChartIfPresentTheRowNum}]//div[@class="titleRow"]//span[@aria-label="more-vert"]`;
            await globalAction.hover(threeDots);
            await globalAction.click(`//span[@aria-label="trash"]`);           
            await globalAction.typeWithDelay(this.getDeleteInputText(), "DELETE", 100);
            await globalAction.click(this.getDeleteButtonInThePopUp());
            await playwrightWrapper.loadingWebPage();

        } else {
            console.log("No need for deletion as Chart is not present");
            fixture.logger.info(`No need for deletion as Chart is not present`);

        }
    }

    async clickOnCreateChartButton() {
        await globalAction.click(`//button[text()="Chart"]`);
        await playwrightWrapper.loadingWebPage();
        
    }
    async chooseDataSet_ForCreatingNewChart(chooseDataSet: string) {        
        await globalAction.click(`//input[@class="ant-select-selection-search-input"]`);
        await globalAction.click(`//span[text()="${chooseDataSet}"]`);
    }


async chooseChartType(chartType: string) {
    await globalAction.click(`//div[text()="${chartType}"]`);
    
}

async clickOnCreateChartButtonOnChartPage() {
    await globalAction.click(`//span[text()="Create new chart"]/parent::button`);
    await playwrightWrapper.loadingWebPage();
}

async typeTheNameOfTheChartInTheInput(chartName: string) {
    //input[@placeholder="Add the name of the chart"]
    await globalAction.typeWithDelay(`//input[@placeholder="Add the name of the chart"]`, chartName, 100);
}
    async dragFromLeft_Columns_to_Right_Query_Dimensions(from: string) {
        let fromXpath = `//span[text()="${from}"]/parent::span`;
        let toXpath = `//div//*[text()="Dimensions"]/ancestor::div[3]/following-sibling::div//div[text()="Drop columns here or click"]`;
        await globalAction.dragAndDrop(fromXpath, toXpath);
       //await playwrightWrapper.smoothDrag(fromXpath, toXpath);
    }
    
    async dragFromLeft_Columns_to_Right_Query_Metric(from: string) {
        let fromXpath = `//span[text()="${from}"]/parent::span`;
        await globalAction.focus(fromXpath);
        let toXpath = `//div//*[text()="Metric"]/ancestor::div[3]/following-sibling::div//div[text()="Drop a column/metric here or click"]`;
        await globalAction.dragAndDrop(fromXpath, toXpath);
    }
async clickCountDistinctSaveButton_popup() {
    await globalAction.click(`//span[text()="Save"]/parent::button[contains(@class,"ant-btn superset-button superset-button-primary")]`);
    await playwrightWrapper.loadingWebPage();
}


    async clickOnCreateChartButtonOnChartPage_Below_Query_Column() {
        await globalAction.click(`//span[text()="Create chart"]/parent::button`);
        await playwrightWrapper.loadingWebPage();

    }

async clickOnSaveButtonInTheChartPage_TopRight() {
    await globalAction.click(`//span[text()="Save"]/parent::button[contains(@class,"ant-btn superset-button superset-button-secondary")]`);   
    await playwrightWrapper.loadingWebPage();
}


async popup_Chart_Name_Input(popUpChartName:string) {
    await globalAction.typeWithDelay(`//label[text()="Chart name"]/parent::div/following-sibling::div//input`,popUpChartName,200);   
    await playwrightWrapper.loadingWebPage();
}

async popupSaveChart_Save_Button() {
    await globalAction.click(`//span[text()="Save"]/parent::button[contains(@class,"ant-btn superset-button superset-button-primary")]`);   
    await playwrightWrapper.loadingWebPage();
}

async userLogoutFromTheChildTab() {

    await globalAction.hover(`//span[text()="Settings"]`);
    await globalAction.click(`//a[text()="Logout"]`);
    await globalAction.waitForElementVisible(`//input[@value="Sign In"]`);
    fixture.logger.info(`User logged out from the child tab`);
}

}