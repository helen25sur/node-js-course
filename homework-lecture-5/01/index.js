// Прочитайте файл source.txt і скопіюйте його в copy.txt

const { readFile } = require('node:fs/promises');
const { writeFile } = require('node:fs/promises');
const { resolve } = require('node:path');

async function readWriteFile() {
  try {
    const filePath = resolve('source.txt');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    await writeFile('copy.txt', contents);
  } catch (err) {
    console.error(err.message);
  }
}
readWriteFile();