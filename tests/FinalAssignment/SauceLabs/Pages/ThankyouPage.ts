import { Page, expect } from '@playwright/test';

export class ThankyouPage {
    private page: Page;

    // Locators
    private readonly completeHeader = "//h2[@data-test='complete-header' and @class='complete-header']";
    private readonly completeText = "//div[@data-test='complete-text' and @class='complete-text']";
    private readonly backToProductsButton = "//button[@id='back-to-products' and @name='back-to-products']";
    private readonly burgerMenuButton = "//button[@id='react-burger-menu-btn' and text()='Open Menu']";
    private readonly logoutLink = "//a[@id='logout_sidebar_link']";

    constructor(page: Page) {
        this.page = page;
    }

    async verifyThankyouMessage(): Promise<void> {
        const headerText = await this.page.locator(this.completeHeader).textContent();
        const divText = await this.page.locator(this.completeText).textContent();

        if (!headerText || !divText) {
            throw new Error('Thank you message elements not found');
        }

        const finalMsg = headerText + divText;

        expect(finalMsg).not.toBe('');

        const thankyouMsg = "Thank you for your order!Your order has been dispatched, and will arrive just as fast as the pony can get there!";
        expect(finalMsg).toBe(thankyouMsg);

        await this.page.locator(this.backToProductsButton).click();
    }
    async saucedemoLogout(): Promise<void> {
        await this.page.locator(this.burgerMenuButton).click();
        await this.page.locator(this.logoutLink).click();
    }
}