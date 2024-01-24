import { AppPage } from './app.po';
import { LoginPage } from './login.po';
import { RegisterPage } from './register.po';
import { HomePage } from './home.po';
import { browser, by, element } from 'protractor';
import 'jasmine';
import { logging } from 'selenium-webdriver';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // it('should display welcome message', () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).toEqual('Welcome to PubGUI!');
  // });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

 
});

describe('Register Page e2e Tests', () => {

    let regPage: RegisterPage;
  
    beforeEach(() => {
  
        regPage = new RegisterPage();
        regPage.navigateTo();
    });
  
    it('Register form should be valid', () => {
  
        regPage.getUserNameTextBox().sendKeys('user');
        regPage.getPasswordTextBox().sendKeys('test123');
        regPage.getConfirmPasswordTextBox().sendKeys('test123');
        regPage.getEmailTextBox().sendKeys('test@test.com');
  
  
        let form = regPage.getForm().getAttribute('class');
  
        expect(form).toContain('ng-valid');
  
  
    });
  
    it('Register form should be invalid', () => {
  
        regPage.getUserNameTextBox().sendKeys('');
        regPage.getPasswordTextBox().sendKeys('123');
        regPage.getConfirmPasswordTextBox().sendKeys('123');
        regPage.getEmailTextBox().sendKeys('');
  
        let form = regPage.getForm().getAttribute('class');
  
        expect(form).toContain('ng-invalid');
  
  
    });
  
    it('Should register username to backend', async() => {

        
  
        regPage.getUserNameTextBox().sendKeys('testuser');
        regPage.getPasswordTextBox().sendKeys('testpassword');
        regPage.getConfirmPasswordTextBox().sendKeys('testpassword');
        regPage.getEmailTextBox().sendKeys('test@mail.com')
        regPage.getSubmitButton().click();
       
         browser.wait(function () {
  
             return browser.getCurrentUrl().then(function (url) {
                 return url === 'http://localhost:4211/login?registerStatus=true'
               
             })

            
  
         },30000);

        expect(browser.getCurrentUrl()).toEqual('http://localhost:4211/login?registerStatus=true');
     
  
        
  
  
    });
  
  
  });

describe('Login Page e2e Tests', () => {

  let page: LoginPage;

  beforeEach(() => {

      page = new LoginPage();
      page.navigateTo();
  });

  it('Login form should be valid', () => {

      page.getUserNameTextBox().sendKeys('testuser');
      page.getPasswordTextBox().sendKeys('testpassword');

      let form = page.getForm().getAttribute('class');

      expect(form).toContain('ng-valid');


  });

  it('Login form should be invalid', () => {

      page.getUserNameTextBox().sendKeys('');
      page.getPasswordTextBox().sendKeys('');

      let form = page.getForm().getAttribute('class');

      expect(form).toContain('ng-invalid');


  });

  it('Should set username to localstorage', () => {

      page.getUserNameTextBox().sendKeys('testuser');
      page.getPasswordTextBox().sendKeys('testpassword');
      page.getSubmitButton().click();
     
      browser.wait(function () {

          return browser.getCurrentUrl().then(function (url) {
              return url === 'http://localhost:4211/'
          })

      })
      let valueInLocalStorage = browser.executeScript("return JSON.parse(window.localStorage.getItem('loggedInUser')).userName;")

      expect(valueInLocalStorage).toEqual('testuser');


  });


});


describe('Home Page e2e Tests', () => {

    let page: HomePage;
  
    beforeEach(() => {
  
        page = new HomePage();
        page.navigateTo();
    });
  
    it('Home Page Should rendered with list of tournaments', () => {
  
        expect(page.getListOfTournaments().count()).toBeGreaterThan(0);

    });
  
    it('List of Matches to be rendered on Click', () => {
  
        page.getFirstTournBtn().click();
        expect(page.getListOfMatches().count()).toBeGreaterThan(0);
  
    });
  
   
  
  
  });