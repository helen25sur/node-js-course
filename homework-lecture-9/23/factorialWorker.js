const { parentPort, workerData } = require('worker_threads');

function calculateFactorial(n) {
  let result = 1n;
  for (let i = 2n; i <= n; i++) {
    result *= i;
  }
  return result;
}

const number = BigInt(workerData);
const factorial = calculateFactorial(number);

parentPort.postMessage(factorial.toString());
