import { expect } from "@playwright/test";
import { fixture } from "@hooks/pageFixture";
import { TIMEOUT } from "playwright.config";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import GlobalActions from "@helper/wrapper/GlobalActions";


let globalAction = new GlobalActions();

let playwrightWrapper = new PlaywrightWrapper();

export default class SamplePageOne {



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

    getOwnerPlusIconButton(): string {
        return `//label[text()="Owner:"]/parent::div/button`;
    }

    getSelectTheOwnerFromThePopup(choice: string): string {
        return `//div[contains(@class,"css-19midj6")]/div//span[text()="${choice}"]`;

    }

    //locator-----end//

    async navigateToGovernPage() {
        await globalAction.waitAndClick(`//span[text()="Govern"]`);
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


    async addTagIfNotPresent(TagName: string) {
        let parentLocator = `//div[contains(@class,"css-pao3g5")]/div`;
        let partLocator = `//span`;
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

    async addClassificationIfNotPresent(expectedClassification: string) {
        let theclassificationTextfromUI = await globalAction.getTextContent(this.getTheClassificationText());
        if (theclassificationTextfromUI.includes(expectedClassification)) {
            console.log("Classification already exists, no need to create it again");
            fixture.logger.info(`Classification already exists, no need to create it again`);
        } else {
            console.log("Creating the Classification");
            fixture.logger.info(`Creating the Classification`);
            await globalAction.click(this.getClassificationPlusIconButton());
            await globalAction.click(this.getSelectClassificationFromThePopup(expectedClassification));
            await playwrightWrapper.loadingWebPage();
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
            await globalAction.waitAndClick(this.getDomainPlusIconButton());
            await globalAction.waitAndClick(this.getSelectTheDomainFromThePopup(expectedDomaintag));
            await playwrightWrapper.loadingWebPage();
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
            await globalAction.waitAndClick(this.getOwnerPlusIconButton());
            await globalAction.waitAndClick(this.getSelectTheOwnerFromThePopup(expectedOwnertag));
            await playwrightWrapper.loadingWebPage();
        }
    }


}