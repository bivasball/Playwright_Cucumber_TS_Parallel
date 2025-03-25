import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../../hooks/pageFixture";
import xgenLoginPage from "../../../pages/XgenLogin/xgenLoginPage";
import { getJsonDataUi } from "../../../helper/util/jsonFileReader";

let xgenloginPage = new xgenLoginPage(fixture.page);
setDefaultTimeout(60 * 1000 * 2);

