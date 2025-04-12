// Зробити REST API на Express для керування завданнями, де всі дані зберігаються у файлі tasks.json. API має повністю працювати з цим файлом: при кожній зміні — перезапис, при кожному читанні — зчитування з файлу.
const path = require('path');
const { readFile, writeFile } = require('fs/promises');

const {  v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    return req.body._method;
  }
}));

const pathFile = path.join(__dirname, 'data', 'tasks.json');

async function readFileJson(path) {
    const content = await readFile(path, { encoding: 'utf-8'});
    return JSON.parse(content);
}

async function writeFileJson(path, tasks) {
  try {
    await writeFile(path, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error(error);
  }
}

app.get('/tasks/:id', async (req, res, next) => {
  const id = req.params.id;
  const tasks = await readFileJson(pathFile);
  const task = tasks.find(item => item.id === id);
  if (!task) {
    return res.status(404).send('Task not found');
  }
  res.render('task', { 'task': task });
});

app.put('/tasks/:id', async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const tasks = await readFileJson(pathFile);
  const task = tasks.find(item => item.id === id);
  if (!task) {
    return res.status(404).send('Task not found');
  }

  task.title = task.title !== req.body.title ? req.body.title : task.title;
  task.description = task.description !== req.body.description ? req.body.description : task.description;
  task.status = task.status !== req.body.status ? req.body.status : task.status;
  task.modifiedAt = new Date();

  await writeFileJson(pathFile, tasks);
  res.redirect('/');
});

app.delete('/tasks/:id', async (req, res, next) => {
  const id = req.params.id;
  const tasks = await readFileJson(pathFile);
  const newTasks = tasks.filter(item => item.id !== id);

  await writeFileJson(pathFile, newTasks);
  res.redirect('/');
});

app.post('/tasks', async (req, res, next) => {
  const tasks = await readFileJson(pathFile);
  const taskObj = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    createdAt: new Date()
  };
  tasks.push(taskObj);
  
  await writeFileJson(pathFile, tasks);
  res.redirect('/');
});

app.get('/tasks', (req, res, next) => {
  res.redirect('/');
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