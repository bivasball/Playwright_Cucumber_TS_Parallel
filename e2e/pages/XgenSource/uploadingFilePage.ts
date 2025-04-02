import { expect } from "@playwright/test";
import { fixture } from "@hooks/pageFixture";
import * as path from "path";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import { TIMEOUT } from "playwright.config";

let playwrightWrapper = new PlaywrightWrapper();

export default class uploadingFilePage {
    async clickonUploadFileButton() {
        console.log("===Navigate to Connect page===");
        await expect(fixture.page.locator("#root")).toContainText("Upload File");
        await fixture.page.getByRole("button", { name: "Upload File" }).click();
        await playwrightWrapper.loadingWebPage();
    }
    async cleanUpAnduploadfiles(jsonData: any) {
        // Verify the source name in the Connect Sources tab list and return the row number if not found then it is zero
        let sourcename = jsonData[0].SourceName;
        let presentOrNotRow =
            await playwrightWrapper.verifySourceNameDisplayedInConnectSourcesTabList(sourcename);
        console.log("Present or not==========", presentOrNotRow);
        if (presentOrNotRow !== 0) {
            console.log("Deleting the source as per the request.");
            await playwrightWrapper.deleteTheSource(presentOrNotRow);
        }

        fixture.logger.info(`After Clean up , uploading the files.`);
        await this.uploadfiles(jsonData);


    }
    async uploadfiles(jsonData: any) {

        console.log("===Click on the Upload button===");
        await expect(fixture.page.locator("#root")).toContainText("Upload File");
        await fixture.page.getByRole("button", { name: "Upload File" }).click();
        await playwrightWrapper.loadingWebPage();

        fixture.logger.info("===Navigate to upload pop up===");
        let sourceName = jsonData[0].SourceName;
        let sourceDescp = jsonData[0].sourceDesc;
        let filetypes = jsonData[0].fileType;
        let fileNames = jsonData[0].fileName;

        // Wait for and select the "New" radio button
        await fixture.page.waitForSelector('role=radio[name="New"]', {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'New' radio button to be visible...");
        await fixture.page.getByRole("radio", { name: "New" }).check();
        fixture.logger.info("Checked 'New' radio button.");

        // Wait for and fill the "Source Name" textbox
        await fixture.page.waitForSelector('role=textbox[name="Source Name"]', {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Source Name' textbox to be visible...");
        await fixture.page.getByRole("textbox", { name: "Source Name" }).click();
        fixture.logger.info("Clicked on 'Source Name' textbox.");
        await fixture.page
            .getByRole("textbox", { name: "Source Name" })
            .fill(sourceName);
        fixture.logger.info(`Filled 'Source Name' textbox with: ${sourceName}`);

        // Wait for and fill the "Source Description" textbox
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
            .fill(sourceDescp);
        fixture.logger.info(
            `Filled 'Source Description' textbox with: ${sourceDescp}`
        );

        // Verify the "File Upload" dialog
        await fixture.page.waitForSelector("role=dialog", {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'File Upload' dialog to be visible...");
        await expect(fixture.page.getByRole("dialog")).toContainText("File Upload");
        fixture.logger.info("Verified 'File Upload' dialog is visible.");

        // Verify labels
        await fixture.page.waitForSelector("#srcname-label", {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Source Name *' label to be visible...");
        await expect(fixture.page.locator("#srcname-label")).toContainText(
            "Source Name *"
        );
        fixture.logger.info("Verified 'Source Name *' label is visible.");

        await fixture.page.waitForSelector("#srcdesc-label", {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info(
            "Waiting for 'Source Description *' label to be visible..."
        );
        await expect(fixture.page.locator("#srcdesc-label")).toContainText(
            "Source Description *"
        );
        fixture.logger.info("Verified 'Source Description *' label is visible.");

        // Select the file format
        await fixture.page.waitForSelector('role=combobox[name="File Format"]', {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'File Format' combobox to be visible...");
        await fixture.page.getByRole("combobox", { name: "File Format" }).click();
        fixture.logger.info("Clicked on 'File Format' combobox.");
        await fixture.page.getByRole("option", { name: filetypes }).click();
        fixture.logger.info(`Selected file format: ${filetypes}`);

        // Locate the file input element and upload the file
        const fileInput = fixture.page.locator(
            `//input[@id='upload-import-file' and @name='file']`
        );
        fixture.logger.info("Waiting for file input element to be visible...");
        const filePath = path.resolve("e2e/resources/filesToUpload", fileNames); // Replace 'exampleFile.txt' with your file name
        await fileInput.setInputFiles(filePath);
        fixture.logger.info(`Uploaded file from: ${filePath}`);

        // Verify file upload in the dialog
        await playwrightWrapper.loadingWebPage();
        await fixture.page.waitForSelector("role=dialog", {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info(
            "Waiting for file upload confirmation in the dialog..."
        );
        await expect(fixture.page.getByRole("dialog")).toContainText(
            `Name: ${fileNames}`
        );
        fixture.logger.info(
            `Verified uploaded file name in the dialog: ${fileNames}`
        );

        // Click the "Save" button
        await fixture.page.waitForSelector('role=button[name="Save"]', {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info("Waiting for 'Save' button to be visible...");
        await fixture.page.getByRole("button", { name: "Save" }).click();
        fixture.logger.info("Clicked on 'Save' button.");

        // Verify the source name is displayed on the board
        await playwrightWrapper.loadingWebPage();
        await fixture.page.waitForSelector("#root", {
            state: "visible",
            timeout: TIMEOUT,
        });
        fixture.logger.info(
            "Waiting for the source name to appear on the board..."
        );
        await playwrightWrapper.loadingWebPage();
        await expect(fixture.page.locator("#root")).toContainText(sourceName);
        fixture.logger.info(
            `The filename entered is present on the board: ${sourceName}`
        );
        await playwrightWrapper.loadingWebPage();
    }
}
