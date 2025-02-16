import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results.json' }] // Оновлено: JSON не в "playwright-report/"
  ],
  use: {
    trace: 'on',
  },
});
