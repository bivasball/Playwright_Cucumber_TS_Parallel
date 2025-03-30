import { expect, Page } from "@playwright/test";
import { fixture } from "@hooks/pageFixture";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import { TIMEOUT } from "playwright.config";

let playwrightWrapper = new PlaywrightWrapper();

export default class createPgDbConnectionPage {
    async navigateToLoginPageforPgDB() {
        // Wait for "Source" button to be visible and click it
        await fixture.page.waitForSelector('role=button[name="Source"]', {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Source' button to be visible...");
        await fixture.page.getByRole("button", { name: "Source" }).click();
        fixture.logger.info("Clicked on 'Source' button.");
        playwrightWrapper.loadingWebPage();
    }

    async createPgDbConnectionWithData(jsonData: any) {
        console.log(
            `The data from the jsonData file is: ${JSON.stringify(jsonData)}`
        );
        // Verify the source name in the Connect Sources tab list and return the row number if not found then it is zero
        let presentornot =
            await this.verifySourceNameDisplayedInConnectSourcesTabList(
                jsonData[0].sourcename
            );
        console.log("Present or not==========", presentornot);
        if (presentornot !== 0) {
            console.log("Deleting the source as per the request.");
            await this.deleteTheSource(presentornot);
        }

        // Get the source name from the json data
        let sourcenamedata = jsonData[0].sourcename;
        let sourcedesc = jsonData[0].SourceDescription;
        let hostName = jsonData[0].hostname;
        let dbname = jsonData[0].databaseName;
        let schemaName = jsonData[0].schemas;
        let userName = jsonData[0].usernameForPG;
        let password = jsonData[0].passwordForPG;
        //let updateMethods = jsonData[0].UpdateMethods;

        // Wait for "Add" link to be visible and click it
        await fixture.page.waitForSelector('role=link[name="Add"]', {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Add' link to be visible...");
        await fixture.page.getByRole("link", { name: "Add" }).click();
        fixture.logger.info("Clicked on 'Add' link.");

        // Wait for "Postgres" button to be visible and click it
        await fixture.page.waitForSelector('role=button[name="Postgres"]', {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Postgres' button to be visible...");
        await fixture.page.getByRole("button", { name: "Postgres" }).click();
        fixture.logger.info("Clicked on 'Postgres' button.");

        // Wait for "Source Name" textbox to be visible and fill it
        await fixture.page.waitForSelector('role=textbox[name="Source Name"]', {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Source Name' textbox to be visible...");
        await fixture.page.getByRole("textbox", { name: "Source Name" }).click();
        fixture.logger.info("Clicked on 'Source Name' textbox.");
        await fixture.page
            .getByRole("textbox", { name: "Source Name" })
            .fill(sourcenamedata);
        fixture.logger.info("Filled 'Source Name' textbox with ''.");

        // Wait for "Source Description" textbox to be visible and fill it
        await fixture.page.waitForSelector(
            'role=textbox[name="Source Description"]',
            { state: "visible", timeout: TIMEOUT }
        );
        fixture.logger.info(
            "Waiting for 'Source Description' textbox to be visible..."
        );
        await fixture.page
            .getByRole("textbox", { name: "Source Description" })
            .click();
        fixture.logger.info("Clicked on 'Source Description' textbox.");
        await fixture.page
            .getByRole("textbox", { name: "Source Description" })
            .fill(sourcedesc);
        fixture.logger.info(
            `Filled 'Source Description' textbox with '${sourcedesc}`
        );

        // Wait for "Host" field to be visible and fill it
        await fixture.page.waitForSelector("#Input_L_1_host", {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Host' field to be visible...");
        await fixture.page.locator("#Input_L_1_host").click();
        fixture.logger.info("Clicked on 'Host' field.");
        await fixture.page.locator("#Input_L_1_host").fill(hostName);
        fixture.logger.info("Filled 'Host' field with the value.");

        // Wait for "Database Name" field to be visible and fill it
        await fixture.page.waitForSelector("#Input_L_1_database", {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Database Name' field to be visible...");
        await fixture.page.locator("#Input_L_1_database").click();
        fixture.logger.info("Clicked on 'Database Name' field.");
        await fixture.page.locator("#Input_L_1_database").fill(dbname);
        fixture.logger.info(`Filled 'Database Name' field with ${dbname}`);

        // Wait for "Schemas" dropdown and select "public"
        await fixture.page.waitForSelector('role=button[name="public"]', {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Schemas' dropdown to be visible...");
        await fixture.page.getByRole("button", { name: "public" }).click();
        fixture.logger.info("Selected 'public' schema.");

        // Wait for "Clear" button and click it
        await fixture.page.waitForSelector('role=button[name="Clear"]', {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Clear' button to be visible...");
        await fixture.page.getByRole("button", { name: "Clear" }).click();
        fixture.logger.info("Clicked on 'Clear' button.");

        // Wait for "Schemas" combobox and fill it
        await fixture.page.waitForSelector(
            'role=combobox[name="Type and press enter..."]',
            { state: "visible", timeout: TIMEOUT }
        );
        fixture.logger.info("Waiting for 'Schemas' combobox to be visible...");
        await fixture.page
            .getByRole("combobox", { name: "Type and press enter..." })
            .click();
        fixture.logger.info("Clicked on 'Schemas' combobox.");
        await fixture.page
            .getByRole("combobox", { name: "Type and press enter..." })
            .fill(schemaName);
        fixture.logger.info(`Filled 'Schemas' combobox with ${schemaName}`);

        // Press the Enter key
        await fixture.page
            .getByRole("combobox", { name: "Type and press enter..." })
            .press("Enter");
        fixture.logger.info("Pressed 'Enter' key in the 'Schemas' combobox.");

        // Wait for "Username" field and fill it
        await fixture.page.waitForSelector("#Input_L_1_username", {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Username' field to be visible...");
        await fixture.page.locator("#Input_L_1_username").click();
        fixture.logger.info("Clicked on 'Username' field.");
        await fixture.page.locator("#Input_L_1_username").fill(userName);
        fixture.logger.info(`Filled 'Username' field with ${userName}`);

        // Wait for "Password" field and fill it
        await fixture.page.waitForSelector("#Input_L_1_password", {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Password' field to be visible...");
        await fixture.page.locator("#Input_L_1_password").click();
        fixture.logger.info("Clicked on 'Password' field.");
        // Clear the existing value in the password field
        await fixture.page.locator("#Input_L_1_password").fill("");
        fixture.logger.info("Cleared the 'Password' field.");
        console.log("Filling the password field with the value: ", password);
        //await fixture.page.locator("#Input_L_1_password").fill(password);
        //fixture.logger.info(`Filled 'Password' field with ${password}`);
        // Type the password using the keyboard
        await fixture.page.locator("#Input_L_1_password").type(password, { delay: 100 });
        fixture.logger.info(`Typed 'Password' field with ${password}`);

        // Wait for "Scan Changes with User" radio button and check it
        await fixture.page
            .getByRole("radio", { name: "Scan Changes with User" })
            .check();
        fixture.logger.info("Checked 'Scan Changes with User' radio button.");

        //Validate first on clicking on Validate button
        //p[text()='Validate']/parent::button
        await fixture.page.waitForSelector(
            "//p[text()='Validate']/parent::button",
            {
                state: "visible",
                timeout: TIMEOUT,
            }
        );

        //---------validate button during creation not working---------//
        //fixture.logger.info("Waiting for 'Validate' button to be visible...");
        //await fixture.page.locator("//p[text()='Validate']/parent::button").click();
        //fixture.logger.info("Clicked on 'Validate' button.");
        //await expect(fixture.page.getByRole("alert")).toContainText("successfully");

        // Wait for "Create" button and click it
        await fixture.page.waitForSelector('role=button[name="Create"]', {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Create' button to be visible...");
        await fixture.page
            .getByRole("button", { name: "Create" })
            .scrollIntoViewIfNeeded();
        await fixture.page.getByRole("button", { name: "Create" }).click();
        fixture.logger.info("Clicked on 'Create' button.");

        // Verify success alert
        fixture.logger.info("Waiting for success alert to be visible...");
        await playwrightWrapper.loadingWebPage();
        await expect(
            fixture.page.locator(`//p[contains(text(),'created successfully')]`)
        ).toContainText("created successfully");
    }

    async verifySourceNameDisplayedInConnectSourcesTabList(
        sourceName: string
    ): Promise<number> {
        console.log(
            "Page Object: Verifying that the source name is displayed in the Connect Sources tab list..."
        );
        let flag = 0;
        await playwrightWrapper.loadingWebPage();

        // Get the number of rows displayed
        await fixture.page.waitForSelector(
            "//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div",
            { state: "visible", timeout: TIMEOUT }
        );
          fixture.logger.info(
                "Waiting for the source list to be visible in the Connect Sources tab..."
            );
        const rows = fixture.page.locator(
            "//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div"
        );
        const numberOfRowsDisplayed = await rows.count();
        console.log("ROWS :-", numberOfRowsDisplayed);

        // Iterate through each row to find the source name
        for (let row = 1; row <= numberOfRowsDisplayed; row++) {
            await playwrightWrapper.loadingWebPage();
            let sourceNameElement = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${row}]/div/div/div//span//p`;

            // Wait for the element to be available
            await fixture.page.waitForSelector(sourceNameElement, {
                state: "visible",
                timeout: TIMEOUT,
            });

            const sourceNameFromUI = await fixture.page
                .locator(sourceNameElement)
                .textContent();
            console.log("source name from ui :-", sourceNameFromUI);

            if (sourceNameFromUI?.trim().toLowerCase() === sourceName.toLowerCase()) {
                console.log("This is true");
                flag = row;
                break;
            } else {
                flag = 0;
            }
        }

        return flag;
    }

    async deleteTheSource(rownumber: number) {
        let sourceToBedeleted = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${rownumber}]//span[@aria-label='Delete Source']`;
        console.log("Source to be deleted: ", sourceToBedeleted);
        await fixture.page.waitForSelector(sourceToBedeleted, {
            state: "visible",
            timeout: TIMEOUT,
        });
        await fixture.page.locator(sourceToBedeleted).click();
        fixture.logger.info(
            "Clicked on the delete icon for the source.",
            sourceToBedeleted
        );
        await fixture.page
            .locator("//button[@type='button' and  @iconcolor='confirm']")
            .click();
        fixture.logger.info("Clicked on the confirm button to delete the source.");
        fixture.logger.info("Waiting for success alert to be visible...");
    }

    async editTheSourceReEnterThePaswordAndSaveThenValidate(jsonData: any) {
        // Verify the source name in the Connect Sources tab list and return the row number if not found then it is zero
        let presentornot =
            await this.verifySourceNameDisplayedInConnectSourcesTabList(
                jsonData[0].sourcename
            );
        console.log("Present or not==========", presentornot);
        if (presentornot !== 0) {
            console.log("Editing the Source as per the request.");
            let sourceDetails = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${presentornot}]//span[@aria-label='Source Details']`;
            await fixture.page.waitForSelector(sourceDetails, {
                state: "visible",
                timeout: TIMEOUT,
            });
            await fixture.page.locator(sourceDetails).click();
            fixture.logger.info("Clicked on the source to edit it.");
            await playwrightWrapper.loadingWebPage();
            await fixture.page.getByRole("button", { name: "Edit" }).click();
            // Wait for "Password" field to be visible
            await fixture.page.waitForSelector("#Input_L_1_password", {
                state: "visible",
                timeout: TIMEOUT,
            });
            fixture.logger.info("Waiting for 'Password' field to be visible...");

            // Click on the "Password" field to focus it
            await fixture.page.locator("#Input_L_1_password").click();
            fixture.logger.info("Clicked on 'Password' field.");

            // Use Control+A (or Command+A on macOS) to select all text
            await fixture.page.locator("#Input_L_1_password").press("Control+a"); // Use "Meta+a" for macOS
            fixture.logger.info("Selected all text in the 'Password' field.");

            // Press the Delete key to clear the field
            await fixture.page.locator("#Input_L_1_password").press("Delete");
            fixture.logger.info(
                "Cleared the 'Password' field using Control+A and Delete."
            );

            // Type the password using the keyboard
            let password = jsonData[0].passwordForPG;
            await fixture.page.locator("#Input_L_1_password").type(password, { delay: 100 });
            //fixture.logger.info(`Typed 'Password' field with ${password}`);

            await fixture.page
                .getByRole("button", { name: "Save" })
                .scrollIntoViewIfNeeded();
            await fixture.page.getByRole("button", { name: "Save" }).click();
            fixture.logger.info("Clicked on 'Save' button.");

            await playwrightWrapper.loadingWebPage();
            // Verify success alert
            fixture.logger.info("Waiting for `updated successfully` to be visible.");
            await expect(
                fixture.page.locator(`//p[contains(text(),'updated successfully')]`)
            ).toContainText("updated successfully");

            // Wait for the "close" button to be visible and click i
            await fixture.page.getByLabel("close").click();
            await playwrightWrapper.loadingWebPage();
            await fixture.page.getByRole("button", { name: "Validate" }).click();
            fixture.logger.info("Clicked on 'Validate' button.");
            // Verify success alert
            await playwrightWrapper.loadingWebPage();
            fixture.logger.info(
                "Waiting for `Source validation Successful` to be visible."
            );
            await expect(
                fixture.page.locator(`//p[contains(text(),'Successful')]`)
            ).toContainText("Source validation Successful.");
            //type="button" iconcolor="close"
            //closing the validation pop up by click on cross icon
            let crossicon =`//div[contains(@class,'MuiCardActions-root')]//button[@type='button' and  @iconcolor='close']`;
                await fixture.page.waitForSelector(crossicon, {
                    state: "visible",
                    timeout: TIMEOUT,
                });
            await fixture.page.locator(crossicon).click();
            await playwrightWrapper.loadingWebPage();
        }
    }
}
