import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../../hooks/pageFixture";
import xgenLoginPage from "../../../pages/XgenLogin/xgenLoginPage";
import { getJsonDataUi } from "../../../helper/util/jsonFileReader";
import SamplepageOne from "@pages/SamplePage/SamplepageOne";

setDefaultTimeout(60 * 1000 * 2);
let samplepageOb = new SamplepageOne();

When('the user click on Govern page {string}',sampleFunction);
async function sampleFunction(jsonfilename: string) {
  const jsonData = getJsonDataUi(jsonfilename);
  console.log(JSON.stringify(jsonData));

  console.log(`Inside the step defination for sample`);
  fixture.logger.info(`Inside the step defination for sample`);
  await samplepageOb.navigateOfGovernPage(jsonData);
   
    
  }
;