import { test, expect } from '@playwright/test';
const MAX_WORKERS = 3;
test.describe('Search Engines Tests', () => {
  test.describe.configure({ mode: 'parallel' });
  test('Open Google', async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
    console.log('Google loaded successfully');
  });
    test('Open Bing', async ({ page }) => {
    await page.goto('https://www.bing.com');
    await expect(page).toHaveTitle(/Bing/);
    console.log('Bing loaded successfully');
  });

  test('Open Yahoo', async ({ page }) => {
    await page.goto('https://www.yahoo.com');
    await expect(page).toHaveTitle(/Yahoo/);
    console.log('Yahoo loaded successfully');
  });

});
export { MAX_WORKERS };
