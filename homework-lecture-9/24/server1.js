const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Response from server 1 (port 3001)');
});

app.listen(3001, () => {
  console.log('Server 1 listening on port 3001');
});
