// Виведіть файл з найбільшим розміром із поточної папки
const { readdir, stat } = require('node:fs/promises');
const path = require('path');

async function findBiggestFile() {
  try {
    const files = await readdir(path.join(__dirname, 'files'), { withFileTypes: true });
    
    for (const file of files) {
      if (file.isFile()) {
        const fullPath = path.resolve('files', file.name);
        const stats = await stat(fullPath);
        file.size = stats.size; 
      }
    }
    const sortedFiles = files.sort((prevFile, file) => file.size - prevFile.size);
    const theBiggestFile = sortedFiles[0];
    console.log(theBiggestFile);

  } catch (err) {
    console.error(err);
  }
}

findBiggestFile();
