import { Page, expect } from '@playwright/test';
import * as testData from '../TestData/data.json';
import * as fs from 'fs';
import * as path from 'path';

export class LandingPage {
    private page: Page;

    private readonly usernameInput = "#inputUserName";
    private readonly passwordInput = "#inputPassword";
    private readonly signInButton = "//button[@type='submit' and contains(text(),'SIGN IN')]";
    private readonly userProfileIcon = "//span[text()='R J']";
    private readonly logoutButton = "//div[@class='logout-text' and contains(text(),'Logout')]";

    constructor(page: Page) {
        this.page = page;
    }

    async openUnicorn(): Promise<void> {
        await this.page.goto(testData.unicorn.url);
        await expect(this.page).toHaveTitle(/UNICORN/);
        await this.saveScreenshot();
    }

    async azzureUnicornLogin(): Promise<void> {
        await this.page.locator(this.usernameInput).fill(testData.unicorn.user);
        await this.page.locator(this.passwordInput).fill(testData.unicorn.password);
        await this.page.locator(this.signInButton).click();
        
        await this.page.waitForURL(testData.unicorn.loggedinUrl);
    }

    async azzureUnicornLogout(logout: boolean): Promise<void> {
        await this.page.locator(this.userProfileIcon).click();
        const logoutBtn = this.page.locator(this.logoutButton);
        await logoutBtn.waitFor({ state: 'visible' });
        
        if (logout) {
            await logoutBtn.click();
            await this.page.goBack();
        } else {
            await this.page.locator(this.userProfileIcon).click();
            console.log("Logout btn is available and clickable");
        }
    }

    async scroll(offset: number): Promise<void> {
        await this.page.evaluate((scrollOffset) => {
            window.scrollBy(0, scrollOffset);
        }, offset);
    }

    async saveScreenshot(): Promise<void> {
        const screenshotDir = path.join(process.cwd(), 'screenshots');
        
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }
        
        const screenshotPath = path.join(screenshotDir, `screenshot_${Date.now()}.png`);
        await this.page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`Screenshot saved: ${screenshotPath}`);
    }
}