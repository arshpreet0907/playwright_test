import {test, chromium, firefox } from "@playwright/test";
 
 
/*
Automation in playwright always starts from page fixture
Inbuilt fixtures in playwright
browser - Browser class
context - BrowserContext class
page - Page class equivalent to one browser tab
browserName - String (name of the browseer)
request -API automation
*/
 
test('Different fixtures',async({page})=>{
  await page.goto("https://app.box.com");
});
 
test('Different fixtures1',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
  await page.goto("https://app.box.com");
});
 
test('Different fixtures2',async({context})=>{
    // const context = await browser.newContext();
    const page = await context.newPage();
  await page.goto("https://app.box.com");
});
 
test('Different fixtures3',async()=>{
    const browser =  await chromium.launch({
      headless:false,
      slowMo:2000   //after very action  sleep
    });
   const context = await browser.newContext();
    const page = await context. newPage();
  await page.goto("https://app.box.com");
});
 
 
test('Different fixtures with firefox',async()=>{
    const browser = await firefox.launch({
        headless:false,
    });
    const context = await browser.newContext();
    const page = await context. newPage();
      await page.goto("https://app.box.com");
});
 