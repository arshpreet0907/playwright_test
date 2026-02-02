import { test, expect, Page } from '@playwright/test';

const boxAppUrl = 'https://app.box.com';
const email = 'arshpreet0907singh@gmail.com'
const password='#Yashkijay@123'



async function openBoxApp(page: Page): Promise<boolean> {
    try {
        await page.goto(boxAppUrl);
        await expect(page).toHaveTitle('Box | Login', { timeout: 10000 });
        return true;
    } catch (error) {
        console.error('Error opening Box app:', error);
        return false;
    }
}

async function loginBoxApp(page: Page, email: string, password: string): Promise<boolean> {
    try {
        await page.locator('#login-email').fill(email);
        await page.locator('#login-submit').click();
        await page.locator('#password-login').fill(password);
        
        await page.locator('#login-submit-password').click();
        
        await expect(page).toHaveTitle('Files | Powered by Box', { timeout: 15000 });
        
        return true;
    } catch (error) {
        console.error('Error during login:', error);
        return false;
    }
}

async function logoutBoxApp(page: Page): Promise<boolean> {
    try {
        await page.locator("button[data-resin-target='accountmenu']").click();
        
        await page.locator("a[data-resin-target='logout']").click();
        
        await expect(page).toHaveTitle('Box | Login', { timeout: 10000 });
        
        return true;
    } catch (error) {
        console.error('Error during logout:', error);
        return false;
    }
}


test(`Box App login and logout test for user: ${email}`, async ({ page }) => {
      
        const isOpened = await openBoxApp(page);
        expect(isOpened).toBeTruthy();
        
        
        const isLoggedIn = await loginBoxApp(page, email, password);
        expect(isLoggedIn).toBeTruthy();
        
        await page.locator("div[class*='TableRow-focusBorder']")
    .filter({ has: page.locator(`a:text("check_590")`) })
    .hover();

        await page.locator("div[class*='TableRow-focusBorder']")
    .filter({ hasText: "check_590" })
    .locator("input[type='checkbox']")
    .click();
   
        await page.locator("button[aria-label='New']")
    .filter({ hasNot: page.locator("[aria-disabled='true']") })
    .click();


        const isLoggedOut = await logoutBoxApp(page);
        expect(isLoggedOut).toBeTruthy();
});
