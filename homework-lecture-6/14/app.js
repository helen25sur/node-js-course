// Реалізуйте шаблон з використанням умовних операторів та циклів для відображення списку продуктів у магазині. Якщо продукт в наявності, він відображається зеленим кольором, якщо ні — червоним.
const path = require('path');
const { readFile } = require('fs/promises');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

async function readFileJson(path) {
  const content = await readFile(path, { encoding: 'utf-8'});
  return JSON.parse(content);
}

app.get('/', async (req, res) => {
  const filePath = path.join(__dirname, 'data', 'products.json');
  const products = await readFileJson(filePath);

  res.render('index', {
    products: products,
    title: "Products page"
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});