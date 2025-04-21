import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { getJsonDataUi } from "../../../helper/util/jsonFileReader";
import SamplePageOne from "@pages/SamplePage/SamplepageOne";

setDefaultTimeout(60 * 1000 * 2);
let samplePageOb = new SamplePageOne();

When('the user click on Govern page {string}',sampleFunction);
async function sampleFunction(jsonFilename: string) {
  const jsonData = getJsonDataUi(jsonFilename);
  console.log(JSON.stringify(jsonData));

  await samplePageOb.navigateToGovernPage();
  await samplePageOb.clickOnDataModel();
  await samplePageOb.selectDataModelsFromDropDown(jsonData[0].DataModelFromDropDown);
  await samplePageOb.clickOnOverviewTab();
  await samplePageOb.addTagIfNotPresent(jsonData[0].OverviewTag);
  await samplePageOb.addClassificationIfNotPresent(jsonData[0].OverviewClassification);
  await samplePageOb.addDomainIfNotPresent(jsonData[0].OverviewDomain);
  await samplePageOb.addOwnerIfNotPresent(jsonData[0].OverviewOwner);

  }
;