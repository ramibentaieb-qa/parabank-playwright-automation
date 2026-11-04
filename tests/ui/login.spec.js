// const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
// const userData = require('../../data/userData.json');
const {test, expect} = require('../../fixtures');


test.describe('ParaBank Login Tests', () => {

  test('Should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openHomePage();
    await loginPage.setUsername('wrongUser');
    await loginPage.setPassword('wrongPassword');
    await loginPage.clickLogin();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('An internal error has occurred and has been logged.');
  });

  test('Successful login with valid credentials', async({loginPage, registeredUser}) => {
    console.log(registeredUser.username)
    await loginPage.login(registeredUser.username, registeredUser.password);
    
    const message = await loginPage.getSuccessMessage();
    expect(message).toContain(
      'Your account was created successfully. You are now logged in.'
    );
    
  });

});