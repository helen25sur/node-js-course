const express = require('express');
const mongodb = require('mongodb');
const db = require('../data/db');

const router = express.Router();

const ObjectId = mongodb.ObjectId;

router.get('/categories', async function (req, res) {
  try {
    const database = await db.getDB();
    const categories = await database
      .collection('categories')
      .find()
      .toArray();
    res.render('categories-list', { categories, title: 'Categories List' });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send({ message: 'Internal Server Error' });
    
  }
});

router.get('/categories/:nameCategory', async function (req, res) {
  const nameCategory = req.params.nameCategory;
  try {
    const database = await db.getDB();
    const category = await database
      .collection('categories')
      .findOne({ name: nameCategory });
    
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    const products = await database
      .collection('products')
      .find({ categoryId: category._id })
      .toArray();

    res.render('category-details', { category, products, title: `Category: ${nameCategory}` });
  } catch (error) {
    console.error('Error fetching category details:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
})

module.exports = router;