import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
import { apiFixture } from "./apiFixture";
import { manageLogs } from "../helper/util/logManager"; 
//const fs = require("fs-extra");

BeforeAll(async function () {
    getEnv();
    //console.log(`BASEURL is : ${process.env.BASEURL}`);
});

// It will trigger for non-auth scenarios
Before({ tags: "not @auth" }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;

    // Setup logger
    const scenarioNametoLog = pickle.name;
    //const logger = createLogger(options(scenarioName));
    apiFixture.logger=createLogger(options(scenarioName));
    apiFixture.logger.info(`------- API Execution started: ${scenarioNametoLog}`);
});

// It will trigger for auth scenarios
Before({ tags: "@auth" }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;

    // Load authentication state
    const authStorage = getStorageState(pickle.name);

    // Setup apiFixture.logger
    const scenarioNametoLog = pickle.name;
    apiFixture.logger = createLogger(options(scenarioName));
    apiFixture.logger.info(`------- Authenticated API Execution started: ${scenarioNametoLog}`);
});

// Handle post-execution logging and result processing
After(async function ({ pickle, result }) {
    const scenarioName = pickle.name + pickle.id;
    const isLocal = process.env.npm_config_RUN_MODE === "local";
    let logData: string;

    if (isLocal && result?.status === Status.PASSED) {
        logData = `Scenario ${pickle.name} passed successfully`;
        await this.attach(logData, "text/plain");
    }

    const scenarioNametoLog = pickle.name;
    apiFixture.logger = createLogger(options(scenarioName));
    apiFixture.logger.info(`------- Execution done: ${scenarioNametoLog}`);
});

AfterAll(async function () {
    console.log("API tests completed.");
    //console.log("Cleaning up old log files...");
    manageLogs();
});

// Function to retrieve storage state based on user type
function getStorageState(user: string): string {
    if (user.endsWith("admin")) return "api/helper/auth/admin.json";
    else if (user.endsWith("lead")) return "api/helper/auth/lead.json";
    return "";
}
