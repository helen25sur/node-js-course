const express = require('express');
const { getProducts, getTop3Products } = require('../controllers/product');

const router = express.Router();

router.get('/', function (req, res) {
  res.redirect('/products');
});

router.get('/products', getProducts);

router.get('/products/top-3', getTop3Products);

module.exports = router;