//  we need to run the scenario multiple times
// => You need to login  and logout into saucedemo website using different users and parameterise the test with different set of test data
import { test, expect } from '@playwright/test';
import * as testData from './SauceLabs/TestData/data.json';

test.describe('Assignment 4 - SauceLabs Multi-User Login Test Suite', () => {

    test('Verify login and logout for all users',{tag:["@saucelabs","@final_assignment_4"]}, async ({ page }) => {
        
        const users = testData.saucedemo.users;
        const password = testData.saucedemo.password;
        const url = testData.saucedemo.url;

        for (const username of users) {
            
            await test.step(`Navigate to SauceDemo for user: ${username}`, async () => {
                await page.goto(url);
                await expect(page).toHaveTitle('Swag Labs');
            });

            await test.step(`Login with credentials for user: ${username}`, async () => {
                await page.getByRole('textbox', { name: 'Username' }).fill(username);
                await page.getByRole('textbox', { name: 'Password' }).fill(password);
                await page.getByRole('button', { name: 'Login' }).click();
            });

            await test.step(`Verify successful login for user: ${username}`, async () => {
                await page.getByText('Products', { exact: true }).waitFor();
            });

            await test.step(`Logout from application for user: ${username}`, async () => {
                await page.getByRole('button', { name: 'Open Menu' }).click();
                await page.getByRole('link', { name: 'Logout' }).click();
            });

            await test.step(`Verify successful logout for user: ${username}`, async () => {
                await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
            });
        }
    });

});