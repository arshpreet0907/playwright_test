import { test, expect } from '@playwright/test';
import { getEmail, getPassword } from './Utils/Credentials';
import { LoginPage } from './Pages/LoginPage';
import { PasswordPage } from './Pages/PasswordPage';
import { BoxAppPage } from './Pages/BoxAppPage';



test.describe('Box App', () => {
    
    test('Box App: Login, Create Folder, Delete Folder, and Logout', async () => {
        
        let createdFolderName: string = '';

        try {
            
            const loginPage = await LoginPage.create();
            const emailSubmitted = await loginPage.openAppAndSubmitEmail(getEmail());
            
            expect(emailSubmitted).toBeTruthy();

            const passwordPage = await PasswordPage.create();
            const loginSuccess = await passwordPage.submitPassword(getPassword());
            
            expect(loginSuccess).toBeTruthy();

            const isLoggedIn = await passwordPage.isLoggedIn();
            expect(isLoggedIn).toBeTruthy();
            
            const boxAppPage = await BoxAppPage.create();

            const onLoggedInPage = await boxAppPage.isOnLoggedInPage();
            expect(onLoggedInPage).toBeTruthy();

            const createResult = await boxAppPage.createFolderWithVerification(undefined, 'Editor');
            
            expect(createResult.success).toBeTruthy();
            createdFolderName = createResult.folderName;
            
            console.log(`Folder created: "${createdFolderName}"`);
            
            expect(createdFolderName).toBeDefined();
            expect(createdFolderName.length).toBeGreaterThan(0);

            const deleteSuccess = await boxAppPage.deleteFolderWithVerification(createdFolderName);
            
            expect(deleteSuccess).toBeTruthy();
            console.log(`Folder deleted: "${createdFolderName}"`);

            const logoutSuccess = await boxAppPage.logout();
            
            expect(logoutSuccess).toBeTruthy();

        } catch (error) {
            console.error('Error details:', error);
            throw error;
        }
    });
});