import { fixture } from "@hooks/pageFixture";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import GlobalActions from "@helper/wrapper/GlobalActions";
import { TIMEOUT } from "playwright.config";


let playwrightWrapper = new PlaywrightWrapper();
let globalAction = new GlobalActions();

export default class xgenGovernPage {


    getTagSpan(tag: string): string {
        return `//span[text()='${tag}']`;
    }
    getTheSettings() {
        return `//span[text()="Settings"]/parent::div`;
    }
    getTheGovern() {
        return `//span[text()="Govern"]/parent::div`;
    }
    getTheAdminsetting() {
        return `//h6[text()="Admin Settings"]/parent::div`;
    }
    getTheDatacategory() {
        return `//span[text()="Data Categories"]/parent::div`;
    }
    InputTheTag() {
        return `//input[@placeholder="Enter new tag and press enter..."]`;
    }
    getSaveButton() {
        return `(//p[text()="Save"]/parent::button)[1]`;
    }
    classTheTag() {
        return `//input[@placeholder="Enter new classification and press enter..."]`;
    }
    DomainTheTag() {
        return `//input[@placeholder="Enter new domain and press enter..."]`;
    }
    getSaveButtonclass() {
        return `//p[text()="Save" and @class="MuiTypography-root MuiTypography-body2 css-97mu24"]/parent::button`;
    }
    getSaveButtonDomain() {
        return `(//p[text()="Save"]/parent::button)[3]`;
    }
    CloseTheWindow() {
        return `//p[text()="Close"]`;
    }
    SelectGovern() {
        return `//span[text()="Govern"]/parent::div`;
    }

    SelectDataModel() {
        return `//div[text()="Data Models"]/parent::div`;
    }
    SelectTableData() {
        return `//div[text()="Data Models"]/ancestor::li//h6[text()="XDL_CUSTOMER"]`;
    }
    AddPlusIcon() {
        return `(//button[contains(@class,"css-11y17mr")])[1]`;
    }
    AddPlusIcon2() {
        return `(//button[contains(@class,"css-11y17mr")])[2]`;
    }
    AddPlusIcon3() {
        return `(//button[contains(@class,"css-11y17mr")])[3]`;
    }
    AddPlusIcon4() {
        return `(//button[contains(@class,"css-11y17mr")])[4]`;
    }
    PreviewTableData() {
        return `//button[text()="Preview"]`;
    }
    QualityTab() {
        return `//button[text()="Quality"]`;
    }
    DqName() {
        return `//input[contains(@class, 'MuiInputBase-input') and contains(@class, 'MuiOutlinedInput-input')]`;
    }
    Dqdesc() {
        return `//input[@id=':r22:' and @type='text' and @class='MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-wabas2' and @aria-invalid='false']`;
    }
    AddIcon() {
        return `//p[text()="Add"]`;
    }
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
    Apply() {
        return ` //button[ @iconcolor="confirm"]`;
    }
    close() {
        return `//button[ @iconcolor="confirm"]/following-sibling::button//p[text()="Close"]`;
    }
    save() {
        return `//p[text()='Save']`;
    }




    async navigateToSettingsPage(jsonData: any) {
        let settag = jsonData[0].SetupTags
        let tagclassification = jsonData[0].SetupClassifications
        let tagdomain = jsonData[0].SetupDomains


        await globalAction.waitAndClick(this.getTheSettings());
        await globalAction.waitAndClick(this.getTheAdminsetting());
        await globalAction.waitAndClick(this.getTheDatacategory());
        await fixture.page.locator(this.InputTheTag()).fill(settag);
        await fixture.page.locator(this.InputTheTag()).press("Enter")
        // Click on the "Save tag" button
        await fixture.page.locator(this.getSaveButton()).click();
        fixture.logger.info("Clicked on 'Save tag' button.");
        await playwrightWrapper.loadingWebPage();
        await fixture.page.locator(this.classTheTag()).fill(tagclassification);
        await fixture.page.locator(this.classTheTag()).press("Enter")
        // Click on the "Save tag" button
        await fixture.page.locator(this.getSaveButtonclass()).click();
        fixture.logger.info("Clicked on 'Save tag' button.");
        await playwrightWrapper.loadingWebPage();
        await fixture.page.locator(this.DomainTheTag()).fill(tagdomain);
        await fixture.page.locator(this.DomainTheTag()).press("Enter")
        // Click on the "Save tag" button
        await fixture.page.locator(this.getSaveButtonDomain()).click();
        fixture.logger.info("Clicked on 'Save tag' button.");
        await playwrightWrapper.loadingWebPage();

        await fixture.page.locator(this.CloseTheWindow()).click();

    }


    async navigateToGovernePage(jsonData: any) {

        let settag = jsonData[0].SetupTags
        let tagclassification = jsonData[0].SetupClassifications
        let tagdomain = jsonData[0].SetupDomains
        let dqname = jsonData[0].DQName
        let dqdescription = jsonData[0].DqDescription

        await globalAction.waitAndClick(this.SelectGovern());
        await globalAction.waitAndClick(this.SelectDataModel());
        await globalAction.waitAndClick(this.SelectTableData());
        await globalAction.waitAndClick(this.AddPlusIcon());
        //need to call the function from here i tried to call from here but not got expected result
        await fixture.page.locator(this.getTagSpan(settag)).click();
        await globalAction.waitAndClick(this.AddPlusIcon2());
        await fixture.page.locator(this.getTagSpan(tagclassification)).click();
        await globalAction.waitAndClick(this.AddPlusIcon3());
        await fixture.page.locator(this.getTagSpan(tagdomain)).click();
        await globalAction.waitAndClick(this.AddPlusIcon4());
        await fixture.page.locator(this.getTagSpan('RoopaDevi Mirapa')).click();
        await globalAction.waitAndClick(this.PreviewTableData());
        await globalAction.waitAndClick(this.QualityTab());
        fixture.logger.info("Clicked on quality tab");
        await globalAction.waitAndClick(this.AddIcon());
        await fixture.page.locator(this.DqName()).fill(dqname);
        await fixture.page.locator(this.Dqdesc()).fill(dqdescription);
        await globalAction.waitAndClick(this.Selectcolumn());
        await globalAction.waitAndClick(this.SelectField());
        await globalAction.waitAndClick(this.SelectRuleCategory());
        await globalAction.waitAndClick(this.RuleName());
        await globalAction.waitAndClick(this.Apply());
        await globalAction.waitAndClick(this.close());
        await globalAction.waitAndClick(this.save());
        await playwrightWrapper.loadingWebPage();

        await playwrightWrapper.loadingWebPage();
    }



}