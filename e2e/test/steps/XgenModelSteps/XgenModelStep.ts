import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import createPgDbConnectionPage from "@pages/XgenSource/createPgDbConnectionPage";
import uploadingFilePage from "@pages/XgenSource/uploadingFilePage";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import xgenSyncPage from "@pages/XgenSyncPages/xgenSyncPage";
import xgenModelPage from "@pages/XgenModelPages/xgenModelPage";

setDefaultTimeout(60 * 1000 * 2 );
let xgenmodelP = new xgenModelPage();

Given(`user navigate to the Model page`, modelPageStep);
async function modelPageStep() {
    await xgenmodelP.navigateToModelPage();

};

