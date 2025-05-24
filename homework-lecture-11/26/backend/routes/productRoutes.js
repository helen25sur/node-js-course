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

// Отримати топ-3 товари за кількістю продажів.
router.get('/products/top-3', async function (req, res) {
  try {
    const database = await db.getDB();
    const ordersCollection = database.collection('orders');
  const productsCollection = database.collection('products');

  // Агрегація: підрахунок кількості продажів по productId
  const topProducts = await ordersCollection.aggregate([
    { $unwind: '$items' }, // розгортаємо масив items
    {
      $group: {
        _id: '$items.productId',           // групуємо за productId
        totalSold: { $sum: '$items.quantity' } // сумуємо кількість проданих одиниць
      }
    },
    { $sort: { totalSold: -1 } },          // сортуємо за спаданням
    { $limit: 3 },                         // беремо топ-3
    {
      $lookup: {                          // підтягуємо дані про продукт
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    { $unwind: '$productDetails' },       // розгортаємо масив productDetails
    {
      $project: {                         // формуємо потрібне поле для відповіді
        _id: 0,
        productId: '$_id',
        name: '$productDetails.name',
        totalSold: 1
      }
    }
  ]).toArray();
    res.render('top-products', { topProducts, title: 'Top 3 Products' });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
})

module.exports = router;