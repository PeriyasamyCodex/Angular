import {browser, by, element} from 'protractor';

export class RegisterPage{
    navigateTo(){

        return browser.get('register');
    }


    getUserNameTextBox(){

        return element(by.id('inputUserName'));

    }



    getPasswordTextBox(){

        return element(by.id('inputPassword'));

    }

    getConfirmPasswordTextBox(){

        return element(by.id('inputConfPassword'));

    }

    getEmailTextBox(){

        return element(by.id('inputEmail'));

    }

    getForm(){

        return element(by.css('#registerForm'))
    }

    getSubmitButton(){

        return element(by.css('#registerFormBtn'))
    }

}