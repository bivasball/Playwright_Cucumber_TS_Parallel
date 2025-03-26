###  Quick Setup:
1. Clone or download the project
2. Extract and open in the VS-Code
--to install the dependencies
3. npm i 
--to install the browsers
4. npx playwright install

--Checking Playwright version:
5. npx @playwright/test --version
--Install latest official version
6. npm install @playwright/test@latest


7. 
### to run in Headless mode of Chrome, no video recording.
npm run testUat --BROWSER=chromeHeadless --TAGS="@uxli and @e2e and @test_001"

##### to enable capture image and Video recording in LOCAL only 
npm run  testUat -- --RUN_MODE=local --BROWSER=chrome  --TAGS="@uxli and @e2e and @test_001"

## to run all the three at once by tags --
npm run testUat -- --RUN_MODE=local --BROWSER=chrome --TAGS="@uxli and @e2e and (@test_001 or @test_002 or @test_003)"
 ===============================================================

# Playwright (TS binding) + Cucumber (BDD)

Cucumber is a popular behavior-driven development (BDD) tool that allows developers and stakeholders to collaborate on defining and testing application requirements in a human-readable format. 
TypeScript is a powerful superset of JavaScript that adds optional static typing, making it easier to catch errors before runtime. By combining these two tools, we can create more reliable and maintainable tests.

## Features

1. Awesome report with screenshots, videos & logs
2. Execute tests on multiple environments 
3. Parallel execution
4. Rerun only failed features
5. Retry failed tests on CI
6. Github Actions integrated with downloadable report
7. Page object model

## Sample report
![image](https://github.com/ortoniKC/Playwright_Cucumber_TS/assets/58769833/da2d9f5a-85e7-4695-8ce2-3378b692afc4)


## Project structure

- .github -> yml file to execute the tests in GitHub Actions
- e2e -> Contains all the features & Typescript code
- test-results -> Contains all the reports related file

## Reports

1. [Mutilple Cucumber Report](https://github.com/WasiqB/multiple-cucumber-html-reporter)
2. Default Cucumber report
3. [Logs](https://www.npmjs.com/package/winston)
4. Screenshots of failure
5. Test videos of failure
6. Trace of failure

## Get Started

### Setup:

1. Clone or download the project
2. Extract and open in the VS-Code
3. `npm i` to install the dependencies
4. `npx playwright install` to install the browsers
5. `npm run test` to execute the tests
6. To run a particular test change
```
  paths: [
            "e2e/test/features/featurename.feature"
         ]
```
7. Use tags to run a specific or collection of specs
```
npm run test --TAGS="@test or @add"
```

### Folder structure
0. `e2e\pages` -> All the page (UI screen)
1. `e2e\test\features` -> write your features here
2. `e2e\test\steps` -> Your step definitions goes here
3. `e2e\hooks\hooks.ts` -> Browser setup and teardown logic
4. `e2e\hooks\pageFixture.ts` -> Simple way to share the page objects to steps
5. `e2e\helper\env` -> Multiple environments are handled
6. `e2e\helper\types` -> To get environment code suggestions
7. `e2e\helper\report` -> To generate the report
8. `config/cucumber.js` -> One file to do all the magic
9. `package.json` -> Contains all the dependencies
10. `e2e\helper\auth` -> Storage state (Auth file)
11. `e2e\helper\util` -> Read test data from json & logger

## Tutorials
1. Learn Playwright - [Playwright - TS](https://youtube.com/playlist?list=PL699Xf-_ilW7EyC6lMuU4jelKemmS6KgD)
2. BDD in detail - [TS binding](https://youtube.com/playlist?list=PL699Xf-_ilW6KgK-S1l9ynOnBGiZl2Bsk)





## VScode settings


============CREATE A `settings.json` inside `.vscode` folder and then paste the below , it helps to navigate =============================================
{
    "cucumberautocomplete.steps": [
        "e2e/test/steps/**/*.ts"
    ],
    "cucumberautocomplete.syncfeatures": "e2e/test/features/**/*.feature",
    "cucumberautocomplete.strictGherkinCompletion": true,
    "cucumberautocomplete.smartSnippets": true,
    "cucumberautocomplete.stepsInvariants": true,
    "cucumberautocomplete.skipDocStringsFormat": true,
    "cucumberautocomplete.formatConfOverride": {
        "And": 3,
        "But": "relative",
    },
    "cucumberautocomplete.onTypeFormat": true,
    "editor.quickSuggestions": {
        "comments": false,
        "strings": true,
        "other": true
    },
    "cucumberautocomplete.pureTextSteps": true
}
============================================================================================
#### install the below Extension in VS code ###########
Cucumber (Gherkin) Full Support

