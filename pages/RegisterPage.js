const BasePage = require('./BasePage');

class RegisterPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async open() {
        await this.navigate('/parabank/register.htm');
    }

    async getRegisterTitle() {
        return await this.getText("h1.title");
    }

    async setFirstName(firstName) {
        await this.type('input[id="customer.firstName"]', firstName)
    }

    async setLastName(lastName) {
        await this.type('input[id="customer.lastName"]', lastName)
    }

    async setAddress(address) {
        await this.type('input[id="customer.address.street"]', address)
    }

    async setCity(city) {
        await this.type('input[id="customer.address.city"]', city)
    }

    async setState(state) {
        await this.type('input[id="customer.address.state"]', state)
    }

    async setZipCode(zipCode) {
        await this.type('input[id="customer.address.zipCode"]', zipCode)
    }

    async setPhoneNumber(phoneNumber) {
        await this.type('input[id="customer.phoneNumber"]', phoneNumber)
    }

    async setSsn(ssn) {
        await this.type('input[id="customer.ssn"]', ssn)
    }

    async setUsername(username) {
        await this.type('input[id="customer.username"]', username)
    }

    async setPassword(password) {
        await this.type('input[id="customer.password"]', password)
    }

    async setRepeatedPassword(repeatedPassword) {
        await this.type('input[id="repeatedPassword"]', repeatedPassword)
    }

    async clickRegister() {
    await this.click('input[type="submit"][value="Register"]');
  }

  errorMessage() {
    return this.page.locator('[id="customer.username.errors"]');
  }

//   async getSuccessMessage() {
//     const succesMessage = this.page.locator('div#leftPanel p.smallText');
//     await succesMessage.first().waitFor({state: 'visible', timeout: 5000});
//     return await succesMessage.first().textContent();
//   }

  async logoutButton() {
    await this.click('li a[href="logout.htm"]');
  }

  async register(user) {
    await this.open();
    await this.setFirstName(user.firstName);
    await this.setLastName(user.lastName);
    await this.setAddress(user.address);
    await this.setCity(user.city);
    await this.setState(user.state);
    await this.setZipCode(user.zipCode);
    await this.setPhoneNumber(user.phoneNumber);
    await this.setSsn(user.ssn);
    await this.setUsername(user.username);
    await this.setPassword(user.password);
    await this.setRepeatedPassword(user.password);
    await this.clickRegister();
  }

}
module.exports = RegisterPage;