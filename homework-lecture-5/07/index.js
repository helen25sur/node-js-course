// Створіть функцію hashPassword(password) яка повертає SHA-256 хеш
const { createHash } = require('node:crypto');

const password = 'pasword123';

// Генерує сіль та хеш пароля
async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256').update(password).digest('hex');
    resolve({
      hash: hash,
    });
    reject(()=> {throw new Error('Хеш не створено')});
  });
}

(async () => {
  try {
    const hash = await hashPassword(password);
    console.log(hash);
  }
  catch(error) {
    console.error('Помилка:', error);
  }
}
)()
