const express = require('express');
const mongodb = require('mongodb');
const db = require('../data/db');

const router = express.Router();

const ObjectId = mongodb.ObjectId;

router.get('/orders', function (req, res) {
  
});

module.exports = router;