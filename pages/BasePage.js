class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path) {
    await this.page.goto(path);
  }

  async type(selector, text) {
    const element = this.page.locator(selector);
    await element.fill(text);
  }

  async click(selector) {
    await this.page.locator(selector).click();
  }

  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }
}

module.exports = BasePage;