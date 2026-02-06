import { test, expect, chromium, Browser, Page, BrowserContext } from '@playwright/test';

const password='secret_sauce';
const sauceDemoUrl = 'https://www.saucedemo.com';

[
    { username: 'standard_user' },
    { username: 'problem_user' },
    { username: 'performance_glitch_user' },
    { username: 'error_user' }
].forEach(({ username }) => {
    test(`SauceDemo login and logout test for user: ${username}`, async ({ page }) => {
  
        await page.goto(sauceDemoUrl);
        await expect(page).toHaveTitle('Swag Labs');
        
        await page.getByRole('textbox', { name: 'Username' }).fill(username);
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        await page.getByRole('button', { name: 'Login' }).click();

        await page.getByText('Products', { exact: true }).waitFor();

        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.getByRole('link', { name: 'Logout' }).click();

        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

        // page.close();   
    });
});