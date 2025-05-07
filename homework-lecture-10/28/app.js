const express = require('express');
require('dotenv').config();

const courseRouter = require('./routes/courses');  

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(courseRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});