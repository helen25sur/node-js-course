// Замініть всі входження слова Node на NODE.JS і збережіть у новий файл
const { readFile } = require('node:fs/promises');
const { writeFile } = require('node:fs/promises');
const { resolve } = require('node:path');

async function readWriteFile() {
  try {
    const filePath = resolve('source.txt');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    const word = 'Node';
    const newContents = contents.replaceAll(word, word.toUpperCase());
    
    await writeFile('copy.txt', newContents);
  } catch (err) {
    console.error(err.message);
  }
}
readWriteFile();