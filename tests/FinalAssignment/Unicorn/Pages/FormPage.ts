import { Page, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

export class FormPage {
    private page: Page;

    private readonly propertyTypeCombobox = "//input[@role='combobox' and @id='disclosureType']";
    private readonly transactionTypeInputs = "//div[@class='ng-input']/input";
    private readonly optionLabels = "//span[@class='ng-option-label']";
    private readonly cashOnlyLabel = "//label[contains(text(),'Cash Only')]";
    private readonly cashFinanceLabel = "//label[contains(text(),'Cash + Finance')]";
    private readonly closingDateInput = "//input[@id='closingDate' and @name='closingDate']";
    private readonly disbursementDateInput = "//input[@id='disbursementDate' and @name='disbursementDate']";
    private readonly dealAgentInput = "//input[@id='dealAgentName' and @name='dealAgentName']";
    private readonly fileInput = "//input[@name='file-input' and @id='file-input']";
    private readonly submitButton = "//input[@class='btn btn-primary mb-3 submit-btn primary-btn']";
    private readonly previewButton = "//button[contains(text(),'Preview')]";

    constructor(page: Page) {
        this.page = page;
    }

    async fillFormDetails(
        cashOrCashFin: boolean,
        closingDate: string,
        disbursementDate: string,
        dealAgent: string,
        photoPath: string
    ): Promise<void> {
        const propertyType = this.page.locator(this.propertyTypeCombobox);
        await propertyType.click();
        
        const propertyTypesList = this.page.locator(this.optionLabels);
        await propertyTypesList.first().waitFor({ state: 'visible' });
        
        const propertyTypesCount = await propertyTypesList.count();
        console.log(`Total property types available: ${propertyTypesCount}`);
        console.log("Available property types:");
        
        const propertyTypes: string[] = [];
        for (let i = 0; i < propertyTypesCount; i++) {
            const text = await propertyTypesList.nth(i).textContent();
            if (text) {
                propertyTypes.push(text);
                console.log(`\t${text}`);
            }
        }
        
        const propertyTypeIndex = 2;
        expect(propertyTypeIndex).toBeLessThanOrEqual(propertyTypes.length - 1);
        await propertyType.fill(propertyTypes[propertyTypeIndex]);

        const transactionType = this.page.locator(this.transactionTypeInputs).nth(1);
        await transactionType.click();
        
        const transactionTypesList = this.page.locator(this.optionLabels);
        await transactionTypesList.first().waitFor({ state: 'visible' });
        
        const transactionTypesCount = await transactionTypesList.count();
        console.log(`Total transaction types available: ${transactionTypesCount}`);
        console.log("Transaction property types:");
        
        const transactionTypes: string[] = [];
        for (let i = 0; i < transactionTypesCount; i++) {
            const text = await transactionTypesList.nth(i).textContent();
            if (text) {
                transactionTypes.push(text);
                console.log(`\t${text}`);
            }
        }
        
        const transactionTypeIndex = 2;
        expect(transactionTypeIndex).toBeLessThanOrEqual(transactionTypes.length - 1);
        await transactionType.fill(transactionTypes[transactionTypeIndex]);

        if (cashOrCashFin) {
            await this.page.locator(this.cashOnlyLabel).click();
        } else {
            await this.page.locator(this.cashFinanceLabel).click();
        }

        const closingDateElement = this.page.locator(this.closingDateInput);
        await closingDateElement.clear();
        await closingDateElement.fill(closingDate);

        const disbursementDateElement = this.page.locator(this.disbursementDateInput);
        await disbursementDateElement.clear();
        await disbursementDateElement.fill(disbursementDate);

        const dealAgentElement = this.page.locator(this.dealAgentInput);
        await dealAgentElement.clear();
        await dealAgentElement.fill(dealAgent);

        const photoFile = path.resolve(photoPath);
        if (!fs.existsSync(photoFile)) {
            throw new Error(`Photo file not found at location: ${photoPath}`);
        }
        await this.page.locator(this.fileInput).setInputFiles(photoFile);

        await this.page.locator(this.submitButton).click();
        await this.page.locator(this.previewButton).click();
    }
}