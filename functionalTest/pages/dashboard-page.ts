import { Selector, t } from "testcafe"

export class DashboardPage{
    newTask: Selector
    btnAddTask: Selector
    taskName: Selector
    items:Selector

 
    constructor(){
        this.newTask = Selector("button[class='plus_add_button']")
        this.btnAddTask = Selector("button[type='submit']")
        this.taskName = Selector(".DraftEditor-editorContainer div[role='textbox']")
        this.items = Selector('.task_content')
       
        
    }

     async createTask(numberTask){
       await t
       // .expect(this.btnAddTask.visible).ok()
       .click(this.newTask)
         for(let i=1; i<=numberTask; i++){
             let randomName = Math.random().toString(12).substr(2, 6)
             await t
                 .typeText(this.taskName, `TASK-${randomName}`)
                 .click(this.btnAddTask)
                 .wait(3000)
                 .expect(this.items.withExactText(`TASK-${randomName}`).visible).ok()
         }

    }

    async getAllCreatedTask(){
        const n = await this.items.count
        console.log(n)
        for(let i=0; i<n; i++){
            let taskNameToDisplay = await this.items.nth(i).innerText
            console.log(taskNameToDisplay)
        }
    }
}