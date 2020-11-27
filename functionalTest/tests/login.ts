import {LoginPage} from '../pages/login-page'
import {MainPage} from '../pages/main-page'

require('dotenv').config();
const login = new LoginPage()
const main = new MainPage()

const dataSet = require('../data/data.json')
fixture('Login validations').page(process.env.baseUrl)
.beforeEach(async t => {
    await main.navigateToLogin()

    console.log(process.env.EMAIL)
})

dataSet.forEach((data: { user: string; email: string; password: string; result: string; }) => {
    test(`Login with ${data.user} `, async(t) => {
        await login.login(data.email, data.password)
        if(data.user == 'valid user'){
            await t.expect(login.title.innerText).eql(data.result)
        }else{
            await t.expect(login.errorMsg.innerText).eql(data.result)
        } 
    })
});

