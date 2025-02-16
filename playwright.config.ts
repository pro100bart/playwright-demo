import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',  // У тебе тести в папці e2e
  retries: 2,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://username.github.io/repository-name/',
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  reporter: [['html', { outputFolder: 'test-results/html-report', open: 'never' }]],
});
