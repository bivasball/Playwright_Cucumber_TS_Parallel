import { fixture } from "@hooks/pageFixture";
import { TIMEOUT } from "playwright.config";
import { expect } from "@playwright/test";
import GlobalActions from "./GlobalActions";

let globalaction = new GlobalActions();

export default class PlaywrightWrapper {

  public multipleTab: any;
  public allPages: any;
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

    let thisNode = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]`;

    let hasChildOrNot = await this.verifyElementHasChildren(thisNode);
    console.log(`This node has child which is:`, hasChildOrNot);

    if (hasChildOrNot > 0) {
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
    } else {
      console.log(`This node does not have any child,cleanup not required`);
      flag = 0
    }
    return flag;
  }

  async getTheRowNumberFromSyncPage(sourceName: string): Promise<number> {
    console.log(
      "Page Object Wrapper: Verifying that the source name is displayed in the  tab list..."
    );
    let flag = 0;
    await this.loadingWebPage();


    let thisNode = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]`;

    let hasChildOrNot = await this.verifyElementHasChildren(thisNode);
    console.log(`This node has child which is:`, hasChildOrNot);

    if (hasChildOrNot > 0) {
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

        const sourceNameFromUI = await fixture.page.locator(sourceNameElement).textContent();
        console.log("source name from ui :-", sourceNameFromUI);
        fixture.logger.info("source name from ui :-", sourceNameFromUI);
        let expectedSourceName = "XDF_" + sourceName;
        console.log("Expected source name from jsondata :-", expectedSourceName);
        fixture.logger.info("Expected source name from jsondata :-", expectedSourceName
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
    } else {
      console.log(`This node does not have any child,cleanup not required`);
      flag = 0
    }
    return flag;
  }

  async getTheRowNumberFromModelPage(modelname: string): Promise<number> {
    console.log(
      "Page Object Wrapper: Verifying that the Model name is displayed in the  tab list..."
    );
    let flag = 0;
    await this.loadingWebPage();

    let thisNode = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]`;

    let hasChildOrNot = await this.verifyElementHasChildren(thisNode);
    console.log(`This node has child which is:`, hasChildOrNot);

    if (hasChildOrNot > 0) {
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
    } else {
      console.log(`This node does not have any child,cleanup not required`);
      flag = 0
    }
    return flag;
  }
  async getTheRowNumberFromRolePage(modelname: string): Promise<number> {
    console.log(
      "Page Object Wrapper: Verifying that the Model name is displayed in the  tab list..."
    );
    let flag = 0;
    await this.loadingWebPage();

    let thisNode = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]`;

    let hasChildOrNot = await this.verifyElementHasChildren(thisNode);
    console.log(`This node has child which is:`, hasChildOrNot);

    if (hasChildOrNot > 0) {
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
    } else {
      console.log(`This node does not have any child,cleanup not required`);
      flag = 0
    }
    return flag;
  }
  async getTheRowNumberFromInputPage2(modelname: string): Promise<number> {
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
      let TemplatenameElement = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${row}]/div/div/div//span//p[starts-with(text(),"X")]`;

      // Wait for the element to be available
      await fixture.page.waitForSelector(TemplatenameElement, {
        state: "visible",
        timeout: TIMEOUT,
      });

      const modelnameFromUI = await fixture.page
        .locator(TemplatenameElement)
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


    // Verify success alert
    fixture.logger.info("Waiting for success alert to be visible...");
    //await this.loadingWebPage();
    await expect(fixture.page.locator(`//p[contains(@class,"css-16kpwfw")]`)).toContainText("deleted successfully", { timeout: TIMEOUT });
    await globalaction.waitForElementHidden(`//p[contains(@class,"css-16kpwfw")]`);
    await this.loadingWebPage();

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
  async deleteTherole(rownumber: number) {
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

  async smoothDrag(fromSelector: string, toSelector: string) {
    const fromElement = fixture.page.locator(fromSelector);
    const toElement = fixture.page.locator(toSelector);

    const fromBoundingBox = await fromElement.boundingBox();
    const toBoundingBox = await toElement.boundingBox();

    if (fromBoundingBox && toBoundingBox) {
      const startX = fromBoundingBox.x + fromBoundingBox.width / 2;
      const startY = fromBoundingBox.y + fromBoundingBox.height / 2;

      const endX = toBoundingBox.x + toBoundingBox.width / 2;
      const endY = toBoundingBox.y + toBoundingBox.height / 2;

      // Simulate smooth dragging
      await fixture.page.mouse.move(startX, startY);
      await fixture.page.mouse.down(); // Start dragging

      const steps = 20; // Define number of steps for smooth movement
      for (let i = 0; i <= steps; i++) {
        const x = startX + ((endX - startX) / steps) * i;
        const y = startY + ((endY - startY) / steps) * i;
        await fixture.page.mouse.move(x, y);
      }

      await fixture.page.mouse.up(); // Release dragging
    } else {
      throw new Error("Failed to retrieve bounding boxes for the elements.");
    }
  }


  async executeModelFullLoad(rownumber: number) {
    await globalaction.waitAndClick(
      this.getTheExecuteButtonOfFullLoad(rownumber)
    );
    await this.loadingWebPage();
  }

  async verifyElementHasChildren(locator: string): Promise<number> {
    fixture.logger.info(
      `Verifying that the element '${locator}' has any child elements or not ? `
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
      return 0;
    } else {
      fixture.logger.info(
        `The element '${locator}' contains ${childCount} child elements.`
      );
      return 1;
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
    //console.log(`sleeping start ............`)
    await new Promise((resolve) => setTimeout(resolve, interval));
    // console.log(`sleeping end, ............`)
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
    let thisNode = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]`;

    let hasChildOrNot = await this.verifyElementHasChildren(thisNode);
    console.log(`This node has child which is:`, hasChildOrNot);

    if (hasChildOrNot > 0) {


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
        let expectedpipename = pipename;
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
    } else {
      console.log(`This node does not have any child,cleanup not required`);
      flag = 0
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
  async clickOnMonitorPipeline(rownumber: number) {
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


  async moveTheElementToSomeCoordinates(locateTheelement: string, xaxis: number, yaxis: number) {
    const locator = fixture.page.locator(locateTheelement);
    const boxBefore = await locator.boundingBox();
    fixture.logger.info(`Before Move - X: ${boxBefore?.x}, Y: ${boxBefore?.y}`);

    // Move element by updating its style
    await locator.evaluate((element: HTMLElement, args: { x: number; y: number }) => {
      /*
      // Add smooth transition effect
      element.style.transition = 'transform 2s ease-in-out';
      element.style.transform = `translate(${args.x}px, ${args.y}px)`;
      */
      element.style.transition = 'transform 2s ease-in-out';
      element.style.position = "absolute"; // Ensure absolute positioning
      element.style.left = `${args.x}px`;
      element.style.top = `${args.y}px`;


      return element;
    }, { x: xaxis, y: yaxis });

    const boxAfter = await locator.boundingBox();
    fixture.logger.info(`After Move - X: ${boxAfter?.x}, Y: ${boxAfter?.y}`);
    // Logging the movement
    fixture.logger.info(`Element '${locateTheelement}' moved by X: ${xaxis}px, Y: ${yaxis}px`);
    console.log(`Element '${locateTheelement}' moved by X: ${xaxis}px, Y: ${yaxis}px`);
    await fixture.page.waitForTimeout(2000);

    //Repaint the Element (Without Reloading the Page)
    await locator.evaluate((element) => {
      element.style.display = "none"; // Hide it temporarily   
      (element as HTMLElement).offsetHeight; // Trigger reflow
      element.style.display = "block"; // Show it again
    });

    //If nothing else works, removing and reinserting the element forces a full repaint:
    await locator.evaluate((element) => {
      const parent = element.parentElement;
      if (parent) {
        parent.removeChild(element);
        parent.appendChild(element);
      }
    });
    await fixture.page.waitForTimeout(2000);
  }

  async moveTheElementToSomeCoordinatesWithClickHoldRelease(locateTheelement: string, xaxis: number, yaxis: number) {
    const locator = fixture.page.locator(locateTheelement);
    const boxBefore = await locator.boundingBox();
    fixture.logger.info(`Before Move - X: ${boxBefore?.x}, Y: ${boxBefore?.y}`);

    if (boxBefore) {
      // Move mouse to the element
      await fixture.page.mouse.move(boxBefore.x + boxBefore.width / 2, boxBefore.y + boxBefore.height / 2);

      // Click and hold the element
      await fixture.page.mouse.down();

      // Slowly move the element by dragging
      await fixture.page.mouse.move(boxBefore.x + xaxis, boxBefore.y + yaxis, { steps: 30 }); // Smooth movement

      // Release the mouse click
      await fixture.page.mouse.up();

      await fixture.page.waitForTimeout(2000);

      const boxAfter = await locator.boundingBox();
      fixture.logger.info(`After Move - X: ${boxAfter?.x}, Y: ${boxAfter?.y}`);

      // Logging the movement
      fixture.logger.info(`Element '${locateTheelement}' moved by X: ${xaxis}px, Y: ${yaxis}px`);
      console.log(`Element '${locateTheelement}' moved by X: ${xaxis}px, Y: ${yaxis}px`);

      // Repaint the element (Without Reloading the Page)
      await locator.evaluate((element) => {
        element.style.display = "none"; // Hide it temporarily   
        (element as HTMLElement).offsetHeight; // Trigger reflow
        element.style.display = "block"; // Show it again
      });

      // If nothing else works, removing and reinserting the element forces a full repaint:
      await locator.evaluate((element) => {
        const parent = element.parentElement;
        if (parent) {
          parent.removeChild(element);
          parent.appendChild(element);
        }
      });

      await fixture.page.waitForTimeout(2000);
    }
  }



  async moveElementWithSmoothDraggingAndRepaint(locateTheelement: string, xaxis: number, yaxis: number) {
    const locator = fixture.page.locator(locateTheelement);
    const boxBefore = await locator.boundingBox();
    fixture.logger.info(`Before Move - X: ${boxBefore?.x}, Y: ${boxBefore?.y}`);

    if (boxBefore) {
      // Move element via styling
      await locator.evaluate((element: HTMLElement, args: { xChange: number; yChange: number }) => {
        const currentX = element.getBoundingClientRect().left;
        const currentY = element.getBoundingClientRect().top;

        element.style.position = "absolute";
        element.style.left = `${currentX + args.xChange}px`;
        element.style.top = `${currentY + args.yChange}px`;
      }, { xChange: xaxis, yChange: yaxis });


      await fixture.page.waitForTimeout(500); // Short delay before proceeding with mouse drag



      await fixture.page.waitForTimeout(2000);

      const boxAfter = await locator.boundingBox();
      fixture.logger.info(`After Move - X: ${boxAfter?.x}, Y: ${boxAfter?.y}`);

      // Logging the movement
      fixture.logger.info(
        `Element '${locateTheelement}' moved by X: ${xaxis}px, Y: ${yaxis}px`
      );
      console.log(
        `Element '${locateTheelement}' moved by X: ${xaxis}px, Y: ${yaxis}px`
      );

      // Repaint the element (Without Reloading the Page)
      await locator.evaluate((element) => {
        element.style.display = "none"; // Hide it temporarily
        (element as HTMLElement).offsetHeight; // Trigger reflow
        element.style.display = "block"; // Show it again
      });

      // If nothing else works, removing and reinserting the element forces a full repaint:
      await locator.evaluate((element) => {
        const parent = element.parentElement;
        if (parent) {
          parent.removeChild(element);
          parent.appendChild(element);
        }
      });

      await fixture.page.waitForTimeout(2000);
    }
  }


  async getTheRowNumberIfTheRequireTextIsPresent(
    parentWebElement: string,
    webElementPart: string,
    expectedItem: string
  ): Promise<number> {
    await this.loadingWebPage();
    await fixture.page.waitForSelector(parentWebElement, { state: "visible", timeout: TIMEOUT });
    fixture.logger.info("Waiting for the required item to be visible");
    const rows = fixture.page.locator(parentWebElement);
    const numberOfRowsDisplayed = await rows.count();
    for (let row = 1; row <= numberOfRowsDisplayed; row++) {
      await this.loadingWebPage();
      const requirednameElement = `${parentWebElement}[${row}]${webElementPart}`;
      const locator = fixture.page.locator(requirednameElement);
      await locator.waitFor({ state: "visible", timeout: TIMEOUT });
      const nameFromUI = await locator.textContent();
      console.log(`Row value from UI: ${nameFromUI}`);

      if (nameFromUI?.trim().includes(expectedItem)) {
        fixture.logger.info(`The required item is present in row number: ${row}`);
        return row;
      }
    }
    return 0;
  }


  async getTheRowNumberFromInputPage(Inputname: string): Promise<number> {
    console.log(
      "Page Object Wrapper: Verifying that the Input name is displayed in the  tab list..."
    );
    let flag = 0;
    await this.loadingWebPage();
    await this.anonymousSleep(5000);
    let thisNode = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]`;

    let hasChildOrNot = await this.verifyElementHasChildren(thisNode);
    console.log(`This INPUT node has child which is:`, hasChildOrNot);

    if (hasChildOrNot > 0) {
      // Get the number of rows displayed
      await fixture.page.waitForSelector(
        "//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div",
        { state: "visible", timeout: TIMEOUT }
      );
      fixture.logger.info(
        "Waiting for  Required Input item from the list to be visible"
      );
      const rows = fixture.page.locator(
        "//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div"
      );
      const numberOfRowsDisplayed = await rows.count();
      console.log("ROWS :-", numberOfRowsDisplayed);

      // Iterate through each row to find the  name
      for (let row = 1; row <= numberOfRowsDisplayed; row++) {
        await this.loadingWebPage();
        let InputnameElement = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${row}]/div/div/div//span//p`;

        // Wait for the element to be available
        await fixture.page.waitForSelector(InputnameElement, {
          state: "visible",
          timeout: TIMEOUT,
        });

        const InputnameFromUI = await fixture.page
          .locator(InputnameElement)
          .textContent();
        console.log("Input name from ui :-", InputnameFromUI);
        //fixture.logger.info("Input name from ui :-", InputnameFromUI);
        let expectedInputname = Inputname;
        //console.log("Expected Input name from jsondata :-", expectedInputname);
        //console.log("Expected Input name from jsondata :-", expectedInputname);
        // fixture.logger.info("Expected Input name from jsondata :-", expectedInputname);
        if (InputnameFromUI?.trim().includes(expectedInputname)) {
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
    } else {
      console.log(`This node does not have any child,cleanup not required`);
      flag = 0
    }
    return flag;
  }

  async deleteTheInputItemFromInputPage(rownumber: number) {
    let InputItemToBedeleted = `//div[contains(@class,'MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3')]/div[${rownumber}]/div/div[3]//button[@type="button" and @iconcolor="delete"]`;
    console.log("Page Object Wrapper:InputItem to be deleted: ", InputItemToBedeleted);
    await fixture.page.waitForSelector(InputItemToBedeleted, {
      state: "visible",
      timeout: TIMEOUT,
    });
    await fixture.page.locator(InputItemToBedeleted).click();
    fixture.logger.info(
      "Clicked on the delete icon for the InputItem.",
      InputItemToBedeleted
    );
    await fixture.page
      .locator(
        "//div[contains(@class,'MuiDialogActions-spacing')]//button[@type='button' and  @iconcolor='confirm']"
      )
      .click();
    fixture.logger.info("Clicked on the confirm button to delete the source.");
    fixture.logger.info("Waiting for success alert to be visible...");
    await globalaction.waitForElementHidden(`//p[contains(text(),'deleted successfully')]`);
  }

  async getTheRowNumberFromDataSetPage(DataSetname: string): Promise<number> {
    console.log(
      "Page Object Wrapper: Verifying that the DataSet name is displayed in the  tab list..."
    );
    let flag = 0;
    await this.loadingWebPage();

    let thisNode = `//tbody[@role="rowgroup"]`;

    let hasChildOrNot = await this.verifyElementHasChildren(thisNode);
    console.log(`This node has child which is:`, hasChildOrNot);

    if (hasChildOrNot > 0) {
      // Get the number of rows displayed
      await fixture.page.waitForSelector(
        `//tbody[@role="rowgroup"]/tr`,
        { state: "visible", timeout: TIMEOUT }
      );
      fixture.logger.info(
        "Waiting for  Required DataSet item from the list to be visible"
      );
      const rows = fixture.page.locator(
        `//tbody[@role="rowgroup"]/tr`
      );
      const numberOfRowsDisplayed = await rows.count();
      console.log("ROWS :-", numberOfRowsDisplayed);

      // Iterate through each row to find the  name
      for (let row = 1; row <= numberOfRowsDisplayed; row++) {
        await this.loadingWebPage();
        let DataSetnameElement = `//tbody[@role="rowgroup"]/tr[${row}]/td[2]//a`;

        // Wait for the element to be available
        await fixture.page.waitForSelector(DataSetnameElement, {
          state: "visible",
          timeout: TIMEOUT,
        });

        const DataSetnameFromUI = await fixture.page
          .locator(DataSetnameElement)
          .textContent();
        console.log("DataSet name from ui :-", DataSetnameFromUI);
        //fixture.logger.info("DataSet name from ui :-", DataSetnameFromUI);
        let expectedDataSetname = DataSetname;
        //console.log("Expected DataSet name from jsondata :-", expectedDataSetname);
        //console.log("Expected DataSet name from jsondata :-", expectedDataSetname);
        // fixture.logger.info("Expected DataSet name from jsondata :-", expectedDataSetname);
        if (DataSetnameFromUI?.trim().includes(expectedDataSetname)) {
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
    } else {
      console.log(`This node does not have any child,cleanup not required`);
      flag = 0
    }
    return flag;
  }


  async getTheRowNumberFromChartPage(Chartname: string): Promise<number> {
    console.log(
      "Page Object Wrapper: Verifying that the Chart name is displayed in the  tab list..."
    );
    let flag = 0;
    await this.loadingWebPage();

    let thisNodeAttribut = `//div[contains(@class,"chart-list-view")]//div[@class="header"]/following-sibling::div`;
    let thisNodeAttributValue = fixture.page.locator(thisNodeAttribut).getAttribute("class");
    if ((await thisNodeAttributValue).match("body empty")) {
      console.log("This is empty body, so no need to check for the child element")
      return 0;
    } else {


      // Get the number of rows displayed
      await fixture.page.waitForSelector(
        `//div[@class="superset-list-view chart-list-view"]//div[@class="body "]/div/div`,
        { state: "visible", timeout: TIMEOUT }
      );
      fixture.logger.info(
        "Waiting for  Required Chart item from the list to be visible"
      );
      const rows = fixture.page.locator(
        `//div[@class="superset-list-view chart-list-view"]//div[@class="body "]/div/div`
      );
      const numberOfRowsDisplayed = await rows.count();
      console.log("ROWS :-", numberOfRowsDisplayed);

      // Iterate through each row to find the  name
      for (let row = 1; row <= numberOfRowsDisplayed; row++) {
        await this.loadingWebPage();
        let ChartnameElement = `//div[@class="superset-list-view chart-list-view"]//div[@class="body "]/div/div[${row}]//div[@class="titleRow"]/span`;

        // Wait for the element to be available
        await fixture.page.waitForSelector(ChartnameElement, {
          state: "visible",
          timeout: TIMEOUT,
        });

        const ChartnameFromUI = await fixture.page
          .locator(ChartnameElement)
          .textContent();
        console.log("Chart name from ui :-", ChartnameFromUI);
        //fixture.logger.info("Chart name from ui :-", ChartnameFromUI);
        let expectedChartname = Chartname;
        //console.log("Expected Chart name from jsondata :-", expectedChartname);
        //console.log("Expected Chart name from jsondata :-", expectedChartname);
        // fixture.logger.info("Expected Chart name from jsondata :-", expectedChartname);
        if (ChartnameFromUI?.trim().includes(expectedChartname)) {
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
    }
    return flag;
  }

  async clickOn_Dashboard_or_Chart_or_Dataset_or_SQLlab_toTolandToNewTab(choiceTab: string) {


    [this.multipleTab] = await Promise.all([
      fixture.page.waitForEvent("popup"), // Wait for new tab     
      fixture.page.click(`//p[text()="${choiceTab}"]/parent::button`) // Click the link

    ]);

    this.multipleTab.waitForLoadState(`networkidle`);
    this.allPages = this.multipleTab.context().pages();
    //Assiging the new tab to fixture.page -- so that it can be used in globalAction class and so on --//   
    fixture.page = this.allPages[1];
    //await allPages[1].bringToFront(); // Focus on second tab
    await fixture.page.bringToFront(); // Focus on second tab
    let titleofthNewpage = await fixture.page.title();
    //console.log(`the title of the parent page is :`, titleofthNewpage);
    //const currentURLNew = this.allPages[1].url();
    //console.log('Current URL:', currentURLNew);

  }
  async shiftToParentTab_fromTheChildTab() {
    fixture.page = this.allPages[0];
    await fixture.page.bringToFront(); // Focus on parent tab
    fixture.logger.info(`Switched back to the parent tab.`);
    //let titleofParentpage = await fixture.page.title();
    //console.log(`the title of the parent page is :`, titleofParentpage);
    // const currentURL = fixture.page.url();
    //console.log('Current URL:', currentURL);
  }

  async getTheRowNumberFromRolesPage(Rolesname: string): Promise<number> {
    console.log(
      "Page Object Wrapper: Verifying that the Roles name is displayed in the  tab list..."
    );
    let flag = 0;
    await this.loadingWebPage();

    let thisNode = `//div[@class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-jax8e6"]/div/div`;

    let hasChildOrNot = await this.verifyElementHasChildren(thisNode);
    console.log(`This node has child which is:`, hasChildOrNot);

    if (hasChildOrNot > 0) {
      // Get the number of rows displayed
      await fixture.page.waitForSelector(
        `//div[(@class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-jax8e6")]/div/div`,
        { state: "visible", timeout: TIMEOUT }
      );
      fixture.logger.info(
        "Waiting for  Required Roles item from the list to be visible"
      );
      const rows = fixture.page.locator(
        `//div[(@class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-jax8e6")]/div/div`
      );
      const numberOfRowsDisplayed = await rows.count();
      console.log("ROWS in Roles page :-", numberOfRowsDisplayed);

      // Iterate through each row to find the  name
      for (let row = 1; row <= numberOfRowsDisplayed; row++) {
        await this.loadingWebPage();
        let RolesnameElement = `//div[(@class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-jax8e6")]/div/div[${row}]/div/div/div/span/div/div/div/p`;

        // Wait for the element to be available
        await fixture.page.waitForSelector(RolesnameElement, {
          state: "visible",
          timeout: TIMEOUT,
        });

        const RolesnameFromUI = await fixture.page
          .locator(RolesnameElement)
          .textContent();
        console.log("Roles name from ui :-", RolesnameFromUI);
        //fixture.logger.info("Roles name from ui :-", RolesnameFromUI);
        let expectedRolesname = Rolesname;
        //console.log("Expected Roles name from jsondata :-", expectedRolesname);
        //console.log("Expected Roles name from jsondata :-", expectedRolesname);
        // fixture.logger.info("Expected Roles name from jsondata :-", expectedRolesname);
        if (RolesnameFromUI?.trim().includes(expectedRolesname)) {
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
    } else {
      console.log(`This node does not have any child,cleanup not required`);
      flag = 0
    }
    return flag;
  }

  async deleteTheRolesItemFromRolesPage(rownumber: number) {
    let displayRole = `//div[(@class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-jax8e6")]/div/div[${rownumber}]/div/div[3]//span/button`;
    await globalaction.waitAndClick(displayRole);
    let deletepopupButton =`//button//p[text()="Delete"]/parent::button`;
    await globalaction.waitAndClick(deletepopupButton);
    fixture.logger.info("Clicked on the delete icon for the Roles.");
    let popupConfirm =`//p[text()="Confirm"]/parent::button`;
    await globalaction.waitAndClick(popupConfirm);
    fixture.logger.info("Clicked on the confirm button to delete the Roles.");

    let thepopupMessageloc = `//*[contains(@class,"Toastify__toast-icon")]/following-sibling::div/span`;
    let popupMessage = await fixture.page.locator(thepopupMessageloc).textContent();
    console.log("The popup message is: ", popupMessage);
    if(popupMessage?.includes("User is assiged to the role")){
      fixture.logger.info("Roles cannot be deleted.");
      await globalaction.waitForElementHidden(thepopupMessageloc);
      await globalaction.waitAndClick(`//button//p[text()="Close"]/parent::button`);
    }else{
      fixture.logger.info("Roles deleted successfully.");
      await globalaction.waitForElementHidden(`//*[contains(text(),'deleted succesfully')]`);
    }
   
    //close the role popup//
   
    await this.loadingWebPage();

  }

  async getTheRowNumberFromUserPage(Username: string): Promise<number> {
    console.log(
      "Page Object Wrapper: Verifying that the User name is displayed in the  tab list..."
    );
    let flag = 0;
    await this.loadingWebPage();

    let thisNode = `//div[@class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-jax8e6"]/div`;

    let hasChildOrNot = await this.verifyElementHasChildren(thisNode);
    console.log(`This node has child which is:`, hasChildOrNot);

    if (hasChildOrNot > 0) {
      // Get the number of rows displayed
      await fixture.page.waitForSelector(
        `//div[(@class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-jax8e6")]/div/div`,
        { state: "visible", timeout: TIMEOUT }
      );
      fixture.logger.info(
        "Waiting for  Required User item from the list to be visible"
      );
      const rows = fixture.page.locator(
        `//div[(@class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-jax8e6")]/div/div`
      );
      const numberOfRowsDisplayed = await rows.count();
      console.log("ROWS in User page :-", numberOfRowsDisplayed);

      // Iterate through each row to find the  name
      for (let row = 1; row <= numberOfRowsDisplayed; row++) {
        await this.loadingWebPage();
        let UsernameElement = `//div[(@class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-jax8e6")]/div/div[${row}]/div/div/div/span/div/div/div/div[2]/p`;

        // Wait for the element to be available
        await fixture.page.waitForSelector(UsernameElement, {
          state: "visible",
          timeout: TIMEOUT,
        });

        const UsernameFromUI = await fixture.page
          .locator(UsernameElement)
          .textContent();
        console.log("User name from ui :-", UsernameFromUI);
        //fixture.logger.info("User name from ui :-", UsernameFromUI);
        let expectedUsername = Username;
        //console.log("Expected User name from jsondata :-", expectedUsername);
        //console.log("Expected User name from jsondata :-", expectedUsername);
        // fixture.logger.info("Expected User name from jsondata :-", expectedUsername);
        if (UsernameFromUI?.trim().includes(expectedUsername)) {
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
    } else {
      console.log(`This node does not have any child,cleanup not required`);
      flag = 0
    }
    return flag;
  }

  async deleteTheUserItemFromUserPage(rownumber: number) {
    let displayUser = `//div[(@class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-jax8e6")]/div/div[${rownumber}]/div/div[3]/div/span[2]/button`;
    await globalaction.waitAndClick(displayUser);
    let editButton = `//h2/parent::div//p[text()="Edit"]/parent::button`;
    await globalaction.waitAndClick(editButton);
    let deleteUserButton = `//h2/parent::div//p[text()="Delete"]/parent::button`;
    await globalaction.waitAndClick(deleteUserButton);
    let popUpConfirmButton = `//button[@iconcolor="confirm"]`;
    await globalaction.waitAndClick(popUpConfirmButton);
    await globalaction.waitForElementHidden(`//p[contains(text(),'deleted successfully')]`);

    await this.loadingWebPage();

  }

}

