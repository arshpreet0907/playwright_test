import { Page } from '@playwright/test';
class LoginPage {
    // compile time safety
  readonly page: Page;
  readonly usernameInput:String = 'username'; // cannot be reassigned
  readonly passwordInput:String = 'password';
  readonly loginButton:String = '//button[@type="submit"]';

  constructor(page: Page) {
    this.page = page; // Can only be set in constructor
  }
//   usernameInput:String="newuser";
}