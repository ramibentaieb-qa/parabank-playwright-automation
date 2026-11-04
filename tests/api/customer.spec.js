const {test, expect} = require('@playwright/test');

test('GET /customers/{id} returns the customer as JSON', async ({request}) => {
    const response = await request.get('customers/12212');

    
    
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body.id).toBe(12212);
    expect(body.address).toBeDefined();
});




test.describe('Customers API - negative cases', () => {

    const notFoundCases = [
        { name: 'nonexistent customer', path: 'customers/999999999', message: 'Could not find customer #999999999'},
        { name: 'negative customer id', path: 'customers/-1', message: 'Could not find customer #-1' },
        { name: 'accounts of nonexistent customer', path: 'customers/999999999/accounts', message: 'Could not find customer #999999999' },
    ];
    
    for (const c of notFoundCases) {
        test(`returns 400 with a plain-text message: ${c.name}`, async ({ request }) => {
            const response = await request.get(c.path);
            
            expect(response.status()).toBe(400);
            expect(response.headers()['content-type']).toContain('text/plain');
            expect(await response.text()).toBe(c.message);
        });
    }
    
    test('returns 404 with an empty body for a non-numeric id', async({request}) => {
        const response = await request.get('customers/abc');
        
        expect(response.status()).toBe(404);
        expect(await response.text()).toBe('');
    });
})