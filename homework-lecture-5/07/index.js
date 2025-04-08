// Створіть функцію hashPassword(password) яка повертає SHA-256 хеш
const { createHash } = require('node:crypto');

const password = 'pasword123';

// Генерує сіль та хеш пароля
async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    try {
      const hash = createHash('sha256').update(password).digest('hex');
      resolve({
        hash: hash,
      });
    } catch (error) {
      reject(error);
    }
  });
}

(async () => {
  try {
    const hash = await hashPassword(password);
    console.log(hash);
  }
  catch(error) {
    console.error('Помилка:', error.message);
  }
}
)()
