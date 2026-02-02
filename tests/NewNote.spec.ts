import { test, expect, chromium, Browser, Page, BrowserContext } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;


test('Create new note in Box app', async () => {
    try {
        await initialise();
        
        if (await openAppWait() && await loginBoxAppWait()) {
            const timestamp = new Date().toISOString().replace(/:/g, '-');
            await page.screenshot({ path: `screenshots/screenshot-${timestamp}.png`, fullPage: true });
            const result = await makeNewNote();
            
            if (result) {
                console.log(`new note made`);
                await page.waitForTimeout(2000);
                const timestamp = new Date().toISOString().replace(/:/g, '-');
                await page.screenshot({ path: `screenshots/screenshot-${timestamp}.png`, fullPage: true });
            
            } else {
                console.log('note create failed');
            }
            
            // await logoutBoxAppWait();
        } else {
            console.log('opening url or login failed');
        }
        
        // await browser.close();
        await page.waitForTimeout(600000);
        
    } catch (error: any) {
        console.log(error.message);
        throw error; 
    }
});

async function initialise() {
    browser = await chromium.launch();
    context = await browser.newContext();
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
async function makeNewNote(): Promise<boolean> {
    try{
    await page.locator("//a[@role='menuitem' and @data-resin-target='boxnotes']").click();

    const newPagePromise = context.waitForEvent('page');
    const newPage = await newPagePromise;
    
   await newPage.waitForLoadState('domcontentloaded');
  
   const frameLocator = newPage.frameLocator("//iframe[@id='service_iframe']");
  
  await frameLocator.locator("//button[@data-testid='create-note-button']").click();
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