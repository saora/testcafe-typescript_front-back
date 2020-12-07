import {LoginPage} from '../pages/login-page'
import {MainPage} from '../pages/main-page'
import {DashboardPage} from '../pages/dashboard-page'

const login = new LoginPage()
const main = new MainPage()
const dasboard = new DashboardPage()

const dataSet = require('../data/data.json')
const data = dataSet[0]
require('dotenv').config();
fixture('Task validations').page(process.env.baseUrl)
.beforeEach(async t => {
    await main.navigateToLogin()
    await login.login(process.env.TODOIST_USERNAME, process.env.TODOIST_PASSWORD)
    await t.expect(login.title.innerText).eql('Today')
})


    test('Add a new task', async(t) => {
        await dasboard.createTask(1)
     
    })
    test('Add ten tasks', async(t) => {
        await dasboard.createTask(10)
        await dasboard.getAllCreatedTask()
     
    })





/* import {LoginPage} from '../pages/login-page'
import {DashboardPage} from '../pages/dashboard-page'

const login = new LoginPage()
const dasboard = new DashboardPage()

const dataSet = require('../data/data.json')
const dataFile = dataSet[0]

import {config} from '../../testcafe.conf'
import { Selector } from 'testcafe'
fixture `Tasks`.page `${config.baseUrl}`

test('Add new task', async(t) => {
    const randomTaskName =  Math.random().toString(16).substr(2, 8); // 6de5ccda
    await t
    .maximizeWindow()
        .click(login.getStartedButton)
        .click(login.loginLink)
        .typeText(login.email, dataFile.email)
        .typeText(login.password, dataFile.password)
        .click(login.loginBtn)

    .click(dasboard.newTask)
    .typeText(dasboard.taskDescription,`TASK-${randomTaskName}`)
    .click(dasboard.btnAddTask)
    var elements = Selector("div[class='markdown_content task_content']")
    var count = await elements.count
    console.log(count)

   await t
   .wait(5000)
   .expect(Selector(`div:nth-child(1) > div > ul > li:nth-child(${count}) > div > div.task_list_item__content>div`).innerText).eql(`TASK-${randomTaskName}`)
   
})


test('Add multiple task', async(t) => {
    dasboard.createTask(5)
}) */

/* test('Add 10 tasks', async(t) => {
    
    await t
    .maximizeWindow()
        .click(login.getStartedButton)
        .click(login.loginLink)
        .typeText(login.email, dataFile.email)
        .typeText(login.password, dataFile.password)
        .click(login.loginBtn)
        .click(dasboard.newTask)
        
     var elements = Selector("div[class='markdown_content task_content']")
    var count = await elements.count 

    for(let i=count+1; i<= count+10; i++){
        const randomTaskName =  Math.random().toString(16).substr(2, 8); // 6de5ccda
        await t
        .typeText(dasboard.taskDescription,`TASK-${randomTaskName}`)
        .click(dasboard.btnAddTask)
        .wait(3000)
        .expect(Selector(`div:nth-child(1) > div > ul > li:nth-child(${i}) > div > div.task_list_item__content>div`).innerText).eql(`TASK-${randomTaskName}`, {timeout:5000})
    }  

    
  


   
})*/
