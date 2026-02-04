import { Page, expect } from '@playwright/test';

export class CartPage {
    private page: Page;

    private readonly cartItemPrices = "//div[@class='cart_item_label']//div[@class='inventory_item_price']";
    private readonly checkoutButton = "//button[contains(text(),'Checkout') and @id='checkout']";

    constructor(page: Page) {
        this.page = page;
    }

    async verifyOrderOfCart(order: boolean): Promise<number> {
        let prevPrice = order ? Number.MIN_VALUE : Number.MAX_VALUE;
        
        const priceElements = this.page.locator(this.cartItemPrices);
        await priceElements.first().waitFor({ state: 'visible' });
        
        const count = await priceElements.count();
        
        for (let i = 0; i < count; i++) {
            const priceText = await priceElements.nth(i).textContent();
            
            if (!priceText) {
                throw new Error(`Price text not found for item at index ${i}`);
            }
            
            const amount = parseFloat(priceText.substring(1));
            
            if (order) {
                expect(amount).toBeGreaterThanOrEqual(prevPrice);
            } else {
                expect(amount).toBeLessThanOrEqual(prevPrice);
            }
            
            prevPrice = amount;
        }
        
        return count;
    }

    async clickCheckout(): Promise<void> {
        await this.page.locator(this.checkoutButton).click();
    }
}