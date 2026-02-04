import { Page } from '@playwright/test';
import { LandingPage } from './LandingPage';

export class DetailsPage {
    private page: Page;
    private landingPage: LandingPage;

    private readonly dataTable = "//table[@class='table table-bordered w-100']";

    constructor(page: Page) {
        this.page = page;
        this.landingPage = new LandingPage(page);
    }

    async extractTableData(): Promise<void> {
        const table = this.page.locator(this.dataTable);
        await table.waitFor({ state: 'visible' });

        const rows = table.locator('tr');
        const rowCount = await rows.count();

        let currentSection = "";

        console.log();
        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);

            const headers = row.locator('h5');
            const headerCount = await headers.count();

            if (headerCount > 0) {
                currentSection = (await headers.first().textContent())?.trim() || "";
                console.log(currentSection);
                continue;
            }

            const thElements = row.locator('th');
            const tdElements = row.locator('td');

            const thCount = await thElements.count();
            const tdCount = await tdElements.count();

            if (thCount > 0 && tdCount > 0) {
                const label = (await thElements.first().textContent())?.trim() || "";

                const images = tdElements.first().locator('img');
                const imageCount = await images.count();

                if (imageCount > 0) {
                    for (let j = 0; j < imageCount; j++) {
                        const imgSrc = await images.nth(j).getAttribute('src');
                        console.log(`${label.padEnd(30)} : [IMAGE]`);
                        if (imgSrc) {
                            console.log(`${''.padEnd(30)}   URL: ${imgSrc.substring(0, 100)}`);
                        }
                    }
                } else {
                    const value = (await tdElements.first().textContent())?.trim() || "";
                    console.log(`${label.padEnd(30)} : ${value}`);
                }
            }
        }
    }

    async verifyDetails(): Promise<void> {
        await this.extractTableData();
        await this.landingPage.saveScreenshot();
        await this.landingPage.scroll(475);
        await this.landingPage.saveScreenshot();
        await this.landingPage.scroll(475);
        await this.landingPage.saveScreenshot();
    }
}