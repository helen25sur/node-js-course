// Виводьте в консоль вміст log.txt по chunk’ах
const fs = require('fs');

const readStream = fs.createReadStream('log.txt', { encoding: 'utf8', highWaterMark: 1024 });

readStream.on('data', chunk => {
  console.log('📦 Отримано частину:', chunk);
});

readStream.on('end', () => {
  console.log('✅ Читання завершено');
});

readStream.on('error', err => {
  console.error('❌ Помилка при читанні:', err);
});