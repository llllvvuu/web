import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/encryption.test.ts', '**/sha256.test.ts'],
    browser: {
      name: 'chromium',
      provider: 'playwright',
      enabled: true,
      headless: true,
    },
  },
});
