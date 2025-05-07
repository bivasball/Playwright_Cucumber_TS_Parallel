import { fixture } from "@hooks/pageFixture";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import GlobalActions from "@helper/wrapper/GlobalActions";
import { expect } from "@playwright/test";
import JobMonitor from "@helper/wrapper/JobMonitor";
import { TIMEOUT } from "playwright.config";


let playwrightWrapper = new PlaywrightWrapper();
let globalAction = new GlobalActions();
let jobMonitor = new JobMonitor();

export default class XgenPipelinePage {


    //locators --start//
    getThePipeline(pipelinename: string): string {
        return `//span[text()='${pipelinename}']`;
    }


    async navigateToPipelinePage() {
        await globalAction.waitAndClick(this.getThePipeline('Pipeline'));
        await playwrightWrapper.loadingWebPage();
        await playwrightWrapper.loadingWebPage();

    }
    getTheAddButton() {
        return `//a[@iconcolor='create' and @href='/pipeline/details']`;
    }

    getPipelinename() {
        return `role=textbox[name="Pipe Name"]`;
    }
    getPipelineDesc() {
        return `role=textbox[name="Description"]`;
    }
    getuserId() {
        return `//div[@role="combobox" and @id="select-schema-label"]`;
    }
    getCurrentUser() {
        return `//li[text()="Current User"]`;
    }
    getSyncData() {
        return `//span[@aria-label="Data Sync Connections"]/button`;
    }
    selectSyncData() {
        return `//p[text()="Fitness Data Source"]/parent::div`;
    }
    selectSyncTable() {
        return `//li//p[text()="XDF_FITNESS_DATA"]`;
    }
    getModelData() {
        return `//span[@aria-label="Data Models"]/button`;
    }
    selectModelData() {
        return `//div[text()="fitness"]`;
    }
    selectModelTable() {
        return `//li//p[text()="XDL_AUTOMATE_1SN_1LN"]`;
    }
    getRightXDFFITNESS() {
        return `//div[@data-handleid='STRT' and @data-nodeid='STRT_1' and @data-handlepos='right']`;
    }
    getleftNodeLeftSideDot() {
        return `//div[@data-handleid='CONN' and @data-nodeid='SYNC_XDF_FITNESS_DATA_1' and @data-handlepos='left']`;
    }
    getLeftNodeSyncDot() {
        return `//div[@data-handleid='CONN' and @data-nodeid='SYNC_XDF_FITNESS_DATA_1' and @data-handlepos='right']`;
    }
    getRightNodeModelDot() {
        return `//div[@data-handleid='CONN' and @data-nodeid='MODL_XDL_AUTOMATE_1SN_1LN_2' and @data-handlepos='left']`;
    }
    getSaveButton() {
        return `//li[text()='Save']`;
    }
    getStartedSuccessMessage() {
        return `//p[contains(@class,"css-16kpwfw")]`;
    }




    async addSelectTableRadioButtonEnterPipelineNameAndDescription(jsondata: any) {
        let pipelinename = jsondata[0].PipelineName;
        let pipelineDesc = jsondata[0].PipelineDescription;

        // Wait for the "Add" link to be visible and click it   
        await globalAction.waitAndClick(this.getTheAddButton());

        // Wait for the "Model Name" textbox to be visible and fill it
        await globalAction.waitAndClick(this.getPipelinename());
        await globalAction.typeWithDelay(this.getPipelinename(), pipelinename);

        // Wait for the "Model Desc" textbox to be visible and fill it
        await globalAction.waitAndClick(this.getPipelineDesc());
        await globalAction.typeWithDelay(this.getPipelineDesc(), pipelineDesc);
        await globalAction.waitAndClick(this.getuserId());
        await globalAction.waitAndClick(this.getCurrentUser());
    }
    async SelectDataSyncForPipeline() {
        // Wait for the "Source Node" button to be visible and click it
        await globalAction.waitAndClick(this.getSyncData());

        await globalAction.waitAndClick(this.selectSyncData());

        await globalAction.waitAndClick(this.selectSyncTable());

    }
    async SelectModelDataForPipeline() {
        // Wait for the "Source Node" button to be visible and click it
        await globalAction.waitAndClick(this.getModelData());

        await globalAction.waitAndClick(this.selectModelData());

        await globalAction.waitAndClick(this.selectModelTable());

    }
    async joinSourceFlagtoSyncData() {
        // join left node with Right node
        await globalAction.dragAndDrop(this.getRightXDFFITNESS(), this.getleftNodeLeftSideDot());
    }
    async joinSyncDataModelData() {
        // join left node with Right node
        await globalAction.dragAndDrop(this.getLeftNodeSyncDot(), this.getRightNodeModelDot());
    }
    async createOrSave() {

        // Click on the "Create" button
        await fixture.page.locator(`//button[p[text()='Create']]`).click();
        fixture.logger.info("Clicked on 'Create' button.");
        await playwrightWrapper.loadingWebPage();

        // Click on the "Save Model" button
        await fixture.page.locator(this.getSaveButton()).click();
        fixture.logger.info("Clicked on 'Save Pipeline' button.");
        await playwrightWrapper.loadingWebPage();

        // assert created successfully
        await playwrightWrapper.createdSuccesfullyMessage();

    }
    async closeThePipeline() {
        // close the Pipeline page
        await playwrightWrapper.closeThePipeline();

    }
    async cleanUpThePipeline(jsondata: any) {
        // Verify the Model name in the  tab list and return the row number, if not found then it is zero
        let pipelinename = jsondata[0].PipelineName;
        let presentOrNotRow =
            await playwrightWrapper.getTheRowNumberFromPipelinePage(pipelinename);
        console.log("Present or not, if present the row number is ==========", presentOrNotRow);
        if (presentOrNotRow !== 0) {
            console.log("Deleting the Model as per the request.");
            await playwrightWrapper.deleteThePipeline(presentOrNotRow);
        }
    }

    async executeThePipelineJobs(jsondata: any) {
        let pipelinename = jsondata[0].PipelineName;
        let presentOrNotRow =
            await playwrightWrapper.getTheRowNumberFromPipelinePage(pipelinename);
        console.log("Present or not, if present the row number is ==========", presentOrNotRow);
        if (presentOrNotRow !== 0) {
            console.log("Executing the job");
            //await playwrightWrapper.executeModelFullLoad(presentOrNotRow);
            // Call the Monitor function //
            const duration = 30 * 60 * 1000; // 30 minutes 
            const interval = 20 * 1000; // 20 seconds
            await jobMonitor.monitorTheJob(duration, interval, async () => await this.callbackTillExecutionSuccess(presentOrNotRow));
        }
        /*
        // Verify the success message text
        await expect(fixture.page.locator(this.getStartedSuccessMessage())).toContainText("triggered with status queued");
        fixture.logger.info(`Verified the success message: 'Pipeline  _${pipelinename}, triggered with status queued.`);
        await playwrightWrapper.loadingWebPage();
        await globalAction.waitForElementHidden(this.getStartedSuccessMessage());
        await playwrightWrapper.loadingWebPage();
        */
    }

    // Define the callback function
    async callbackTillExecutionSuccess(presentOrNotRow: number) {
        await playwrightWrapper.executeModelFullLoad(presentOrNotRow);
        await playwrightWrapper.loadingWebPage();
        let expectedmessage = await globalAction.getTextContent(this.getStartedSuccessMessage());
        if (expectedmessage?.includes("triggered")) {
            fixture.logger.info(`Verified the success message: 'Pipeline , triggered with status queued.`);
            await playwrightWrapper.loadingWebPage();
            await globalAction.waitForElementHidden(this.getStartedSuccessMessage());
            await playwrightWrapper.loadingWebPage();
            return "it exists";
        }
        return "keep going";
    };



    async monitorThePipelineJobs(jsondata: any) {
        let pipelinename = jsondata[0].PipelineName;
        let presentOrNotRow =
            await playwrightWrapper.getTheRowNumberFromPipelinePage(pipelinename);
        console.log("Present or not, if present the row number is ==========", presentOrNotRow);
        if (presentOrNotRow !== 0) {
            console.log("Executing the job");
            
            await playwrightWrapper.clickOnMonitorPipeline(presentOrNotRow);
            
            // Call the Monitor function //
            const duration = 30 * 60 * 1000; // 30 minutes
            const interval = 20 * 1000; // 20 seconds
            await jobMonitor.monitorTheJob(duration, interval, async () => await this.callback());
        }
    }

    // Define the callback function
    async callback() {
        await this.refreshThePipelineLoadStatus();
        await playwrightWrapper.loadingWebPage();
        await fixture.page.locator('//tbody/tr').waitFor({ timeout: TIMEOUT });
        const element = await fixture.page.locator(`//tbody/tr[1]//button`);
        const attributeValue = await element.getAttribute('iconcolor');
        console.log(`IconColor-Attribute value: ${attributeValue}`);
        fixture.logger.info(`IconColor-Attribute value: ${attributeValue}`);
        // Return "it exists" if the status of the  Load status-State is success 
        if (attributeValue?.includes("success")) {
            return "it exists";
        }
        return "keep going";
    };

    async refreshThePipelineLoadStatus() {
        const refreshButtonLocator = `//p[text()="Refresh"]/parent::button`;
        await fixture.page.waitForSelector(refreshButtonLocator, { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for 'Refresh' button to be visible...");

        // Click the Refresh button
        await fixture.page.locator(refreshButtonLocator).click();
        fixture.logger.info("Clicked on 'Refresh' button.");
    }

    async closeTheMonitorPage(){
        await globalAction.waitAndClick(this.getExitFromMonitorPage());
    }

    getExitFromMonitorPage():string{
        return `//p[text()='Close']/parent::a`;

    }

    async clickOnDataSyncConnections() {
        await globalAction.waitAndClick(this.getDataSyncConnectionsButton());
        await playwrightWrapper.loadingWebPage();
     
    }
    async clickOnSourceCollapseIcon(sourceName: string) {
        await globalAction.waitAndClick(this.getSourceCollapseIcon(sourceName));
        await playwrightWrapper.loadingWebPage();

    }
    async clickSyncDropDownFromSourceCollapseIcon(syncName: string) {
        await globalAction.waitAndClick(this.getSyncDropDownFromSourceCollapseIcon(syncName));
        await playwrightWrapper.loadingWebPage();

    }


    async joinStartFlag_To_SyncData() {
        // join left node with Right node
        await globalAction.dragAndDrop(this.getRightStartFlagIcon(), this.getSyncLeftSideDot());
    }

    async clickOnDataModels() {
        await globalAction.waitAndClick(this.getModelData());

    }

    async clickOnDataModelCollapseIcon(sourceName: string) {
        await globalAction.waitAndClick(this.getDataModelCollapseIcon(sourceName));
        await playwrightWrapper.loadingWebPage();

    }
    async clickDataModelDropDownFromSourceCollapseIcon(syncName: string) {
        await globalAction.waitAndClick(this.getDataModelDropDownFromSourceCollapseIcon(syncName));
        await playwrightWrapper.loadingWebPage();

    }
    async joinSyncData_ModelData(syncName:string,modelName:string) {
        // join left node with Right node
        await globalAction.dragAndDrop(this.getLeftNode_SyncDot(syncName), this.getRightNode_ModelDot(modelName));
    }

    getRightStartFlagIcon() {
        return `//div[@data-handleid='STRT' and @data-nodeid='STRT_1' and @data-handlepos='right']`;
    }  


    getSyncLeftSideDot() {
        return `//div[@data-handleid='CONN' and @data-handlepos='left']`;
    }
getDataSyncConnectionsButton() {
        return `//span[@aria-label="Data Sync Connections"]/button`;
    }
 getSourceCollapseIcon(sourceName:string):string{
        return `//p[text()="${sourceName}"]`;
 }
 getSyncDropDownFromSourceCollapseIcon(syncName:string):string{
    return `//p[text()="${syncName}"]`;
}


getDataModelCollapseIcon(sourceName:string):string{
    const originalString = sourceName;
    const lowerCaseString = originalString.toLowerCase();
    return `//div[text()="${lowerCaseString}"]`;
}
getDataModelDropDownFromSourceCollapseIcon(syncName:string):string{
return `//p[text()="${syncName}"]`;
}
getLeftNode_SyncDot(syncName:string) {
    return `//div[contains(@data-nodeid,"${syncName}") and @data-handlepos='right']`;
}
getRightNode_ModelDot(modelName:string) {
    return `//div[contains(@data-nodeid,"${modelName}") and @data-handlepos='left']`;
}

}
