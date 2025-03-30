import { expect, Page } from "@playwright/test";
import { fixture } from "@hooks/pageFixture";
import  {TIMEOUT}  from "playwright.config";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";

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
        await expect(fixture.page.getByRole('heading', { name: 'Log into your xGEN account' })).toBeVisible();

        // Wait for the heading text to be visible
        await fixture.page.waitForSelector('h5', { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Verifying login page contains the correct heading text");
        await expect(fixture.page.locator('h5')).toContainText('Log into your xGEN account');

        // Wait for the login form to be visible
        await fixture.page.waitForSelector('form', { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Verifying login form contains the text 'Login'");
        await expect(fixture.page.locator('form')).toContainText('Login');
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
        playwrightWrapper.loadingWebPage();
        fixture.logger.info("Waiting for the login process to complete");
    }

    async verifyLoginMessage(jsonData: any) {
        const message = jsonData[0].message;

        console.log(`Verifying login message: ${message}`);
        fixture.logger.info(`Verifying login message: ${message}`);

        // Wait for the login message to be visible
        await fixture.page.waitForSelector(`text=${message}`, { state: "visible", timeout: TIMEOUT });
        await expect(fixture.page.getByText(message)).toBeVisible();

        fixture.logger.info("Verifying login message is contained in the paragraph");

        // Wait for the paragraph containing the message to be visible
        await fixture.page.waitForSelector('role=paragraph', { state: "visible", timeout: TIMEOUT });
        await expect(fixture.page.getByRole('paragraph')).toContainText(message);
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
        await expect(fixture.page.getByRole('option', { name: subscription })).toBeVisible();

        fixture.logger.info(`Selecting subscription option: ${subscription}`);
        await fixture.page.getByRole('option', { name: subscription }).click();

        playwrightWrapper.loadingWebPage();
        fixture.logger.info("Waiting for the subscription selection process to complete");
    }

    async verifyButtonVisible(buttonName: string) {
        console.log(`Verifying button is visible: ${buttonName}`);
        fixture.logger.info(`Verifying button '${buttonName}' is visible`);

        // Wait for the button to be visible
        await fixture.page.waitForSelector(`role=button[name="${buttonName}"]`, { state: "visible", timeout: TIMEOUT });
        await expect(fixture.page.getByRole('button', { name: buttonName })).toBeVisible();
    }

    async clickButton(buttonName: string) {
        console.log(`Clicking on button: ${buttonName}`);
        fixture.logger.info(`Clicking on button: ${buttonName}`);

        // Wait for the button to be visible
        await fixture.page.waitForSelector(`role=button[name="${buttonName}"]`, { state: "visible", timeout: TIMEOUT });
        await fixture.page.getByRole('button', { name: buttonName }).click();
        playwrightWrapper.loadingWebPage();
        fixture.logger.info("Waiting for the button click process to complete");
    }

    async verifyPageHeading(pageName: string) {
        console.log(`Verifying page heading: ${pageName}`);
        fixture.logger.info(`Verifying page heading: ${pageName}`);

        // Wait for the page heading to be visible
        await fixture.page.waitForSelector(`role=heading[name="${pageName}"]`, { state: "visible", timeout: TIMEOUT });
        await expect(fixture.page.getByRole('heading', { name: pageName })).toBeVisible();
    }

    async selectRadioOption(radioOption: string) {
        console.log(`Selecting radio option: ${radioOption}`);
        fixture.logger.info(`Selecting radio option: ${radioOption}`);

        // Wait for the radio option to be visible
        await fixture.page.waitForSelector("//*[text()='Fitness']/parent::div//input[@type='radio']", {
            state: "visible",
            timeout: TIMEOUT,
        });
        await fixture.page.locator("//*[text()='Fitness']/parent::div//input[@type='radio']").check();
        //wait for close icon to be visible
        
        fixture.logger.info(`waiting for close icon to be visible`);
        await fixture.page.waitForSelector(`//button[@type='button' and @iconcolor='close']`, { state: "visible", timeout: TIMEOUT });
        fixture.logger.info(`Clicking on the close icon`);
        await fixture.page.locator(`//button[@type='button' and @iconcolor='close']`).click();
        


    }

    async verifyWelcomeMessage(jsonData: any) {
        const welcomeMessage = jsonData[0].welcomeMessage;

        console.log(`Verifying welcome message: ${welcomeMessage}`);
        fixture.logger.info(`Verifying welcome message: ${welcomeMessage}`);

        // Wait for the welcome message to be visible
        await fixture.page.waitForSelector(`role=heading[name="${welcomeMessage}"]`, { state: "visible", timeout: TIMEOUT });
        await expect(fixture.page.getByRole('heading', { name: welcomeMessage })).toBeVisible();
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
        playwrightWrapper.loadingWebPage();
        fixture.logger.info(`Waiting for the logout process to complete`);
    }
}