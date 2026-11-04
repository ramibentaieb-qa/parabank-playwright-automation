const LoginPage = require('../../pages/LoginPage');
const {test, expect} = require('../../fixtures');


test.describe('ParaBank Login Tests', () => {

  test('Should show error message with invalid credentials', async ({ loginPage }) => {
    
    await loginPage.login('wrongUser', 'wrongPassword');
    await expect(loginPage.errorMessage()).toContainText(
      'The username and password could not be verified.'
    )
  });



  test('Successful login with valid credentials', async({page, loginPage, registeredUser}) => {

    await loginPage.login(registeredUser.username, registeredUser.password);
    
    await expect(loginPage.getSuccessMessage())
      .toContainText(`Welcome ${registeredUser.firstName} ${registeredUser.lastName}`);
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
    
  });

});