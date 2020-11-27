require("dotenv").config();
const supertest = require("supertest");
const api = supertest(process.env.APP_HOST);

const TOKEN = process.env.TOKEN;
const PROJECTS_PATH = process.env.PROJECTS_PATH;
const TASK_PATH = process.env.TASK_PATH

const task = {
    id: null
}
const handlerRequestError = (result, url, method = null, body = null) => {
  if ( result.statusCode < 200 ||result.statusCode > 299 ||!result.statusCode) {
    throw {
      endpoint: api + url,
      method,
      body,
      result: result.body,
      statusCode: result.statusCode,
      response: result.text,
    };
  }
};

const getListAndTakeRandomItem = async (url, auth) => {
  const result = await api.get(url).set("Authorization", "Bearer " + auth);
  handlerRequestError(result, url);
  const list = result.body;
  const random = Math.floor(Math.random() * list.length + 0);
  const element = list[random];
  return element;
};

const requestWithBody = async (url, method, header, body) => {
  const result = await api[method](url)
    .set("Authorization", "Bearer " + header)
    .set("Accept", "application/json")
    .send(body);
  handlerRequestError(result, url);
  return result.body;
};

describe("Projects API Testing", async () => {
  it("Get all the projects created", async () => {
    await requestWithBody(PROJECTS_PATH, "get", TOKEN, "");
  });

  it("Create a new project", async () => {
    let randomName = Math.random().toString(12).substr(2, 6);
    await requestWithBody(PROJECTS_PATH, "post", TOKEN, {name: `PROJECT-${randomName}`,
    });
  });

  it("Get a random project", async () => {
    const result = await getListAndTakeRandomItem(PROJECTS_PATH, TOKEN);
    await requestWithBody(`${PROJECTS_PATH}/${result.id}`, "get", TOKEN, "");
  });

  it("Update a project", async () => {
    const result = await getListAndTakeRandomItem(PROJECTS_PATH, TOKEN);
    let randomName = Math.random().toString(12).substr(2, 6);
    let project = { name: `PROJECT-${randomName}` };
    await requestWithBody(`${PROJECTS_PATH}/${result.id}`, "post",TOKEN,project);
  });

  it("Delete a project", async () => {
    const result = await getListAndTakeRandomItem(PROJECTS_PATH, TOKEN);
    await requestWithBody(`${PROJECTS_PATH}/${result.id}`, "delete", TOKEN, "");
  });
});


describe("Tasks API Testing", async () => {
    it("Get active tasks", async () => {
      await requestWithBody(TASK_PATH, "get", TOKEN, "");
    });

    it("Create a new task", async () => {
        let randomName = Math.random().toString(12).substr(2, 6);
        let task_data = {"content": `TASK-${randomName}`, "due_string": "tomorrow at 12:00", "due_lang": "en", "priority": 4}
        await requestWithBody(TASK_PATH, "post", TOKEN, task_data);
    });

    it("Get active tasks", async () => {
        const result = await getListAndTakeRandomItem(TASK_PATH, TOKEN);
        await requestWithBody(`${TASK_PATH}/${result.id}`, "get", TOKEN, "");
    });

    it("Update a Task", async () => {
        const result = await getListAndTakeRandomItem(TASK_PATH, TOKEN);
        let randomName = Math.random().toString(12).substr(2, 6);
        let task = { content: `TASK-${randomName}`, due_string: "Next week at 12:00", due_lang: "en", priority: 4 };
        await requestWithBody(`${TASK_PATH}/${result.id}`, "post",TOKEN, task);
    });

    it("Close a task", async () => {
        const result = await getListAndTakeRandomItem(TASK_PATH, TOKEN);
         task.id = result.id
        await requestWithBody(`${TASK_PATH}/${task.id }/close`, "post", TOKEN, "");
    });

    it("Reopen task", async () => {
        await requestWithBody(`${TASK_PATH}/${task.id}/reopen`, "post", TOKEN, "");
    });

    it("Delete Task", async () => {
        const randomTask = await getListAndTakeRandomItem(TASK_PATH, TOKEN);
        await requestWithBody(`${TASK_PATH}/${randomTask.id}`, "delete", TOKEN, "");
    });
  
  });
  