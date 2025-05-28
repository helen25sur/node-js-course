const express = require('express');
const mongodb = require('mongodb');
const { getOrders } = require('../controllers/order');

const router = express.Router();

router.get('/orders', getOrders);

module.exports = router;