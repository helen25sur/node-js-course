const express = require('express');
const mongodb = require('mongodb');
const db = require('../data/db');

const router = express.Router();

const ObjectId = mongodb.ObjectId;

router.get('/orders', async function (req, res) {
  try {
    const database = await db.getDB();
    const orders = await database
      .collection('orders')
      .find()
      .toArray();
    console.log(orders[0].items);
    const products = await database
      .collection('products')
      .find()
      .toArray();
    console.log(products)
    res.render('orders-list', { orders, products, title: 'Orders List' });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send({ message: 'Internal Server Error' });

  }
});

module.exports = router;