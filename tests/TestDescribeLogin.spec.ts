import { test, expect, Page } from '@playwright/test';

const boxAppUrl = 'https://app.box.com';
const email = 'arshpreet0907singh@gmail.com'
const password='#Yashkijay@123'

const sauceusername='standard_user';
const saucepassword = 'secret_sauce';
const sauceDemoUrl = 'https://www.saucedemo.com';

test.describe('App Authentication', () => {
    let page: Page;
    test.describe.configure({ mode: 'parallel' });
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
    });

    test.afterAll(async () => {
        await page.close();
    });
    test('boxloginlogout', async () => {

        await test.step('Open Box App', async () => {
            await page.goto(boxAppUrl);
            await expect(page).toHaveTitle('Box | Login', { timeout: 100000 });
        });

        await test.step('Login to Box App', async () => {

            await page.locator('#login-email').fill(email);
            await page.locator('#login-submit').click();
            await page.locator('#password-login').fill(password);
            await page.locator('#login-submit-password').click();
            
            await expect(page).toHaveTitle('Files | Powered by Box', { timeout: 15000 });
        });

        await test.step('Logout from Box App', async () => {
            await page.locator("button[data-resin-target='accountmenu']").click();
            await page.locator("a[data-resin-target='logout']").click();
            
            await expect(page).toHaveTitle('Box | Login', { timeout: 10000 });
        });
    });
    test('saucedemo_login_logout', async () => {
        await test.step('Open SauceDemo Application', async () => {
            await page.goto(sauceDemoUrl);
            await expect(page).toHaveTitle('Swag Labs');
        });
        await test.step('Login with user:', async () => {
            await page.getByRole('textbox', { name: 'Username' }).fill(sauceusername);
            await page.getByRole('textbox', { name: 'Password' }).fill(saucepassword);
            await page.getByRole('button', { name: 'Login' }).click();
            
            await page.getByText('Products', { exact: true }).waitFor();
        });
        await test.step('Logout from SauceDemo', async () => {
            await page.getByRole('button', { name: 'Open Menu' }).click();
            await page.getByRole('link', { name: 'Logout' }).click();
            
            await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
        });
    });
});
