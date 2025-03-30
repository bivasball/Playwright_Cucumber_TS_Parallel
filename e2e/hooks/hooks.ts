import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
import  {TIMEOUT}  from "playwright.config";
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    const isLocal = process.env.npm_config_RUN_MODE || "Remote or Pipeline";
    console.log(`=================== RUN_MODE chosen is  ================ ` +isLocal) ;
    console.log(`=================== Custom Timeout in milliseconds  ================ ` +TIMEOUT) ;
    getEnv();
    browser = await invokeBrowser();
});

// It will trigger for not auth scenarios
Before({ tags: "not @auth" }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;

    // Check if running in local mode
    const isLocal = process.env.npm_config_RUN_MODE === "local";

    context = await browser.newContext({
        recordVideo: isLocal ? { dir: "test-results/videos" } : undefined, // Enable video recording only in local mode
    });

    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: isLocal, // Enable screenshots only in local mode
        snapshots: isLocal,  // Enable snapshots only in local mode
    });

    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

// It will trigger for auth scenarios
Before({ tags: '@auth' }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;

    // Check if running in local mode
    const isLocal = process.env.npm_config_RUN_MODE === "local";

    context = await browser.newContext({
        storageState: getStorageState(pickle.name),
        recordVideo: isLocal ? { dir: "test-results/videos" } : undefined, // Enable video recording only in local mode
    });

    // Start tracing only if in local mode
    if (isLocal) {
        await context.tracing.start({
            name: scenarioName,
            title: pickle.name,
            sources: true,
            screenshots: true, // Enable screenshots in local mode
            snapshots: true,   // Enable snapshots in local mode
        });
    }

    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle, result }) {
    const isLocal = process.env.npm_config_RUN_MODE === "local";

    let videoPath: string;
    let img: Buffer;
    const path = `./test-results/trace/${pickle.id}.zip`;

    if (isLocal && result?.status == Status.PASSED) {
        img = await fixture.page.screenshot(
            { path: `./test-results/screenshots/${pickle.name}.png`, type: "png" }
        );
        videoPath = await fixture.page.video().path();
    }


    // Stop tracing only if in local mode
    if (isLocal) {
        await context.tracing.stop({ path: path });
    }
    await fixture.page.close();
    await context.close();

    if (isLocal && result?.status == Status.PASSED) {
        await this.attach(img, "image/png");
        await this.attach(fs.readFileSync(videoPath), 'video/webm');
        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`;
        await this.attach(`Trace file: ${traceFileLink}`, 'text/html');
    }
});

AfterAll(async function () {
    await browser.close();
});

function getStorageState(user: string): string | { cookies: { name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: "Strict" | "Lax" | "None"; }[]; origins: { origin: string; localStorage: { name: string; value: string; }[]; }[]; } {
    if (user.endsWith("admin"))
        return "e2e/helper/auth/admin.json";
    else if (user.endsWith("lead"))
        return "e2e/helper/auth/lead.json";
}