const express = require('express');
const cors = require('cors');
const path = require('path');
const { readFile } = require('fs/promises');
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/reviews', async (req, res) => {
  const filePath = path.join(__dirname, 'data', 'reviews.json');
  const content = await readFile(filePath, { encoding: 'utf-8'});
  const data = JSON.parse(content);
  res.send(data);
});

app.get('/', (req, res) => {
  res.send('<h1>Docker compose працює!</h1>');
});

app.listen(3001, () => {
  console.log('Сервер слухає порт 3001');
});
