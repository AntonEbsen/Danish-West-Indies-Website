import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  workers: 1,
  retries: 0,
  use: { baseURL: 'http://127.0.0.1:4382', browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 4382', url: 'http://127.0.0.1:4382', reuseExistingServer: false },
});
