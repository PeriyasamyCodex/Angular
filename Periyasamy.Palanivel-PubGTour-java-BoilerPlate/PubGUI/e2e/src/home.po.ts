import {browser, by, element} from 'protractor';

export class HomePage{
    navigateTo(){

        return browser.get('');
    }


    getListOfTournaments(){

        return element.all(by.css('div[id^=accordianTournaments]'));

    }



    getFirstTournBtn(){

        return element(by.id('tournBtn0'));

    }

    getListOfMatches(){

        return element.all(by.css('div[id^=accordianTournMatches]'));

    }

    getFirstTournMatchBtn(){

        return element(by.id('tournMatchBtn00'));

    }

    getFirstFavMatchBtn(){

        return element.all(by.css('button[id^=addFavBtn]'));

        
    }

    getFavMatchBtnForId(id:string){

        return element(by.css(id));

    }

   

}