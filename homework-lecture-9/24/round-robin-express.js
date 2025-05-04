const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const targets = [
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003'
];

let current = 0;

const app = express();

app.use((req, res, next) => {
  const target = targets[current];
  current = (current + 1) % targets.length;

  createProxyMiddleware({ target, changeOrigin: true })(req, res, next);
});

app.listen(8000, () => {
  console.log('Round-robin proxy with Express running at http://localhost:8000');
});