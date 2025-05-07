const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/PW-reports-e2e/",
    reportName: "Playwright UI Automation Report",
    pageTitle: "Uxli Xgen Automation test report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "Latest",
        },
        device: "Uxli- PC",
        platform: {
            name: "Windows",
            version: "10",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "Xgen UI Application" },
            { label: "Release", value: "1.0" },
            { label: "Cycle", value: "E2E" }
        ],
    },
});