export async function createTimer(waitTimeInSeconds: number): Promise<void> {
    const startTime = Date.now();
    const stopTime = startTime + waitTimeInSeconds * 1000; // Convert wait time to milliseconds

    console.log("Stopwatch started.");
    console.log(`Start Time: ${new Date(startTime).toLocaleTimeString()}`);
    console.log(`Stop Time: ${new Date(stopTime).toLocaleTimeString()}`);

    // Wait for the specified duration
    await new Promise((resolve) => setTimeout(resolve, waitTimeInSeconds * 1000));

    const elapsedTime = Date.now() - startTime;
    console.log(`Stopwatch finished. Total elapsed time: ${(elapsedTime / 1000).toFixed(2)} seconds.`);
}

export async function sleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
      console.log(`Pausing for ${milliseconds / 1000} seconds...`);
      setTimeout(() => {
        console.log("Resuming execution...");
        resolve();
      }, milliseconds);
    });
  }