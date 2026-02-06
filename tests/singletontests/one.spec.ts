import { test } from '../fixtures/singletonpage';
import { expect } from '@playwright/test';

test('Google test', async ({ sharedPage }) => {
  console.log('Starting Google test with shared page...');
  
  await sharedPage.goto('https://www.google.com');
  
  await sharedPage.waitForTimeout(2000);
  
  await expect(sharedPage).toHaveTitle(/Google/);
  console.log('Google test passed!\n');
});