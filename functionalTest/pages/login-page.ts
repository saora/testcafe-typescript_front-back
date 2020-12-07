import{Selector, t} from 'testcafe' 

export class LoginPage{
    elementByIdOrClassNme: Selector
    getStartedButton: SelectorPromise
    email: SelectorPromise
    password: SelectorPromise
    loginBtn: string
    title: Selector
    loginLink: Selector
    errorMsg: Selector
    timeZoneLink: Selector



    constructor(){
         this.elementByIdOrClassNme = Selector(value => {
            return document.getElementById(value) || document.getElementsByClassName(value)
        })
        this.loginLink = Selector('#signup > div > div.step_one > div.help_block > div > a')
        this.getStartedButton = this.elementByIdOrClassNme('_2q_cf _2k-7Y _2Op4w _132Op _1jSu4 ga-get-started-button')
        this.email = this.elementByIdOrClassNme('email')
        this.password = this.elementByIdOrClassNme('password')
        this.loginBtn = '#login_form > button'
        this.title = Selector('#agenda_view>header>div>h1>span')
        this.errorMsg = Selector('div.error_block>div>span')
        this.timeZoneLink = Selector('.timezone_link')

    }

    async login(useEmail:string, userPassword:string){
        await t
        .typeText(this.email, useEmail)
        .typeText(this.password, userPassword)
        .click(this.loginBtn)
        .click(this.timeZoneLink.nth(0))
        
    }





    async singUp(){
        await t.click(this.getStartedButton)
    }

    
}





