import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import Sample_X_Y_coordinate_Page from "@pages/XgenPipelinePages/Sample_X-Y_coordinate_Page";


setDefaultTimeout(60 * 3 * 1000);
let sampCordinate = new Sample_X_Y_coordinate_Page();


Given(`Sample user should be able to create a Pipeline for an user Sample test {string}`, createPipelineUser);
async function createPipelineUser(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    
    await sampCordinate.addSelectTableRadioButtonEnterPipelineNameAndDescription(jsonData);
    await sampCordinate.getMoveTheFlagIconAlongX_Y_a();
    //await sampCordinate.SelectDataSyncForPipeline();
    

    /*
    await sampCordinate.joinSourceFlagtoSyncData();
    await sampCordinate.SelectModelDataForPipeline()
    await sampCordinate.joinSyncDataModelData();
    await sampCordinate.createOrSave();
    await sampCordinate.closeThePipeline();
   */

}

