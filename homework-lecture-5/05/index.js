// Перевірте, чи введений користувачем пароль збігається з збереженим хешем

const crypto = require('crypto');
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Генерує сіль та хеш пароля
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) return reject(err);
      resolve({
        salt,
        hash: derivedKey.toString('hex'),
      });
    });
  });
}

// Перевіряє пароль за відомими сіллю та хешем
function verifyPassword(password, salt, expectedHash) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey.toString('hex') === expectedHash);
    });
  });
}

// Запит через readline з промісом
function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

(async () => {
  try {
    const password = await ask('Введіть пароль: ');
    const { salt, hash } = await hashPassword(password);
    console.log('Збережено:', { salt, hash });

    const check = await ask('Введіть пароль для перевірки: ');
    const isCorrect = await verifyPassword(check, salt, hash);

    console.log(isCorrect ? '✅ Пароль правильний' : '❌ Пароль неправильний');
  } catch (err) {
    console.error('Помилка:', err);
  } finally {
    rl.close();
  }
})();