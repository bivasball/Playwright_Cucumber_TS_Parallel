import { fixture } from "@hooks/pageFixture";
import { TIMEOUT } from "playwright.config";

export default class PlaywrightWrapper {

    async goto(url: string) {
        await fixture.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }

    async waitAndClick(locator: string) {
        const element = fixture.page.locator(locator);
        await element.waitFor({
            state: "visible"
        });
        await element.click();
    }

    async navigateTo(link: string) {
        await Promise.all([
            //fixture.page.waitForNavigation(),
            fixture.page.click(link)
        ])
    }

    async loadingWebPage(): Promise<void> {
        const startTime = Date.now();
        // Wait for the loader to disappear
        await fixture.page.waitForSelector("//span[contains(@style,'react-spinners-RiseLoader-odd')]", {
            state: "hidden",
            timeout: 120_000, // 120 seconds
        });
        const estimatedTime = Date.now() - startTime;
        console.log(`Time taken to load a webpage: ${(estimatedTime / 1000).toFixed(2)} seconds`);
    }

    async loadingWebPageInJob(): Promise<void> {
        const startTime = Date.now();
        // Wait for the loader to disappear
        await fixture.page.waitForSelector("//span[contains(@style,'react-spinners-RiseLoader-odd')]", {
            state: "hidden",
            timeout: 1500_000, // 15 minutes
        });
        const estimatedTime = Date.now() - startTime;
        console.log(`Time taken to load a webpage: ${(estimatedTime / 1000).toFixed(2)} seconds`);
    }
    async loadingSyncMovingIcon(): Promise<void> {
        const startTime = Date.now();
        // Wait for the loader to disappear
        await fixture.page.waitForSelector("//span[@style='display: inherit;']", {
            state: "hidden",
            timeout: 1200000, // 120 seconds
        });
        const estimatedTime = Date.now() - startTime;
        console.log(`Time taken for loading Sync Moving Icon: ${(estimatedTime / 1000).toFixed(2)} seconds`);
    }

    async verifySourceNameDisplayedInConnectSourcesTabList(
        sourceName: string
    ): Promise<number> {
        console.log(
            "Page Object Wrapper: Verifying that the source name is displayed in the Connect Sources tab list..."
        );
        let flag = 0;
        await this.loadingWebPage();

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
            await this.loadingWebPage();
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

    async getTheRowNumberFromSyncPage(
        sourceName: string
    ): Promise<number> {
        console.log(
            "Page Object Wrapper: Verifying that the source name is displayed in the  tab list..."
        );
        let flag = 0;
        await this.loadingWebPage();

        // Get the number of rows displayed
        await fixture.page.waitForSelector(
            "//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div",
            { state: "visible", timeout: TIMEOUT }
        );
        fixture.logger.info(
            "Waiting for  Required Sync item from the list to be visible"
        );
        const rows = fixture.page.locator(
            "//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div"
        );
        const numberOfRowsDisplayed = await rows.count();
        console.log("ROWS :-", numberOfRowsDisplayed);

        // Iterate through each row to find the  name
        for (let row = 1; row <= numberOfRowsDisplayed; row++) {
            await this.loadingWebPage();
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
            fixture.logger.info("source name from ui :-", sourceNameFromUI);
            let expectedSourceName = 'XDF_' + sourceName;
            console.log("Expected source name from jsondata :-", expectedSourceName);
            fixture.logger.info("Expected source name from jsondata :-", expectedSourceName);
            if (sourceNameFromUI?.trim() === expectedSourceName) {
                console.log("This is true");
                fixture.logger.info(`The required item is present in the row number: ${row}`);
                flag = row;
                break;
            } else {
                flag = 0;
            }
        }

        return flag;
    }




    async deleteTheSource(rownumber: number) {
        let sourceToBedeleted = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${rownumber}]//span[@aria-label='Delete Source']/button`;
        console.log("Page Object Wrapper:Source to be deleted: ", sourceToBedeleted);
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
            .locator("//div[contains(@class,'MuiDialogActions-spacing')]//button[@type='button' and  @iconcolor='confirm']")
            .click();
        fixture.logger.info("Clicked on the confirm button to delete the source.");
        fixture.logger.info("Waiting for success alert to be visible...");
    }

    async deleteTheSync(rownumber: number) {
        let syncToBedeleted = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${rownumber}]//span[@aria-label='Delete Sync']/button`;
        console.log("Page Object Wrapper:Sync to be deleted: ", syncToBedeleted);
        await fixture.page.waitForSelector(syncToBedeleted, {
            state: "visible",
            timeout: TIMEOUT,
        });
        await fixture.page.locator(syncToBedeleted).click();
        fixture.logger.info(
            "Clicked on the delete icon for the sync.",
            syncToBedeleted
        );
        await fixture.page
            .locator("//div[contains(@class,'MuiDialogActions-spacing')]//button[@type='button' and  @iconcolor='confirm']")
            .click();
        fixture.logger.info("Clicked on the confirm button to delete the source.");
        fixture.logger.info("Waiting for success alert to be visible...");
    }

}