import { expect } from "@playwright/test";
import { fixture } from "@hooks/pageFixture";
import { TIMEOUT } from "playwright.config";

export default class GlobalActions {

    async click(locator: string) {
        fixture.logger.info(`Clicking on element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.click({ timeout: TIMEOUT });
    }

    async waitAndClick(locator: string) {
        fixture.logger.info(`Waiting for element to be visible and clicking: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.waitFor({ state: "visible", timeout: TIMEOUT });
        await element.click({ timeout: TIMEOUT });
    }

    async fillInput(locator: string, value: string) {
        fixture.logger.info(`Filling input field: ${locator} with value: ${value}`);
        const element = fixture.page.locator(locator);
        await element.fill(value, { timeout: TIMEOUT });
    }

    async waitAndFillInput(locator: string, value: string) {
        fixture.logger.info(`Waiting for input field: ${locator} to be visible and filling with value: ${value}`);
        const element = fixture.page.locator(locator);
        await element.waitFor({ state: "visible", timeout: TIMEOUT });
        await element.fill(value, { timeout: TIMEOUT });
    }


    async typeWithDelay(locator: string, value: string, delay: number = 100) {
        fixture.logger.info(`Typing into input field: ${locator} with value: ${value} and delay: ${delay}ms per keystroke`);
        const element = fixture.page.locator(locator);
        await element.waitFor({ state: "visible", timeout: TIMEOUT });
        await element.type(value, { delay });
    }




    async selectDropdownByValue(locator: string, value: string) {
        fixture.logger.info(`Selecting dropdown by value: ${value} for locator: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.selectOption({ value }, { timeout: TIMEOUT });
    }

    async selectDropdownByLabel(locator: string, label: string) {
        fixture.logger.info(`Selecting dropdown by label: ${label} for locator: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.selectOption({ label }, { timeout: TIMEOUT });
    }

    async hover(locator: string) {
        fixture.logger.info(`Hovering over element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.hover({ timeout: TIMEOUT });
    }

    async doubleClick(locator: string) {
        fixture.logger.info(`Double-clicking on element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.dblclick({ timeout: TIMEOUT });
    }

    async rightClick(locator: string) {
        fixture.logger.info(`Right-clicking on element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.click({ button: "right", timeout: TIMEOUT });
    }

    async checkCheckbox(locator: string) {
        fixture.logger.info(`Checking checkbox: ${locator}`);
        const element = fixture.page.locator(locator);
        if (!(await element.isChecked())) {
            await element.check({ timeout: TIMEOUT });
        }
    }

    async uncheckCheckbox(locator: string) {
        fixture.logger.info(`Unchecking checkbox: ${locator}`);
        const element = fixture.page.locator(locator);
        if (await element.isChecked()) {
            await element.uncheck({ timeout: TIMEOUT });
        }
    }

    async waitForElementVisible(locator: string) {
        fixture.logger.info(`Waiting for element to be visible: ${locator}`);
        await fixture.page.locator(locator).waitFor({ state: "visible", timeout: TIMEOUT });
    }

    async waitForElementHidden(locator: string) {
        fixture.logger.info(`Waiting for element to be hidden: ${locator}`);
        await fixture.page.locator(locator).waitFor({ state: "hidden", timeout: TIMEOUT });
    }

    async getTextContent(locator: string): Promise<string | null> {
        fixture.logger.info(`Getting text content of element: ${locator}`);
        const element = fixture.page.locator(locator);
        return await element.textContent({ timeout: TIMEOUT });
    }

    async getAttributeValue(locator: string, attribute: string): Promise<string | null> {
        fixture.logger.info(`Getting attribute '${attribute}' of element: ${locator}`);
        const element = fixture.page.locator(locator);
        return await element.getAttribute(attribute, { timeout: TIMEOUT });
    }

    async dragAndDrop(fromLocator: string, toLocator: string) {
        fixture.logger.info(`Performing drag-and-drop from '${fromLocator}' to '${toLocator}'`);
        const fromElement = fixture.page.locator(fromLocator);
        const toElement = fixture.page.locator(toLocator);
        await fromElement.dragTo(toElement, { timeout: TIMEOUT });
    }

    async scrollToElement(locator: string) {
        fixture.logger.info(`Scrolling to element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.scrollIntoViewIfNeeded({ timeout: TIMEOUT });
    }

    async waitForNavigation() {
        fixture.logger.info("Waiting for navigation to complete...");
        await fixture.page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: TIMEOUT });
    }

    async waitForURL(url: string) {
        fixture.logger.info(`Waiting for URL to match: ${url}`);
        await fixture.page.waitForURL(url, { timeout: TIMEOUT });
    }

    async pressKey(locator: string, key: string) {
        fixture.logger.info(`Pressing key '${key}' on element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.press(key, { timeout: TIMEOUT });
    }

    async focus(locator: string) {
        fixture.logger.info(`Focusing on element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.focus({ timeout: TIMEOUT });
    }

    async clearInput(locator: string) {
        fixture.logger.info(`Clearing input field: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.fill("", { timeout: TIMEOUT });
    }

    async isElementVisible(locator: string): Promise<boolean> {
        fixture.logger.info(`Checking if element is visible: ${locator}`);
        return await fixture.page.locator(locator).isVisible({ timeout: TIMEOUT });
    }

    async isElementEnabled(locator: string): Promise<boolean> {
        fixture.logger.info(`Checking if element is enabled: ${locator}`);
        return await fixture.page.locator(locator).isEnabled({ timeout: TIMEOUT });
    }

    async isElementChecked(locator: string): Promise<boolean> {
        fixture.logger.info(`Checking if element is checked: ${locator}`);
        return await fixture.page.locator(locator).isChecked({ timeout: TIMEOUT });
    }

    async handleAlert(action: "accept" | "dismiss", text?: string) {
        fixture.logger.info(`Handling alert with action: '${action}'`);
        fixture.page.on("dialog", async (dialog) => {
            if (text) {
                fixture.logger.info(`Verifying alert text: ${dialog.message()}`);
                expect(dialog.message()).toContain(text);
            }
            action === "accept" ? await dialog.accept() : await dialog.dismiss();
        });
    }

    async uploadFile(locator: string, filePath: string) {
        fixture.logger.info(`Uploading file '${filePath}' to element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.setInputFiles(filePath, { timeout: TIMEOUT });
    }

    async downloadFile(locator: string): Promise<string> {
        fixture.logger.info(`Downloading file from element: ${locator}`);
        const [download] = await Promise.all([
            fixture.page.waitForEvent("download", { timeout: TIMEOUT }),
            fixture.page.locator(locator).click({ timeout: TIMEOUT }),
        ]);
        return await download.path();
    }

    async waitForNetworkIdle() {
        fixture.logger.info("Waiting for network to be idle...");
        await fixture.page.waitForLoadState("networkidle", { timeout: TIMEOUT });
    }

}