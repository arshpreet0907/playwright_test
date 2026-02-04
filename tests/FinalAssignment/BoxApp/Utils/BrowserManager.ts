import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export class BrowserManager {
    private static instance: BrowserManager;
    private static page: Page | null = null;
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;

    private constructor() {}

    public static async getInstance(): Promise<Page> {
        if (!BrowserManager.instance) {
            BrowserManager.instance = new BrowserManager();
        }
        
        if (!BrowserManager.page) {
            await BrowserManager.instance.initializePage();
        }
        
        return BrowserManager.page!;
    }

    private async initializePage(): Promise<void> {
        if (!this.browser) {
            this.browser = await chromium.launch({ headless: false });
        }

        if (!this.context) {
            this.context = await this.browser.newContext();
        }

        if (!BrowserManager.page) {
            BrowserManager.page = await this.context.newPage();
        }
    }
    
}