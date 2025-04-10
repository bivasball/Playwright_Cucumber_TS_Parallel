import { expect} from "@playwright/test";
import { fixture } from "@hooks/pageFixture";
import  {TIMEOUT}  from "playwright.config";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import GlobalActions from "@helper/wrapper/GlobalActions";


let globalaction = new GlobalActions();

let playwrightWrapper = new PlaywrightWrapper();
export default class xgenLoginPage {
    
    async navigateToLoginPage() {
        console.log(`BASEURL is : ${process.env.BASEURL}`);
        fixture.logger.info(`Navigating to login page with BASEURL: ${process.env.BASEURL}`);
        await fixture.page.goto(process.env.BASEURL);

        // Wait for the login page heading to be visible
        await fixture.page.waitForSelector('role=heading[name="Log into your xGEN account"]', {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Verifying login page heading is visible");
        await expect(fixture.page.getByRole('heading', { name: 'Log into your xGEN account' })).toBeVisible({timeout: TIMEOUT});

        // Wait for the heading text to be visible
        await fixture.page.waitForSelector('h5', { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Verifying login page contains the correct heading text");
        await expect(fixture.page.locator('h5')).toContainText('Log into your xGEN account',{timeout: TIMEOUT});

        // Wait for the login form to be visible
        await fixture.page.waitForSelector('form', { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Verifying login form contains the text 'Login'");
        await expect(fixture.page.locator('form')).toContainText('Login',{timeout: TIMEOUT});
    }

    async login(jsonData: any) {
        const username = jsonData[0].username;
        const password = jsonData[0].password;

        console.log(`Logging in with username: ${username}`);
        fixture.logger.info(`Filling in username: ${username}`);

        // Wait for the username textbox to be visible
        await fixture.page.waitForSelector('role=textbox[name="Username"]', { state: "visible", timeout: TIMEOUT });
        await fixture.page.getByRole('textbox', { name: 'Username' }).fill(username);

        fixture.logger.info("Filling in password");

        // Wait for the password textbox to be visible
        await fixture.page.waitForSelector('role=textbox[name="Password"]', { state: "visible", timeout: TIMEOUT });
        await fixture.page.getByRole('textbox', { name: 'Password' }).fill(password);

        fixture.logger.info("Clicking on the login button");

        // Wait for the login button to be visible
        await fixture.page.waitForSelector('role=button[name="Login"]', { state: "visible", timeout: TIMEOUT });
        await fixture.page.getByRole('button', { name: 'Login' }).click();
        await playwrightWrapper.loadingWebPage();
        fixture.logger.info("Waiting for the login process to complete");
    }

    async verifyLoginMessage(jsonData: any) {
        const message = jsonData[0].message;

        console.log(`Verifying login message: ${message}`);
        fixture.logger.info(`Verifying login message: ${message}`);

        // Wait for the login message to be visible
        await fixture.page.waitForSelector(`text=${message}`, { state: "visible", timeout: TIMEOUT });
        await expect(fixture.page.getByText(message)).toBeVisible({timeout: TIMEOUT});

        fixture.logger.info("Verifying login message is contained in the paragraph");

        // Wait for the paragraph containing the message to be visible
        await fixture.page.waitForSelector('role=paragraph', { state: "visible", timeout: TIMEOUT });
        await expect(fixture.page.getByRole('paragraph')).toContainText(message,{timeout: TIMEOUT});
    }

    async selectSubscription(jsonData: any) {
        const subscription = jsonData[0].subscription;

        console.log(`Selecting subscription: ${subscription}`);
        fixture.logger.info(`Clicking on the subscription dropdown`);

        // Wait for the subscription dropdown to be visible
        await fixture.page.waitForSelector('label', { state: "visible", timeout: TIMEOUT });
        await fixture.page.getByLabel('', { exact: true }).click();

        fixture.logger.info(`Verifying subscription option '${subscription}' is visible`);

        // Wait for the subscription option to be visible
        await fixture.page.waitForSelector(`role=option[name="${subscription}"]`, { state: "visible", timeout: TIMEOUT });
        await expect(fixture.page.getByRole('option', { name: subscription })).toBeVisible({timeout: TIMEOUT});

        fixture.logger.info(`Selecting subscription option: ${subscription}`);
        await fixture.page.getByRole('option', { name: subscription }).click();

        await playwrightWrapper.loadingWebPage();
        fixture.logger.info("Waiting for the subscription selection process to complete");
    }

    async verifyButtonVisible(buttonName: string) {
        console.log(`Verifying button is visible: ${buttonName}`);
        fixture.logger.info(`Verifying button '${buttonName}' is visible`);

        // Wait for the button to be visible
        await fixture.page.waitForSelector(`role=button[name="${buttonName}"]`, { state: "visible", timeout: TIMEOUT });
        await expect(fixture.page.getByRole('button', { name: buttonName })).toBeVisible({timeout: TIMEOUT});
    }

    async clickButton(buttonName: string) {
        console.log(`Clicking on button: ${buttonName}`);
        fixture.logger.info(`Clicking on button: ${buttonName}`);

        // Wait for the button to be visible
        await fixture.page.waitForSelector(`role=button[name="${buttonName}"]`, { state: "visible", timeout: TIMEOUT });
        await fixture.page.getByRole('button', { name: buttonName }).click();
        await playwrightWrapper.loadingWebPage();
        fixture.logger.info("Waiting for the button click process to complete");
    }

    async verifyPageHeading(pageName: string) {
        console.log(`Verifying page heading: ${pageName}`);
        fixture.logger.info(`Verifying page heading: ${pageName}`);

        // Wait for the page heading to be visible
        await fixture.page.waitForSelector(`//p[text()='${pageName}']`, { state: "visible", timeout: TIMEOUT });
        await expect(fixture.page.locator(`//p[text()='${pageName}']`)).toBeVisible({timeout: TIMEOUT});
    }

    async selectRadioOption(radioOption: string) {
        console.log(`Selecting radio option: ${radioOption}`);
        fixture.logger.info(`Selecting radio option: ${radioOption}`);

        // Wait for the radio option to be visible
        await fixture.page.waitForSelector(`//*[text()='${radioOption}']/parent::div//input[@type='radio']`, {
            state: "visible",
            timeout: TIMEOUT,
        });
        await fixture.page.locator(`//*[text()='${radioOption}']/parent::div//input[@type='radio']`).check();


    }

    async verifyWelcomeMessage(jsonData: any) {
        const welcomeMessage = jsonData[0].welcomeMessage;

        console.log(`Verifying welcome message: ${welcomeMessage}`);
        fixture.logger.info(`Verifying welcome message: ${welcomeMessage}`);

        // Wait for the welcome message to be visible
        await fixture.page.waitForSelector(`role=heading[name="${welcomeMessage}"]`, { state: "visible", timeout: TIMEOUT });
        await expect(fixture.page.getByRole('heading', { name: welcomeMessage })).toBeVisible({timeout: TIMEOUT});
    }

    async logout() {
        fixture.logger.info(`Click on the name`);

        // Wait for the "BB" button to be visible
        await fixture.page.waitForSelector('role=button[name="BB"]', { state: "visible", timeout: TIMEOUT });
        await fixture.page.getByRole('button', { name: 'BB' }).click();
        fixture.logger.info(`Click on the logout button`);

        // Wait for the "Logout" button to be visible
        await fixture.page.waitForSelector('role=button[name="Logout"]', { state: "visible", timeout: TIMEOUT });
        await fixture.page.getByRole('button', { name: 'Logout' }).click();
        await playwrightWrapper.loadingWebPage();
        fixture.logger.info(`Waiting for the logout process to complete`);
    }


async creatSpaceIfNotPresent(jsonData: any) {

    const spaceNamee = jsonData[0].spaceName;
    const spaceDescrip = jsonData[0].spaceDescription;
    console.log(`Checking if space is present: ${spaceNamee}`);
    fixture.logger.info(`Checking if space is present: ${spaceNamee}`);
    

    // Check if the space Description is present
    const isSpacePresent = await this.getTheNumberOfSpaceItemPresent(spaceDescrip);
    console.log("isSpacePresent", isSpacePresent);

    if (!isSpacePresent) {
        console.log("Creating space as it is not present");
        fixture.logger.info(`Creating space as it is not present`);
        await this.creatSpace(spaceNamee,spaceDescrip);
    } else {
        console.log("Space already exists, no need to create it again");
        fixture.logger.info(`Space already exists, no need to create it again`);
    }


}

    async getTheNumberOfSpaceItemPresent(spaceName: string): Promise<boolean>{

        let flag = false;
        await playwrightWrapper.loadingWebPage();

        // Get the number of rows displayed
        await fixture.page.waitForSelector(
            `//div[@role="radiogroup"]/div//p`,
            { state: "visible", timeout: TIMEOUT }
        );
        const rows = fixture.page.locator(
            `//div[@role="radiogroup"]/div//p`);
            const numberOfRowsDisplayed = await rows.count();
            console.log("number of spaces :-", numberOfRowsDisplayed);
            // Iterate through each row to find the  name
        for (let row = 1; row <= numberOfRowsDisplayed; row++) {
            await playwrightWrapper.loadingWebPage();
            let spacenameElement = `//div[@role="radiogroup"]/div[${row}]//p`;

            // Wait for the element to be available
            await fixture.page.waitForSelector(spacenameElement, {
                state: "visible",
                timeout: TIMEOUT,
            });
            const spacenameFromUI = await fixture.page
            .locator(spacenameElement)
            .textContent();
        console.log("Model name from ui :-", spacenameFromUI);
        //fixture.logger.info("Model name from ui :-", modelnameFromUI);
        let expectedSpacename =  spaceName;
        //console.log("Expected Model name from jsondata :-", expectedmodelname);
        //fixture.logger.info("Expected Model name from jsondata :-", expectedmodelname);
        if (spacenameFromUI?.trim() ===expectedSpacename) {
            console.log("This is expect Space is present or true");
            fixture.logger.info(`The required item is present in the row number: ${row}`);
            flag = true;
            break;
        } else {
            flag = false
        }
    }

    return flag;


        }

        //if not present the create space.
        async creatSpace(spaceNames: string, spaceDescriptions: string) {
            console.log(`Creating space with name: ${spaceNames}`);

            await globalaction.waitAndClick(`//p[text()='Space']/parent::button`);
            await playwrightWrapper.loadingWebPage();
            //wait for the create space page to load
            await globalaction.typeWithDelay(`//input[@id="spacename" and @name="pacename"]`, spaceNames, 100);

            await playwrightWrapper.loadingWebPage();
            await globalaction.typeWithDelay(`//input[@id="spacedescription" and @name="spacedescription"]`, spaceDescriptions, 100);

            await playwrightWrapper.loadingWebPage();
            await globalaction.click(`//p[text()='Create']/parent::button`);
            //await playwrightWrapper.loadingWebPage();

            }


    async closeTheSpaceModule() {
        fixture.logger.info(`Clicking on the close icon`);
        await fixture.page.locator(`//p[text()='Spaces']/parent::div/parent::div//button`).click();

    }


}