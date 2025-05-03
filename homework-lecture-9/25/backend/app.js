const express = require('express');
const hotelRouter = require('./routes/hotel');

const app = express();


app.use(express.json());

app.use(hotelRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});