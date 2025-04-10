const fs = require('fs');
const path = require('path');
const { updateCounter } = require('./counter');

function modifyFunction(currentValue) {
    let countValue = updateCounter().toString().padStart(4, '0');
    console.log("the value ----::",countValue);
    let updateVal = removeLastSegment(currentValue)+"_"+countValue;
    return updateVal; 
}

function removeLastSegment(str) {
    if (typeof str !== 'string') {
        console.error("Error: Invalid input for removeLastSegment()");
        return ""; // Return an empty string or handle accordingly
    }
    const lastUnderscoreIndex = str.lastIndexOf('_'); // Find the last underscore position
    return lastUnderscoreIndex !== -1 ? str.substring(0, lastUnderscoreIndex) : str; // Remove everything after the last _
}
//----------------------//
export function modifySampleDataParameterised(testdataFile,keyName) {
    const moduleName = testdataFile.substring(0, testdataFile.indexOf("-"));
    const JSON_FILE_PATH = path.resolve('e2e', 'resources', 'ui', moduleName, `${testdataFile}.json`);
    try {
        // Check if the file exists
        if (!fs.existsSync(JSON_FILE_PATH)) {
            console.error("Error: JSON file not found.");
            return;
        }

        // Read and parse JSON data
        const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
        const jsonData = JSON.parse(data);

        // Ensure jsonData is an array and contains the sampleData key
       // Ensure jsonData is an array and contains the specified key
       if (Array.isArray(jsonData) && jsonData.length > 0 && jsonData[0][keyName] !== undefined) {
        let keyValue = jsonData[0][keyName]; // Store value in a variable
        keyValue = modifyFunction(keyValue); // Modify the value
        jsonData[0][keyName] = keyValue; // Update the JSON object
    }  else {
            console.error("Error: JSON format is incorrect.");
            return;
        }

        // Write the updated data back to the file
        fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(jsonData, null, 2));

        console.log("sampleData updated successfully:", jsonData[0][keyName]);
    } catch (error) {
        console.error("Error modifying sampleData:", error);
    }
}

//module.exports = { modifySampleDataParameterised };
//----------------------//


/*
// Run the function
//updateSampleData();
// Main function to execute the counter update
function main() {
    console.log("Running counter update...");
    modifySampleDataParameterised("SampleData-Governtestdata","sampleData");
    //modifySampleData();
}

// Run the main function
main();

*/
