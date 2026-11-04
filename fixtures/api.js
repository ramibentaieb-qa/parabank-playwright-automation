const {test: base, expect} = require('@playwright/test');
const {createUser} = require('../data/userFactory');

const REGISTER_URL = 'https://parabank.parasoft.com/parabank/register.htm';

exports.test = base.extend({
    apiUser: async ({request}, use) => {
        const user = createUser();
        await request.get(REGISTER_URL, { headers: { Accept: 'text/html' } });

        const registerResponse = await request.post(REGISTER_URL, {
            headers: { Accept: 'text/html'},
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
            throw new Error(`Register failed: ${registerResponse.status()} ${registerResponse.statusText()}\n${body.slice(0, 500)}`);
        }
        expect(await registerResponse.text()).toContain(`Welcome ${user.username}`);

        const loginRespnse = await request.get(`login/${user.username}/${user.password}`);
        expect(loginRespnse.status()).toBe(200);
        const customer = await loginRespnse.json();

        await use({ ...user, customerId: customer.id});
    },
});

exports.expect = expect;