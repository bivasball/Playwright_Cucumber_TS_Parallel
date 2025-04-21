module.exports = {
    default:  {
        tags: process.env.npm_config_TAGS || "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "e2e/test/features/XgenLoginFeature/*.feature",
            "e2e/test/features/XgenSourceFeatures/*.feature",
            "e2e/test/features/XgenSyncFeatures/*.feature",
            "e2e/test/features/XgenModelFeature/*.feature",
            "e2e/test/features/XgenPipelineFeature/*.feature",
            "e2e/test/features/XgenGovernFeature/*.feature",
            "e2e/test/features/XgenSettingsFeature/*.feature"

        ],
        publishQuiet: true,
        dryRun: false,
        require: [
            "e2e/hooks/hooks.ts",
            "e2e/test/steps/XgenLoginSteps/*.ts",
            "e2e/test/steps/XgenSourceSteps/*.ts",
            "e2e/test/steps/XgenSyncSteps/*.ts",
            "e2e/test/steps/XgenModelSteps/*.ts",
            "e2e/test/steps/XgenPipelineSteps/*.ts",
            "e2e/test/steps/XgenGovernSteps/*.ts",
            "e2e/test/steps/XgenSettingsSteps/*.ts"

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
        parallel: 1,
        timeout: 35 * 60 * 1000
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
            "e2e/test/steps/XgenSourceSteps/*.ts",
            "e2e/test/steps/XgenSyncSteps/*.ts",
            "e2e/test/steps/XgenModelSteps/*.ts",
            "e2e/test/steps/XgenPipelineSteps/*.ts",
            "e2e/test/steps/XgenGovernSteps/*.ts",
            "e2e/test/steps/XgenSettingsSteps/*.ts"
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