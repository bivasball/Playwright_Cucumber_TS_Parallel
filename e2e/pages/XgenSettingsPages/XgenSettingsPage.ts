import { fixture } from "@hooks/pageFixture";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import GlobalActions from "@helper/wrapper/GlobalActions";
import { TIMEOUT } from "playwright.config";


let playwrightWrapper = new PlaywrightWrapper();
let globalAction = new GlobalActions();

export default class xgenSettingsPage {


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


    async creattagIfNotPresent(jsonData: any) {

        let settag = jsonData[0].SetupTags
        console.log(`Checking if tag is present: ${settag}`);
        fixture.logger.info(`Checking if space is present: ${settag}`);


        // Check if the space Description is present
        const istagPresent = await this.getTheRowNumberForTagsFromGoveranceDataModel(settag);
        console.log("istagPresent", istagPresent);

        if (!istagPresent) {
            console.log("Creating tag as it is not present");
            fixture.logger.info(`Creating space as it is not present`);
            await this.creatTag(settag);
        } else {
            console.log("tag already exists, no need to create it again");
            fixture.logger.info(`tag already exists, no need to create it again`);
        }


    }

    async getTheRowNumberForTagsFromGoveranceDataModel(spaceName: string): Promise<boolean> {

        let flag = 0;
        await playwrightWrapper.loadingWebPage();

        // Get the number of rows displayed
        await fixture.page.waitForSelector(
            `//div[contains(@class,"css-pao3g5")]/div`,
            { state: "visible", timeout: TIMEOUT }
        );
        const rows = fixture.page.locator(
            `//div[contains(@class,"css-pao3g5")]/div`);
        const numberOfRowsDisplayed = await rows.count();
        console.log("number of spaces :-", numberOfRowsDisplayed);
        // Iterate through each row to find the  name
        for (let row = 1; row <= numberOfRowsDisplayed; row++) {
            await playwrightWrapper.loadingWebPage();
            let tagnameElement = `//div[contains(@class,"css-pao3g5")]/div[${rows}]//span`;;

            // Wait for the element to be available
            await fixture.page.waitForSelector(tagnameElement, {
                state: "visible",
                timeout: TIMEOUT,
            });
            const tagnameFromUI = await fixture.page
                .locator(tagnameElement)
                .textContent();
            console.log("Model name from ui :-", tagnameFromUI);
            //fixture.logger.info("Model name from ui :-", modelnameFromUI);
            let expectedtagname = spaceName;
            //console.log("Expected Model name from jsondata :-", expectedmodelname);
            //fixture.logger.info("Expected Model name from jsondata :-", expectedmodelname);
            if (tagnameFromUI?.trim() === expectedtagname) {
                console.log("This is expect Space is present or true");
                fixture.logger.info(`The required item is present in the row number: ${row}`);
                flag = row;
                break;
            } else {
                flag = 0
            }
        }

        return true;



    }

    //if not present the create space.
    async creatTag(tagname: string) {
        console.log(`Creating tag with name: ${tagname}`);

        await globalAction.waitAndClick(`//p[text()='Space']/parent::button`);
        await playwrightWrapper.loadingWebPage();
        //wait for the create space page to load
        await globalAction.typeWithDelay(`//input[@id="spacename" and @name="pacename"]`, tagname, 100);
        await playwrightWrapper.loadingWebPage();

    }





    async clickOnSettings() {
        await globalAction.waitAndClick(this.getTheSettings());
    }

    async clickOnAdminSettings() {
        await globalAction.waitAndClick(this.getTheAdminsetting());
    }
    async clickOnDataCategory() {
        await globalAction.waitAndClick(this.getTheDatacategory());
    }


    //---------------------------------vas---------------//
    async Setup_Tags_deleteTagIfPresent(TagName: string) {
        let parentLocator = `//p[text()="Setup Tags"]/ancestor::div[contains(@class,"css-ccfhxi")]//div[@class="MuiBox-root css-0"]/div`;
        let partLocator = `//p`;
        let ifTagIfPresentTheRowNum = await playwrightWrapper.getTheRowNumberIfTheRequireTextIsPresent(parentLocator, partLocator, TagName);
        console.log(`====================`, ifTagIfPresentTheRowNum);
        if (!ifTagIfPresentTheRowNum) {
            console.log("tag not present , nothing to delete");
            fixture.logger.info(`tag not present , nothing to delete`);
        } else {
            console.log("Tag is displayed, Need to Delete the tag");
            fixture.logger.info(`Tag is displayed, Need to Delete the tag`);
            await globalAction.click(this.get_SetupTags_DeleteTheTagButton(ifTagIfPresentTheRowNum));
            await globalAction.click(this.get_SetupTags_Save_Button());
            console.log("Tag is deleted successfully");
            fixture.logger.info(`Tag is deleted successfully`);
        }


    }

    get_SetupTags_DeleteTheTagButton(rownnumber: number): string {
        return `//p[text()="Setup Tags"]/ancestor::div[contains(@class,"css-ccfhxi")]//div[@class="MuiBox-root css-0"]/div[${rownnumber}]//button`;
    }

    get_SetupTags_Save_Button(): string {
        return `//p[text()="Setup Tags"]/ancestor::div[contains(@class,"css-ccfhxi")]//button[@iconcolor="save"]`;
    }

    async Setup_Tags_addTagIfNotPresent(TagName: string) {
        let parentLocator = `//p[text()="Setup Tags"]/ancestor::div[contains(@class,"css-ccfhxi")]//div[@class="MuiBox-root css-0"]/div`;
        let partLocator = `//p`;
        let ifTagIfPresentTheRowNum = await playwrightWrapper.getTheRowNumberIfTheRequireTextIsPresent(parentLocator, partLocator, TagName);
        console.log(`====================`, ifTagIfPresentTheRowNum);
        if (!ifTagIfPresentTheRowNum) {
            console.log("Creating Tag as it is not present");
            fixture.logger.info(`Creating Tag as it is not present`);
            await fixture.page.locator(this.InputTheTag()).fill(TagName);
            await fixture.page.locator(this.InputTheTag()).press("Enter")
            await globalAction.click(this.get_SetupTags_Save_Button());
        } else {
            console.log("Tag already exists, no need to create it again");
            fixture.logger.info(`Tag already exists, no need to create it again`);
        }
    }

    async Setup_Classifications_deleteTagIfPresent(TagName: string) {
        let parentLocator = `//p[text()="Setup Classifications"]/ancestor::div[contains(@class,"css-ccfhxi")]//div[@class="MuiBox-root css-0"]/div`;
        let partLocator = `//p`;
        let ifTagIfPresentTheRowNum = await playwrightWrapper.getTheRowNumberIfTheRequireTextIsPresent(parentLocator, partLocator, TagName);
        console.log(`====================`, ifTagIfPresentTheRowNum);
        if (!ifTagIfPresentTheRowNum) {
            console.log("In Setup Classifications, tag not present , nothing to delete");
            fixture.logger.info(`In Setup Classifications, tag not present , nothing to delete`);
        } else {
            console.log("In Setup Classifications, Tag is displayed, Need to Delete the tag");
            fixture.logger.info(`In Setup Classifications, Tag is displayed, Need to Delete the tag`);
            await globalAction.click(this.get_Setup_Classifications_DeleteTheTagButton(ifTagIfPresentTheRowNum));
            await globalAction.click(this.get_Setup_Classifications_Save_Button());
            console.log("In Setup Classifications, Tag is deleted successfully");
            fixture.logger.info(`In Setup Classifications, Tag is deleted successfully`);
        }


    }

    get_Setup_Classifications_DeleteTheTagButton(rownnumber: number): string {
        return `//p[text()="Setup Classifications"]/ancestor::div[contains(@class,"css-ccfhxi")]//div[@class="MuiBox-root css-0"]/div[${rownnumber}]//button`;
    }

    get_Setup_Classifications_Save_Button(): string {
        return `//p[text()="Setup Classifications"]/ancestor::div[contains(@class,"css-ccfhxi")]//button[@iconcolor="save"]`;
    }

    async Setup_Classifications_addTagIfNotPresent(TagName: string) {
        let parentLocator = `//p[text()="Setup Classifications"]/ancestor::div[contains(@class,"css-ccfhxi")]//div[@class="MuiBox-root css-0"]/div`;
        let partLocator = `//p`;
        let ifTagIfPresentTheRowNum = await playwrightWrapper.getTheRowNumberIfTheRequireTextIsPresent(parentLocator, partLocator, TagName);
        console.log(`====================`, ifTagIfPresentTheRowNum);
        if (!ifTagIfPresentTheRowNum) {
            console.log("Setup_Classifications, Creating Tag as it is not present");
            fixture.logger.info(`Setup_Classifications, Creating Tag as it is not present`);
            await fixture.page.locator(this.get_Setup_Classifications_input()).fill(TagName);
            await fixture.page.locator(this.get_Setup_Classifications_input()).press("Enter")
            await globalAction.click(this.get_Setup_Classifications_Save_Button());
        } else {
            console.log("Setup_Classifications, Tag already exists, no need to create it again");
            fixture.logger.info(`Setup_Classifications, Tag already exists, no need to create it again`);
        }
    }

    get_Setup_Classifications_input(): string {
        return `//p[text()="Setup Classifications"]/ancestor::div[contains(@class,"css-ccfhxi")]//input`;
    }

    async Setup_Domains_deleteTagIfPresent(TagName: string) {
        let parentLocator = `//p[text()="Setup Domains"]/ancestor::div[contains(@class,"css-ccfhxi")]//div[@class="MuiBox-root css-0"]/div`;
        let partLocator = `//p`;
        let ifTagIfPresentTheRowNum = await playwrightWrapper.getTheRowNumberIfTheRequireTextIsPresent(parentLocator, partLocator, TagName);
        console.log(`====================`, ifTagIfPresentTheRowNum);
        if (!ifTagIfPresentTheRowNum) {
            console.log("In Setup Domains, tag not present , nothing to delete");
            fixture.logger.info(`In Setup Domains, tag not present , nothing to delete`);
        } else {
            console.log("In Setup Domains, Tag is displayed, Need to Delete the tag");
            fixture.logger.info(`In Setup Domains, Tag is displayed, Need to Delete the tag`);
            await globalAction.click(this.get_Setup_Domains_DeleteTheTagButton(ifTagIfPresentTheRowNum));
            await globalAction.click(this.get_Setup_Domains_Save_Button());
            console.log("In Setup Domains, Tag is deleted successfully");
            fixture.logger.info(`In Setup Domains, Tag is deleted successfully`);
        }


    }
    get_Setup_Domains_DeleteTheTagButton(rownnumber: number): string {
        return `//p[text()="Setup Domains"]/ancestor::div[contains(@class,"css-ccfhxi")]//div[@class="MuiBox-root css-0"]/div[${rownnumber}]//button`;
    }

    get_Setup_Domains_Save_Button(): string {
        return `//p[text()="Setup Domains"]/ancestor::div[contains(@class,"css-ccfhxi")]//button[@iconcolor="save"]`;
    }


    async Setup_Domains_addTagIfNotPresent(TagName: string) {
        let parentLocator = `//p[text()="Setup Domains"]/ancestor::div[contains(@class,"css-ccfhxi")]//div[@class="MuiBox-root css-0"]/div`;
        let partLocator = `//p`;
        let ifTagIfPresentTheRowNum = await playwrightWrapper.getTheRowNumberIfTheRequireTextIsPresent(parentLocator, partLocator, TagName);
        console.log(`====================`, ifTagIfPresentTheRowNum);
        if (!ifTagIfPresentTheRowNum) {
            console.log("Setup_Domains, Creating Tag as it is not present");
            fixture.logger.info(`Setup_Domains, Creating Tag as it is not present`);
            await fixture.page.locator(this.get_Setup_Domains_input()).fill(TagName);
            await fixture.page.locator(this.get_Setup_Domains_input()).press("Enter")
            await globalAction.click(this.get_Setup_Domains_Save_Button());
        } else {
            console.log("Setup_Domains, Tag already exists, no need to create it again");
            fixture.logger.info(`Setup_Domains, Tag already exists, no need to create it again`);
        }
    }
    get_Setup_Domains_input(): string {
        return `//p[text()="Setup Domains"]/ancestor::div[contains(@class,"css-ccfhxi")]//input`;
    }




    //---------------------------------vas end ---------------//


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