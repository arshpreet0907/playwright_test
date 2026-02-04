import { Page, Locator, expect } from '@playwright/test';

export class OverviewPage {
    readonly page: Page;
    
    // Locators
    private readonly itemNames: string = ".inventory_item_name";
    private readonly itemDescriptions: string = ".inventory_item_desc";
    private readonly itemPrices: string = ".inventory_item_price";
    private readonly paymentInfo: string = "div[data-test='payment-info-value'].summary_value_label";
    private readonly shippingInfo: string = "div[data-test='shipping-info-value'].summary_value_label";
    private readonly subtotalLabel: string = "div[data-test='subtotal-label'].summary_subtotal_label";
    private readonly taxLabel: string = "div[data-test='tax-label'].summary_tax_label";
    private readonly totalLabel: string = "div[data-test='total-label'].summary_total_label";
    private readonly finishButton: string = "button#finish[data-test='finish'][name='finish']";

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Finish purchase and verify items
     * @param itemCount - Expected number of items in cart
     */
    async finishPurchase(itemCount: number): Promise<void> {
        // Wait for items to load
        await this.page.waitForLoadState('networkidle');
        
        // Get item details
        const itemNames = this.page.locator(this.itemNames);
        const itemDescriptions = this.page.locator(this.itemDescriptions);
        const itemPrices = this.page.locator(this.itemPrices);

        await itemNames.first().waitFor({ state: 'visible' });
        
        const namesCount = await itemNames.count();
        const descCount = await itemDescriptions.count();
        const pricesCount = await itemPrices.count();

        const sizeCheck = (namesCount === descCount) && (namesCount === pricesCount);
        expect(sizeCheck, "Cart item name, description, and prices have mismatch in count").toBeTruthy();

        const cartCheck = namesCount === itemCount;
        expect(cartCheck, `Cart items have mismatch in count. Expected: ${itemCount}, Actual: ${namesCount}`).toBeTruthy();

        for (let i = 0; i < namesCount; i++) {
            const itemName = await itemNames.nth(i).textContent();
            const itemDescription = await itemDescriptions.nth(i).textContent();
            const itemPrice = await itemPrices.nth(i).textContent();

            console.log(`Item count: ${i + 1}`);
            console.log(`  Item name: ${itemName}`);
            console.log(`  Item description: ${itemDescription}`);
            console.log(`  Item price: ${itemPrice}`);
            console.log();
        }

        const paymentInfo = this.page.locator(this.paymentInfo);
        const paymentText = await paymentInfo.textContent();
        console.log("Payment Information:");
        console.log(`  ${paymentText}`);

        const shippingInfo = this.page.locator(this.shippingInfo);
        const shippingText = await shippingInfo.textContent();
        console.log("Shipping Information:");
        console.log(`  ${shippingText}`);

        console.log("Price Total:");

        const subtotal = this.page.locator(this.subtotalLabel);
        const subtotalText = await subtotal.textContent();
        console.log(`  Subtotal: ${subtotalText}`);

        const tax = this.page.locator(this.taxLabel);
        const taxText = await tax.textContent();
        console.log(`  Tax: ${taxText}`);

        const total = this.page.locator(this.totalLabel);
        const totalText = await total.textContent();
        console.log(`  Final Total: ${totalText}`);

        const finishBtn = this.page.locator(this.finishButton);
        await finishBtn.waitFor({ state: 'visible' });
        await finishBtn.click();
    }
}