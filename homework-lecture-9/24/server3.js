const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Response from server 3 (port 3003)');
});

app.listen(3003, () => {
  console.log('Server 3 listening on port 3003');
});