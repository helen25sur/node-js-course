// Створіть програму на Node.js, яка використовує Worker Threads для паралельного виконання важкої обчислювальної задачі (наприклад, обчислення факторіала для великих чисел).

const { Worker } = require('worker_threads');

function runFactorialWorker(number) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./factorialWorker.js', {
      workerData: number
    });

    worker.on('message', (result) => {
      resolve(result);
    });

    worker.on('error', (err) => {
      reject(err);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Воркер завершився з кодом ${code}`));
      }
    });
  });
}

const number = 100n;

runFactorialWorker(number)
  .then(result => console.log(`Факторіал числа обчислено: ${result}`))
  .catch(err => console.error(`Помилка: ${err.message}`));
