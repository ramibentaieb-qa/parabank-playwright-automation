const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async openHomePage() {
    await this.navigate('/parabank/index.htm');
  }

  async setUsername(username) {
    await this.type('input[name="username"]', username);
  }

  async setPassword(password) {
    await this.type('input[name="password"]', password);
  }

  async clickLogin() {
    await this.click('input[type="submit"][value="Log In"]');
  }

  errorMessage() {
    return this.page.locator('p.error');
  }

   async login(username, password) {
    await this.openHomePage();
    await this.setUsername(username);
    await this.setPassword(password);
    await this.clickLogin();
  }

  getSuccessMessage() {
    return this.page.locator('div#leftPanel p.smallText');
  }

}

module.exports = LoginPage;