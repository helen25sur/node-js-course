// Створіть шаблон для веб-сторінки, який виводить таблицю з даними користувачів. Кожен користувач має ім’я, вік та електронну пошту. Дані повинні передаватися з Node.js.

const path = require('path');
const { readFile } = require('fs/promises');

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

async function readFileJson(path) {
  const content = await readFile(path, { encoding: 'utf-8'});
  return JSON.parse(content);
}

app.get('/', async (req, res) => {
  const filePath = path.join(__dirname, 'data', 'users.json');
  const users = await readFileJson(filePath);

  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedUsers = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / limit);

  res.render('index', {
    users: paginatedUsers,
    title: "Pug table",
    currentPage: page,
    totalPages,
    commonLength: users.length
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});