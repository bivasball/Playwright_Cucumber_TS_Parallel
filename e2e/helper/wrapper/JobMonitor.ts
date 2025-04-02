
export default class JobMonitor {

async  monitorTheJob(duration, interval, callback) {
    const startTime = Date.now();

    console.log("Starting monitors...");

    while (Date.now() - startTime < duration) {
        console.log(`Current Time: ${new Date().toISOString()}`);

        // Execute the callback function and get its return value
        if (callback && typeof callback === "function") {
            const result = await callback();
            console.log(`Callback returned: ${result}`);

            // Break the loop if the callback returns "it exists"
            if (result === "it exists") {
                console.log("Breaking the loop as callback returned 'it exists'.");
                break;
            }
        }

        // Wait for the interval 
        await new Promise((resolve) => setTimeout(resolve, interval));
    }

    console.log("Finished refreshing the Page or exited early.");
}


}