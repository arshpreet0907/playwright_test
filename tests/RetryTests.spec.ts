import { test, expect } from '@playwright/test';

test.describe('Simple website tests - one per browser', () => {
    test.describe.configure({ mode: 'parallel' });

  test('Test_1', async ({ page }) => {
    
    await page.goto('https://www.google.com');
    
    await page.waitForTimeout(5000);
    
    await expect(page).toHaveTitle(/Google/);
    console.log('Test passed!\n');
  });

  test('Test_2', async ({ page}) => {

    await page.goto('https://www.bing.com');

    await page.waitForTimeout(5000);
    
    await expect(page).toHaveTitle(/Bing/);
    console.log('Test passed!\n');
  });

  test('Test_3', async ({ page }) => {
    
    await page.goto('https://www.yahoo.com');
    
    await page.waitForTimeout(5000);
    
    await expect(page).toHaveTitle(/Yahoo/);
    console.log('Test passed!\n');
  });

});