import { Page } from '@playwright/test';
import { BrowserManager } from '../Utils/BrowserManager';

export class BoxAppPage {
    private page: Page;

    private readonly newButton = "button[aria-label='New']:not([aria-disabled='true'])";
    private readonly newItemMenuButton = "button[type='button'][data-testid='new-item-menu-button']";
    private readonly createFolderOption = "ul#menu6 li[aria-label='Create a new Folder']";
    private readonly createFolderTitle = "//span[text()='Create a New Folder']";
    private readonly folderNameInput = "input[name='folder-name'][placeholder='My New Folder']";
    private readonly permissionSelect = "select[name='invite-permission']";
    private readonly createFolderSubmitButton = "button[data-resin-target='primarybutton'][type='submit']";
    
    private readonly accountMenuButton = "button[data-resin-target='accountmenu']";
    private readonly logoutLink = "a[data-resin-target='logout']";
    
    private readonly trashButton = "button[aria-label='Trash']";
    private readonly confirmDeleteButton = "//span[text()='Okay']";

    private readonly newNoteButton = "//a[@role='menuitem' and @data-resin-target='boxnotes']";
    
    private readonly expectedPageTitle = 'Files | Powered by Box';
    private readonly loginPageTitle = 'Box | Login';

    constructor(page: Page) {
        this.page = page;
    }

    public static async create(): Promise<BoxAppPage> {
        const page = await BrowserManager.getInstance();
        return new BoxAppPage(page);
    }

    public generateRandomFolderName(prefix: string = 'check_'): string {
        const randomNumber = Math.floor(Math.random() * 1000) + 1;
        return `${prefix}${randomNumber}`;
    }

    public async createFolder(folderName: string, permission: string = 'Editor'): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.newButton, { state: 'visible', timeout: 40000 });

            await this.page.locator(this.newItemMenuButton).click();

            await this.page.locator(this.createFolderOption).click();

            const popupTitle = await this.page.locator(this.createFolderTitle).textContent();
            if (popupTitle !== 'Create a New Folder') {
                console.error('Create Folder popup title mismatch');
                return false;
            }

            await this.page.locator(this.folderNameInput).fill(folderName);

            await this.page.locator(this.permissionSelect).selectOption({ label: permission });

            await this.page.locator(this.createFolderSubmitButton).click();

            const successNotification = `//span[text()='"${folderName}" was created successfully.']`;
            await this.page.waitForSelector(successNotification, { state: 'visible', timeout: 40000 });

            const notificationText = await this.page.locator(successNotification).textContent();
            if (notificationText !== `"${folderName}" was created successfully.`) {
                console.error('Folder create notification text mismatch');
                return false;
            }

            await this.page.waitForSelector(successNotification, { state: 'hidden', timeout: 40000 });

            return true;

        } catch (error) {
            console.error('Error creating folder:', error);
            return false;
        }
    }

    public async deleteFolder(folderName: string): Promise<boolean> {
        try {
            const folderRow = `//a[text()='${folderName}']/ancestor::div[contains(@class,'TableRow-focusBorder')]`;
            
            await this.page.locator(folderRow).hover();

            const folderCheckbox = `//a[text()='${folderName}']/ancestor::div[contains(@class,'TableRow-focusBorder')]//input[@type='checkbox']`;
            await this.page.locator(folderCheckbox).click();

            await this.page.locator(this.trashButton).click();

            await this.page.locator(this.confirmDeleteButton).click();

            const deleteNotification = "//span[text()='Item successfully moved to trash.']";
            await this.page.waitForSelector(deleteNotification, { state: 'visible', timeout: 40000 });

            const notificationText = await this.page.locator(deleteNotification).textContent();
            if (notificationText !== 'Item successfully moved to trash.') {
                console.error('Folder delete notification text mismatch');
                return false;
            }

            await this.page.waitForSelector(deleteNotification, { state: 'hidden', timeout: 40000 });
            return true;

        } catch (error) {
            console.error('Error deleting folder:', error);
            return false;
        }
    }

    public async logout(): Promise<boolean> {
        try {
            await this.page.locator(this.accountMenuButton).click();

            await this.page.locator(this.logoutLink).click();

            await this.page.waitForFunction(
                (title) => document.title === title,
                this.loginPageTitle,
                { timeout: 40000 }
            );

            console.log('Logout successful');
            return true;

        } catch (error) {
            console.error('Error during logout:', error);
            return false;
        }
    }

    public async isOnLoggedInPage(): Promise<boolean> {
        try {
            const title = await this.page.title();
            return title === this.expectedPageTitle;
        } catch (error) {
            console.error('Error checking logged-in status:', error);
            return false;
        }
    }

    public async waitForPageLoad(): Promise<boolean> {
        try {
            await this.page.waitForFunction(
                (title) => document.title === title,
                this.expectedPageTitle,
                { timeout: 40000 }
            );
            return true;
        } catch (error) {
            console.error('Error waiting for page load:', error);
            return false;
        }
    }

    public async createFolderWithVerification(
        folderName?: string,
        permission: string = 'Editor'
    ): Promise<{ success: boolean; folderName: string }> {
        const name = folderName || this.generateRandomFolderName();
        const success = await this.createFolder(name, permission);
        return { success, folderName: name };
    }

    public async deleteFolderWithVerification(folderName: string): Promise<boolean> {
        return await this.deleteFolder(folderName);
    }
    
    async clickNewNote(): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.locator(this.newNoteButton).click()
        ]);
        
        await newPage.waitForLoadState('load');
        
        return newPage;
    }

}
