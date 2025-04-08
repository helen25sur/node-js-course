// Створіть Transform-стрім, який замінює всі входження “password” на “********”
const fs = require('fs');
const { Transform } = require('stream');

const toChangeEntryTransform = new Transform({
  transform(chunk, encoding, callback) {
    try {
      const data = chunk.toString().replaceAll('password', '********');
      callback(null, data);
    } catch (err) {
      callback(err);
    }
  }
});

const logTransform = new Transform({
  transform(chunk, encoding, callback) {
    console.log('✅ Входження замінені:', chunk.toString());
    callback(null, chunk); 
  }
});

const readable = fs.createReadStream('text.txt', { encoding: 'utf-8', highWaterMark: 1024 });
const writable = fs.createWriteStream('output.txt', { encoding: 'utf-8' });


readable
  .pipe(toChangeEntryTransform)
  .pipe(logTransform)        // логування
  .pipe(writable);           // запис у файл

readable.on('error', (error) => {
  console.error('❌ Помилка читання:', error);
});

readable.on('end', () => {
  console.log('🔒 Читання завершено');
});

writable.on('finish', () => {
  console.log('📝 Запис завершено');
});