const fs = require('fs');
const path = require('path');

const COUNTER_FILE = path.join('e2e', 'helper', 'util', 'counter.json');

function updateCounter() {
    let counter = 1;

    // Check if counter file exists
    if (fs.existsSync(COUNTER_FILE)) {
        const data = fs.readFileSync(COUNTER_FILE, 'utf8');
        const parsedData = JSON.parse(data);
        //counter = parseInt(parsedData.count, 10) + 1;
        //The % 1000 ensures that when the counter hits 1000, it resets to 0.
        //|| 1 ensures that if the counter ever becomes 0 (after modulus operation), it resets to 1.
        counter = (parseInt(parsedData.count, 10) + 1) % 1000 || 1;
    }

    // Save updated count to file
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: counter }, null, 2));

    console.log(`Counter updated: ${counter}`);
    return counter;
}

// Export the function
module.exports = { updateCounter };


/*
// Main function to execute the counter update
function main() {
    console.log("Running counter update...");
    updateCounter();
}

// Run the main function
main();
*/