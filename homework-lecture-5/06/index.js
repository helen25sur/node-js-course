// Створіть цифровий підпис і перевірте його
const { generateKeyPairSync, createSign, createVerify } = require('crypto');

// Повідомлення
const message = 'Це повідомлення для надсилання';

// Створюємо пару ключів
  const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 4096 });

// Хешуємо та підписуємо повідомлення
function signMessage (message, privateKey) {
  const signer = createSign('sha256');
  signer.update(message);
  signer.end();
 
  return signer.sign(privateKey, 'hex');
}


// Тепер перевіряємо
function verifySignature(message, signature, publicKey) {
  const verifier = createVerify('SHA256');
  // message = 'Це повідомлення для надсилання!!!';
  verifier.update(message);
  verifier.end();
  
  return verifier.verify(publicKey, signature, 'hex');
}
 

// Використання
const signature = signMessage(message, privateKey);
const isValid = verifySignature(message, signature, publicKey);

console.log('🔏 Підпис:', signature);
console.log(isValid ? '✅ Підпис валідний' : '❌ Підпис невалідний');