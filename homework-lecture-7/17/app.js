// Реалізуйте програму на Node.js, яка читає файл у форматі бінарних даних і виводить вміст цього файлу в консоль, використовуючи Buffer.
const fs = require('fs/promises');
const path = require('path');

async function manualRead() {
  const filePath = path.join(__dirname, 'EN-Resume.pdf');
  const fileHandle = await fs.open(filePath, 'r');
  const stats = await fileHandle.stat();

  const buffer = Buffer.alloc(stats.size);
  await fileHandle.read(buffer, 0, stats.size, 0);

  console.log(buffer);
  await fileHandle.close();
}

manualRead();

// async function readFileToBuffer() {
//   const buffer = await fs.readFile(path.join(__dirname, 'EN-Resume.pdf'));
//   console.log(buffer);
// }

// readFileToBuffer();

// const filePath = path.join(__dirname, 'EN-Resume.pdf');
// const stream = fs.createReadStream(filePath);

// stream.on('data', chunk => {
//   console.log('New chunk received:', chunk); // chunk — це Buffer
// });

// stream.on('end', () => {
//   console.log('Finished reading file');
// });

// stream.on('error', err => {
//   console.error('Error reading file:', err);
// });