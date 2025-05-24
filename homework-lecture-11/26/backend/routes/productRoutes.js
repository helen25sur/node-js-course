const express = require('express');
const mongodb = require('mongodb');
const db = require('../data/db');

const router = express.Router();

const ObjectId = mongodb.ObjectId;

router.get('/', function (req, res) {
  res.redirect('/products');
});

router.get('/products', async function (req, res) {
  try {
    const database = await db.getDB();
    const products = await database
      .collection('products')
      .find()
      .toArray();
    const categories = await database
      .collection('categories')
      .find()
      .toArray();
    res.render('products-list', { products, categories, title: 'Products List' });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;