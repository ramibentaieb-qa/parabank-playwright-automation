const {test, expect} = require('../../fixtures/api');


test('login with valid credentials returns the customer', async ({request, apiUser}) => {
    const response = await request.get(`login/${apiUser.username}/${apiUser.password}`);

    expect(response.status()).toBe(200);
    const customer = await response.json();
    expect(customer.id).toBe(apiUser.customerId);
    expect(customer.firstName).toBe(apiUser.firstName);
});

test('login with bad credentials is rejected', async ({request}) => {
    const response = await request.get('login/nobody/wrongpass');

    expect(response.status()).toBe(400);
    expect(await response.text()).toBe('Invalid username and/or password');
})