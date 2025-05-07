import { fixture } from "@hooks/pageFixture";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import GlobalActions from "@helper/wrapper/GlobalActions";
import { TIMEOUT } from "playwright.config";


let playwrightWrapper = new PlaywrightWrapper();
let globalAction = new GlobalActions();

export default class xgenGovernPage {

    getTheSettings() {
        return `//span[text()='Settings']`;
    }
    
    getTheUsersetting() {
        return `//h6[text()="Users"]/parent::div`;
    }
    getTheRolesetting() {
        return `//h6[text()="Roles" and contains(@class, "MuiTypography-h6")]`;
    }

    createButton() {
        return `//p[text()="Create" and contains(@class, "MuiTypography-body2")]`;
    }
    popUpcreateButton() {
        return `//h2/parent::div//p[text()="Create"]/parent::button`;
    }
    createButtonRole() {
        return `//p[text()="Create" and contains(@class, "MuiTypography-body2")]`;
    }
    calenderIcon() {
        return `//*[@data-testid='CalendarIcon']`;
    }
    firstname() {
        return `//input[contains(@class, 'MuiInputBase-input') and @name='first_name']`;
    }
    lastname() {
        return `//input[contains(@class, 'MuiInputBase-input') and @name='last_name']`;
    }
    email() {
        return `//input[contains(@class, 'MuiInputBase-input') and @name='email']`;
    }
    password() {
        return `//input[contains(@class, 'MuiInputBase-input') and @name='password']`;
    }
    PlusSubscription() {
        return `//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-11y17mr']`;
    }
    SubDropdown() {
        return `//legend[span[text()='Subscription']]/ancestor::div[contains(@class, 'MuiInputBase-root')]//div[@role='combobox']`;
    }
    RoleDropdown() {
        return `//div[@role="combobox" and contains(@class, "MuiSelect-select") and contains(@class, "MuiOutlinedInput-input")]`;
    }
    closeButton() {
        return `//button[.//p[text()='Close']]`;
    }
    RadioButton() {
        return `//span[text()="Subscription"]/ancestor::label//input`;
    }
    Rolename() {
        return `//label[text()="Role Name" and contains(@class, "MuiInputLabel-root")]`;
    }
    RoleDesc() {
        return `//label[text()="Role Description" and contains(@class, "MuiInputLabel-root")]`;
    }
    CreateRole() {
        return `//span[@aria-label="Create Role"]/button`;
    }
    ClosebuttonRole() {
        return `//button[.//p[text()="Close"]]`;
    }
    getRoleStatusMessage(dqName: string): string {
        return `//p[contains(text(), "Role ${dqName} created successfully.")]`;
    }
    getUserStatusMessage(dqName:string): string {
        return `//div[@data-id="${dqName}"]//div[9]/span/div/span[contains(@class,"MuiChip-labelSmall ")]`;
    }


    async getInputByNameAndDivIndex(name: string, divIndex: number): Promise<string> {
        const xpath = `//p[text()="${name}"]/ancestor::div[contains(@class,"MuiBox-root css-1edhmvt")]//div[${divIndex}]//input`;
        console.log(`=========${xpath}=======`);
        return xpath;
    }
    async fillInputBySection(name: string, divIndex: number) {
        const inputXPath = await this.getInputByNameAndDivIndex(name, divIndex);
        await globalAction.waitAndClick(inputXPath);
    }



    async clickOnUserSettings() {
        await globalAction.waitAndClick(this.getTheSettings());
        await globalAction.waitAndClick(this.getTheUsersetting());
    }
    async clickOnRolesSettings() {
        await globalAction.waitAndClick(this.getTheSettings());
        await globalAction.waitAndClick(this.getTheRolesetting());
    }
    async createUserinSubscription(jsonData: any) {
        let firstName = jsonData[0].firstName;
        let lastName = jsonData[0].lastName;
        let email = jsonData[0].email;
        let password = jsonData[0].password;
        let subfieldInput = jsonData[0].subscriptionDropdown;
        let roleInput= jsonData[0].roleName;
        
        await globalAction.waitAndClick(this.createButton());
        await globalAction.fillInput(this.firstname(), firstName);
        await globalAction.fillInput(this.lastname(), lastName);
        await globalAction.fillInput(this.email(), email);
        await globalAction.fillInput(this.password(), password);

        await globalAction.waitAndClick(this.PlusSubscription());

        const subscriptionDropdown = this.SubDropdown();

        // Wait and click the dropdown
        await fixture.page.waitForSelector(subscriptionDropdown, { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for 'Source' dropdown to be visible...");
        await fixture.page.locator(subscriptionDropdown).click();
        fixture.logger.info("Clicked on 'Source' dropdown.");

        // Wait for the dropdown list (popper) to appear
        await fixture.page.waitForSelector('ul[role="listbox"]', { state: "visible", timeout: TIMEOUT });

        // Select the correct item
        const dropdownOption = `//li[@role="option" and @data-value="${subfieldInput}"]`;
        await fixture.page.waitForSelector(`xpath=${dropdownOption}`, { state: "visible", timeout: TIMEOUT });
        await fixture.page.locator(`xpath=${dropdownOption}`).click();
        fixture.logger.info(`Selected '${subfieldInput}'`);


        const RoleDropdown = this.RoleDropdown();

        // Wait and click the dropdown
        await fixture.page.waitForSelector(RoleDropdown, { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for 'Role' dropdown to be visible...");
        await fixture.page.locator(RoleDropdown).click();
        fixture.logger.info("Clicked on 'Role' dropdown.");
        // Select the correct item
        // //p[text()="AUTO_ROLE"]
        const roledropdownOption = `//p[text()="${roleInput}"]`;
        await fixture.page.locator(`xpath=${roledropdownOption}`).click();
        fixture.logger.info(`Selected '${roleInput}'`);
        // Final actions
        await globalAction.waitAndClick(this.popUpcreateButton());
        
        await playwrightWrapper.loadingWebPage();
        await globalAction.waitForElementHidden(`//*[contains(text(),'created successfully')]`);
        await playwrightWrapper.loadingWebPage();

    }


    async createRoleinSubscription(jsonData: any) {
        let RoleName = jsonData[0].roleName;
        let RoleDesc = jsonData[0].roleDesc;
        
        await globalAction.waitAndClick(this.createButtonRole());
        await globalAction.fillInput(this.Rolename(), RoleName);
        await globalAction.fillInput(this.RoleDesc(), RoleDesc);

        await globalAction.waitAndClick(this.RadioButton());
        await this.fillInputBySection("HOME", 2);
        await this.fillInputBySection("GLOSSARY", 2);
        await this.fillInputBySection("SPACE", 2);
        await this.fillInputBySection("DESTINATION", 2);
        await this.fillInputBySection("EXPORT", 3);
        await this.fillInputBySection("IMPORT", 3);
        await this.fillInputBySection("BPACK", 3);
        await this.fillInputBySection("SYSTEM", 2);
        await this.fillInputBySection("USER", 2);
        await this.fillInputBySection("ROLE", 2);
        await globalAction.waitAndClick(this.CreateRole())
        await playwrightWrapper.loadingWebPage();
        await globalAction.waitForElementHidden(`//*[contains(text(),'created successfully')]`);
        await playwrightWrapper.loadingWebPage();

    }

    async verifyRolesAndUsers() {
        await playwrightWrapper.loadingWebPage();
        await globalAction.waitAndClick(`//span[text()="Settings"]`);
        await globalAction.waitAndClick(`//h6[text()="Roles"]`);
        await playwrightWrapper.loadingWebPage();
        await playwrightWrapper.anonymousSleep(5000);
    
    
    }
    async cleanUpTheRoles(RolesName: string) {
            // Verify the Roles name in the  tab list and return the row number, if not found then it is zero
                let presentOrNotRow =
                await playwrightWrapper.getTheRowNumberFromRolesPage(RolesName);
            console.log("Present or not, if present the row number is ==========", presentOrNotRow);
            if (presentOrNotRow !== 0) {
                console.log("Deleting the Roles as per the request.");
                await playwrightWrapper.deleteTheRolesItemFromRolesPage(presentOrNotRow);
            }else{
                console.log("The Roles is not present to delete.");
            }
    
            await playwrightWrapper.anonymousSleep(5000);
        }
    

        async cleanUpTheUser(UserFirstLastName: string) {
            await playwrightWrapper.anonymousSleep(5000);
            // Verify the User name in the  tab list and return the row number, if not found then it is zero
                let presentOrNotRow =
                await playwrightWrapper.getTheRowNumberFromUserPage(UserFirstLastName);
            console.log("Present or not, if present the row number is ==========", presentOrNotRow);
            if (presentOrNotRow !== 0) {
                console.log("Deleting the User as per the request.");
                await playwrightWrapper.deleteTheUserItemFromUserPage(presentOrNotRow);
            }else{
                console.log("The User is not present to delete.");
            }
    
            await playwrightWrapper.anonymousSleep(5000);
        }
    

}