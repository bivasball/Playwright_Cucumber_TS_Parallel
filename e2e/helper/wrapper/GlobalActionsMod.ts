import { expect } from "@playwright/test";
import { fixture } from "@hooks/pageFixture";
import { TIMEOUT } from "playwright.config";

export default class GlobalActions {

    async click(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Clicking on element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.click({ timeout: TIMEOUT });
    }

    async clickForce(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Clicking on element by force: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.click({ force: true, timeout: TIMEOUT });
    }

    async waitAndClick(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Waiting for element to be visible and clicking: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.waitFor({ state: "visible", timeout: TIMEOUT });
        await element.click({ timeout: TIMEOUT });
    }

    async fillInput(locator: string, value: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Filling input field: ${locator} with value: ${value}`);
        const element = fixture.page.locator(locator);
        await element.fill(value, { timeout: TIMEOUT });
    }

    async waitAndFillInput(locator: string, value: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Waiting for input field: ${locator} to be visible and filling with value: ${value}`);
        const element = fixture.page.locator(locator);
        await element.waitFor({ state: "visible", timeout: TIMEOUT });
        await element.fill(value, { timeout: TIMEOUT });
    }

    async typeWithDelay(locator: string, value: string, delay: number = 100, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Typing into input field: ${locator} with value: ${value} and delay: ${delay}ms per keystroke`);
        const element = fixture.page.locator(locator);
        await element.waitFor({ state: "visible", timeout: TIMEOUT });
        await element.type(value, { delay });
    }


    async selectDropdownByValue(locator: string, value: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Selecting dropdown by value: ${value} for locator: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.selectOption({ value }, { timeout: TIMEOUT });
    }

    async selectDropdownByLabel(locator: string, label: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Selecting dropdown by label: ${label} for locator: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.selectOption({ label }, { timeout: TIMEOUT });
    }

    async hover(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Hovering over element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.hover({ timeout: TIMEOUT });
    }

    async doubleClick(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Double-clicking on element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.dblclick({ timeout: TIMEOUT });
    }

    async rightClick(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Right-clicking on element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.click({ button: "right", timeout: TIMEOUT });
    }

    async checkCheckbox(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Checking checkbox: ${locator}`);
        const element = fixture.page.locator(locator);
        if (!(await element.isChecked())) {
            await element.check({ timeout: TIMEOUT });
        }
    }

    async uncheckCheckbox(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Unchecking checkbox: ${locator}`);
        const element = fixture.page.locator(locator);
        if (await element.isChecked()) {
            await element.uncheck({ timeout: TIMEOUT });
        }
    }
    async waitForElementVisible(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Waiting for element to be visible: ${locator}`);
        await fixture.page.locator(locator).waitFor({ state: "visible", timeout: TIMEOUT });
    }

    async waitForElementHidden(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Waiting for element to be hidden: ${locator}`);
        await fixture.page.locator(locator).waitFor({ state: "hidden", timeout: TIMEOUT });
    }

    async waitForElementAttached(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Waiting for element to be Attached: ${locator}`);
        await fixture.page.locator(locator).waitFor({ state: "attached", timeout: TIMEOUT });
    }

    async getTextContent(locator: string, message?: string): Promise<string | null> {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Getting text content of element: ${locator}`);
        const element = fixture.page.locator(locator);
        return await element.textContent({ timeout: TIMEOUT });
    }

    async getAttributeValue(locator: string, attribute: string, message?: string): Promise<string | null> {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Getting attribute '${attribute}' of element: ${locator}`);
        const element = fixture.page.locator(locator);
        return await element.getAttribute(attribute, { timeout: TIMEOUT });
    }

    async dragAndDrop(fromLocator: string, toLocator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Performing drag-and-drop from '${fromLocator}' to '${toLocator}'`);
        const fromElement = fixture.page.locator(fromLocator);
        const toElement = fixture.page.locator(toLocator);
        await fromElement.dragTo(toElement, { timeout: TIMEOUT });
    }

    async scrollToElement(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Scrolling to element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.scrollIntoViewIfNeeded({ timeout: TIMEOUT });
    }

    async waitForNavigation(message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info("Waiting for navigation to complete...");
        await fixture.page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: TIMEOUT });
    }
    async waitForURL(url: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Waiting for URL to match: ${url}`);
        await fixture.page.waitForURL(url, { timeout: TIMEOUT });
    }

    async pressKey(locator: string, key: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Pressing key '${key}' on element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.press(key, { timeout: TIMEOUT });
    }

    async keyBoard(key: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Pressing key '${key}'`);
        await fixture.page.keyboard.press(key);
    }

    async focus(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Focusing on element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.focus({ timeout: TIMEOUT });
    }

    async clearInput(locator: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Clearing input field: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.fill("", { timeout: TIMEOUT });
    }

    async isElementVisible(locator: string, message?: string): Promise<boolean> {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Checking if element is visible: ${locator}`);
        return await fixture.page.locator(locator).isVisible({ timeout: TIMEOUT });
    }

    async isElementEnabled(locator: string, message?: string): Promise<boolean> {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Checking if element is enabled: ${locator}`);
        return await fixture.page.locator(locator).isEnabled({ timeout: TIMEOUT });
    }

    async isElementChecked(locator: string, message?: string): Promise<boolean> {
        if (message) {
            fixture.logger.info(message);
        }
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

    async uploadFile(locator: string, filePath: string, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Uploading file '${filePath}' to element: ${locator}`);
        const element = fixture.page.locator(locator);
        await element.setInputFiles(filePath, { timeout: TIMEOUT });
    }

    async downloadFile(locator: string, message?: string): Promise<string> {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Downloading file from element: ${locator}`);
        const [download] = await Promise.all([
            fixture.page.waitForEvent("download", { timeout: TIMEOUT }),
            fixture.page.locator(locator).click({ timeout: TIMEOUT }),
        ]);
        return await download.path();
    }

    async waitForNetworkIdle(message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info("Waiting for network to be idle...");
        await fixture.page.waitForLoadState("networkidle", { timeout: TIMEOUT });
    }

    async scrollHorizontally(locator: string, deltaX: number, deltaY: number = 0, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        const slider = fixture.page.locator(locator);
        await slider.scrollIntoViewIfNeeded();
        fixture.logger.info(`Scrolling horizontally by: ${deltaX} pixels`);
        await fixture.page.mouse.wheel(deltaX, deltaY);
    }

    async holdKeyFor(key: string, duration: number, message?: string): Promise<void> {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Pressing and holding key "${key}" for ${duration} milliseconds.`);
        await fixture.page.keyboard.down(key);
        await fixture.page.waitForTimeout(duration);
        await fixture.page.keyboard.up(key);
    }

    async scrollVerticallyWithoutAnyLocator(deltaX: number = 0, deltaY: number, message?: string) {
        if (message) {
            fixture.logger.info(message);
        }
        fixture.logger.info(`Scrolling horizontally by: ${deltaX} pixels`);
        await fixture.page.mouse.wheel(deltaX, deltaY);
    }


}