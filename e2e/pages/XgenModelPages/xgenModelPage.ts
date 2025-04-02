import { expect } from "@playwright/test";
import { fixture } from "@hooks/pageFixture";
import * as path from "path";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import { TIMEOUT } from "playwright.config";


let playwrightWrapper = new PlaywrightWrapper();

export default class xgenModelPage {

    async navigateToModelPage() {
        console.log("===xgen Model page===");
        // Wait for the "Sync" button to be visible
        await fixture.page.waitForSelector(`//span[text()='Model']`, {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Sync' button to be visible...");

        // Click on the "Sync" button
        await fixture.page.locator(`//span[text()='Model']`).click();
        fixture.logger.info("Clicked on 'Model' button.");

        await playwrightWrapper.loadingWebPage();
        await playwrightWrapper.loadingWebPage();

    }

    
}
