import { fixture } from "@hooks/pageFixture";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import GlobalActions from "@helper/wrapper/GlobalActions";
import { expect } from "@playwright/test";


let playwrightWrapper = new PlaywrightWrapper();
let globalAction = new GlobalActions();

export default class xgenModelPage {


    //locators --start//
    getTheModel(modelname: string): string {
        return `//span[text()='${modelname}']`;
    }
    getTheAddOrPlusIcon() {
        return `//a[@iconcolor='create' and @href='/modelling/details']`;
    }
    getTableRadioButton() {
        return `//input[@type='radio' and @value='DLM']`;
    }
    getModelName() {
        return `role=textbox[name="Model Name"]`;
    }
    getModelDesc() {
        return `role=textbox[name="Model Desc"]`;
    }
    getSourceNode() {
        return `//span[@aria-label='Source Node']//button`;
    }
    getSourceNodeTreeExpand() {
        return `[data-testid="TreeViewExpandIconIcon"]`;
    }
    getLeftNodeRightSideDot() {
        return `//div[@data-handleid='SRN' and @data-nodeid='SRN_1' and @data-handlepos='right']`;
    }
    getRightNodeLeftSideDot() {
        return `//div[@data-handleid='OTN' and @data-nodeid='OTN_NODE' and @data-handlepos='left']`;
    }

    getSaveButton() {
        return `//li[text()='Save']`;
    }

    getTitleOfLeftItem(sourceObject: string) {
        return `//div[contains(@class,'MuiCardHeader-root')]//span[contains(text(),${sourceObject})]`;
    }

    getColumnInRightSideForLeftItem() {
        return `//input[@value='S_CUSTOMER' and @id=':ral:']`;
    }

    getColumnsTab() {
        return `//button[text()='Columns' and @role='tab']`;
    }
    getCheckBoxOfFieldName(fieldName: string): string {
        return `//input[@value='${fieldName}']/ancestor::li//span/input[@type='checkbox']`;
    }

    getKeyboardDoubleArrowRightOutlinedIcon() {
        return `//*[@data-testid="KeyboardDoubleArrowRightOutlinedIcon"]/parent::button`;
    }

    getLeftCheckBoxOfModelNameColumns(fieldName: string): string {
        return `//li[contains(@class,"MuiListItem-root MuiListItem-dense")]//input[@value='${fieldName}']/ancestor::li/div/div[2]/span/input`;
    }


    getTitleOfSourceItemBox(sourceName: string): string {
        return `//div[contains(@class,'MuiCardHeader-root')]//p[contains(text(),'${sourceName}')]`;
    }
    //locator --end//


    async navigateToModelPage() {
        await globalAction.waitAndClick(this.getTheModel('Model'));
        await playwrightWrapper.loadingWebPage();
        await playwrightWrapper.loadingWebPage();

    }


    async addSelectTableRadioButtonEnterModelNameAndDescription(jsondata: any) {
        let modelname = jsondata[0].modelName;
        let modelDesc = jsondata[0].modelDescription;

        // Wait for the "Add" link to be visible and click it
        await globalAction.waitAndClick(this.getTheAddOrPlusIcon());

        // Wait for the "Table" radio button to be visible and check it
        await globalAction.checkCheckbox(this.getTableRadioButton());

        // Wait for the "Model Name" textbox to be visible and fill it
        await globalAction.waitAndClick(this.getModelName());
        await globalAction.typeWithDelay(this.getModelName(), modelname);

        // Wait for the "Model Desc" textbox to be visible and fill it
        await globalAction.waitAndClick(this.getModelDesc());
        await globalAction.typeWithDelay(this.getModelDesc(), modelDesc);
    }

    async clickSourceNodeSearchAndSelectSource(jsondata: any) {
        let sourceObjectFromSourcenode = jsondata[0].sourceObjectFromSourceNode;
        // Wait for the "Source Node" button to be visible and click it
        await globalAction.waitAndClick(this.getSourceNode());
        // Wait for the "Tree View Expand Icon" to be visible and click it
        await globalAction.waitAndClick(this.getSourceNodeTreeExpand());
        // Wait for the "CUSTOMER" text to be visible and click it
        await globalAction.waitAndClick(`text=${sourceObjectFromSourcenode}`);
    }

    async joinSourceObjectFromSourceNodeToModelName(jsondata: any) {
        // join left node with Right node
        await globalAction.dragAndDrop(this.getLeftNodeRightSideDot(), this.getRightNodeLeftSideDot());
    }

    async createOrSave() {

        // Click on the "Create" button
        await fixture.page.locator(`//span[@aria-label="Save Model"]//button[@type='button' and @iconcolor='create']`).click();
        fixture.logger.info("Clicked on 'Create' button.");
        await playwrightWrapper.loadingWebPage();

        // Click on the "Save Model" button
        await fixture.page.locator(this.getSaveButton()).click();
        fixture.logger.info("Clicked on 'Save Model' button.");
        await playwrightWrapper.loadingWebPage();

        // assert created successfully
        await playwrightWrapper.createdSuccesfullyMessage();

        // close the model page
        await playwrightWrapper.closeTheModel();

    }
    async clickSourceObject(sourceName: string) {
        //click
        await globalAction.waitAndClick(this.getTitleOfLeftItem(sourceName));
        await globalAction.waitAndClick(this.getColumnsTab());
    }
    async clickSourceObjectAndSelectTheRequiredColumnOneByOne(fieldName: string) {
        await globalAction.checkCheckbox(this.getCheckBoxOfFieldName(fieldName));
    }

    async exitFromSourceObject() {
        //Close the Right side
        await globalAction.waitAndClick(this.getKeyboardDoubleArrowRightOutlinedIcon());
    }


    async clickModelNameObject(modelName: string) {
        //click  on the Source Item Box
        await globalAction.waitAndClick(this.getTitleOfSourceItemBox(modelName));
        await globalAction.waitAndClick(this.getColumnsTab());

    }
    async clickModelNameAndSelectTheRequiredColumnOneByOne(fieldName: string) {
        await globalAction.checkCheckbox(this.getLeftCheckBoxOfModelNameColumns(fieldName));
    }

    async exitFromModelNameObject() {
        await globalAction.waitAndClick(this.getKeyboardDoubleArrowRightOutlinedIcon());
    }

    async cleanUpTheModel(jsondata: any) {
        // Verify the Model name in the  tab list and return the row number, if not found then it is zero
        let modelname = jsondata[0].modelName;
        let presentOrNotRow =
            await playwrightWrapper.getTheRowNumberFromModelPage(modelname);
        console.log("Present or not, if present the row number is ==========", presentOrNotRow);
        if (presentOrNotRow !== 0) {
            console.log("Deleting the Model as per the request.");
            await playwrightWrapper.deleteTheModel(presentOrNotRow);
        }
    }

    async executeTheSingleModelFullLoad(jsondata: any) {
        let modelname = jsondata[0].modelName;
        let presentOrNotRow =
            await playwrightWrapper.getTheRowNumberFromModelPage(modelname);
        console.log("Present or not, if present the row number is ==========", presentOrNotRow);
        if (presentOrNotRow !== 0) {
            console.log("Executing the job");
            await playwrightWrapper.executeModelFullLoad(presentOrNotRow);
        }
        // Verify the success message text
        await expect(fixture.page.locator(this.getStartedSuccessMessage())).toContainText("started successfully");
        fixture.logger.info(`Verified the success message: 'Model  _${modelname}, Model data load started successfully..`);
        await playwrightWrapper.loadingWebPage();
        await globalAction.waitForElementHidden(this.getStartedSuccessMessage());
        await playwrightWrapper.loadingWebPage();
        
    }

    getStartedSuccessMessage(){
        return `//p[contains(text(),'started successfully')]`;
    }

}
