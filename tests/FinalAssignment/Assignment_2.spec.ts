// Associate need to perform following automation in playwright:
// Step-1 login into saucedemo and pick username and password with automation 
// step-2 use expect to count no of add to cart button
// step-3 verify prices are sorting in ascending order and descending order
// step-4 click on cart button
// step-5 click checkout
// step-6 click continue to goto payment information page
// step-7 on this page verify product name and price are correct
// step-8 click finish
// step-9 verify thank you message
// (use POM and test steps)

import { test, expect } from '@playwright/test';
import { LandingPage } from './SauceLabs/Pages/LandingPage';
import { LoggedInPage } from './SauceLabs/Pages/LoggedInPage';
import { CartPage } from './SauceLabs/Pages/CartPage';
import { CheckoutInfoPage } from './SauceLabs/Pages/CheckoutInfoPage';
import { OverviewPage } from './SauceLabs/Pages/OverviewPage';
import { ThankyouPage } from './SauceLabs/Pages/ThankyouPage';

test.describe('Assignment 2 - SauceLabs E2E Purchase Test Suite', () => {

    test('Complete end-to-end purchase flow with price verification',{tag:["@saucelabs","@final_assignment_2"]}, async ({ page }) => {
        
        const order = true; // ascending order
        let productCount: number;
        let cartCount: number;
        
        let landingPage: LandingPage;
        let loggedInPage: LoggedInPage;
        let cartPage: CartPage;
        let checkoutInfoPage: CheckoutInfoPage;
        let overviewPage: OverviewPage;
        let thankyouPage: ThankyouPage;

        await test.step('Navigate to SauceDemo application', async () => {
            landingPage = new LandingPage(page);
            await landingPage.openSaucedemo();
        });

        await test.step('Login with credentials extracted from UI', async () => {
            await landingPage.saucedemologin();
        });

        await test.step('Verify add to cart buttons and get product count', async () => {
            loggedInPage = new LoggedInPage(page);
            productCount = await loggedInPage.verifyAddToCartButtons();
            console.log(`Total products available: ${productCount}`);
        });

        await test.step('Sort products by price (low to high) and add all to cart', async () => {
            await loggedInPage.addToCart(order);
        });

        await test.step('Verify cart items are in correct price order', async () => {
            cartPage = new CartPage(page);
            cartCount = await cartPage.verifyOrderOfCart(order);
            console.log(`Total items in cart: ${cartCount}`);
        });

        await test.step('Verify product count matches cart count', async () => {
            expect(productCount).toBe(cartCount);
            console.log(`Product count (${productCount}) matches cart count (${cartCount})`);
        });

        await test.step('Proceed to checkout', async () => {
            await cartPage.clickCheckout();
        });

        await test.step('Fill checkout information', async () => {
            checkoutInfoPage = new CheckoutInfoPage(page);
            await checkoutInfoPage.checkoutInformation();
        });

        await test.step('Review order details and complete purchase', async () => {
            overviewPage = new OverviewPage(page);
            await overviewPage.finishPurchase(cartCount);
        });

        await test.step('Verify thank you message and order confirmation', async () => {
            thankyouPage = new ThankyouPage(page);
            await thankyouPage.verifyThankyouMessage();
        });

        await test.step('Logout from SauceDemo application', async () => {
            await thankyouPage.saucedemoLogout();
        });

        await test.step('Wait for application to stabilize', async () => {
            await page.waitForTimeout(10000);
        });
    });

});