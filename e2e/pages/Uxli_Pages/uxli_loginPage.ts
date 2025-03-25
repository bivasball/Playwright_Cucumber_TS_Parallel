import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../../hooks/pageFixture";

export default class uxli_loginPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }
  //===Below are the Locators ===  //
  private Elements = {
    addRemoveLink: "//a[text()='Add/Remove Elements']",
    headerAddRemovePage: "//h3",
  };

  async getTheTitle() {
    return this.page.locator("//a[text()='Add/Remove Elements']");
  }

  async clickOnAddRemoveUrl() {
    fixture.logger.info("===P===Welcome to the Home page =====");
    await fixture.page.locator(this.Elements.addRemoveLink).click();
  }
  async landOnAddRemovePage() {
    fixture.logger.info("===P===Land to the Add remove page =====");
    const header = fixture.page.locator(this.Elements.headerAddRemovePage);
    await expect(header).toBeVisible();
    const headerName = await header.textContent();
    console.log("Header Name from the page is : " + headerName);
    fixture.logger.info("Header name: " + headerName);
  }

async  clickOnAddRemoveButton() {

  await fixture.page.getByRole('button', { name: 'Add Element' }).click();
  await fixture.page.getByRole('button', { name: 'Add Element' }).click();
  await fixture.page.getByRole('button', { name: 'Delete' }).nth(1).click();
  await fixture.page.getByRole('button', { name: 'Delete' }).click();

}

async clickOnBasicAuthLink() {
  fixture.logger.info("Clicking on Basic Auth link");
  await fixture.page.getByRole('link', { name: 'Basic Auth' }).click();

}

async fillPopUpWithCredentials(username: string, password: string) {
  fixture.logger.info("Filling Pop-up with username and password");
  fixture.logger.info("Navigating to the page with Basic Auth credentials");
  const url = `https://${username}:${password}@the-internet.herokuapp.com/basic_auth`;
  await fixture.page.goto(url);
  await fixture.page.waitForTimeout(5000);
}

async verifyLoginSuccess() {
  fixture.logger.info("Verifying successful login");
  await expect(fixture.page.getByRole('heading')).toContainText('Basic Auth');
  await expect(fixture.page.getByRole('paragraph')).toContainText('Congratulations! You must have the proper credentials.');
  await fixture.page.waitForTimeout(5000);
}


async clickOnBrokenImagesLink() {
  fixture.logger.info("Clicking on the Broken Images link");
  await fixture.page.getByRole('link', { name: 'Broken Images' }).click();
}

async verifyBrokenImagesPageHeading() {
  fixture.logger.info("Verifying the Broken Images page heading");
  await expect(fixture.page.getByRole('heading')).toContainText('kkk Broken Images jjjj');
  await fixture.page.waitForTimeout(5000);
}


async clickonelinkToVerifyTheCheckBox() {
  await fixture.page.locator('body').click();
  await fixture.page.getByRole('link', { name: 'Checkboxes' }).click();
  await fixture.page.locator('html').click();
  await fixture.page.getByRole('checkbox').first().check();
}

async verifyDataFromJsonFile(jsonData:any) {
  console.log("Verifying the json data -------- right"+jsonData[0].env);
  console.log("Verifying the json data -------- right"+jsonData[1].env);
}

}
