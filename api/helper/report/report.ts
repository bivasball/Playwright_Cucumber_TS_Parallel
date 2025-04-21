const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright Automation API Report",
    pageTitle: "Uxli Xgen Automation API test report",
    displayDuration: false,
    metadata: {
        device: "Uxli- PC",
        platform: {
            name: "Windows",
            version: "latest",
        },
    },
    customData: {
        title: "Test API Info",
        data: [
            { label: "Project", value: "Xgen API " },
            { label: "Release", value: "1.0" },
            { label: "Cycle", value: "E2E" }
        ],
    },
});