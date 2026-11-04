// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],

  expect: { timeout: 15_000 },            // top level, not inside `use`

  use: {                                  // shared by all projects
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://parabank.parasoft.com' },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: 'https://parabank.parasoft.com/parabank/services/bank/',  // trailing slash!
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
  ],
});