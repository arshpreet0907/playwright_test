import { test, expect } from '@playwright/test';


test('Basic Shadow DOM ', async ({ page }) => {
  
  await page.goto('https://shop.polymer-project.org');

  await page.locator('shop-app').waitFor();
  
  const shadowHost = page.locator('shop-app');
  
  await expect(shadowHost).toBeVisible();
  console.log('Shadow DOM host element is visible');
  
  const shadowInfo = await page.evaluate(() => {
    const hostElement = document.querySelector('shop-app');
    
    return {
      hostExists: !!hostElement,
      hasShadowRoot: !!hostElement?.shadowRoot,
      shadowMode: hostElement?.shadowRoot?.mode
    };
  });
  
  console.log('Shadow DOM Info:', shadowInfo);
//   const headerInShadow = page.locator('shop-app shop-header');
//   await expect(headerInShadow).toBeVisible();

//   console.log('Successfully accessed element inside Shadow DOM');
  
//   const logoText = await page.locator('shop-app shop-header .logo').first().textContent();
//   console.log('Logo text from Shadow DOM:', logoText);
  
});

