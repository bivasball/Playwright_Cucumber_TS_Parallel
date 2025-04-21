import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import xgenSettingsPage from "@pages/XgenSettingsPages/XgenSettingsPage";

setDefaultTimeout(60 * 3 * 1000);
let xgenSettingsPg = new xgenSettingsPage();


Given(`user navigate to Settings and set up the tags in Data Categories {string}`, settingspage);
async function settingspage(jsonfilename: any) {
    console.log(`Step executed with data from govern json file#######: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    console.log(JSON.stringify(jsonData));
    await xgenSettingsPg.clickOnSettings();
    await xgenSettingsPg.clickOnAdminSettings();
    await xgenSettingsPg.clickOnDataCategory();

    await xgenSettingsPg.Setup_Tags_deleteTagIfPresent(jsonData[0].SetupTags);
    await xgenSettingsPg.Setup_Tags_addTagIfNotPresent(jsonData[0].SetupTags);

    await xgenSettingsPg.Setup_Classifications_deleteTagIfPresent(jsonData[0].SetupClassifications);
    await xgenSettingsPg.Setup_Classifications_addTagIfNotPresent(jsonData[0].SetupClassifications);

    await xgenSettingsPg.Setup_Domains_deleteTagIfPresent(jsonData[0].SetupDomains);
    await xgenSettingsPg.Setup_Domains_addTagIfNotPresent(jsonData[0].SetupDomains);

};




