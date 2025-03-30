import { defineConfig } from '@playwright/test';

export const TIMEOUT = 60_000; // Set the global timeout value (60 seconds)

export default defineConfig({
  timeout: 60_000, // Global timeout for each test (60 seconds)
  use: {
    actionTimeout: TIMEOUT, // Timeout for individual actions
    navigationTimeout: 50_000, // Timeout for navigation actions
  },
  expect: {
    timeout: 10_000,
  },
});