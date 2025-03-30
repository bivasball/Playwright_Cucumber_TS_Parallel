module.exports = {
    default: {
        tags: process.env.npm_config_TAGS || "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "e2e/test/features/XgenLoginFeature/*.feature",
            "e2e/test/features/XgenSourceFeatures/*.feature"
        ],
        publishQuiet: true,
        dryRun: false,
        require: [
            "e2e/hooks/hooks.ts",
            "e2e/test/steps/XgenLoginSteps/*.ts",
            "e2e/test/steps/XgenSourceSteps/*.ts"
        ],
        requireModule: [
            "ts-node/register",
            "tsconfig-paths/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 1
    },
    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        publishQuiet: true,
        dryRun: false,
        require: [
            "e2e/hooks/hooks.ts",
            "e2e/test/steps/XgenLoginSteps/*.ts",
            "e2e/test/steps/XgenSourceSteps/*.ts"
        ],
        requireModule: [
            "ts-node/register",
            "tsconfig-paths/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 2
    }
}