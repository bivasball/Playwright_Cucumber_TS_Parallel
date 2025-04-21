module.exports = {
    default: {
        tags: process.env.npm_config_TAGS || "",
        formatOptions: {
            snippetInterface: "async-await",
        },
        paths: ["api/feature-files/*.feature"],
        publishQuiet: true,
        dryRun: false,
        require: [
            "api/hooks/hooks_api.ts",
            "api/step-definitions/*.ts"
        ],
        requireModule: ["ts-node/register", "tsconfig-paths/register"],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report-api.html",
            "json:test-results/cucumber-report-api.json",
        ],
        parallel: 1,
        timeout: 1 * 60 * 1000,
    },
};
