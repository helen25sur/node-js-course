const http = require('http');
const httpProxy = require('http-proxy');

// Сервери-приймачі
const targets = [
  { host: 'localhost', port: 3001 },
  { host: 'localhost', port: 3002 },
  { host: 'localhost', port: 3003 },
];

let current = 0;

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  const target = targets[current];
  current = (current + 1) % targets.length;

  proxy.web(req, res, { target: `http://${target.host}:${target.port}` }, (err) => {
    res.writeHead(502);
    res.end('Bad Gateway');
  });
});

server.listen(8000, () => {
  console.log('Round-robin load balancer running at http://localhost:8000');
});