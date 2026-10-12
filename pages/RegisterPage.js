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

  async errorMessage() {
    return await this.getText('span[id="customer.username.errors"]')
  }

  async logoutButton() {
    await this.click('li a[href="logout.htm"]');
  }



}
module.exports = RegisterPage;