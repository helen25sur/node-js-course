const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('../db/pool');

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}

const router = express.Router();

router.get('/guests', cors(corsOptions), async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM guests');
    res.json(rows);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.get('/rooms', cors(corsOptions), async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM rooms');
    res.json(rows);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.get('/bookings', cors(corsOptions), async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings');
    res.json(rows);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

module.exports = router;