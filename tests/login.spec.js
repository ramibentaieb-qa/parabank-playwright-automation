const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const userData = require('../data/userData.json');


test.describe('ParaBank Login Tests', () => {

  test('Should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openHomePage();
    await loginPage.setUsername('wrongUser');
    await loginPage.setPassword('wrongPassword');
    await loginPage.clickLogin();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('The username and password could not be verified.');
  });

  test('Successful login with valid credentials', async({page}) => {
    const loginpage = new LoginPage(page);

    await loginpage.openHomePage();
    await loginpage.setUsername(userData.validUser.username);
    await loginpage.setPassword(userData.validUser.password);
    await loginpage.clickLogin();
    // const SuccessMessage = await loginpage.getSuccessMessage();
    // expect(SuccessMessage).toContain('Accounts Overview');
  });

});