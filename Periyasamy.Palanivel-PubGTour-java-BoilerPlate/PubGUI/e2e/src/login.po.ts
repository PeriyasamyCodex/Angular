import {browser, by, element} from 'protractor';

export class LoginPage{
    navigateTo(){

        return browser.get('login');
    }


    getUserNameTextBox(){

        return element(by.id('inputUserName'));

    }



    getPasswordTextBox(){

        return element(by.id('inputPassword'));

    }

    getForm(){

        return element(by.css('#loginForm'))
    }

    getSubmitButton(){

        return element(by.css('#btnSubmit'))
    }

}