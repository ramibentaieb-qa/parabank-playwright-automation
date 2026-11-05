const { test: base, expect } = require('@playwright/test');
const { createUser } = require('../data/userFactory');

const REGISTER_URL = 'https://parabank.parasoft.com/parabank/register.htm';

exports.test = base.extend({
  apiUser: async ({ request }, use) => {
    const user = createUser();
    // TWO Steps that helped me fix error 500
    // Step 1: open the register page first (the server needs a session)
    await request.get(REGISTER_URL, { headers: { Accept: 'text/html' } });

    // Step 2: post new user on the form
    const registerResponse = await request.post(REGISTER_URL, {
      headers: { Accept: 'text/html' },
      form: {
        'customer.firstName': user.firstName,
        'customer.lastName': user.lastName,
        'customer.address.street': user.address,
        'customer.address.city': user.city,
        'customer.address.state': user.state,
        'customer.address.zipCode': user.zipCode,
        'customer.phoneNumber': user.phoneNumber,
        'customer.ssn': user.ssn,
        'customer.username': user.username,
        'customer.password': user.password,
        repeatedPassword: user.password,
      },
    });
    if (!registerResponse.ok()) {
      const body = await registerResponse.text();
      const match = body.match(/<p class="error">(.*?)<\/p>/s);
      const message = match ? match[1] : body.slice(0, 300);
      throw new Error('Register failed with status ' + registerResponse.status() + ': ' + message);
    }

    const loginResponse = await request.get(`login/${user.username}/${user.password}`);
    const customer = await loginResponse.json();

    await use({ ...user, customerId: customer.id });
  },
});

exports.expect = expect;