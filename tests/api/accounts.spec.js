const { test, expect } = require('../../fixtures/api');

test.describe('Accounts API', () => {

  // GET
  test('GET accounts of a new customer returns one CHECKING account', async ({ request, apiUser }) => {
    const response = await request.get(`customers/${apiUser.customerId}/accounts`);

    expect(response.status()).toBe(200);
    const accounts = await response.json();
    expect(accounts).toHaveLength(1);
    expect(accounts[0].type).toBe('CHECKING');
    expect(accounts[0].customerId).toBe(apiUser.customerId);
  });

  // GET by id
  test('GET account by id returns that account', async ({ request, apiUser }) => {
    const listResponse = await request.get(`customers/${apiUser.customerId}/accounts`);
    const accounts = await listResponse.json();
    const accountId = accounts[0].id;

    const response = await request.get(`accounts/${accountId}`);

    expect(response.status()).toBe(200);
    const account = await response.json();
    expect(account.id).toBe(accountId);
  });

  // POST
  test('POST createAccount adds a SAVINGS account', async ({ request, apiUser }) => {
    const listResponse = await request.get(`customers/${apiUser.customerId}/accounts`);
    const accounts = await listResponse.json();
    const checkingId = accounts[0].id;

    // newAccountType=1 means SAVINGS
    const response = await request.post(
      `createAccount?customerId=${apiUser.customerId}&newAccountType=1&fromAccountId=${checkingId}`
    );

    expect(response.status()).toBe(200);
    const newAccount = await response.json();
    expect(newAccount.type).toBe('SAVINGS');

    // check the new account is now in the customer's list
    const listAfter = await (await request.get(`customers/${apiUser.customerId}/accounts`)).json();
    expect(listAfter).toHaveLength(2);
  });

});