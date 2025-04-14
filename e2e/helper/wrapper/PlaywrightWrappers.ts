import { fixture } from "@hooks/pageFixture";
import { TIMEOUT } from "playwright.config";
import { expect } from "@playwright/test";
import GlobalActions from "./GlobalActions";

let globalaction = new GlobalActions();

export default class PlaywrightWrapper {
  //locators start//

  getTheExecuteButtonOfFullLoad(rownumber: number): string {
    return `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${rownumber}]/div/div[3]//button[@type="button" and @iconcolor="execute"]`;
  }

  getCreatedSuccessMessage() {
    return `//p[contains(text(),'created successfully')]`;
  }

  //locators end

  async goto(url: string) {
    await fixture.page.goto(url, {
      waitUntil: "domcontentloaded",
    });
  }

  async click(locator: string) {
    const element = fixture.page.locator(locator);
    await element.click();
  }

  async waitAndClick(locator: string) {
    const element = fixture.page.locator(locator);
    await element.waitFor({
      state: "visible",
    });
    await element.click();
  }

  async navigateTo(link: string) {
    await Promise.all([
      //fixture.page.waitForNavigation(),
      fixture.page.click(link),
    ]);
  }

  async closeButtonJustBelowTheLoginuserName() {
    // Click the Close button just below the Loginuser Name
    await fixture.page.locator(`//a[@iconcolor='close' and @href='/']`).click();
    fixture.logger.info(
      "Clicked on 'Close' button,which is just below the Loginuser Name."
    );
    await this.loadingWebPage();
    await this.loadingWebPage();
  }

  async closeTheModel() {
    await fixture.page
      .locator(`//button[@iconcolor='close' ]//p[text()='Close']`)
      .click();
    fixture.logger.info("Clicked on 'Close' button,to close the model page");
    await this.loadingWebPage();
    await this.loadingWebPage();
  }

  async createdSuccesfullyMessage() {
    // Verify success alert
    fixture.logger.info("Waiting for success alert to be visible...");
    await this.loadingWebPage();
    await this.loadingWebPage();
    await expect(
      fixture.page.locator(this.getCreatedSuccessMessage())
    ).toContainText("created successfully");

    await globalaction.waitForElementHidden(this.getCreatedSuccessMessage());
  }
  async loadingWebPage(): Promise<void> {
    const startTime = Date.now();
    // Wait for the loader to disappear
    await fixture.page.waitForSelector(
      "//span[contains(@style,'react-spinners-RiseLoader-odd')]",
      {
        state: "hidden",
        timeout: 120_000, // 120 seconds
      }
    );
    const estimatedTime = Date.now() - startTime;
    console.log(
      `Time taken to load a webpage: ${(estimatedTime / 1000).toFixed(
        2
      )} seconds`
    );
  }

  async loadingWebPageInJob(): Promise<void> {
    const startTime = Date.now();
    // Wait for the loader to disappear
    await fixture.page.waitForSelector(
      "//span[contains(@style,'react-spinners-RiseLoader-odd')]",
      {
        state: "hidden",
        timeout: 1500_000, // 15 minutes
      }
    );
    const estimatedTime = Date.now() - startTime;
    console.log(
      `Time taken to load a webpage: ${(estimatedTime / 1000).toFixed(
        2
      )} seconds`
    );
  }
  async loadingSyncMovingIcon(): Promise<void> {
    const startTime = Date.now();
    // Wait for the loader to disappear
    await fixture.page.waitForSelector("//span[@style='display: inherit;']", {
      state: "hidden",
      timeout: 1200000, // 120 seconds
    });
    const estimatedTime = Date.now() - startTime;
    console.log(
      `Time taken for loading Sync Moving Icon: ${(
        estimatedTime / 1000
      ).toFixed(2)} seconds`
    );
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

  async getTheRowNumberFromSyncPage(sourceName: string): Promise<number> {
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
      let expectedSourceName = "XDF_" + sourceName;
      console.log("Expected source name from jsondata :-", expectedSourceName);
      fixture.logger.info(
        "Expected source name from jsondata :-",
        expectedSourceName
      );
      if (sourceNameFromUI?.trim() === expectedSourceName) {
        console.log("This is true");
        fixture.logger.info(
          `The required item is present in the row number: ${row}`
        );
        flag = row;
        break;
      } else {
        flag = 0;
      }
    }

    return flag;
  }

  async getTheRowNumberFromModelPage(modelname: string): Promise<number> {
    console.log(
      "Page Object Wrapper: Verifying that the Model name is displayed in the  tab list..."
    );
    let flag = 0;
    await this.loadingWebPage();

    // Get the number of rows displayed
    await fixture.page.waitForSelector(
      "//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div",
      { state: "visible", timeout: TIMEOUT }
    );
    fixture.logger.info(
      "Waiting for  Required Model item from the list to be visible"
    );
    const rows = fixture.page.locator(
      "//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div"
    );
    const numberOfRowsDisplayed = await rows.count();
    console.log("ROWS :-", numberOfRowsDisplayed);

    // Iterate through each row to find the  name
    for (let row = 1; row <= numberOfRowsDisplayed; row++) {
      await this.loadingWebPage();
      let modelnameElement = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${row}]/div/div/div//span//p[starts-with(text(),"X")]`;

      // Wait for the element to be available
      await fixture.page.waitForSelector(modelnameElement, {
        state: "visible",
        timeout: TIMEOUT,
      });

      const modelnameFromUI = await fixture.page
        .locator(modelnameElement)
        .textContent();
      console.log("Model name from ui :-", modelnameFromUI);
      //fixture.logger.info("Model name from ui :-", modelnameFromUI);
      let expectedmodelname = "_" + modelname;
      //console.log("Expected Model name from jsondata :-", expectedmodelname);
      //console.log("Expected Model name from jsondata :-", expectedmodelname);
      // fixture.logger.info("Expected Model name from jsondata :-", expectedmodelname);
      if (modelnameFromUI?.trim().includes(expectedmodelname)) {
        console.log("This is true");
        fixture.logger.info(
          `The required item is present in the row number: ${row}`
        );
        flag = row;
        break;
      } else {
        flag = 0;
      }
    }

    return flag;
  }

  async getTheRowNumberFromModelPage_BAK(modelname: string): Promise<number> {
    console.log(
      "Page Object Wrapper: Verifying that the Model name is displayed in the  tab list..."
    );
    let flag = 0;
    await this.loadingWebPage();

    // Get the number of rows displayed
    await fixture.page.waitForSelector(
      "//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div",
      { state: "visible", timeout: TIMEOUT }
    );
    fixture.logger.info(
      "Waiting for  Required Model item from the list to be visible"
    );
    const rows = fixture.page.locator(
      "//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div"
    );
    const numberOfRowsDisplayed = await rows.count();
    console.log("ROWS :-", numberOfRowsDisplayed);

    // Iterate through each row to find the  name
    for (let row = 1; row <= numberOfRowsDisplayed; row++) {
      await this.loadingWebPage();
      let modelnameElement = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${row}]/div/div/div//span//p[starts-with(text(),"X")]`;

      // Wait for the element to be available
      await fixture.page.waitForSelector(modelnameElement, {
        state: "visible",
        timeout: TIMEOUT,
      });

      const modelnameFromUI = await fixture.page
        .locator(modelnameElement)
        .textContent();
      console.log("Model name from ui :-", modelnameFromUI);
      //fixture.logger.info("Model name from ui :-", modelnameFromUI);
      let expectedmodelname = "_" + modelname;
      //console.log("Expected Model name from jsondata :-", expectedmodelname);
      //fixture.logger.info("Expected Model name from jsondata :-", expectedmodelname);
      if (modelnameFromUI?.trim().includes(expectedmodelname)) {
        console.log("This is true");
        fixture.logger.info(
          `The required item is present in the row number: ${row}`
        );
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
    console.log(
      "Page Object Wrapper:Source to be deleted: ",
      sourceToBedeleted
    );
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
      .locator(
        "//div[contains(@class,'MuiDialogActions-spacing')]//button[@type='button' and  @iconcolor='confirm']"
      )
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
      .locator(
        "//div[contains(@class,'MuiDialogActions-spacing')]//button[@type='button' and  @iconcolor='confirm']"
      )
      .click();
    fixture.logger.info("Clicked on the confirm button to delete the source.");
    fixture.logger.info("Waiting for success alert to be visible...");
  }

  async deleteTheModel(rownumber: number) {
    let modelToBedeleted = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${rownumber}]/div/div[3]//button[@type="button" and @iconcolor="delete"]`;
    console.log("Page Object Wrapper:model to be deleted: ", modelToBedeleted);
    await fixture.page.waitForSelector(modelToBedeleted, {
      state: "visible",
      timeout: TIMEOUT,
    });
    await fixture.page.locator(modelToBedeleted).click();
    fixture.logger.info(
      "Clicked on the delete icon for the model.",
      modelToBedeleted
    );
    await fixture.page
      .locator(
        "//div[contains(@class,'MuiDialogActions-spacing')]//button[@type='button' and  @iconcolor='confirm']"
      )
      .click();
    fixture.logger.info("Clicked on the confirm button to delete the source.");
    fixture.logger.info("Waiting for success alert to be visible...");
  }

  async performDragAndDrop(fromLocator: string, toLocator: string) {
    // Perform drag-and-drop operation
    fixture.page.locator(fromLocator).click();
    const fromElement = fixture.page.locator(fromLocator);
    const toElement = fixture.page.locator(toLocator);

    await fromElement.dragTo(toElement);
    fixture.page.locator(toLocator).click();
    fixture.logger.info(
      `Performed drag-and-drop operation from '${fromLocator}' to '${toLocator}'.`
    );
  }

  async executeModelFullLoad(rownumber: number) {
    await globalaction.waitAndClick(
      this.getTheExecuteButtonOfFullLoad(rownumber)
    );
    await this.loadingWebPage();
  }

  async verifyElementHasNoChildren(locator: string): Promise<boolean> {
    fixture.logger.info(
      `Verifying that the element '${locator}' does not contain any child elements.`
    );

    // Locate the parent element
    const parentElement = fixture.page.locator(locator);

    // Get the count of child elements
    const childCount = await parentElement.locator("*").count();

    // Log the result
    if (childCount === 0) {
      fixture.logger.info(
        `The element '${locator}' does not contain any child elements.`
      );
      return true;
    } else {
      fixture.logger.info(
        `The element '${locator}' contains ${childCount} child elements.`
      );
      return false;
    }
  }

    // Inject JavaScript for the mouse highlighter
    async injectMouseHighlighter(): Promise<void> {
        await fixture.page.evaluate(() => {
            const highlight = document.createElement("div");
            highlight.id = "mouse-highlighter";
            Object.assign(highlight.style, {
                width: "15px",
                height: "15px",
                backgroundColor: "yellow",
                border: "2px solid red",
                borderRadius: "50%",
                position: "absolute",
                zIndex: "9999",
                pointerEvents: "none",
                display: "none", // Initially hidden
                transition: "opacity 0.3s ease-in-out",
            });
            document.body.appendChild(highlight);
        });

        // Function to show the highlighter at the click position
        await fixture.page.evaluate(() => {
            document.addEventListener("click", (event) => {
                const highlighter = document.getElementById("mouse-highlighter");
                if (highlighter) {
                    highlighter.style.left = `${event.clientX - 7}px`; // Center it
                    highlighter.style.top = `${event.clientY - 7}px`;
                    highlighter.style.display = "block";
                    highlighter.style.opacity = "1";
                    setTimeout(() => {
                        highlighter.style.opacity = "0";
                    }, 300); // Fade effect
                    setTimeout(() => {
                        highlighter.style.display = "none";
                    }, 600); // Hide it
                }
            });
        });
    }

  async sleepForSometime(interval: number) {
    // Wait for the interval 
    console.log(`sleeping start ............`)
    await new Promise((resolve) => setTimeout(resolve, interval));
    console.log(`sleeping end, ............`)
  }

  anonymousSleep = async (interval: number) => {
    console.log(`======Anonymous sleep ==========`)
    await this.sleepForSometime(interval);
};

  async getTheRowNumberFromPipelinePage(pipename: string): Promise<number> {
    console.log(
      "Page Object Wrapper: Verifying that the pipe name is displayed in the  tab list..."
    );
    let flag = 0;
    await this.loadingWebPage();

    // Get the number of rows displayed
    await fixture.page.waitForSelector(
      "//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div",
      { state: "visible", timeout: TIMEOUT }
    );
    fixture.logger.info(
      "Waiting for  Required pipe item from the list to be visible"
    );
    const rows = fixture.page.locator(
      "//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div"
    );
    const numberOfRowsDisplayed = await rows.count();
    console.log("ROWS :-", numberOfRowsDisplayed);

    // Iterate through each row to find the  name
    for (let row = 1; row <= numberOfRowsDisplayed; row++) {
      await this.loadingWebPage();
      let pipenameElement = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${row}]//div[@class="MuiBox-root css-1vvzdoa"]//p`;

      // Wait for the element to be available
      await fixture.page.waitForSelector(pipenameElement, {
        state: "visible",
        timeout: TIMEOUT,
      });

      const pipenameFromUI = await fixture.page
        .locator(pipenameElement)
        .textContent();
      console.log("pipe name from ui :-", pipenameFromUI);
      //fixture.logger.info("pipe name from ui :-", pipenameFromUI);
      let expectedpipename =  pipename;
      //console.log("Expected pipe name from jsondata :-", expectedpipename);
      //console.log("Expected pipe name from jsondata :-", expectedpipename);
      // fixture.logger.info("Expected pipe name from jsondata :-", expectedpipename);
      if (pipenameFromUI?.trim().includes(expectedpipename)) {
        console.log("This is true");
        fixture.logger.info(
          `The required item is present in the row number: ${row}`
        );
        flag = row;
        break;
      } else {
        flag = 0;
      }
    }

    return flag;
  }

  async deleteThePipeline(rownumber: number) {
    let pipeToBedeleted = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${rownumber}]//span[@aria-label='Delete Pipeline']/button`;
    console.log(
      "Page Object Wrapper:pipe to be deleted: ",
      pipeToBedeleted
    );
    await fixture.page.waitForSelector(pipeToBedeleted, {
      state: "visible",
      timeout: TIMEOUT,
    });
    await fixture.page.locator(pipeToBedeleted).click();
    fixture.logger.info(
      "Clicked on the delete icon for the pipe.",
      pipeToBedeleted
    );
    await fixture.page
      .locator(
        "//div[contains(@class,'MuiDialogActions-spacing')]//button[@type='button' and  @iconcolor='confirm']"
      )
      .click();
    fixture.logger.info("Clicked on the confirm button to delete the pipe.");
    fixture.logger.info("Waiting for success alert to be visible...");
  }
  getTheMonitorPipelineButton(rownumber: number): string {
    return `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${rownumber}]/div/div[3]//span[@aria-label="Monitor Pipeline"]/a`;
  }
 async clickOnMonitorPipeline(rownumber:number){
  await globalaction.waitAndClick(this.getTheMonitorPipelineButton(rownumber));

 }

 async closeThePipeline() {
  await fixture.page
    .locator(`//button[@iconcolor='close' ]//p[text()='Close']`)
    .click();
  fixture.logger.info("Clicked on 'Close' button,to close the pipeline page");
  await this.loadingWebPage();
  await this.loadingWebPage();
}

}

