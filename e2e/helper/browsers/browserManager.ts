import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";

const options: LaunchOptions = {
  headless: !true,
};
export const invokeBrowser = () => {
  const browserType = process.env.npm_config_BROWSER || "chrome";
  //const browserType = process.env.npm_config_BROWSER ;
  console.log(`=================== the browser chosen is ================` +browserType) ;
  switch (browserType) {
    case "chrome":
      return chromium.launch(options);
    case "chromeHeadless":
      return chromium.launch({ ...options, headless: true }); // Override headless to true
    case "firefox":
      return firefox.launch(options);
    case "webkit":
      return webkit.launch(options);
    default:
      throw new Error("Please set the proper browser!");
  }
};
