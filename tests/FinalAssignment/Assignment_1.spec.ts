// Associate need to perform following automation in playwright:
// => navigate to https://trainee-web-app.azurewebsites.net/auth/login
// =>login with test@test.com and test
// =>Verify welcome page
// =>verify logout button
// =>enter deal address and deal number
// =>choose agreement type
// =>click create deal btn
// =>choose property type, transaction type and cash type
// =>then enter dates
// =>then enter deal agent name
// =>then upload photo
// =>then submit the form
// =>then verify all given data on details page.
// =>also take screenshot of welcome page and  photo uploaded page
// =>do all this by following POM approach
// =>take test data in json file
// =>declare tags in the test and run from command line

import { test } from '@playwright/test';
import { LandingPage } from './Unicorn/Pages/LandingPage';
import { LoggedInPage } from './Unicorn/Pages/LoggedInPage';
import { FormPage } from './Unicorn/Pages/FormPage';
import { DetailsPage } from './Unicorn/Pages/DetailsPage';
import * as path from 'path';

test.describe('Assignment 1', () => {

    test('Fill and verify Unicorn deal form',{ tag: ["@unicorn", "@final_assignment_1"] }, async ({ page }) => {
        
        let landingPage: LandingPage;
        let loggedInPage: LoggedInPage;
        let formPage: FormPage;
        let detailsPage: DetailsPage;

        await test.step('Navigate to Unicorn application', async () => {
            landingPage = new LandingPage(page);
            await landingPage.openUnicorn();
        });

        await test.step('Login to Unicorn application', async () => {
            await landingPage.azzureUnicornLogin();
        });

        await test.step('Verify logout button is available', async () => {
            await landingPage.azzureUnicornLogout(false);
        });

        await test.step('Create new Sale deal', async () => {
            loggedInPage = new LoggedInPage(page);
            await loggedInPage.createNew(LoggedInPage.SALE);
        });

        await test.step('Fill form details with property and transaction information', async () => {
            formPage = new FormPage(page);
            const cashOrCashFin = false;
            const closingDate = "01-01-2022";
            const disbursementDate = "01-31-2022";
            const dealAgent = "Mark G";
            const photoPath = path.join(process.cwd(), "pic.jpg");
            
            await formPage.fillFormDetails(cashOrCashFin,closingDate,disbursementDate,dealAgent,photoPath);
        });

        await test.step('Verify and extract deal details from preview', async () => {
            detailsPage = new DetailsPage(page);
            await detailsPage.verifyDetails();
        });

        await test.step('Logout from Unicorn application', async () => {
            await landingPage.azzureUnicornLogout(true);
        });
    });

});