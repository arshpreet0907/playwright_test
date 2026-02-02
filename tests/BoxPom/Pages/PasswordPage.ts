import { Page } from '@playwright/test';
import { BrowserManager } from '../Utils/BrowserManager';

export class PasswordPage {
    private page: Page;

    private readonly passwordInput = '#password-login';
    private readonly submitButton = '#login-submit-password';
    private readonly expectedPageTitle = 'Files | Powered by Box';

    constructor(page: Page) {
        this.page = page;
    }

    public static async create(): Promise<PasswordPage> {
        const page = await BrowserManager.getInstance();
        return new PasswordPage(page);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.page.locator(this.passwordInput).fill(password);
    }

    public async clickSubmit(): Promise<void> {
        await this.page.locator(this.submitButton).click();
    }

    public async waitForLoginSuccess(timeout: number = 40000): Promise<boolean> {
        try {
            await this.page.waitForFunction(
                (title) => document.title === title,
                this.expectedPageTitle,
                { timeout }
            );
            return true;
        } catch (error) {
            console.error('Error waiting for login success:', error);
            return false;
        }
    }

    public async submitPassword(password: string): Promise<boolean> {
        try {
            await this.enterPassword(password);
            await this.clickSubmit();
            return await this.waitForLoginSuccess();
        } catch (error) {
            console.error('Error submitting password:', error);
            return false;
        }
    }

    public async isLoggedIn(): Promise<boolean> {
        try {
            const title = await this.page.title();
            return title === this.expectedPageTitle;
        } catch (error) {
            console.error('Error checking login status:', error);
            return false;
        }
    }
}