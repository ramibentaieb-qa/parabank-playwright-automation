const { test, expect } = require('../../fixtures');
const { createUser } = require('../../data/userFactory');


test.describe('Parabank Register Tests', () => {

    test('A user should register with valid credentials', async ({page, registerPage}) => {
        
        const user = createUser();
        await registerPage.register(user);
        await expect(page.getByRole('heading', { name: `Welcome ${user.username}` })).toBeVisible();
        
    });


    test('Should show error with saved credentials', async({registerPage, registeredUser}) => {
        
        await registerPage.register(registeredUser);
        await expect(registerPage.errorMessage()).toContainText('This username already exists.');
    
    
    }) 
    

});