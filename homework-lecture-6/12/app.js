// Зробити REST API на Express для керування завданнями, де всі дані зберігаються у файлі tasks.json. API має повністю працювати з цим файлом: при кожній зміні — перезапис, при кожному читанні — зчитування з файлу.
const path = require('path');
const { readFile, writeFile } = require('fs/promises');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
// підключити папку view
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
// public
app.use(express.static(path.join(__dirname, 'public')));

async function readFileJson() {
  const pathFile = path.join(__dirname, 'data', 'tasks.json');
    const content = await readFile(pathFile, { encoding: 'utf-8'});
    return JSON.parse(content);
}

app.use('/tasks', async (req, res, next) => {
  console.log(req.body);
  const tasks = await readFileJson();
  const taskObj = {
    id: Math.random(),
    title: req.body.title,
    description: req.body.description,
    status: "todo",
    createdAt: new Date()
  };
  tasks.push(taskObj);
  console.log(tasks, typeof tasks);
  const pathFile = path.join(__dirname, 'data', 'tasks.json');
  writeFile(pathFile, JSON.stringify(tasks));
  res.redirect('/');
})

app.use('/', async(req, res, next) => {
  try {
    const tasks = await readFileJson();
    res.render('index', {'tasks': tasks, 'length': tasks.length});

  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});