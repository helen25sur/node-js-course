const { appendFile } = require('node:fs/promises');
const { join } = require('node:path');

module.exports = async function logger(req) {
  const now = new Date();
  
  const filePath = join(__dirname, '..', 'logs', 'logs.log');

  const date = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear().toString().slice(2)}`;
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  const logLine = `[${date} ${time}] METHOD: "${req.method}" URL: "${req.url}"\n`;
  console.log(logLine.trim());

  try {
    await appendFile(filePath, logLine);
  } catch (err) {
    console.error('Logger error:', err.message);
  }

};