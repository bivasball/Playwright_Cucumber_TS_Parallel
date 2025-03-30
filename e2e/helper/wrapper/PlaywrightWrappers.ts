import { Page } from "@playwright/test";
import { fixture } from "@hooks/pageFixture";

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

    async  loadingWebPage(): Promise<void> {
      const startTime = Date.now();
      // Wait for the loader to disappear
      await fixture.page.waitForSelector("//span[contains(@style,'react-spinners-RiseLoader-odd')]", {
          state: "hidden",
          timeout: 1200000, // 120 seconds
      });
      const estimatedTime = Date.now() - startTime;
      console.log(`Time taken to load a webpage: ${(estimatedTime / 1000).toFixed(2)} seconds`);
    }
}