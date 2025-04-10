import { expect} from "@playwright/test";
import { fixture } from "@hooks/pageFixture";
import  {TIMEOUT}  from "playwright.config";
import PlaywrightWrapper from "@helper/wrapper/PlaywrightWrappers";
import GlobalActions from "@helper/wrapper/GlobalActions";


let globalaction = new GlobalActions();

let playwrightWrapper = new PlaywrightWrapper();

export default class SamplepageOne {

    async navigateOfGovernPage(jsonData:any){
        console.log(`Click on the Govern page =========`);
        console.log(`The data from the json file is : ${jsonData[0].sampleData}`);
        fixture.logger.info(`The data from the json file is : ${jsonData[0].sampleData}`);
        await globalaction.waitAndClick(`//span[text()="Govern"]`);

    }

}