/* Визначити маршрути REST API
GET /tasks — отримати всі завдання
GET /tasks/:id — отримати одне завдання
POST /tasks — додати нове
PUT /tasks/:id — оновити існуюче
DELETE /tasks/:id — видалити */
const path = require('path');

const express = require('express');
const {  v4: uuidv4 } = require('uuid'); 

const writeFileJson = require('../utils/writeFileJson');
const readFileJson = require('../utils/readFileJson');

const router = express.Router();

const pathFile = path.join(__dirname, '..', 'data', 'tasks.json');

router.get('/tasks/:id', async (req, res, next) => {
  const id = req.params.id;
  const tasks = await readFileJson(pathFile);
  const task = tasks.find(item => item.id === id);
  if (!task) {
    return res.status(404).send('Task not found');
  }
  res.render('task', { 'task': task });
});

router.put('/tasks/:id', async (req, res, next) => {
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

router.delete('/tasks/:id', async (req, res, next) => {
  const id = req.params.id;
  const tasks = await readFileJson(pathFile);
  const newTasks = tasks.filter(item => item.id !== id);

  await writeFileJson(pathFile, newTasks);
  res.redirect('/');
});

router.post('/tasks', async (req, res, next) => {
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

router.get('/tasks', (req, res, next) => {
  res.redirect('/');
});


module.exports = router;