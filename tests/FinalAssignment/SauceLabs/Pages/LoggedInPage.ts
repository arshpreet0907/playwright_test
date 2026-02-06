import { Page, expect } from '@playwright/test';

export class LoggedInPage {
    readonly page: Page;
    
    private readonly addToCartButtons: string = "button:has-text('Add to cart')";
    private readonly sortDropdown: string = "select.product_sort_container[data-test='product-sort-container']";
    private readonly shoppingCartBadge: string = "span.shopping_cart_badge[data-test='shopping-cart-badge']";
    private readonly priceLabels: string = ".inventory_item_price";
   
    constructor(page: Page) {
        this.page = page;
    }

    async verifyAddToCartButtons(): Promise<number> {
        const addToCartButtons = await this.page.locator(this.addToCartButtons).all();
        const numberOfButtons = addToCartButtons.length;
        
        console.log(`Total number of add to cart buttons are: ${numberOfButtons}`);
        
        await expect(numberOfButtons).toBeGreaterThanOrEqual(1);
        
        return numberOfButtons;
    }

    async addToCart(order: boolean): Promise<void> {
        const sortFilter = this.page.locator(this.sortDropdown);
        await sortFilter.waitFor({ state: 'visible' });
        
        if (order) {
            await sortFilter.selectOption({ label: 'Price (low to high)' });
        } else {
            await sortFilter.selectOption({ label: 'Price (high to low)' });
        }
        await this.page.waitForTimeout(500);

        let addToCartBtns = this.page.locator(this.addToCartButtons);
        let count = await addToCartBtns.count();

        while (count > 0) {
            await addToCartBtns.first().click();
            count = await addToCartBtns.count();
        }

        const cartBadge = this.page.locator(this.shoppingCartBadge);
        await cartBadge.waitFor({ state: 'visible' });
        await cartBadge.click();
    }
     
}