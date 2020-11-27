import {Selector, t} from 'testcafe'

export class MainPage{
    login: Selector

    constructor(){
        this.login = Selector("ul:nth-child(2)>li>a[href='/users/showlogin']")
    }

    async navigateToLogin(){
        await t
        .click(this.login)
    }

}