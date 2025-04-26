const { exec } = require('child_process');

// Команда, яку хочемо запустити
// const command = 'ls -la'; // для MacOS
const command = 'dir';

// Виконуємо команду
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Помилка виконання: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Стандартна помилка: ${stderr}`);
    return;
  }
  console.log(`Результат виконання:\n${stdout}`);
});
