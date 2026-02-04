import { Page } from '@playwright/test';

export class LoggedInPage {
    private page: Page;

    private readonly addressInput = "//input[@id='address' and @placeholder='Enter Address']";
    private readonly fileNumberInput = "//input[@id='fileNumber' and @placeholder='Enter Deal Number']";
    private readonly purchaseLabel = "//label[contains(text(), 'Purchase')]";
    private readonly saleLabel = "//label[contains(text(), 'Sale')]";
    private readonly rentLabel = "//label[contains(text(), 'Rent')]";
    private readonly createNewButton = "//button[text()='CREATE NEW' and @type='submit']";

    public static readonly PURCHASE = "Purchase";
    public static readonly SALE = "Sale";
    public static readonly RENT = "Rent";

    constructor(page: Page) {
        this.page = page;
    }

    async createNew(dealType: string): Promise<void> {
        await this.page.locator(this.addressInput).fill("Indore");
        await this.page.locator(this.fileNumberInput).fill("123456");

        switch (dealType) {
            case LoggedInPage.PURCHASE:
                await this.page.locator(this.purchaseLabel).click();
                break;
            case LoggedInPage.SALE:
                await this.page.locator(this.saleLabel).click();
                break;
            case LoggedInPage.RENT:
                await this.page.locator(this.rentLabel).click();
                break;
            default:
                throw new Error(`Invalid deal type: ${dealType}`);
        }

        await this.page.locator(this.createNewButton).click();
    }
}