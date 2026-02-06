import { test as base, chromium, Browser, Page, BrowserContext } from '@playwright/test';

let browser: Browser | null = null;
let context: BrowserContext | null = null;
let sharedPage: Page | null = null;

export const test = base.extend<{ sharedPage: Page }>({
  sharedPage: [ async ({}, use) => {
            if (!browser) {
            console.log("Launching browser once...");
            browser = await chromium.launch({ headless: false });
            }
            if (!context) {
            console.log("Creating browser context once...");
            context = await browser.newContext();
            }

            if (!sharedPage) {
            console.log("Creating singleton page and navigating to app.box.com");
            sharedPage = await context.newPage();
            await sharedPage.goto('https://app.box.com');
            console.log("Navigated to box.app.com\n");
            }
            await use(sharedPage);

        }, { scope: 'worker' }
    ] // can also give it 'test' scope, but it will created and destroyed for each test
});
