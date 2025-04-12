// Зробити REST API на Express для керування завданнями, де всі дані зберігаються у файлі tasks.json. API має повністю працювати з цим файлом: при кожній зміні — перезапис, при кожному читанні — зчитування з файлу.
const path = require('path');
const { readFile, writeFile } = require('fs/promises');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const pathFile = path.join(__dirname, 'data', 'tasks.json');

async function readFileJson(path) {
    const content = await readFile(path, { encoding: 'utf-8'});
    return JSON.parse(content);
}

async function writeFileJson(path, tasks) {
  try {
    await writeFile(path, JSON.stringify(tasks));
  } catch (error) {
    console.error(error);
  }
}

app.use('/tasks/:id', async (req, res, next) => {
  if (req.method === 'GET') {
    const id = req.params.id;
    const tasks = await readFileJson(pathFile);
    const task = tasks.find(item => item.id === Number(id));
;
    res.render('task', { 'task': task });
  } else if (req.method === 'POST') {
    console.log('PUT');
    console.log(req.body);
    if(req.body._method === 'put') {
      const id = req.body.id;
      const tasks = await readFileJson(pathFile);
      const task = tasks.find(item => item.id === Number(id));
      
      task.title = task.title !== req.body.title ? req.body.title : task.title;
      task.description = task.description !== req.body.description ? req.body.description : task.description;
      task.status = task.status !== req.body.status ? req.body.status : task.status;
      task.modifiedAt = new Date();

      await writeFileJson(pathFile, tasks);
      res.redirect('/');
    } else if (req.body._method === 'delete') {
      const id = req.body.id;
      const tasks = await readFileJson(pathFile);
      const newTasks = tasks.filter(item => item.id !== Number(id));
      console.log(newTasks);

      await writeFileJson(pathFile, newTasks);
      res.redirect('/');
    }
  }
  
});

app.use('/tasks', async (req, res, next) => {
  if (req.method === 'POST') {
    const tasks = await readFileJson(pathFile);
    const taskObj = {
      id: Math.random(),
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      createdAt: new Date()
    };
    tasks.push(taskObj);
    
    await writeFileJson(pathFile, tasks);
    res.redirect('/');
  } else if (req.method === 'GET') {
    res.redirect('/');
  }
});

app.use('/', async(req, res, next) => {
  try {
    const tasks = await readFileJson(pathFile);
    res.render('index', {'tasks': tasks, 'length': tasks.length});

  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});