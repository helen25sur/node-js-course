const app = require('./app');

const db = require('./data/db');

db.connectToDB().then(function () {
  console.log('Connected to database');
  app.listen(3001);
});