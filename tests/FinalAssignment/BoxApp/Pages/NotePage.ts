import { Page, expect } from '@playwright/test';
import { BrowserManager } from '../Utils/BrowserManager';

export class NotePage {
    private page: Page;

    private readonly serviceIframe = "//iframe[@id='service_iframe']";
    private readonly createNoteButton = "//button[@data-testid='create-note-button']";
    private readonly inboxButton = "//button[@aria-label='Inbox' and @data-testid='left-side-bar-inbox-button']";
    private readonly moreOptionsButton = "//button[@aria-label='Show more options']";
    private readonly deleteNoteOption = "//div[contains(.,'Delete this note') and @title='Delete this note']";
    private readonly deleteNotification = "//div[contains(.,'Item successfully moved to trash.') and @data-testid='notification']";

    constructor(page: Page) {
        this.page = page;
    }
    public static async create(): Promise<NotePage> {
            const page = await BrowserManager.getInstance();
            return new NotePage(page);
    }

    async makeNewNote(): Promise<void> {
        const frameElement = this.page.frameLocator(this.serviceIframe);
        
        await frameElement.locator(this.createNoteButton).click();
    }

    async deleteNewNote(): Promise<void> {

        const frameElement = this.page.frameLocator(this.serviceIframe);
        await frameElement.locator(this.inboxButton).click();
        await frameElement.locator(this.moreOptionsButton).click();
        await frameElement.locator(this.deleteNoteOption).click();
        const notification = frameElement.locator(this.deleteNotification);
        await notification.waitFor({ state: 'visible' });
        await notification.waitFor({ state: 'hidden' });
        
        await this.page.close();
    }
}