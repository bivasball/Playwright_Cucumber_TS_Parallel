import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { getJsonDataUi } from "@helper/util/jsonFileReader";
import xgenModelPage from "@pages/XgenModelPages/xgenModelPage";

setDefaultTimeout(60 * 3 * 1000);
let xgenmodelP = new xgenModelPage();

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

Given(`user should be able to execute the model for Load Mode Full Load {string}`, executeTheModel);
async function executeTheModel(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    await xgenmodelP.executeTheSingleModelFullLoad(jsonData);

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
    await xgenmodelP.joinJoinNodeRightSideToModelName("");
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



//-----------------------/STAR NODE/---------------------//
Given(`user should be able to create a Star Node data model, taking one from Source Node and one from Lookup Node {string}`, createsStarNodeWithOneSourceAndTwoLookup);
async function createsStarNodeWithOneSourceAndTwoLookup(jsonfilename: string) {
    console.log(`Step executed with data from json file: ${jsonfilename}`);
    const jsonData = getJsonDataUi(jsonfilename);
    const modelname = jsonData[0].modelName;
    let sourceName = jsonData[0].sourceObjectFromSourceNode;

    await xgenmodelP.addSelectTableRadioButtonEnterModelNameAndDescription(jsonData);

    //Source Node
    await xgenmodelP.clickSourceNodeSearchAndSelectSource(jsonData);
    await xgenmodelP.clickStarNode();
    await xgenmodelP.joinSourceNodeToStarNodeLeftSide('S_ORDERITEMS','STAR_1');
    await xgenmodelP.clickSourceObject(jsonData[0].sourceObjectFromSourceNode);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();

    //look up Node -CUSTOMER
    let lookupNode_Object1 = jsonData[0].sourceObjectFromLookUpNode1;
    await xgenmodelP.click_LookUpNodeSearchAndSelectSource(lookupNode_Object1);

    await xgenmodelP.joinLookNodeToStarNodeLeftSide('L_CUSTOMER','STAR_1');
    await xgenmodelP.clickSourceObject(lookupNode_Object1);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();

    //look up Node -CAMPAIGNS
    let lookupNode_Object2 = jsonData[0].sourceObjectFromLookUpNode2;
    await xgenmodelP.click_LookUpNodeSearchAndSelectSource(lookupNode_Object2);

    await xgenmodelP.joinLookNodeToStarNodeLeftSide('L_CAMPAIGNS','STAR_1');
    await xgenmodelP.clickSourceObject(lookupNode_Object2);
    await xgenmodelP.clickFocusedObjectAndSelectAllTheColumns();
    await xgenmodelP.exitFromFocusedObject();

    //STAR_1 node
    let modelNameDisplayed = `XDL_${modelname}`;
    await xgenmodelP.join_StarNodeRightSideToModelName("STAR_1",modelNameDisplayed);



}