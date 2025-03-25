const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright Automation Report",
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
            { label: "Project", value: "Xgen Application" },
            { label: "Release", value: "1.0" },
            { label: "Cycle", value: "E2E" }
        ],
    },
});