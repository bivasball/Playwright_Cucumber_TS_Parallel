import { fixture } from "@hooks/pageFixture";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import GlobalActions from "@helper/wrapper/GlobalActions";
import { expect } from "@playwright/test";
import { TIMEOUT } from "playwright.config";


let playwrightWrapper = new PlaywrightWrapper();
let globalAction = new GlobalActions();

export default class xgenModelPageXYaxis {


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
    getViewRadioButton() {
        return `//input[@type='radio' and @value='ILM']`;
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
    getLookUpNode() {
        return `//span[@aria-label='Lookup Node']//button`;
    }
    getJoinNode() {
        return `//span[@aria-label='Join Node']//button`;
    }

    getSourceNodeTreeExpand() {
        return `[data-testid="TreeViewExpandIconIcon"]`;
    }
    getLookUpNodeTreeExpand() {
        return `[data-testid="TreeViewExpandIconIcon"]`;
    }
    getLeftNodeRightSideDot() {
        return `//div[@data-handleid='SRN' and @data-nodeid='SRN_1' and @data-handlepos='right']`;
    }
    getRightNodeLeftSideDot() {
        return `//div[@data-handleid='OTN' and @data-nodeid='OTN_NODE' and @data-handlepos='left']`;
    }
    getRightNodeLeftSideDot_Xil() {
        return `//div[@data-handleid='SEN' and @data-nodeid='SEN_NODE' and @data-handlepos='left']`;
    }

    getSaveButton() {
        return `//li[text()='Save']`;
    }
    getTitleOfLeftItem(sourceObject: string): string {
        return `//div[contains(@class,'MuiCardHeader-root')]//span[contains(text(),'${sourceObject}')]`;
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
    getTitleOfJoin_1_ItemBox(join_1: string): string {
        return `//div[contains(@class,'MuiCardHeader-root')]//p[contains(text(),'${join_1}')]`;
    }
    getStartedSuccessMessage() {
        return `//p[contains(text(),'started successfully')]`;
    }

    getSourceOjbectRightdot(sourceObject: string): string {
        return `//span[text()='S_${sourceObject}']//ancestor::div[contains(@class,'selectable draggable')] //div[@data-handleid='SRN' and @data-handlepos='right']`;
    }
    getLookUpOjbectRightdot(sourceObject: string): string {
        return `//span[text()='L_${sourceObject}']//ancestor::div[contains(@class,'selectable draggable')] //div[@data-handleid='LKN' and @data-handlepos='right']`;
    }
    getJoin_OjbectLeftdot(joinID: string): string {
        return `//p[text()='${joinID}']//ancestor::div[contains(@class,'selectable draggable')]//div[@data-handleid='JON' and @data-handlepos='left']`;
    }
    getJoin_OjbectRightdot(joinID: string): string {
        return `//p[text()='${joinID}']//ancestor::div[contains(@class,'selectable draggable')]//div[@data-handleid='JON' and @data-handlepos='right']`;
    }
    getModelName_ObjectLeftdot(modelName: string): string {
        return `//p[text()='XDL_${modelName}']//ancestor::div[contains(@class,'selectable draggable')]//div[@data-handleid='OTN' and @data-handlepos='left']`;
    }

    getJoin_1_Join_Tab() {
        return `//button[text()='Join' and @role='tab']`;
    }
    getPlusConditionButtonIcon() {
        return `//p[text()="Condition"]`;
    }

    getJoin_1_Join_Edit_Join() {
        return `//p[text()='Edit Join']`;

    }
    getJoin_1_Join_Tab_Join_Type() {
        return `//button[@type="button" and @value="LEFT OUTER JOIN"]`;

    }
    getJoin_1_Join_Tab_Join_Type_Condition_left() {
        return `//div[contains(@class,"css-1dvuvi7")]/div[1]//button[@type="button" and @title="Open"]`;
    }

    getJoin_1_Join_Tab_Join_Type_Condition_left_Choose_Field() {
        return `//div[contains(@class,"css-1dvuvi7")]/div[1]//input[@role="combobox" and @value="ORDERID"]`;
    }
    getJoin_1_Join_Tab_Join_Type_Condition_Right() {
        return `//div[contains(@class,"css-1dvuvi7")]/div[3]//button[@type="button" and @title="Open"]`;
    }
    getJoin_1_Join_Tab_Join_Type_Condition_Right_Choose_Field() {
        return `//div[contains(@class,"css-1dvuvi7")]/div[3]//input[@role="combobox" and @value="ORDERID"]`;
    }

    getApplyButton() {
        return `//p[text()="Apply"]`;

    }
    getCheckBoxofAllFieldNameOfSourceObject() {
        return `//div[contains(@class,"1cw00c7")]//input[contains(@class,"1m9pwf3") and @type="checkbox"]`;
    }
    getStar_OjbectRightdot(starID: string): string {
        return `//p[text()='${starID}']//ancestor::div[contains(@class,'selectable draggable')]//div[@data-handleid='STN' and @data-handlepos='right']`;
    }

    getModelName_ObjectLeftdot_st(modelName: string): string {
        return `//p[text()='${modelName}']//ancestor::div[contains(@class,'selectable draggable')]//div[@data-handleid='OTN' and @data-handlepos='left']`;
    }
    getStarNode() {
        return `//span[@aria-label='Star Node']//button`;
    }
    async joinLookNodeToStarNodeLeftSide(lookupOjectNameRight: string, startOjbectLeftdot: string) {
        // join left node with Right node
        await globalAction.dragAndDrop(this.getLookUpOjbectRightdot_St(lookupOjectNameRight), this.getStar_OjbectLeftdot(startOjbectLeftdot));
    }
    getStar_OjbectLeftdot(StarID: string): string {
        return `//p[text()='${StarID}']//ancestor::div[contains(@class,'selectable draggable')]//div[@data-handleid='STN' and @data-handlepos='left']`;
    }
    async joinSourceNodeToStarNodeLeftSide(sourceOjectRightDot: string, startOjbectLeftdot: string) {

        await globalAction.dragAndDrop(this.getSourceOjbectRightdot_St(sourceOjectRightDot), this.getStar_OjbectLeftdot(startOjbectLeftdot));
    }
    getSourceOjbectRightdot_St(sourceObject: string): string {
        return `//span[text()='${sourceObject}']//ancestor::div[contains(@class,'selectable draggable')] //div[@data-handleid='SRN' and @data-handlepos='right']`;
    }
    getLookUpOjbectRightdot_St(sourceObject: string): string {
        return `//span[text()='${sourceObject}']//ancestor::div[contains(@class,'selectable draggable')] //div[@data-handleid='LKN' and @data-handlepos='right']`;
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
        await globalAction.waitAndClick(`//p[text()='${sourceObjectFromSourcenode}']`);

    }

    async joinSourceObjectFromSourceNodeToModelName() {
        // join left node with Right node
        await globalAction.dragAndDrop(this.getLeftNodeRightSideDot(), this.getRightNodeLeftSideDot());
    }
    async joinSourceObjectFromSourceNodeToModelName_Xil() {
        // join left node with Right node
        await globalAction.dragAndDrop(this.getLeftNodeRightSideDot(), this.getRightNodeLeftSideDot_Xil());
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

    }

    async closeTheModel() {
        // close the model page
        await playwrightWrapper.closeTheModel();

    }


    async clickSourceObject(sourceName: string) {
        //click
        await globalAction.waitAndClick(this.getTitleOfLeftItem(sourceName));
        await globalAction.waitAndClick(this.getColumnsTab());
    }
    async clickSourceObject_Third(sourceName: string) {
        //click
        await globalAction.click(`//span[text()='${sourceName}']`);
        await globalAction.waitAndClick(this.getColumnsTab());
    }
    async clickSourceObjectAndSelectTheRequiredColumnOneByOne(fieldName: string) {
        await globalAction.checkCheckbox(this.getCheckBoxOfFieldName(fieldName));
    }

    async exitFromFocusedObject() {
        //Close the Right side
        await globalAction.waitAndClick(this.getKeyboardDoubleArrowRightOutlinedIcon());
    }

    async verifyTheStatus_Valid() {
        let statusMessageLoc = `//div[contains(@class,"css-opoah9")]//p[contains(@class,"css-1jrvat8")]`;
        fixture.logger.info(`Locating the status message element using locator: ${statusMessageLoc}`);

        let status = await globalAction.getTextContent(statusMessageLoc);
        fixture.logger.info(`Status message retrieved: ${status}`);

        console.log("Status is ======================", status);

        await expect(fixture.page.locator(statusMessageLoc)).toContainText("Valid",{timeout: TIMEOUT});
        fixture.logger.info(`Verified that the status message contains the text: "Valid".`);

        await playwrightWrapper.loadingWebPage();
        fixture.logger.info("Page loading completed after verifying the status message.");
    }

    async clickModelNameObject(modelName: string) {
        //click  on the Source Item Box
        await globalAction.waitAndClick(this.getTitleOfSourceItemBox(modelName));
        await globalAction.waitAndClick(this.getColumnsTab());

    }
    async clickJoin_1_Object(Join_1_Name: string) {
        //click  on Join_1 Item Box
        await globalAction.waitAndClick(this.getTitleOfSourceItemBox(Join_1_Name));
        await globalAction.waitAndClick(this.getColumnsTab());

    }

    async clickStar_1_Object(Join_1_Name: string) {
        //click  on Join_1 Item Box
        await globalAction.waitAndClick(this.getTitleOfSourceItemBox(Join_1_Name));
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
        await expect(fixture.page.locator(this.getStartedSuccessMessage())).toContainText("started successfully",{timeout: TIMEOUT});
        fixture.logger.info(`Verified the success message: 'Model  _${modelname}, Model data load started successfully..`);
        await playwrightWrapper.loadingWebPage();
        await globalAction.waitForElementHidden(this.getStartedSuccessMessage());
        await playwrightWrapper.loadingWebPage();

    }

    //------------------------------------//
    async clickLookUpNodeSearchAndSelectSource(jsondata: any) {
        let sourceObjectFromLookUpnodeP = jsondata[0].sourceObjectFromLookUpNode;
        // Wait for the "Source Node" button to be visible and click it
        await globalAction.waitAndClick(this.getLookUpNode());
        // Wait for the "Tree View Expand Icon" to be visible and click it
        await globalAction.waitAndClick(this.getLookUpNodeTreeExpand());
        // Wait for the "CUSTOMER" text to be visible and click it
        await globalAction.waitAndClick(`//p[text()='${sourceObjectFromLookUpnodeP}']`);
    }

    async clickJoinNode() {
        await globalAction.waitAndClick(this.getJoinNode());
    }
    async joinSourceNodeToJoinNodeLeftSide(sourceOjectName: string) {
        // join left node with Right node
        await globalAction.dragAndDrop(this.getSourceOjbectRightdot('ORDERS'), this.getJoin_OjbectLeftdot('JOIN_1'));
    }
    async joinLookNodeToJoinNodeLeftSide(sourceOjectName: string) {
        // join left node with Right node
        await globalAction.dragAndDrop(this.getLookUpOjbectRightdot('ORDERITEMS'), this.getJoin_OjbectLeftdot('JOIN_1'));
    }
    async joinJoinNodeRightSideToModelName(sourceOjectName: string) {
        // join left node with Right node
        await globalAction.dragAndDrop(this.getJoin_OjbectRightdot('JOIN_1'), this.getModelName_ObjectLeftdot('AUTOMATE_1SN_1LN'));
    }

    async clickFocusedObjectAndSelectAllTheColumns() {
        await globalAction.click(this.getCheckBoxofAllFieldNameOfSourceObject());
    }

    async clickJoin_1_Join_Edit_Join_Join_Type_Condition() {

        await globalAction.waitAndClick(this.getJoin_1_Join_Tab());
        await globalAction.waitAndClick(this.getJoin_1_Join_Edit_Join());
        await globalAction.waitAndClick(this.getJoin_1_Join_Tab_Join_Type());
        await globalAction.click(this.getPlusConditionButtonIcon());

        await globalAction.waitAndClick(this.getJoin_1_Join_Tab_Join_Type_Condition_left());
        let fillinputleft = `//div[contains(@class,"css-1dvuvi7")]/div[1]//input[@spellcheck="false" and @role="combobox" ]`;
        await globalAction.fillInput(fillinputleft, "ORDERID");
        await globalAction.pressKey(fillinputleft, "Enter");




        await globalAction.waitAndClick(this.getJoin_1_Join_Tab_Join_Type_Condition_Right());
        let fillinputRight = `//div[contains(@class,"css-1dvuvi7")]/div[3]//input[@spellcheck="false" and @role="combobox" ]`;
        await globalAction.fillInput(fillinputRight, "ORDERID");
        await globalAction.pressKey(fillinputRight, "Enter");


        await globalAction.waitAndClick(this.getApplyButton());
        await playwrightWrapper.loadingWebPage();

    }

    async click_LookUpNodeSearchAndSelectSource(sourceObjectFromLookUpnodeP: string) {
        fixture.logger.info(`The json data for sourceObjectFromLookup node : ${sourceObjectFromLookUpnodeP}`);
       
        // Wait for the "Source Node" button to be visible and click it
        await globalAction.waitAndClick(this.getLookUpNode());
        // Wait for the "Tree View Expand Icon" to be visible and click it
        await globalAction.waitAndClick(this.getLookUpNodeTreeExpand());
        // Wait for the "CUSTOMER" text to be visible and click it
        await globalAction.waitAndClick(`//p[text()='${sourceObjectFromLookUpnodeP}']`);
        await playwrightWrapper.loadingWebPage();
    }
    async clickStarNode() {
        await globalAction.waitAndClick(this.getStarNode());
    }
    

    async join_StarNodeRightSideToModelName(sourceStarOjectName: string,ModelObjectName:string) {
        // join left node with Right node
        await globalAction.dragAndDrop(this.getStar_OjbectRightdot(sourceStarOjectName), this.getModelName_ObjectLeftdot_st(ModelObjectName));
    }

  

    async addSelectViewRadioButton() {
       

        // Wait for the "Add" link to be visible and click it
        await globalAction.waitAndClick(this.getTheAddOrPlusIcon());

        // Wait for the "View" radio button to be visible and check it
        await globalAction.checkCheckbox(this.getViewRadioButton());

        
    }


    async EnterModelNameAndDescription(jsondata: any) {
        let modelname = jsondata[0].modelName;
        let modelDesc = jsondata[0].modelDescription;
        // Wait for the "Model Name" textbox to be visible and fill it
        await globalAction.waitAndClick(this.getModelName());
        await globalAction.typeWithDelay(this.getModelName(), modelname);

        // Wait for the "Model Desc" textbox to be visible and fill it
        await globalAction.waitAndClick(this.getModelDesc());
        await globalAction.typeWithDelay(this.getModelDesc(), modelDesc);
    }

    async clickStar_join_tab(){
        fixture.logger.info(`Clicking on Star join tab`);
        await globalAction.click(`//button[text()="Star Join"]`);

    }

    async clickStar_EditJoin() {
        //click on Edit
        fixture.logger.info(`Clicking on edit `);
        await globalAction.click(`//button[@type="button" and @iconcolor="edit"]`);

        //1st row order items
        fixture.logger.info(`Filling the 1st row order item 's_orderitems' with 'ORDERID'`);
        await globalAction.typeWithDelay(`(//input[@aria-autocomplete])[2]`, `ORDERID`);
        await globalAction.pressKey('(//input[@aria-autocomplete])[2]', 'Enter');
        //1st row l_customer
        fixture.logger.info(`Filling the 2nd row order item 'l_customer' with 'EMP_ID'`);
        await globalAction.typeWithDelay(`(//input[@aria-autocomplete])[3]`, `CUSTOMERID`);
        await globalAction.pressKey('(//input[@aria-autocomplete])[3]', 'Enter');
        //3rd  row s_orderitems
        fixture.logger.info(`Filling the 2nd row order item 's_orderitems' with 'CURRENCY'`);
        await globalAction.typeWithDelay(`(//input[@aria-autocomplete])[4]`, `CURRENCY`);
        await globalAction.pressKey('(//input[@aria-autocomplete])[4]', 'Enter');
        //4th  row l_campaigns
        fixture.logger.info(`Filling the 2nd row order item 'l_campaigns' with 'TARGETAUDIENCE`);
        await globalAction.typeWithDelay(`(//input[@aria-autocomplete])[5]`, `TARGETAUDIENCE`);
        await globalAction.pressKey('(//input[@aria-autocomplete])[5]', 'Enter');

        //click Apply button
        await globalAction.click(`//button[@type="button" and @iconcolor="confirm"]`);

    }

    async runAndDataPreview(jsondata: any) {
        let modelname = jsondata[0].modelName;
        // Run button
        await globalAction.waitAndClick(`//p[text()="Run"]/parent::button`);
        // validate the message
        // Verify the success message text
        await expect(fixture.page.locator(this.getStartedSuccessMessage())).toContainText("started successfully", { timeout: TIMEOUT });
        fixture.logger.info(`Verified the success message: 'Model  _${modelname}, Model data load started successfully..`);
        await playwrightWrapper.loadingWebPage();
        await globalAction.waitForElementHidden(this.getStartedSuccessMessage());
        await playwrightWrapper.loadingWebPage();

        //click on data preview
        await globalAction.waitAndClick(`//span[@aria-label="Data Preview"]/button`);

        await expect(fixture.page.locator(`//h2`)).toContainText("Preview Data for:", { timeout: TIMEOUT });
        fixture.logger.info(`Verified the header ', Preview Data for:`);
        await playwrightWrapper.loadingWebPage();

    }

    async verifyThatTheDataPreviewContainsData(){
        //verify that the data preview contains ROWS
        let thelocator = `//div[class="MuiDataGrid-virtualScrollerRenderZone css-1inm7gi"]/*`;
        //await globalAction.waitForElementVisible(thelocator);
        const rows = fixture.page.locator(thelocator);

        const numberOfRowsDisplayed = await rows.count();
        console.log("ROWS displayed in the Data preview window :-", numberOfRowsDisplayed);
        fixture.logger.info("ROWS displayed in the Data preview window :-", numberOfRowsDisplayed);
        if (numberOfRowsDisplayed > 0) {
            console.log("Expectation passed: Rows are displayed.");
            fixture.logger.info("Expectation passed: Rows are displayed.");
        } else {
            console.log("Expectation failed: No rows displayed.");
            fixture.logger.info("Expectation passed: Rows are displayed.");
        }

        //pop up window close
        await globalAction.waitAndClick(`//div[contains(@class,"css-b07ifn")]//p[text()="Close"]/parent::button`);

    }

    async moveTheSourceNodeAlongXY(displayedBox:string,xaxis: number, yaxis: number){
        let theSourceNodeElement = `//span[text()="${displayedBox}"]//ancestor::div[contains(@class,"selectable draggable" )]`;
       //await playwrightWrapper.moveTheElementToSomeCoordinates(theSourceNodeElement,xaxis, yaxis);
        //await playwrightWrapper.moveTheElementToSomeCoordinatesWithClickHoldRelease(theSourceNodeElement,xaxis, yaxis);
        await playwrightWrapper.moveElementWithSmoothDraggingAndRepaint(theSourceNodeElement,xaxis, yaxis);
        


        
        


    }

    async moveTheStarNodeAlongXY(displayedBox:string,xaxis: number, yaxis: number){
        let theSourceNodeElement = `//p[text()="${displayedBox}"]//ancestor::div[contains(@class,"selectable draggable" )]`;
        await playwrightWrapper.moveTheElementToSomeCoordinates(theSourceNodeElement,xaxis, yaxis);
    }


    async moveTheLookupNodeAlongXY(displayedBox:string,xaxis: number, yaxis: number){
        let theSourceNodeElement = `//span[text()="${displayedBox}"]//ancestor::div[contains(@class,"selectable draggable" )]`;
       //await playwrightWrapper.moveTheElementToSomeCoordinates(theSourceNodeElement,xaxis, yaxis);
        //await playwrightWrapper.moveTheElementToSomeCoordinatesWithClickHoldRelease(theSourceNodeElement,xaxis, yaxis);
        await playwrightWrapper.moveElementWithSmoothDraggingAndRepaint(theSourceNodeElement,xaxis, yaxis);
      
    }

    async scrollTheMouseVertically(yaxis:number){
        await globalAction.scrollVerticallyWithoutAnyLocator(0,yaxis);
    }

    async moveTheModelNameNodeAlongXY(displayedBox:string,xaxis: number, yaxis: number){
        let theSourceNodeElement = `//p[text()="${displayedBox}"]//ancestor::div[contains(@class,"selectable draggable" )]`;
       // await playwrightWrapper.moveTheElementToSomeCoordinates(theSourceNodeElement,xaxis, yaxis);
        //await playwrightWrapper.moveTheElementToSomeCoordinatesWithClickHoldRelease(theSourceNodeElement,xaxis, yaxis);
        await playwrightWrapper.moveElementWithSmoothDraggingAndRepaint(theSourceNodeElement,xaxis, yaxis);
      
    }
    //p[contains(text(),'XDL_STAR_AUTO_O035')]/ancestor::div[contains(@class,"selectable draggable" )]
}
