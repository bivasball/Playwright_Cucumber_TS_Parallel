import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import xgenModelPage from "@pages/XgenModelPages/xgenModelPage";
import xgenModelPageXYaxis from "@pages/XgenModelPages/xgenModelPage_XYaxis";
import { modifySampleDataParameterised } from "@helper/util/modifyTheJsonValue";


setDefaultTimeout(60 * 5 * 1000);
let xgenmodelP = new xgenModelPage();
let xgenmodelXYaxis = new xgenModelPageXYaxis();

Given(`user navigate to the Model page`, modelPageStep);
async function modelPageStep() {
    await xgenmodelP.navigateToModelPage();

};

Given(`user perform the clean up activity {string}`, modelCleanUpActivity);
async function modelCleanUpActivity(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenmodelP.cleanUpTheModel(jsonData);

};

Given(`user should be able to create a linear data model for Load Mode Full Load,using data {string}`, createLinearModel);
async function createLinearModel(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    
    await xgenmodelP.addSelectTableRadioButtonEnterModelNameAndDescription(jsonData);

    await xgenmodelP.clickSourceNodeSearchAndSelectSource(jsonData);
    await xgenmodelP.joinSourceObjectFromSourceNodeToModelName();

    await xgenmodelP.clickSourceObject(jsonData[0].sourceObjectFromSourceNode);
    await xgenmodelP.clickSourceObjectAndSelectTheRequiredColumnOneByOne('city');
    await xgenmodelP.clickSourceObjectAndSelectTheRequiredColumnOneByOne('state');
    await xgenmodelP.exitFromFocusedObject();

    await xgenmodelP.clickModelNameObject(jsonData[0].modelName);
    await xgenmodelP.clickModelNameAndSelectTheRequiredColumnOneByOne('city');
    await xgenmodelP.clickModelNameAndSelectTheRequiredColumnOneByOne('state');
    await xgenmodelP.exitFromModelNameObject();

    await xgenmodelP.createOrSave();
    await xgenmodelP.closeTheModel();
};


//----------VIEW-----------//
Given(`user should be able to create a linear data model for Load Mode Standard View,using data {string}`, createLinearModel_View);
async function createLinearModel_View(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    
    await xgenmodelP.addSelectViewRadioButton();
    await xgenmodelP.EnterModelNameAndDescription(jsonData);

    await xgenmodelP.clickSourceNodeSearchAndSelectSource(jsonData);
    await xgenmodelP.joinSourceObjectFromSourceNodeToModelName_Xil();

    await xgenmodelP.clickSourceObject(jsonData[0].sourceObjectFromSourceNode);
    await xgenmodelP.clickSourceObjectAndSelectTheRequiredColumnOneByOne('city');
    await xgenmodelP.clickSourceObjectAndSelectTheRequiredColumnOneByOne('state');
    await xgenmodelP.exitFromFocusedObject();


    await xgenmodelP.createOrSave();
    await xgenmodelP.closeTheModel();
};

Given(`user should be able to create a  view for data model,taking one table from Source Node and one table from Lookup Node {string}`, createViewModelOneSourceAndOneLookup);
async function createViewModelOneSourceAndOneLookup(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenmodelP.addSelectRadioButtonEnterModelNameAndDescription(jsonData);
    //Source Node
    await xgenmodelP.clickSourceNodeSearchAndSelectSource(jsonData);
    await xgenmodelP.clickJoinNode();
    await xgenmodelP.joinSourceNodeToJoinNodeLeftSide("");
    await xgenmodelP.clickSourceObject(jsonData[0].sourceObjectFromSourceNode);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();
    //look up Node
    await xgenmodelP.clickLookUpNodeSearchAndSelectSource(jsonData);
    await xgenmodelP.joinLookNodeToJoinNodeLeftSide("");
    await xgenmodelP.clickSourceObject(jsonData[0].sourceObjectFromLookUpNode);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();
    //Join_1 Node
    await xgenmodelP.joinJoinNodeRightSideToModelNameview(jsonData[0].modelName);
    await xgenmodelP.clickJoin_1_Object('JOIN_1');
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.clickJoin_1_Join_Edit_Join_Join_Type_Condition();
    await xgenmodelP.exitFromFocusedObject();
    

    //Model Name
    await xgenmodelP.clickModelNameObject(jsonData[0].modelName);
    await xgenmodelP.exitFromFocusedObject();
   
    await xgenmodelP.createOrSave();
    await xgenmodelP.verifyTheStatus_Valid();
    await xgenmodelP.closeTheModel();
   


}


Given(`user should be able to execute the model for Load Mode Full Load {string}`, executeTheModel);
Given(`user should be able to execute the Star Node model for Load Mode Full Load {string}`, executeTheModel);
async function executeTheModel(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenmodelP.executeTheSingleModelFullLoad(jsonData);

};

Given(`user should be able to execute the Star Node model for Load Mode Full Load and see the Data Preview {string}`, executeTheModelAndSeeDataPreview);
async function executeTheModelAndSeeDataPreview(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenmodelP.runAndDataPreview(jsonData);
    await xgenmodelP.verifyThatTheDataPreviewContainsData();
    
    await xgenmodelP.closeTheModel();

};

//-----------------------//---------------------//

Given(`user should be able to create a data model,taking one table from Source Node and one table from Lookup Node {string}`, createModelOneSourceAndOneLookup);
async function createModelOneSourceAndOneLookup(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenmodelP.addSelectTableRadioButtonEnterModelNameAndDescription(jsonData);
    //Source Node
    await xgenmodelP.clickSourceNodeSearchAndSelectSource(jsonData);
    await xgenmodelP.clickJoinNode();
    await xgenmodelP.joinSourceNodeToJoinNodeLeftSide("");
    await xgenmodelP.clickSourceObject(jsonData[0].sourceObjectFromSourceNode);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();
    //look up Node
    await xgenmodelP.clickLookUpNodeSearchAndSelectSource(jsonData);
    await xgenmodelP.joinLookNodeToJoinNodeLeftSide("");
    await xgenmodelP.clickSourceObject(jsonData[0].sourceObjectFromLookUpNode);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();
    //Join_1 Node
    await xgenmodelP.joinJoinNodeRightSideToModelName(jsonData[0].modelName);
    await xgenmodelP.clickJoin_1_Object('JOIN_1');
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.clickJoin_1_Join_Edit_Join_Join_Type_Condition();
    await xgenmodelP.exitFromFocusedObject();
    

    //Model Name
    await xgenmodelP.clickModelNameObject(jsonData[0].modelName);
    await xgenmodelP.clickModelNameAndSelectTheRequiredColumnOneByOne('orderid');
    await xgenmodelP.exitFromFocusedObject();
   
    await xgenmodelP.createOrSave();
    await xgenmodelP.verifyTheStatus_Valid();
    await xgenmodelP.closeTheModel();
   


}

//-----------------------/STAR NODE VIEW/---------------------//
Given(`user should be able to create a view with Star Node data model, taking one from Source Node and one from Lookup Node {string}`, createViewStarNodeWithOneSourceAndTwoLookup);
async function createViewStarNodeWithOneSourceAndTwoLookup(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    const modelname = jsonData[0].modelName;
    let sourceName = jsonData[0].sourceObjectFromSourceNode;

    await xgenmodelP.addSelectRadioButtonEnterModelNameAndDescription(jsonData);

    //Source Node S_ORDERITEMS
    await xgenmodelP.clickSourceNodeSearchAndSelectSource(jsonData);
    await xgenmodelP.clickStarNode();
    await xgenmodelP.joinSourceNodeToStarNodeLeftSide('S_ORDERITEMS', 'STAR_1');
    await xgenmodelP.clickSourceObject(jsonData[0].sourceObjectFromSourceNode);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();

    //look up Node L-CUSTOMER
    let lookupNode_Object1 = jsonData[0].sourceObjectFromLookUpNode1;
    await xgenmodelP.click_LookUpNodeSearchAndSelectSource(lookupNode_Object1);

    await xgenmodelP.joinLookNodeToStarNodeLeftSide('L_CUSTOMER', 'STAR_1');
    await xgenmodelP.clickSourceObject(lookupNode_Object1);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();

    //look up Node L-CAMPAIGNS
    let lookupNode_Object2 = jsonData[0].sourceObjectFromLookUpNode2;
    await xgenmodelP.click_LookUpNodeSearchAndSelectSource(lookupNode_Object2);

    await xgenmodelP.joinLookNodeToStarNodeLeftSide('L_CAMPAIGNS', 'STAR_1');
    await xgenmodelP.clickSourceObject_Third(lookupNode_Object2);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();

    //STAR_1 node
    let modelNameDisplayed = `XIL_${modelname}`;
    await xgenmodelP.join_StarNodeRightSideToModelVwName("STAR_1", modelNameDisplayed);
    await xgenmodelP.clickStar_1_Object("STAR_1");
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.clickStar_join_tab();
    await xgenmodelP.clickStar_EditJoin();
    await xgenmodelP.exitFromFocusedObject();

    //Model Name
    await xgenmodelP.clickModelNameObject(modelNameDisplayed);
    await xgenmodelP.exitFromFocusedObject();
    await xgenmodelP.createOrSave();
    await xgenmodelP.verifyTheStatus_Valid();
    await xgenmodelP.closeTheModel();
   
}



//-----------------------/STAR NODE/---------------------//
Given(`user should be able to create a Star Node data model, taking one from Source Node and one from Lookup Node {string}`, createsStarNodeWithOneSourceAndTwoLookup);
async function createsStarNodeWithOneSourceAndTwoLookup(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    const modelname = jsonData[0].modelName;
    let sourceName = jsonData[0].sourceObjectFromSourceNode;

    await xgenmodelP.addSelectTableRadioButtonEnterModelNameAndDescription(jsonData);

    //Source Node S_ORDERITEMS
    await xgenmodelP.clickSourceNodeSearchAndSelectSource(jsonData);
    await xgenmodelP.clickStarNode();
    await xgenmodelP.joinSourceNodeToStarNodeLeftSide('S_ORDERITEMS','STAR_1');
    await xgenmodelP.clickSourceObject(jsonData[0].sourceObjectFromSourceNode);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();

    //look up Node L-CUSTOMER
    let lookupNode_Object1 = jsonData[0].sourceObjectFromLookUpNode1;
    await xgenmodelP.click_LookUpNodeSearchAndSelectSource(lookupNode_Object1);

    await xgenmodelP.joinLookNodeToStarNodeLeftSide('L_CUSTOMER','STAR_1');
    await xgenmodelP.clickSourceObject(lookupNode_Object1);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();

    //look up Node L-CAMPAIGNS
    let lookupNode_Object2 = jsonData[0].sourceObjectFromLookUpNode2;
    await xgenmodelP.click_LookUpNodeSearchAndSelectSource(lookupNode_Object2);

    await xgenmodelP.joinLookNodeToStarNodeLeftSide('L_CAMPAIGNS','STAR_1');
    await xgenmodelP.clickSourceObject_Third(lookupNode_Object2);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();

    //STAR_1 node
    let modelNameDisplayed = `XDL_${modelname}`;
    await xgenmodelP.join_StarNodeRightSideToModelName("STAR_1",modelNameDisplayed);
    await xgenmodelP.clickStar_1_Object("STAR_1");
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.clickStar_join_tab();
    await xgenmodelP.clickStar_EditJoin();
    await xgenmodelP.exitFromFocusedObject();

    //Model Name
    await xgenmodelP.clickModelNameObject(modelNameDisplayed);
    await xgenmodelP.clickModelNameAndSelectTheRequiredColumnOneByOne('price');
    await xgenmodelP.clickModelNameAndSelectTheRequiredColumnOneByOne('itemid');
    await xgenmodelP.exitFromFocusedObject();

    await xgenmodelP.createOrSave();
    await xgenmodelP.verifyTheStatus_Valid();
   

}

//-----------------------/STAR NODE/- XY-axis Movement--------------------//
Given(`user should be able to create a Star Node data model, taking one from Source Node and one from Lookup Node, moving node along xyAxis {string}`,{ timeout: 5*60*1000 }, createsStarNodeWithOneSourceAndTwoLookupXY);
async function createsStarNodeWithOneSourceAndTwoLookupXY(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    const modelname = jsonData[0].modelName;
    let sourceName = jsonData[0].sourceObjectFromSourceNode;

    await xgenmodelXYaxis.addSelectTableRadioButtonEnterModelNameAndDescription(jsonData);

    //Source Node S_ORDERITEMS
    await xgenmodelXYaxis.clickSourceNodeSearchAndSelectSource(jsonData);
    await xgenmodelXYaxis.moveTheSourceNodeAlongXY('S_ORDERITEMS',0,-3);
    await xgenmodelXYaxis.clickStarNode();
    
    await xgenmodelXYaxis.joinSourceNodeToStarNodeLeftSide('S_ORDERITEMS','STAR_1');
    await xgenmodelXYaxis.clickSourceObject(jsonData[0].sourceObjectFromSourceNode);
    await xgenmodelXYaxis.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelXYaxis.exitFromFocusedObject();

    //look up Node L-CUSTOMER
    let lookupNode_Object1 = jsonData[0].sourceObjectFromLookUpNode1;
    await xgenmodelXYaxis.click_LookUpNodeSearchAndSelectSource(lookupNode_Object1);   

    await xgenmodelXYaxis.joinLookNodeToStarNodeLeftSide('L_CUSTOMER','STAR_1');
    await xgenmodelXYaxis.clickSourceObject(lookupNode_Object1);
    await xgenmodelXYaxis.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelXYaxis.exitFromFocusedObject();

    //look up Node L-CAMPAIGNS
    let lookupNode_Object2 = jsonData[0].sourceObjectFromLookUpNode2;
    await xgenmodelXYaxis.click_LookUpNodeSearchAndSelectSource(lookupNode_Object2);
    await xgenmodelXYaxis.moveTheLookupNodeAlongXY('L_CAMPAIGNS',0,10);

    await xgenmodelXYaxis.joinLookNodeToStarNodeLeftSide('L_CAMPAIGNS','STAR_1');
    await xgenmodelXYaxis.clickSourceObject_Third(lookupNode_Object2);
    await xgenmodelXYaxis.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelXYaxis.exitFromFocusedObject();

    //STAR_1 node
    let modelNameDisplayed = `XDL_${modelname}`;
    await xgenmodelXYaxis.join_StarNodeRightSideToModelName("STAR_1",modelNameDisplayed);
    await xgenmodelXYaxis.clickStar_1_Object("STAR_1");
    await xgenmodelXYaxis.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelXYaxis.clickStar_join_tab();
    await xgenmodelXYaxis.clickStar_EditJoin();
    await xgenmodelXYaxis.exitFromFocusedObject();

    //Model Name
    await xgenmodelXYaxis.moveTheModelNameNodeAlongXY(modelNameDisplayed,15,0);
    await xgenmodelXYaxis.clickModelNameObject(modelNameDisplayed);
    
    await xgenmodelXYaxis.clickModelNameAndSelectTheRequiredColumnOneByOne('price');
    await xgenmodelXYaxis.clickModelNameAndSelectTheRequiredColumnOneByOne('itemid');
    await xgenmodelXYaxis.exitFromFocusedObject();

    await xgenmodelXYaxis.createOrSave();
    await xgenmodelXYaxis.verifyTheStatus_Valid();
   

}

//------------------UNIQUE DATA creation --------------------//


Given(`user sets up unique data for View and navigates to the Model page {string}`, setUpUniqueData_modifyTheJsonValue);
async function setUpUniqueData_modifyTheJsonValue(jsonfilename: string) {
    //The keyName -the value of which will be replaced by a  counter value //
    var keyName = `modelName`;
    modifySampleDataParameterised(jsonfilename,keyName);
    await xgenmodelP.navigateToModelPage();

};

Given(`user setup unique data and navigate to the Model page {string}`, setUpUniqueDataForStar1_modifyTheJsonValue);
async function setUpUniqueDataForStar1_modifyTheJsonValue(jsonfilename: string) {
    //The keyName -the value of which will be replaced by a  counter value //
    var keyName = `modelName`;
    modifySampleDataParameterised(jsonfilename,keyName);
    await xgenmodelP.navigateToModelPage();

};


//-----------------------/STAR NODE --CHAINED/---------------------//
Given(`User should be able to create a Star Node data model, taking one from Source Node and one from Lookup Node, chained case {string}`, createsStarNodeWithOneSourceAndOneLookupForChainedCase);
async function createsStarNodeWithOneSourceAndOneLookupForChainedCase(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    const modelname = jsonData[0].modelName;
   

    await xgenmodelP.addSelectTableRadioButtonEnterModelNameAndDescription(jsonData);

    //Source Node S_CUSTOMERS
    await xgenmodelP.clickSourceNodeSearchAndSelect_Source(`CUSTOMERS`);
    await xgenmodelP.clickStarNode();
    await xgenmodelP.joinSourceNodeToStarNodeLeftSide('S_CUSTOMERS','STAR_1');
    await xgenmodelP.clickSourceObject(`CUSTOMERS`);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();

    //look up Node L_CATEGORIES    
    await xgenmodelP.click_LookUpNodeSearchAndSelectSource(`CATEGORIES`);

    await xgenmodelP.joinLookNodeToStarNodeLeftSide('L_CATEGORIES','STAR_1');
    await xgenmodelP.clickSourceObject(`CATEGORIES`);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();

    
    //STAR_1 node
    let modelNameDisplayed = `XDL_${modelname}`;
    await xgenmodelP.join_StarNodeRightSideToModelName("STAR_1",modelNameDisplayed);
    await xgenmodelP.clickStar_1_Object("STAR_1");
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.clickStar_join_tab();
    await xgenmodelP.clickStar_EditJoin_ChainedCase();
    await xgenmodelP.exitFromFocusedObject();

    //Model Name
    await xgenmodelP.clickModelNameObject(modelNameDisplayed);
    await xgenmodelP.clickModelNameAndSelectTheRequiredColumnOneByOne('City');
    await xgenmodelP.clickModelNameAndSelectTheRequiredColumnOneByOne('Description');
    await xgenmodelP.exitFromFocusedObject();

    await xgenmodelP.createOrSave();
    await xgenmodelP.verifyTheStatus_Valid();
   

}