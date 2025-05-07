import { fixture } from "@hooks/pageFixture";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import GlobalActions from "@helper/wrapper/GlobalActions";
import { TIMEOUT } from "playwright.config";
import { expect } from "@playwright/test";

let playwrightWrapper = new PlaywrightWrapper();
let globalAction = new GlobalActions();

export default class xgenDataInputPage {

    getThetemplate(inputname: string): string {
        return `//span[text()='${inputname}']`;
    }

    AddIcon() {
        return `//p[text()='Add']`;
    }

    AddnameField() {
        return `//input[@id='templateName']`; // corrected to actual name field input
    }

    AdddescField() {
        return `//input[@id='templateDesc']`;
    }

    AddPlusField() {
        return `//button[.//p[text()='Add Field']]`; // fixed missing closing bracket
    }

    AddIdField1() {
        return `//div[@class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-1 css-154xrg6"]/div/div/div[1]//input`;
    }
    AddIdField2() {
        return `//div[@class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-1 css-154xrg6"]/div/div/div[7]//input`;
    }

    DatatypeField() {
        return `//div[@role='combobox' and text()='integer']`;
    }

    MandateField() {
        return `(//input[@type='checkbox' and contains(@class, 'PrivateSwitchBase-input')])[2]`;
    }

    AllowedValues() {
        return `//input[@name='allowedValues']`; // more specific and resilient
    }
    Createbutton() {
        return `//p[contains(@class, 'MuiTypography-root') and normalize-space(text())='Create']`;
    }


    SaveButton() {
        return `//li[contains(@class, 'MuiMenuItem-root') and .//text()[normalize-space()='Save']]`;
    }

    CloseButton() {
        return `//p[text()='Close']`;
    }
    AddInputTemplate(rowNum: number): string {
        return `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${rowNum}]//a[@iconcolor="create"]`;
    }
    AddPlusIconRecord() {
        return `//p[contains(@class, 'MuiTypography-body2') and normalize-space(text())='Add Record']`;
    }
    AddRecord1() {
        return `//div[@aria-expanded='false' and @role='combobox']`;
    }
    AddRecord2() {
        return `//div[@aria-expanded='false' and @role='combobox']`;
    }
    Saverecord() {
        return `//button[contains(@class, 'MuiIconButton-root') and @aria-label='Save']`;
    }
    CommitRecord() {
        return `//button[.//p[normalize-space(text())='Commit']]`;
    }
    CloseTemplate() {
        return `//p[text()='Close']`;
    }



    async navigateToDataInputPage() {
        await globalAction.waitAndClick(this.getThetemplate('Input'));
        await playwrightWrapper.loadingWebPage();

    }

    async cleanUpTheInputData(jsondata: any) {
        // Verify the Input name in the  tab list and return the row number, if not found then it is zero
        let inputname = jsondata[0].datainputName;
        console.log("Input name from the json is ==========", inputname);
        let presentOrNotRow =
            await playwrightWrapper.getTheRowNumberFromInputPage(inputname);
        console.log("Input item::Present or not, if present the row number is ==========", presentOrNotRow);

        if (presentOrNotRow !== 0) {
            console.log("Deleting the Input item as per the request.");
            await playwrightWrapper.deleteTheInputItemFromInputPage(presentOrNotRow);
        }
    }

    async addSelectNameandDescription(jsondata: any) {
        let inputdata = jsondata[0].datainputName;
        let inputdesc = jsondata[0].inputDescription;
        let fieldname1 = jsondata[0].fieldName;
        let fieldname2 = jsondata[0].fieldName2;
        let allowedvalues = jsondata[0].allowedValues;

        await globalAction.waitAndClick(this.AddIcon());
        // Fill name and description
        await globalAction.typeWithDelay(this.AddnameField(), inputdata);
        await globalAction.typeWithDelay(this.AdddescField(), inputdesc);
        // Add field
        await globalAction.waitAndClick(this.AddPlusField());

        // Fill field name
        await globalAction.clearInput(this.AddIdField1());
        await globalAction.typeWithDelay(this.AddIdField1(), fieldname1);

        // Optional: Set allowed values if required
        if (allowedvalues) {
            await globalAction.typeWithDelay(this.AllowedValues(), allowedvalues);
        }
        // Add field
        await globalAction.waitAndClick(this.AddPlusField());
        // Fill field name
        await globalAction.clearInput(this.AddIdField2());
        await globalAction.typeWithDelay(this.AddIdField2(), fieldname2);

        await globalAction.waitAndClick(this.MandateField());

        await globalAction.waitAndClick(this.Createbutton());

        await globalAction.waitAndClick(this.SaveButton());
        await globalAction.waitForElementHidden(`//p[contains(text(),'created successfully')]`);

        await globalAction.waitAndClick(this.CloseButton());
    }

    async clickOnAddInputDataPlusIcon(jsondata: any) {
        // Verify the Input name in the  tab list and return the row number, if not found then it is zero
        let inputname = jsondata[0].datainputName;
        console.log("Input name from the json is ==========", inputname);
        let presentOrNotRow =
            await playwrightWrapper.getTheRowNumberFromInputPage(inputname);
        console.log("Input item::Present or not, if present the row number is ==========", presentOrNotRow);

        if (presentOrNotRow !== 0) {
            console.log("Adding the Input records as per the request.");
            await globalAction.waitAndClick(this.AddInputTemplate(presentOrNotRow));
        }

    }

    async addRecordAndSave(rowNum:number,record:string) {

            await globalAction.waitAndClick(this.AddPlusIconRecord());
            await globalAction.waitAndClick(this.getTheFirstColumnbyRow(rowNum));
            await globalAction.waitAndClick(`//li[text()="${record}"]`);
            await globalAction.waitAndClick(this.getTheIndividualRowSavedRecord(rowNum));

    }
    async commitTheRecord() {
        await globalAction.waitAndClick(this.CommitRecord());
        await playwrightWrapper.loadingWebPage();
        // Verify success alert
        fixture.logger.info("Waiting for `Records Updated Successfully` to be visible.");
        await expect(
            fixture.page.locator(`//p[contains(text(),'Updated Successfully')]`)
        ).toContainText("Records Updated Successfully", { timeout: TIMEOUT });
        await globalAction.waitForElementHidden(`//p[contains(text(),'Updated Successfully')]`);
    }

    async closeTheDataInputPage() {
        await globalAction.waitAndClick(this.CloseTemplate());
        await playwrightWrapper.loadingWebPage();
        

    }

    getTheFirstColumnbyRow(rowNum: number): string {
        return `//div[@data-id="${rowNum}"]/div[2]`;
    }
    getTheIndividualRowSavedRecord(rowNum: number): string {
        return `//div[@data-id="${rowNum}"]/div[4]//button[@aria-label="Save"]`;
    }

}
