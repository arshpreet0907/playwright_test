import { Page } from '@playwright/test';

export class CheckoutInfoPage {
    private page: Page;

    // Locators
    private readonly firstNameInput = "//input[@placeholder='First Name' and @id='first-name']";
    private readonly lastNameInput = "//input[@placeholder='Last Name' and @id='last-name']";
    private readonly postalCodeInput = "//input[@placeholder='Zip/Postal Code' and @id='postal-code']";
    private readonly continueButton = "//input[@id='continue' and @value='Continue']";

    constructor(page: Page) {
        this.page = page;
    }

    async checkoutInformation(): Promise<void> {
        await this.page.locator(this.firstNameInput).fill("John");
        await this.page.locator(this.lastNameInput).fill("Doe");
        await this.page.locator(this.postalCodeInput).fill("123456");
        await this.page.locator(this.continueButton).click();
    }
}