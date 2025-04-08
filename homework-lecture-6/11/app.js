/* Реалізуйте сервер без використання Express, тільки через http.createServer, який:
відповідає на / — “Home Page”,
на /about — “About Us”,
на будь-який інший маршрут — 404.
*/

const http = require('http');
const path = require('path');
const fs = require('fs/promises');

function readHTMLFile(path, res, statusCode = 200) {
  fs.readFile(path)
      .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(statusCode);
        res.end(contents);
      })
      .catch(err => {
        res.setHeader("Content-Type", "text/plain");
        res.writeHead(500);
        res.end('Internal Server Error');
        console.error('❌ Error reading file:', err);
      });
}

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    const pathToMainFile = path.join(__dirname, 'pages', 'index.html');
    readHTMLFile(pathToMainFile, res);
  } else if (url === '/about') {
    const pathToAboutFile = path.join(__dirname, 'pages', 'about-us.html');
    readHTMLFile(pathToAboutFile, res);
  } else if (url === '/favicon.ico') {
    res.writeHead(204); // no content
    res.end();
  } else {
    const pathTo404File = path.join(__dirname, 'pages', '404.html');
    readHTMLFile(pathTo404File, res, 404);
  }

});

server.listen(3000, () => {
  console.log('🚀 Сервер запущено на http://localhost:3000')
});