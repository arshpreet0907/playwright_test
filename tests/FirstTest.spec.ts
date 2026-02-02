import test, { Page,Browser,BrowserContext ,chromium} from '@playwright/test';

test('my first test', async ({ page }) => {
    console.log('Hello, Playwright!');
    await page.goto('https://app.box.com');
    console.log(await page.title());
    await page.close();
});
// test('context test', async ({ context }) => {
//     const page:Page= await context.newPage();
//     console.log('Hello, Playwright! Browser Test');
//     await page.goto('https://app.box.com');
//     console.log(await page.title());
//     await page.close();
// });
// test('browser test', async ({ browser }) => {
//     const context:BrowserContext = await browser.newContext();
//     const page:Page= await context.newPage();
//     console.log('Hello, Playwright! Browser Test');
//     await page.goto('https://app.box.com');
//     console.log(await page.title());
//     await page.close();
// });
// test('no fixture test', async () => {
//     const browser:Browser= await chromium.launch({
//         headless:false
//     });
//     const context:BrowserContext = await browser.newContext();
//     const page:Page= await context.newPage();
//     console.log('Hello, Playwright! Browser Test');
//     await page.goto('https://app.box.com');
//     console.log(await page.title());
//     await page.close();
// });