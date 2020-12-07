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


    test(`Login with valid user`, async(t) => {
        await login.login(process.env.TODOIST_USERNAME, process.env.TODOIST_PASSWORD)
            await t.expect(login.title.innerText).eql('Today')
      
    })


