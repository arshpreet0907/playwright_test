import { test } from '@playwright/test';
import { getBrowser } from './GetBrowser';

test("BrowserBasedOnName", async ({ browserName }) => {
  const browser = await getBrowser(browserName);
  
  if (browser) {
    const bContext = await browser.newContext();
    const page = await bContext.newPage();
    await page.goto("https://app.box.com");
    await console.log(await page.title()); 
  }
});

test("BrowserBasedOnName2", async () => {
  const browser = await getBrowser("chromium");
  if (browser) {
    const bContext = await browser.newContext();
    const page = await bContext.newPage();
    await page.goto("https://app.box.com");
   
    await console.log(await page.title());  
   
  }
});
//npx playwright test tests/OpenBrowserBasedOnName.spec.ts --headed --project=firefox