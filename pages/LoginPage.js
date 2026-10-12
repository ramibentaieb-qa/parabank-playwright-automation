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

  async getErrorMessage() {
    return await this.getText('p.error');
  }
}

module.exports = LoginPage;