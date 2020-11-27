# testcafe-typescript_front-back
Automation test in backend and frontend using testcafe, typescript, postman collection, supertest


note: You need to create an account in todoist: https://todoist.com/, then create yout token (login into todoist and go settings/integrations).  -- skip this if you already have it

1. Prepare the environment by installing the node dependencies:

       npm install

1. add a file .env in the root folder:

       ".env"

2. Copy and paste the next variables, and add the token created with your account of todoist:

        baseUrl = https://todoist.com/
        TOKEN = (replace this with a token created in todoist)
        APP_HOST = https://api.todoist.com
        PROJECTS_PATH = /rest/v1/projects
        TASK_PATH = /rest/v1/tasks

3. Go to file data.json (testcafe-typescript_front-back/functionalTest/data/data.json) and add the user credentials for todoist:

       "email":"put an email account for todoist",
       "password":"put the password here",


   


