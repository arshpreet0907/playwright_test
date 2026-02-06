// Associate needs to login into Box portal at "https:/app.box.com" and:
// => Handle page tabs and iframes to create and delete new note in portal. (1 note should be created as pre-requistie 
// => Convert all this using POM model and test.steps

import { test, expect } from '@playwright/test';
import { getEmail, getPassword } from './BoxApp/Utils/Credentials';
import { LoginPage } from './BoxApp/Pages/LoginPage';
import { PasswordPage } from './BoxApp/Pages/PasswordPage';
import { BoxAppPage } from './BoxApp/Pages/BoxAppPage';
import { NotePage } from './BoxApp/Pages/NotePage';

test.describe('Assignment 3 - Box App Note Management Test Suite', () => {

    test('Create and delete note with multi-tab handling',{tag:["@boxapp", "@notes","@final_assignment_3"]}, async () => {
        
        let loginPage: LoginPage;
        let passwordPage: PasswordPage;
        let boxAppPage: BoxAppPage;
        let notePageTab: any;

        await test.step('Navigate to Box application and submit email', async () => {
            loginPage = await LoginPage.create();
            const emailSubmitted = await loginPage.openAppAndSubmitEmail(getEmail());
            expect(emailSubmitted).toBeTruthy();
            console.log('Email submitted successfully');
        });

        await test.step('Submit password and verify login', async () => {
            passwordPage = await PasswordPage.create();
            const loginSuccess = await passwordPage.submitPassword(getPassword());
            expect(loginSuccess).toBeTruthy();
            console.log('Password submitted successfully');
        });

        await test.step('Verify user is logged in', async () => {
            const isLoggedIn = await passwordPage.isLoggedIn();
            expect(isLoggedIn).toBeTruthy();
            console.log('User is logged in');
        });

        await test.step('Verify navigation to logged-in page', async () => {
            boxAppPage = await BoxAppPage.create();
            const onLoggedInPage = await boxAppPage.isOnLoggedInPage();
            expect(onLoggedInPage).toBeTruthy();
            console.log('User is on the logged-in page');
        });

        await test.step('Click new note button and switch to new tab', async () => {
            notePageTab = await boxAppPage.clickNewNote();
            expect(notePageTab).toBeTruthy();
            console.log('New note tab opened successfully');
        });

        await test.step('Create new note in the new tab', async () => {
            const notePage = new NotePage(notePageTab);
            await notePage.makeNewNote();
            console.log('New note created successfully');
        });

        await test.step('Delete the created note and close tab', async () => {
            const notePage = new NotePage(notePageTab);
            await notePage.deleteNewNote();
            console.log('Note deleted and tab closed successfully');
        });

        await test.step('Logout from Box application', async () => {
            const logoutSuccess = await boxAppPage.logout();
            expect(logoutSuccess).toBeTruthy();
            console.log('User logged out successfully');
        });
    });

});