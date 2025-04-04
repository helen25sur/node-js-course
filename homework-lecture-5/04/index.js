// Виведіть файл з найбільшим розміром із поточної папки
const { readdir, stat } = require('node:fs/promises');

async function findBiggestFile() {
  try {
    const files = await readdir(__dirname, { withFileTypes: true });
    
    for (const file of files) {
      const stats = await stat(file.name);
      file.size = stats.size; 
    }
    const sortedFiles = files.sort((prevFile, file) => file.size - prevFile.size);
    const theBiggestFile = sortedFiles[0];
    console.log(theBiggestFile);

  } catch (err) {
    console.error(err);
  }
}

findBiggestFile();
