import { Page, expect } from '@playwright/test';
import * as testData from '../TestData/data.json';

export class LandingPage {
    private page: Page;

    private readonly usernameInput = "//input[@id='user-name']";
    private readonly passwordInput = "//input[@id='password']";
    private readonly loginButton = "//input[@id='login-button']";
    private readonly loginCredentialsDiv = "//div[@id='login_credentials']";
    private readonly loginPasswordDiv = "//div[@class='login_password']";

    constructor(page: Page) {
        this.page = page;
    }

    async openSaucedemo() {
        await this.page.goto(testData.saucedemo.url);
        await expect(this.page).toHaveTitle(/Swag Labs/);
    }

    async saucedemologin() {
        const credentialsText = await this.page.locator(this.loginCredentialsDiv).textContent();
        
        if (!credentialsText) {
            throw new Error('Username credentials section not found');
        }
        
        const usernameLines = await this.extractUsernames(credentialsText);
        const username = usernameLines[0]?.trim();

        const passwordText = await this.page.locator(this.loginPasswordDiv).textContent();
        
        if (!passwordText) {
            throw new Error('Password section not found');
        }
        
        const password = passwordText.split(':')[1];
        
        if (!password) {
            throw new Error('Password not found at line 2');
        }

        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async extractUsernames(input: string): Promise<string[]> {

        const afterColon = input.split(':')[1];
        const nameParts = afterColon.split('_user');  
        const usernames: string[] = [];
        
        for (let i = 0; i < nameParts.length; i++) {
            const part = nameParts[i];
            if (part && usernames.length < 5) {
            const username = part + '_user';
            if (!usernames.includes(username)) {
                usernames.push(username);
            }
            }
        }
        
        return usernames;
    }
}