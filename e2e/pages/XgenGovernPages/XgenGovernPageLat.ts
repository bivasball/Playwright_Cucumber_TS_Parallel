import { expect } from "@playwright/test";
import { fixture } from "@hooks/pageFixture";
import { TIMEOUT } from "playwright.config";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import GlobalActions from "@helper/wrapper/GlobalActions";


let globalAction = new GlobalActions();

let playwrightWrapper = new PlaywrightWrapper();

export default class xgenGovernPageLat {



    //locator//
    getTagsPlusIconButton(): string {
        return `//label[text()="Tags:"]/parent::div/button`;
    }
    getSelectTagFromThePopup(choice: string): string {
        return `//div[contains(@class,"css-19midj6")]/div//span[text()="${choice}"]`;

    }

    getClassificationPlusIconButton(): string {
        return `//label[text()="Classification:"]/parent::div/button`;
    }
    getTheClassificationText(): string {
        return `//label[text()="Classification:"]/parent::div/parent::div//span[contains(@class,"qw7o17")]`;
    }
    getTheClassificationCancelIcon(): string {
        return `//label[text()="Classification:"]/parent::div/parent::div//span[contains(@class,"qw7o17")]/parent::div//*[@data-testid="CancelIcon"]`;
    }
    getTheDomainCancelIcon(): string {
        return `//label[text()="Domain:"]/parent::div/parent::div//span[contains(@class,"qw7o17")]/parent::div//*[@data-testid="CancelIcon"]`;
    }

    getSelectClassificationFromThePopup(choice: string): string {
        return `//div[contains(@class,"css-19midj6")]/div//span[text()="${choice}"]`;

    }
    getTheDomainText(): string {
        return `//label[text()="Domain:"]/parent::div/parent::div//span[contains(@class,"qw7o17")]`;
    }

    getDomainPlusIconButton(): string {
        return `//label[text()="Domain:"]/parent::div/button`;
    }

    getSelectTheDomainFromThePopup(choice: string): string {
        return `//div[contains(@class,"css-19midj6")]/div//span[text()="${choice}"]`;

    }
    getTheOwnerText(): string {
        return `//label[text()="Owner:"]/parent::div/parent::div//span[contains(@class,"qw7o17")]`;
    }
    getTheOwnerCancelIcon(): string {
        return `//label[text()="Owner:"]/parent::div/parent::div//span[contains(@class,"qw7o17")]/parent::div//*[@data-testid="CancelIcon"]`;
    }

    getOwnerPlusIconButton(): string {
        return `//label[text()="Owner:"]/parent::div/button`;
    }

    getSelectTheOwnerFromThePopup(choice: string): string {
        return `//div[contains(@class,"css-19midj6")]/div//span[text()="${choice}"]`;

    }


    getSearchDataAssets(): string {
        return `//input[@placeholder="Search data assets..."]`;
    }
    getSearchDataAssetsFirstRowResult(): string {
        return ` (//div[text()="Data Models"]/ancestor::li//h6)[1]`;
    }

    getPreviewTab() {
        return `//button[text()="Preview"]`;
    }
    getRunStatusMessage(dqName:string): string {
        return `//div[@data-id="${dqName}"]//div[9]/span/div/span[contains(@class,"MuiChip-labelSmall ")]`;
    }

    getRunButton(): string {
        return `//p[text()='Run']/parent::button`;
    }

    getSaveSuccessMessage(): string {
        return `//p[contains(@class,"css-16kpwfw")]`;
    }
    getRefreshDataButton(): string {
        return `//p[text()="Refresh Data"]/parent::button[@iconcolor="refresh"]`;
    }

    getTheRecodsCountInPreviewTab(): string {
        return `//label[text()="Records:"]/following-sibling::label`;
    }

    getQualityTab(): string {
        return `//button[text()="Quality"]`;
    }
    getQualityTabAddButton(): string {
        return `//p[text()="Add"]/parent::button`;
    }

    getDqRulesPopupInputName(): string {
        return `//label[text()="Name"]/parent::div//input`;
    }

    getDqRulesPopupInputDescription(): string {
        return `//label[text()="Description"]/parent::div//input`;
    }

    getDqRulesPopupColumn(): string {
        return `//button[text()="column"]`;
    }


    getFieldsInput(): string {
        return `//label[text()="Fields"]/parent::div//input`;
    }

    getRuleCategoryInput(): string {
        return `//label[text()="Rule Category"]/parent::div//input`;
    }



    getRuleNameInput(): string {
        return `//label[text()="Rule Name"]/parent::div//input`;
    }

    getDeleteRuleButton(dataRule: string): string {
        return `//div[@data-id="${dataRule}"]//div[@class="MuiBox-root css-1hrua5"]/span[@aria-label="Delete Rule"]/button`;
    }


    getDeleteRuleButtonByRowNum(rowNum: number): string{
        return `//div[contains(@class,"MuiBox-root css-1likwc4")]/div[2]//div[contains(@class,"virtualScrollerRenderZone")]/div[${rowNum}]//div/span[@aria-label="Delete Rule"]/button`;
    }

    ///-----------------//
    Selectcolumn() {
        return `//button[text()="column"]`;
    }

    SelectField() {
        return `//input[@type='text' and contains(@class, 'MuiAutocomplete-input') and @value='orderid']
        `;
    }
    SelectRuleCategory() {
        return `//input[@type='text' and @value='consistency' and contains(@class, 'MuiAutocomplete-input')]
        `;
    }
    RuleName() {
        return `//input[@type='text' and @value='Check for Column Presence' and contains(@class, 'MuiAutocomplete-input')]
        `;
    }
    getApplyButton() {
        return ` //button[ @iconcolor="confirm"]`;
    }
    getCloseButton() {
        return `//button[ @iconcolor="confirm"]/following-sibling::button//p[text()="Close"]/parent::button`;
    }
    getSaveButton() {
        return `//p[text()='Save']/parent::button`;
    }

    //locator-----end//

    async navigateToGovernPage() {
        await globalAction.waitAndClick(`//span[text()="Govern"]`);
    }

    async searchAndSelectFromDataModel(inputForSearch: string) {
        await globalAction.fillInput(this.getSearchDataAssets(), inputForSearch);
        await playwrightWrapper.loadingWebPage();
        await globalAction.waitAndClick(this.getSearchDataAssetsFirstRowResult());
        await playwrightWrapper.loadingWebPage();

    }

    async clickOnDataModel() {
        await globalAction.waitAndClick(`//div[text()="Data Models"]/parent::div`);
    }
    async selectDataModelsFromDropDown(modelName: string) {
        //await globalAction.waitAndClick(`//div[text()="Data Models"]/ancestor::li//h6[text()="XDL_CUSTOMER"]`);
        await globalAction.waitAndClick(`//div[text()="Data Models"]/ancestor::li//h6[text()="${modelName}"]`);
    }
    async clickOnOverviewTab() {
        await globalAction.waitAndClick(`//button[text()="Overview"]`);
    }

    async deleteTagIfPresent(TagName: string) {
        let parentLocator = `//div[contains(@class,"css-pao3g5")]/div`;
        let partLocator = `//span[contains(@class,"css-qw7o17")]`;
        let ifTagIfPresentTheRowNum = await playwrightWrapper.getTheRowNumberIfTheRequireTextIsPresent(parentLocator, partLocator, TagName);
        console.log(`====================`, ifTagIfPresentTheRowNum);
        if (!ifTagIfPresentTheRowNum) {
            console.log("No need for deletion as it is not present");
            fixture.logger.info(`No need for deletion as it is not present`);
            
        } else {
            console.log("Tag already exists, Need to delete the existing");
            fixture.logger.info(`Tag already exists, Need to delete the existing`);
            await globalAction.click(this.getTagsPlusIconButton());
            await globalAction.click(this.getSelectTagFromThePopup(TagName));

        }

    }


    async addTagIfNotPresent(TagName: string) {
        let parentLocator = `//div[contains(@class,"css-pao3g5")]/div`;
        let partLocator = `//span[contains(@class,"css-qw7o17")]`;
        let ifTagIfPresentTheRowNum = await playwrightWrapper.getTheRowNumberIfTheRequireTextIsPresent(parentLocator, partLocator, TagName);
        console.log(`====================`, ifTagIfPresentTheRowNum);
        if (!ifTagIfPresentTheRowNum) {
            console.log("Creating Tag as it is not present");
            fixture.logger.info(`Creating Tag as it is not present`);
            await globalAction.click(this.getTagsPlusIconButton());

            await globalAction.click(this.getSelectTagFromThePopup(TagName));


        } else {
            console.log("Tag already exists, no need to create it again");
            fixture.logger.info(`Tag already exists, no need to create it again`);
        }

    }

    async deleteClassificationIfPresent(expectedClassification: string) {
        let theclassificationTextfromUI = await globalAction.getTextContent(this.getTheClassificationText());
        if (theclassificationTextfromUI.includes(expectedClassification)) {
            console.log("Classification already exists, need to delete");
            fixture.logger.info(`Classification already exists, need to delete`);
            await globalAction.scrollToElement(this.getTheClassificationCancelIcon());
            await globalAction.click(this.getTheClassificationCancelIcon());
            await playwrightWrapper.loadingWebPage();
            await playwrightWrapper.loadingWebPage();
            console.log("Classification deleted");
            fixture.logger.info(`Classification deleted`);
        } else {
            console.log("There is no Classification to delete");
            fixture.logger.info(`There is no Classification to delete`);
        }
    }

    async addClassificationIfNotPresent(expectedClassification: string) {
        let theclassificationTextfromUI = await globalAction.getTextContent(this.getTheClassificationText());
        if (theclassificationTextfromUI.includes(expectedClassification)) {
            console.log("Classification already exists, no need to create it again");
            fixture.logger.info(`Classification already exists, no need to create it again`);
        } else {
            console.log("Creating the Classification");
            fixture.logger.info(`Creating the Classification`);
            await globalAction.scrollToElement(this.getClassificationPlusIconButton());
            await globalAction.click(this.getClassificationPlusIconButton());
            await globalAction.click(this.getSelectClassificationFromThePopup(expectedClassification));
            await playwrightWrapper.loadingWebPage();
        }
    }

    async deleteDomainIfPresent(expectedDomaintag: string) {
        let theDomainTextfromUI = await globalAction.getTextContent(this.getTheDomainText());
        if (theDomainTextfromUI.includes(expectedDomaintag)) {
            console.log("Domain already exists, need to delete");
            fixture.logger.info(`Domain already exists, need to delete`);
            await globalAction.scrollToElement(this.getTheDomainCancelIcon());
            await globalAction.click(this.getTheDomainCancelIcon());
            await playwrightWrapper.loadingWebPage();
            console.log("Domain deleted");
            fixture.logger.info(`Domain deleted`);
        } else {
            console.log("There is no Domain to delete");
            fixture.logger.info(`here is no Domain to delete`);
        }
    }


    async addDomainIfNotPresent(expectedDomaintag: string) {
        let theDomainTextfromUI = await globalAction.getTextContent(this.getTheDomainText());
        if (theDomainTextfromUI.includes(expectedDomaintag)) {
            console.log("Domain already exists, no need to create it again");
            fixture.logger.info(`Domain already exists, no need to create it again`);
        } else {
            console.log("Creating the Domain");
            fixture.logger.info(`Creating the Domain`);
            await globalAction.scrollToElement(this.getDomainPlusIconButton());
            await globalAction.waitAndClick(this.getDomainPlusIconButton());
            await globalAction.waitAndClick(this.getSelectTheDomainFromThePopup(expectedDomaintag));
            await playwrightWrapper.loadingWebPage();
        }
    }
    async deleteOwnerIfPresent(expectedOwnertag: string) {
        let theOwnerTextfromUI = await globalAction.getTextContent(this.getTheOwnerText());
        if (theOwnerTextfromUI.includes(expectedOwnertag)) {
            console.log("Owner already exists, need to delete");
            fixture.logger.info(`Owner already exists, need to delete`);
            await globalAction.scrollToElement(this.getTheOwnerCancelIcon());
            await globalAction.click(this.getTheOwnerCancelIcon());
            await playwrightWrapper.loadingWebPage();
            console.log("Owner deleted");
            fixture.logger.info(`Owner deleted`);
        } else {
            console.log("There is no Owner to delete");
            fixture.logger.info(`here is no Owner to delete`);
        }
    }

    async addOwnerIfNotPresent(expectedOwnertag: string) {
        let theOwnerTextfromUI = await globalAction.getTextContent(this.getTheOwnerText());
        if (theOwnerTextfromUI.includes(expectedOwnertag)) {
            console.log("Owner already exists, no need to create it again");
            fixture.logger.info(`Owner already exists, no need to create it again`);
        } else {
            console.log("Creating the Owner");
            fixture.logger.info(`Creating the Owner`);
            await globalAction.scrollToElement(this.getOwnerPlusIconButton());
            await globalAction.waitAndClick(this.getOwnerPlusIconButton());
            await globalAction.waitAndClick(this.getSelectTheOwnerFromThePopup(expectedOwnertag));
            await playwrightWrapper.loadingWebPage();
        }
    }

    async viewDataInPreviewTab() {

        await globalAction.click(this.getPreviewTab());
        await globalAction.click(this.getRefreshDataButton());
        let thecount = await globalAction.getTextContent(this.getTheRecodsCountInPreviewTab());

        if (!thecount) {
            console.log("The is greater than 1");
            fixture.logger.info(`The is greater than 1`);
        } else {
            console.log("It does not have any data");
            fixture.logger.info(`It does not have any data`);

        }




    }

    async deleteDataQualityRulesIfExist(DataRuleName: string) {
        await globalAction.waitAndClick(this.getQualityTab())
        await playwrightWrapper.anonymousSleep(5000);

        const runAndAddButtonIsPresent = fixture.page.locator('//div[contains(@class,"MuiBox-root css-1likwc4")]/div[2]');
        if (await runAndAddButtonIsPresent.count() > 0) {
            console.log('Run and Add button is present');
            await this.verifyIfTheQualityRuleIfPresentThenDelete(DataRuleName);
        } else {
            console.log('Run and Add button is not present, delete option is not visible');
        }

    }

    async verifyIfTheQualityRuleIfPresentThenDelete(DataRuleName: string) {
        let parentLocator = `//div[contains(@class,"MuiBox-root css-1likwc4")]/div[2]//div[contains(@class,"virtualScrollerRenderZone")]/div`;
        let partLocator = `//div[@data-field="name"]/span`;
        let ifDataRuleIfPresentTheRowNum = await playwrightWrapper.getTheRowNumberIfTheRequireTextIsPresent(parentLocator, partLocator, DataRuleName);
        console.log(`====================`, ifDataRuleIfPresentTheRowNum);
        if (ifDataRuleIfPresentTheRowNum > 0) {
            console.log("DataRule already exists, Need to Delete jj");
            fixture.logger.info(`DataRule already exists, Need to Delete`);
            //await globalAction.waitAndClick(this.getQualityTab())
            //await globalAction.waitForElementAttached(this.getDeleteRuleButton(DataRuleName));
            //await globalAction.clickForce(this.getDeleteRuleButton(DataRuleName));
            //await globalAction.click(this.getDeleteRuleButton(DataRuleName));
          
            await globalAction.waitAndClick(this.getDeleteRuleButtonByRowNum(ifDataRuleIfPresentTheRowNum));
            console.log(`Clicked on Datarule delete button`);
            fixture.logger.info(`Clicked on Datarule delete button`);
            await playwrightWrapper.loadingWebPage();
            await globalAction.waitAndClick(this.getSaveButton());
            await playwrightWrapper.anonymousSleep(5000);
            await playwrightWrapper.anonymousSleep(5000);
            console.log(`Clicked on Save button`);
            fixture.logger.info(`Clicked on Save button`);
            await globalAction.waitForElementHidden(this.getSaveSuccessMessage());
        } else {

            console.log("DataRule is not present,nothing to delete");
            fixture.logger.info(`DataRule is not present,nothing to delete`);
        }


    }




    async addDataQualityRules(jsonData: any) {
        let dqName = jsonData[0].DQName;
        let dqDesc = jsonData[0].DqDescription;
        let fieldInput = jsonData[0].FieldsInput;
        let ruleCat = jsonData[0].RuleCategoryInput;
        let rule_name = jsonData[0].Rule_Name;

        await globalAction.waitAndClick(this.getQualityTab());
        await playwrightWrapper.anonymousSleep(5000);
        await globalAction.waitAndClick(this.getQualityTabAddButton());
        await globalAction.fillInput(this.getDqRulesPopupInputName(), dqName);
        await globalAction.fillInput(this.getDqRulesPopupInputDescription(), dqDesc);

        await globalAction.click(this.getDqRulesPopupColumn());
        await globalAction.waitAndClick(this.Selectcolumn());
       // await globalAction.fillInput(this.getFieldsInput(), "itemid");//job fail

        await globalAction.fillInput(this.getFieldsInput(), fieldInput); //job success
        await globalAction.pressKey(this.getFieldsInput(), 'ArrowDown');
        await globalAction.pressKey(this.getFieldsInput(), 'Enter');


        await globalAction.fillInput(this.getRuleCategoryInput(), ruleCat);
        await globalAction.pressKey(this.getRuleCategoryInput(), 'ArrowDown');
        await globalAction.pressKey(this.getRuleCategoryInput(), 'Enter');

        await globalAction.fillInput(this.getRuleNameInput(), rule_name);
        await globalAction.pressKey(this.getRuleNameInput(), 'ArrowDown');
        await globalAction.pressKey(this.getRuleNameInput(), 'Enter');


        await globalAction.waitAndClick(this.getApplyButton());

        await playwrightWrapper.loadingWebPage();
        await globalAction.waitAndClick(this.getSaveButton());
        await globalAction.waitForElementHidden(this.getSaveSuccessMessage());
        await playwrightWrapper.loadingWebPage();
        await globalAction.click(this.getRunButton());
        await playwrightWrapper.anonymousSleep(5000);
        await playwrightWrapper.loadingWebPage();

        await globalAction.click(this.getRunButton());
        await playwrightWrapper.anonymousSleep(5000);
        await playwrightWrapper.loadingWebPage();

        let succesMessage = await globalAction.getTextContent(this.getRunStatusMessage(dqName));
        console.log(`The status of the job is :`, succesMessage);
        fixture.logger.info(`The status of the job is :${succesMessage}` );

    }

async addNotesToTheDataModel(jsonData: any){
    await globalAction.waitAndClick(this.getNotesTab());
    await globalAction.waitAndClick(this.getPencilEditButton());
    await globalAction.clearInput(this.getTextAreaInput_CSS());
    await globalAction.typeWithDelay(this.getTextAreaInput_CSS(),"Automation testing is done for notes scenarios ",100);
    await globalAction.click(this.getPencilSaveButton());
    await playwrightWrapper.loadingWebPage();




}

getNotesTab():string{
    return `//button[text()="Notes"]`;
}
getPencilEditButton():string{
    return `//label[text()="Notes:"]/parent::div/button`;
}

getTextAreaInput():string{
    return `//label[text()="Notes"]/parent::div//textarea[contains(@style,"height: 300px")]`;
}
getTextAreaInput_CSS():string{
    return `label:text("Notes") + div textarea[style*="height: 300px"]`;
}

getPencilSaveButton():string{
    return `//button[@iconcolor="save"]`;
}

}