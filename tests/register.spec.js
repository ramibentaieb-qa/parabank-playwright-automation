const { test, expect } = require('@playwright/test');
const RegisterPage = require('../pages/RegisterPage');
const userData = require('../data/userData.json');
const LoginPage = require('../pages/LoginPage');

test.describe('Parabank Register Tests', () => {

    test('A user should register with valid credentials', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.open();
        const SignupTitle= await registerPage.getRegisterTitle();
        expect(SignupTitle).toContain('Signing up is easy!');
        await registerPage.setFirstName(userData.validUser.firstName);
        await registerPage.setLastName(userData.validUser.lastName);
        await registerPage.setAddress(userData.validUser.address);
        await registerPage.setCity(userData.validUser.city);
        await registerPage.setState(userData.validUser.state);
        await registerPage.setZipCode(userData.validUser.zipCode);
        await registerPage.setPhoneNumber(userData.validUser.phoneNumber);
        await registerPage.setSsn(userData.validUser.ssn);
        await registerPage.setUsername(userData.validUser.username + Date.now);
        await registerPage.setPassword(userData.validUser.password);
        await registerPage.setRepeatedPassword(userData.validUser.password);
        await registerPage.clickRegister();
        // const SuccessMessage = await registerPage.getSuccessMessage();
        // expect(SuccessMessage).toContain(`Welcome ${userData.validUser.firstName 
        // +` `+ userData.validUser.lastName}`);
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
    
    test('Successful user registration and subsequent login', async({page}) => {
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);

        const dynamicUsername = "JohnD_" + Date.now();
        const password = userData.validUser.password;

        await registerPage.open();
        await registerPage.setFirstName(userData.validUser.firstName);
        await registerPage.setLastName(userData.validUser.lastName);
        await registerPage.setAddress(userData.validUser.address);
        await registerPage.setCity(userData.validUser.city);
        await registerPage.setState(userData.validUser.state);
        await registerPage.setZipCode(userData.validUser.zipCode);
        await registerPage.setPhoneNumber(userData.validUser.phoneNumber);
        await registerPage.setSsn(userData.validUser.ssn);
        await registerPage.setUsername(dynamicUsername);
        await registerPage.setPassword(password);
        await registerPage.setRepeatedPassword(password);
        await registerPage.clickRegister();
        await registerPage.logoutButton();

        await loginPage.openHomePage();
        await loginPage.setUsername(dynamicUsername);
        await loginPage.setPassword(password);
        await loginPage.clickLogin();

        const successMessage = await loginPage.getSuccessMessage();
        expect(successMessage).toContain('Welcome');
    })

});