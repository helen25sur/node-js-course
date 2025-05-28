const express = require('express');
const mongodb = require('mongodb');
const { getCategories, getCategoryByName } = require('../controllers/category');

const router = express.Router();

router.get('/categories', getCategories);

router.get('/categories/:nameCategory', getCategoryByName)

module.exports = router;