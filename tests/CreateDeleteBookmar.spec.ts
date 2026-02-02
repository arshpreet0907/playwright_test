import { test, expect, chromium, Browser, Page, BrowserContext } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

test('Create bookmark in Box app', async () => {
    try {
        await initialise();
        
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        const randomnumber = Math.floor(Math.random() * 1000) + 1;
        const bookmarkurl = `https://www.selenium.dev/${randomnumber}`;
        
        if (await openAppWait() && await loginBoxAppWait()) {
            const timestamp = new Date().toISOString().replace(/:/g, '-');
            await page.screenshot({ path: `screenshots/screenshot-${timestamp}.png`, fullPage: true });
            const result = await makeNewBookmark(bookmarkurl);
            
            if (result) {
                console.log(`bookmark with url: ${bookmarkurl} created`);
                await page.waitForTimeout(2000);
                const timestamp = new Date().toISOString().replace(/:/g, '-');
                await page.screenshot({ path: `screenshots/screenshot-${timestamp}.png`, fullPage: true });
            
            } else {
                console.log('bookmark create failed');
            }

             const result1 = await deleteBookmarkWait(bookmarkurl);
            
            if (result1) {
                console.log(`bookmark with url: ${bookmarkurl} deleted`);
                const timestamp = new Date().toISOString().replace(/:/g, '-');
                await page.screenshot({ path: `screenshots/screenshot-${timestamp}.png`, fullPage: true });
            
            } else {
                console.log('bookmark delete failed');
            }
            
            await logoutBoxAppWait();
        } else {
            console.log('opening url or login failed');
        }
        
        // await browser.close();
        // await page.waitForTimeout(600000);
        
    } catch (error: any) {
        console.log(error.message);
        throw error; 
    }
});

async function initialise() {
    browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']
    });
    
    context = await browser.newContext({
        viewport: null
    });
    page = await context.newPage();
    page.setDefaultTimeout(40000);
}

async function openAppWait(): Promise<boolean> {
    try {
        await page.goto('https://app.box.com');
        await page.waitForURL('**/login', { timeout: 40000 });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function loginBoxAppWait(): Promise<boolean> {
    try {
        await page.locator('#login-email').fill(getEmail());
        await page.locator('#login-submit').click();
        await page.locator('#password-login').fill(getPass());
        await page.locator('#login-submit-password').click();
        await page.waitForFunction(() => document.title === 'Files | Powered by Box', { timeout: 40000 });
        
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function makeNewBookmark(url: string): Promise<boolean> {
    try {
        await page.locator("button[aria-label='New']:not([aria-disabled='true'])").waitFor({ state: 'visible' });
        await page.locator("button[type='button'][data-testid='new-item-menu-button']").click();
        await page.locator("ul[data-testid='new-item-menu'] li[aria-label='Create a new Bookmark']").click();
        
        const popupTitle = await page.locator("h2:has-text('Create New Bookmark')").textContent();
        if (popupTitle !== 'Create New Bookmark') {
            throw new Error('Create bookmark popup not available');
        }
        
        const urlInput = page.locator("input[data-resin-target='urlinput'][name='url']");
        await urlInput.fill(url);
        
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Control+C');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Control+V');
        
        await page.locator("button[data-resin-target='create'][type='submit']").click();
        
        const notificationText = `A bookmark for "${url}" was created successfully.`;
        const notification = page.locator(`div.notification.info.wrap.v2 span:has-text('${notificationText}')`);
        
        await notification.waitFor({ state: 'visible' });
        
        const actualText = await notification.textContent();
        if (actualText !== notificationText) {
            throw new Error('Bookmark create notification not visible');
        }
        
        await notification.waitFor({ state: 'hidden' });
        
        return true;
        
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
}
async function deleteBookmarkWait(bookmarkurl: string): Promise<boolean> {
    try {
        const bookmarkRow = page.locator(`//a[text()='${bookmarkurl}']/ancestor::div[contains(@class,'TableRow-focusBorder')]`);
        await bookmarkRow.hover();
        
        await page.locator(`//a[text()='${bookmarkurl}']/ancestor::div[contains(@class,'TableRow-focusBorder')]//input[@type='checkbox']`).click();
        
        await page.locator("button[aria-label='Trash']").click();
        
        await page.locator("//span[text()='Okay']").click();
        
        const notification = page.locator("//span[text()='Item successfully moved to trash.']");
        await notification.waitFor({ state: 'visible' });
        
        const notificationText = await notification.textContent();
        if (notificationText !== 'Item successfully moved to trash.') {
            throw new Error('Bookmark delete notification not visible');
        }
        
        await notification.waitFor({ state: 'hidden' });
        
        return true;
        
    } catch (error) {
        console.log(error);
        return false;
    }
}
async function logoutBoxAppWait(): Promise<boolean> {
    try {
        await page.locator("button[data-resin-target='accountmenu']").click();
        await page.locator("a[data-resin-target='logout']").click();
        await page.waitForFunction(() => document.title === 'Box | Login', { timeout: 40000 });
        
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


function getEmail(): string {
    return 'arshpreet0907singh@gmail.com';
}

function getPass(): string {
    return '#Yashkijay@123';
}