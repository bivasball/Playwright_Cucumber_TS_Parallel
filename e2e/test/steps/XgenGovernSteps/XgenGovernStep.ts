import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import xgenGovernPageLat from "@pages/XgenGovernPages/XgenGovernPageLat";

setDefaultTimeout(60 * 3 * 1000);
let xgengovernPg = new xgenGovernPageLat();



Given(`navigate to Govern and select Datamodel from the given artifacts {string}`, governDDatamodels);

    async function governDDatamodels(jsonfilename: any) {
        console.log(`Step executed with data from govern json file#######: ${jsonfilename}`);
        const jsonData = getJsonDataUi(jsonfilename);
        console.log(JSON.stringify(jsonData));
       

    }



When('the user navigate to Govern page and select Datamodel from the given artifacts {string}',sampleFunction);
async function sampleFunction(jsonFilename: string) {
  const jsonData = getJsonDataUi(jsonFilename);
  console.log(JSON.stringify(jsonData));
let modelNameForDropdown = jsonData[0].modelName;
let prefixTheModelNameForDropdown = `XDL_${modelNameForDropdown}`;
let OverviewTag = jsonData[0].SetupTags;
let OverviewClassification = jsonData[0].SetupClassifications;
let OverviewDomain = jsonData[0].SetupDomains;


  await xgengovernPg.navigateToGovernPage();
 
  await  xgengovernPg.searchAndSelectFromDataModel(prefixTheModelNameForDropdown);
  
  await xgengovernPg.clickOnOverviewTab();
  await xgengovernPg.deleteTagIfPresent(OverviewTag);
  await xgengovernPg.addTagIfNotPresent(OverviewTag);
  await xgengovernPg.deleteClassificationIfPresent(OverviewClassification);
  await xgengovernPg.addClassificationIfNotPresent(OverviewClassification);
  await xgengovernPg.deleteDomainIfPresent(OverviewDomain);
  await xgengovernPg.addDomainIfNotPresent(OverviewDomain);
  await xgengovernPg.deleteOwnerIfPresent(jsonData[0].OverviewOwner);
  await xgengovernPg.addOwnerIfNotPresent(jsonData[0].OverviewOwner);
  

  };

  When('the user preview the data and Add Quality rules in Quality tab {string}',dataPreviewAndAddDataRules);
  async function dataPreviewAndAddDataRules(jsonFilename: string) {
    const jsonData = getJsonDataUi(jsonFilename);
    console.log(JSON.stringify(jsonData));
    let dqRuleName= jsonData[0].DQName;
    await xgengovernPg.viewDataInPreviewTab();
    await xgengovernPg.deleteDataQualityRulesIfExist(dqRuleName);
    await xgengovernPg.addDataQualityRules(jsonData);




  };

  When('the user add some notes in the Notes tab {string}',addNotes);
  async function addNotes(jsonFilename: string) {
    const jsonData = getJsonDataUi(jsonFilename);
    console.log(JSON.stringify(jsonData));
    let dqRuleName= jsonData[0].DQName;
    
    await xgengovernPg.addNotesToTheDataModel(jsonData);




  };