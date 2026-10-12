const { test, expect } = require('@playwright/test');
const RegisterPage = require('../pages/RegisterPage');

test.describe('Parabank Register Tests', () => {

    test('A user should register with valid credentials', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.open();
        const SignupTitle= await registerPage.getRegisterTitle();
        expect(SignupTitle).toContain('Signing up is easy!');
        await registerPage.setFirstName("John");
        await registerPage.setLastName("Doe");
        await registerPage.setAddress("123 Automation St");
        await registerPage.setCity("Queens");
        await registerPage.setState("New York");
        await registerPage.setZipCode("75321");
        await registerPage.setPhoneNumber("+1 123456789");
        await registerPage.setSsn("123-25-987");
        await registerPage.setUsername("JohnD");
        await registerPage.setPassword("john123");
        await registerPage.setRepeatedPassword("john123");
        await registerPage.clickRegister();
        });


    test('Should show error with saved credentials', async({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.open();
        const SignupTitle= await registerPage.getRegisterTitle();
        expect(SignupTitle).toContain('Signing up is easy!');
        await registerPage.setFirstName("John");
        await registerPage.setLastName("Doe");
        await registerPage.setAddress("123 Automation St");
        await registerPage.setCity("Queens");
        await registerPage.setState("New York");
        await registerPage.setZipCode("75321");
        await registerPage.setPhoneNumber("+1 123456789");
        await registerPage.setSsn("123-25-987");
        await registerPage.setUsername("JohnD");
        await registerPage.setPassword("john123");
        await registerPage.setRepeatedPassword("john123");
        await registerPage.clickRegister();
        const ErroMessage = await registerPage.errorMessage();
        expect(ErroMessage).toContain('This username already exists.');
    })    

});