const { test, expect } = require('../../fixtures/api');

test.describe('Customers API', () => {

  // GET
  test('GET customer by id returns the customer', async ({ request, apiUser }) => {
    const response = await request.get(`customers/${apiUser.customerId}`);

    expect(response.status()).toBe(200);
    const customer = await response.json();
    expect(customer.id).toBe(apiUser.customerId);
    expect(customer.firstName).toBe(apiUser.firstName);
    expect(customer.lastName).toBe(apiUser.lastName);
    expect(customer.address.city).toBe(apiUser.city);
  });

  // GET with a wrong id
  test('GET customer with an unknown id returns 400', async ({ request }) => {
    const response = await request.get('customers/999999999');

    expect(response.status()).toBe(400);
    expect(await response.text()).toBe('Could not find customer #999999999');
  });

  // POST (update)
  test('POST update changes the customer city', async ({ request, apiUser }) => {
    const response = await request.post(`customers/update/${apiUser.customerId}`, {
      params: {
        firstName: apiUser.firstName,
        lastName: apiUser.lastName,
        street: apiUser.address,
        city: 'Boston',
        state: apiUser.state,
        zipCode: apiUser.zipCode,
        phoneNumber: apiUser.phoneNumber,
        ssn: apiUser.ssn,
        username: apiUser.username,
        password: apiUser.password,
      },
    });
    expect(response.status()).toBe(200);

    // checking that the change was saved
    const getResponse = await request.get(`customers/${apiUser.customerId}`);
    const customer = await getResponse.json();
    expect(customer.address.city).toBe('Boston');
  });

});