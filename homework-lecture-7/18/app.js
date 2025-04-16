// Реалізуйте програму на Node.js, яка конвертує текстове повідомлення в бінарний формат, використовує Buffer для маніпуляцій з цим повідомленням, а потім конвертує його назад у текст.
const { Buffer } = require('node:buffer');

const message = '🧩 This is message for converting';

const buffer = Buffer.from(message, 'utf-8');
console.log(buffer);
const str = buffer.toString('utf-8');
console.log(str);