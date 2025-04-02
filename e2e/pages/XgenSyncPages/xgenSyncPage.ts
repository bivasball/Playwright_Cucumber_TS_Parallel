import { expect } from "@playwright/test";
import { fixture } from "@hooks/pageFixture";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import { TIMEOUT } from "playwright.config";
import JobMonitor from '@helper/wrapper/JobMonitor';

let playwrightWrapper = new PlaywrightWrapper();
let jobMonitor = new JobMonitor();

export default class xgenSyncPage {

    async navigateToSyncPage() {
        console.log("===xgen Sync page===");
        // Wait for the "Sync" button to be visible
        await fixture.page.waitForSelector(`//span[text()='Sync']`, {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Sync' button to be visible...");

        // Click on the "Sync" button
        await fixture.page.locator(`//span[text()='Sync']`).click();
        fixture.logger.info("Clicked on 'Sync' button.");

        await playwrightWrapper.loadingWebPage();
        await playwrightWrapper.loadingWebPage();

    }

    async cleanUpTheSyncConnection(jsonData: any) {
        // Verify the Sync name in the Sync Sources tab list and return the row number, if not found then it is zero
        let syncname = jsonData[0].syncName;
        let presentOrNotRow =
            await playwrightWrapper.getTheRowNumberFromSyncPage(syncname);
        console.log("Present or not, if present the row number is ==========", presentOrNotRow);
        if (presentOrNotRow !== 0) {
            console.log("Deleting the source as per the request.");
            await playwrightWrapper.deleteTheSync(presentOrNotRow);
        }

    }

    async createConnectionAndPerformSyncUp(jsonData: any) {
        let syncNamedata = jsonData[0].syncName;
        let descriptionData = jsonData[0].SyncDescription;
        let selectSourceData = jsonData[0].selectSource;
        let selectDestinationData = jsonData[0].selectDestination;


        // Click on the "Add" link
        await fixture.page.waitForSelector('role=link[name="Add"]', { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for 'Add' link to be visible...");
        await fixture.page.getByRole('link', { name: 'Add' }).click();
        fixture.logger.info("Clicked on 'Add' link.");

        // Fill the "Sync Name" textbox
        await fixture.page.waitForSelector('role=textbox[name="Sync Name"]', { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for 'Sync Name' textbox to be visible...");
        await fixture.page.getByRole('textbox', { name: 'Sync Name' }).click();
        fixture.logger.info("Clicked on 'Sync Name' textbox.");
        await fixture.page.locator(`//input[@placeholder='sync name']`).type(syncNamedata, { delay: 100 });
        fixture.logger.info("Filled 'Sync Name' textbox with 'PG_SALES_DATA_TESTINg'.");

        // Fill the "Description" textbox
        await fixture.page.waitForSelector('role=textbox[name="Description"]', { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for 'Description' textbox to be visible...");
        await fixture.page.getByRole('textbox', { name: 'Description' }).click();
        fixture.logger.info("Clicked on 'Description' textbox.");
        await fixture.page.getByRole('textbox', { name: 'Description' }).type(descriptionData, { delay: 100 });
        fixture.logger.info(`Filled 'Description' textbox with '${descriptionData}' `);

        // Select the source
        await fixture.page.waitForSelector('#selected_source', { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for 'Source' dropdown to be visible...");
        await fixture.page.locator('#selected_source').click();
        fixture.logger.info("Clicked on 'Source' dropdown.");
        await fixture.page.getByText(selectSourceData).click();
        fixture.logger.info(`Selected '${selectSourceData}'`);

        // Select the destination

        await fixture.page.locator(`//div[@id='selected_destination']`).click();
        fixture.logger.info("Clicked on destination dropdown.");
        await fixture.page.getByText(selectDestinationData).click();
        fixture.logger.info(`Selected '${selectDestinationData}'`);
        await playwrightWrapper.loadingWebPage();

        // Check the checkbox for sync mode
        await fixture.page.waitForSelector('span', { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for 'FieldsEntitySync Mode' checkbox to be visible...");
        await fixture.page.locator('span').filter({ hasText: 'FieldsEntitySync Mode (Src |' }).getByRole('checkbox').check();
        fixture.logger.info("Checked 'FieldsEntitySync Mode' checkbox.");

        // Select the conversion rate
        await this.checkThePrimaryKeysOfAnEntity('leadconversion', 'conversion_rate');


        // Click the "Create" button
        await fixture.page.waitForSelector('role=button[name="Create"]', { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for 'Create' button to be visible...");
        await fixture.page.getByRole('button', { name: 'Create' }).click();
        fixture.logger.info("Clicked on 'Create' button.");
        await playwrightWrapper.loadingWebPage();

        // Wait for the success message to be visible
        await fixture.page.waitForSelector(`//p[contains(text(),'created successfully')]`, { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for the success message to be visible...");

        // Verify the success message text
        await expect(fixture.page.locator(`//p[contains(text(),'created successfully')]`)).toContainText("created successfully");
        fixture.logger.info(`Verified the success message: 'Sync XDF_${syncNamedata} created successfully.`);


    }

    async checkThePrimaryKeysOfAnEntity(entityName: string, checkBoxName: string) {
        // Scroll the entity into view and click on the dropdown
        await fixture.page.locator(`//span[text()='${entityName}']/parent::div/parent::div/div[7]`).scrollIntoViewIfNeeded();
        fixture.logger.info(`Scrolled '${entityName}' dropdown into view.`);
        await fixture.page.locator(`//span[text()='${entityName}']/parent::div/parent::div/div[7]`).click();
        fixture.logger.info(`Clicked on '${entityName}' dropdown.`);

        // Check the checkbox for the specified key
        await fixture.page.locator(`//ul[@role='listbox']/li[@data-value='${checkBoxName}']//input[@type='checkbox']`).scrollIntoViewIfNeeded();
        fixture.logger.info(`Scrolled '${checkBoxName}' checkbox into view.`);
        await fixture.page.locator(`//ul[@role='listbox']/li[@data-value='${checkBoxName}']//input[@type='checkbox']`).click();
        fixture.logger.info(`Checked '${checkBoxName}' checkbox.`);

        // Wait for the page to load after the action
        await playwrightWrapper.loadingWebPage();
        fixture.logger.info("Page loaded after selecting the primary key.");
    }

    async doTheSyncAtion(jsonData: any) {
        // Verify Sync creation
        let syncname = jsonData[0].syncName;
        fixture.logger.info(`Verifying if the sync name '${syncname}' exists in the Sync Sources tab list.`);
        let presentOrNotRow = await playwrightWrapper.getTheRowNumberFromSyncPage(syncname);
        fixture.logger.info(`Sync name '${syncname}' is ${presentOrNotRow !== 0 ? `present at row ${presentOrNotRow}` : 'not present'}.`);

        if (presentOrNotRow !== 0) {

            fixture.logger.info("Performing the Sync Action...");
            let syncDataFlowButton = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${presentOrNotRow}]//span[@aria-label='Sync Data Flow']/button`;

            // Wait for the Sync Data Flow button to be visible
            await fixture.page.waitForSelector(syncDataFlowButton, { state: "visible", timeout: TIMEOUT });
            fixture.logger.info("Waiting for 'Sync Data Flow' button to be visible...");

            // Click on the Sync Data Flow button
            await fixture.page.locator(syncDataFlowButton).click();
            fixture.logger.info("Clicked on 'Sync Data Flow' button.");

            // Click on Job Logs Button
            fixture.logger.info("Click on Job Logs button");
            let gobsLogsButton = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${presentOrNotRow}]//span[@aria-label='Job Logs']/button`;

            await fixture.page.waitForSelector(gobsLogsButton, { state: "visible", timeout: TIMEOUT });
            fixture.logger.info("Waiting for 'Job Logs' button to be visible...");

            // Click on the Job Logs button
            await fixture.page.locator(gobsLogsButton).click();
            fixture.logger.info("Clicked on 'Job Logs' button.");

            // get the text 'Sync running'
            let getSyncstatus = `//h2//p[contains(text(),'XDF_${syncname}')]/ancestor::div[@role='dialog']/div[contains(@class,'MuiDialogContent-dividers')]/div[1]//h6`;
            // Wait for the element to be visible
            await fixture.page.waitForSelector(getSyncstatus, { state: "visible", timeout: TIMEOUT });
            fixture.logger.info("Waiting for the sync message to be visible...");

            // Get the text content of the element
            let syncTextStatusMessage = await fixture.page.locator(getSyncstatus).textContent();
            fixture.logger.info(`The message from the UI is ***: ${syncTextStatusMessage}`);


            // Call the Monitor function //
            const duration = 30 * 60 * 1000; // 30 minutes 
            const interval = 20 * 1000; // 20 seconds
            await jobMonitor.monitorTheJob(duration, interval, async () => await this.callback(syncname));


            //Closing the Pop up ,close the present page , and Land to Homepage
            await this.closeTheSyncPopUpExistThePresentPageAndLandToHomePage();


        } else {
            fixture.logger.info(`Sync name '${syncname}' not found. No action performed.`);
        }
    }


    async refreshTheSyncPopUp() {
        const refreshButtonLocator = `//div[contains(@class,'MuiDialogActions-spacing')]//button[@type='button' and @iconcolor='refresh']`;
        await fixture.page.waitForSelector(refreshButtonLocator, { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for 'Refresh' button to be visible...");

        // Click the Refresh button
        await fixture.page.locator(refreshButtonLocator).click();
        fixture.logger.info("Clicked on 'Refresh' button.");

    }

    async closeTheSyncPopUpExistThePresentPageAndLandToHomePage() {
        const refreshButtonLocator = `//div[contains(@class,'MuiDialogActions-spacing')]//button[@type='button' and @iconcolor='close']`;
        await fixture.page.waitForSelector(refreshButtonLocator, { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for 'Close' button to be visible...");

        // Click the Close button
        await fixture.page.locator(refreshButtonLocator).click();
        fixture.logger.info("Clicked on 'Close' button.");

        //Exit from this page and Land on Home Page//
        await fixture.page.waitForSelector(`//a[@iconcolor='close' and @href='/']`, { state: "visible", timeout: TIMEOUT });
        fixture.logger.info("Waiting for 'Close' button which is just below the Loginuser Name, to be visible...");
        // Click the Close button just below the Loginuser Name
        await fixture.page.locator(`//a[@iconcolor='close' and @href='/']`).click();
        fixture.logger.info("Clicked on 'Close' button,which is just below the Loginuser Name.");
        await playwrightWrapper.loadingWebPage();
        await playwrightWrapper.loadingWebPage();
    }

    // Define the callback function
    async callback(syncName: string) {
        await this.refreshTheSyncPopUp();
        await playwrightWrapper.loadingWebPageInJob();
        let getSyncstatus = `//h2//p[contains(text(),'XDF_${syncName}')]/ancestor::div[@role='dialog']/div[contains(@class,'MuiDialogContent-dividers')]/div[1]//h6`;
        await fixture.page.waitForSelector(getSyncstatus, { state: "visible", timeout: TIMEOUT });
        let syncTextStatusMessage = await fixture.page.locator(getSyncstatus).textContent();
        fixture.logger.info(`The message from the UI is: ${syncTextStatusMessage}`);
        console.log(`The message from the UI is: ${syncTextStatusMessage}`);

        // Return "it exists" if the sync status matches a specific condition
        if (syncTextStatusMessage?.includes("Sync Succeeded")) {
            return "it exists";
        }
        return "keep going";
    };


}
