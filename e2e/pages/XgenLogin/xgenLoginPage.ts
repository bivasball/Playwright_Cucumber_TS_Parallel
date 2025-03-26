import { expect, Page } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";

export default class xgenLoginPage {
    constructor(private page: Page) {}

    async navigateToLoginPage() {
        console.log(`BASEURL is : ${process.env.BASEURL}`);
        fixture.logger.info(`Navigating to login page with BASEURL: ${process.env.BASEURL}`);
        await fixture.page.goto(process.env.BASEURL);

        fixture.logger.info("Verifying login page heading is visible");
        await expect(fixture.page.getByRole('heading', { name: 'Log into your xGEN account' })).toBeVisible();

        fixture.logger.info("Verifying login page contains the correct heading text");
        await expect(fixture.page.locator('h5')).toContainText('Log into your xGEN account');

        fixture.logger.info("Verifying login form contains the text 'Login'");
        await expect(fixture.page.locator('form')).toContainText('Login');
    }

    async login(jsonData: any) {
        const username = jsonData[0].username;
        const password = jsonData[0].password;

        console.log(`Logging in with username: ${username}`);
        fixture.logger.info(`Filling in username: ${username}`);
        await fixture.page.getByRole('textbox', { name: 'Username' }).fill(username);

        fixture.logger.info("Filling in password");
        await fixture.page.getByRole('textbox', { name: 'Password' }).fill(password);

        fixture.logger.info("Clicking on the login button");
        await fixture.page.getByRole('button', { name: 'Login' }).click();
    }

    async verifyLoginMessage(jsonData: any) {
        const message = jsonData[0].message;

        console.log(`Verifying login message: ${message}`);
        fixture.logger.info(`Verifying login message: ${message}`);
        await expect(fixture.page.getByText(message)).toBeVisible();

        fixture.logger.info("Verifying login message is contained in the paragraph");
        await expect(fixture.page.getByRole('paragraph')).toContainText(message);
    }

    async selectSubscription(jsonData: any) {
        const subscription = jsonData[0].subscription;

        console.log(`Selecting subscription: ${subscription}`);
        fixture.logger.info(`Clicking on the subscription dropdown`);
        await fixture.page.getByLabel('', { exact: true }).click();

        fixture.logger.info(`Verifying subscription option '${subscription}' is visible`);
        await expect(fixture.page.getByRole('option', { name: subscription })).toBeVisible();

        fixture.logger.info(`Selecting subscription option: ${subscription}`);
        await fixture.page.getByRole('option', { name: subscription }).click();
    }

    async verifyButtonVisible(buttonName: string) {
        console.log(`Verifying button is visible: ${buttonName}`);
        fixture.logger.info(`Verifying button '${buttonName}' is visible`);
        await expect(fixture.page.getByRole('button', { name: buttonName })).toBeVisible();
    }

    async clickButton(buttonName: string) {
        console.log(`Clicking on button: ${buttonName}`);
        fixture.logger.info(`Clicking on button: ${buttonName}`);
        await fixture.page.getByRole('button', { name: buttonName }).click();
    }

    async verifyPageHeading(pageName: string) {
        console.log(`Verifying page heading: ${pageName}`);
        fixture.logger.info(`Verifying page heading: ${pageName}`);
        await expect(fixture.page.getByRole('heading', { name: pageName })).toBeVisible();
    }

    async selectRadioOption(radioOption: string) {
        console.log(`Selecting radio option: ${radioOption}`);
        fixture.logger.info(`Selecting radio option: ${radioOption}`);
        await fixture.page.locator("//*[text()='Fitness']/parent::div//input[@type='radio']").check();
    }

    async verifyWelcomeMessage(jsonData: any) {
        const welcomeMessage = jsonData[0].welcomeMessage;

        console.log(`Verifying welcome message: ${welcomeMessage}`);
        fixture.logger.info(`Verifying welcome message: ${welcomeMessage}`);
        await expect(fixture.page.getByRole('heading', { name: welcomeMessage })).toBeVisible();
    }
}