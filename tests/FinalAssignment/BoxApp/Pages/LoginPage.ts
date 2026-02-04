import { Page } from '@playwright/test';
import { BrowserManager } from '../Utils/BrowserManager';

export class LoginPage {
    private page: Page;

    private readonly emailInput = '#login-email';
    private readonly submitButton = '#login-submit';
    private readonly appUrl = 'https://app.box.com';
    private readonly loginUrlPattern = '**/login';

    constructor(page: Page) {
        this.page = page;
    }

    public static async create(): Promise<LoginPage> {
        const page = await BrowserManager.getInstance();
        return new LoginPage(page);
    }

    public async navigateToApp(): Promise<boolean> {
        try {
            await this.page.goto(this.appUrl);
            await this.page.waitForURL(this.loginUrlPattern, { timeout: 40000 });
            return true;
        } catch (error) {
            console.error('Error navigating to Box App:', error);
            return false;
        }
    }

    public async enterEmail(email: string): Promise<void> {
        await this.page.locator(this.emailInput).fill(email);
    }

    public async clickSubmit(): Promise<void> {
        await this.page.locator(this.submitButton).click();
    }

    public async submitEmail(email: string): Promise<boolean> {
        try {
            await this.enterEmail(email);
            await this.clickSubmit();
            return true;
        } catch (error) {
            console.error('Error submitting email:', error);
            return false;
        }
    }

    public async openAppAndSubmitEmail(email: string): Promise<boolean> {
        try {
            const navSuccess = await this.navigateToApp();
            if (!navSuccess) {
                return false;
            }
            return await this.submitEmail(email);
        } catch (error) {
            console.error('Error in openAppAndSubmitEmail:', error);
            return false;
        }
    }
}