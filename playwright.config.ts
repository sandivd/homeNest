import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  workers: 2,
  use: {
    baseURL: 'http://127.0.0.1:4180',
    reducedMotion: 'reduce',
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
    { name: 'small-mobile', use: { viewport: { width: 320, height: 740 } } },
  ],
  webServer: { command: 'node scripts/serve-build.cjs', url: 'http://127.0.0.1:4180/homeNest/', reuseExistingServer: false },
});
