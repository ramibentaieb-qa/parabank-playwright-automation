const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

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

});