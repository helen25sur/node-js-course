// Створіть клас Chat, який наслідує EventEmitter, і має подію message

const EventEmitter = require('node:events');

class Chat extends EventEmitter {
  send(message) {
    this.emit('message', message);
  }
}

const chat = new Chat();

chat.on('message', (text) => {
  console.log('Отримано повідомлення:', text);
});

// 4. Викликаємо подію
chat.send('Привіт');
chat.send('Як справи?');