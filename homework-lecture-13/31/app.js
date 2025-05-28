const path = require('path');

const express = require('express');

const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Activate EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static('public'));

app.use(categoryRoutes);
app.use(orderRoutes);
app.use(productRoutes);

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  // res.status(500).send({message: 'Internal Server Error'});
  res.status(500).send({message: error.message});
});



module.exports = app; // Export the app for testing purposes