// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const {BASE_URL} = require('./data/env');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],

  // top level, not inside `use`
  expect: { timeout: 15_000 },            

  // shared by all projects
  use: {                                  
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: BASE_URL },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: `${BASE_URL}/parabank/services/bank/`,
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
  ],
});