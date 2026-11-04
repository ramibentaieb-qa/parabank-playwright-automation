const base = require('@playwright/test');
const RegisterPage = require('../pages/RegisterPage');
const LoginPage = require('../pages/LoginPage');
const { createUser } = require('../data/userFactory');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),

  // a user that already exists on the server, logged out
  registeredUser: async ({ registerPage }, use) => {
    const user = createUser();
    await registerPage.register(user);
    await registerPage.logoutButton();
    await use(user);
  },
});
exports.expect = base.expect;