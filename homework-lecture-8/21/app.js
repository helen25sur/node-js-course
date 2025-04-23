// Реалізуйте базову конфігурацію кластеру для Node.js сервера, щоб скористатися всіма ядрами процесора для обробки запитів. Переконайтеся, що сервер здатний масштабуватися на кілька ядер.

const cluster = require('cluster');
const http = require('http');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`🧠 Primary процес PID ${process.pid} запущено`);
  console.log(`🔧 Створюю ${numCPUs} воркерів...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`❌ Воркер ${worker.process.pid} завершився`);
    console.log('🔁 Створюю нового воркера...');
    cluster.fork();
  });

} else {
  const PORT = process.env.PORT || 3000;

  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Привіт від воркера ${process.pid}`, 'utf-8');
  }).listen(PORT, () => {
    console.log(`🚀 Воркер ${process.pid} слухає на порту ${PORT}`);
  });
}
