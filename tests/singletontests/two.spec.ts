import { test } from '../fixtures/singletonpage';
import { expect } from '@playwright/test';

test('Bing test', async ({ sharedPage }) => {
  console.log('Starting Bing test with shared page...');
  
  await sharedPage.goto('https://www.bing.com');
  
  await sharedPage.waitForTimeout(2000);
  
  await expect(sharedPage).toHaveTitle(/Bing/);
  console.log('Bing test passed!\n');
});