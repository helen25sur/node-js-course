const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('../db/pool');

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
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
    const query = `
      SELECT bookings.*, guests.first_name, guests.last_name, rooms.type AS room_type, rooms.room_number FROM bookings
      INNER JOIN guests ON bookings.guest_id = guests.id
      INNER JOIN rooms ON bookings.room_id = rooms.id
    `
    const [rows] = await pool.query(query);
    res.json(rows);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.post('/add-guest', cors(corsOptions), async (req, res) => {
  try {
    console.log(req.body);
    const { first_name, last_name, email } = req.body;
    await pool.query('INSERT INTO guests (first_name, last_name, email) VALUES (?, ?, ?)', [first_name, last_name, email]);
    res.status(201).json({ message: 'Guest added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.get('/available-rooms', cors(corsOptions), async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }

  try {
    const query = `
      SELECT *
      FROM rooms r
      WHERE r.id NOT IN (
        SELECT room_id
        FROM bookings
        WHERE ? >= check_in
          AND ? < check_out
      )
    `;  
    const [rows] = await pool.query(query, [date, date]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.post('/add-booking', cors(corsOptions), async (req, res) => {
  const { guest_id, room_id, check_in, check_out } = req.body;

  if (!guest_id || !room_id || !check_in || !check_out) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // 1. Отримати ціну кімнати
    const [roomRows] = await pool.query('SELECT price_per_night FROM rooms WHERE id = ?', [room_id]);
    if (roomRows.length === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const pricePerNight = parseFloat(roomRows[0].price_per_night);

    // 2. Порахувати кількість ночей
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const timeDiff = checkOutDate - checkInDate;
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      return res.status(400).json({ message: 'Check-out must be after check-in' });
    }

    const totalPrice = pricePerNight * nights;

    // 3. Вставити бронювання з total_price
    await pool.query(
      `INSERT INTO bookings (guest_id, room_id, check_in, check_out, total_price)
       VALUES (?, ?, ?, ?, ?)`,
      [guest_id, room_id, check_in, check_out, totalPrice]
    );

    res.status(201).json({ message: 'Booking created successfully', totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

// Отримати унікальні місяці з бронювань
router.get('/available-months', cors(corsOptions), async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT 
        MONTH(check_in) AS month, 
        YEAR(check_in) AS year 
      FROM bookings
      ORDER BY year DESC, month DESC
    `;
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

// Отримати прибуток за місяць
router.get('/monthly-income', cors(corsOptions), async (req, res) => {
  const { month, year } = req.query;
  if (!month || !year) {
    return res.status(400).json({ message: 'Month and year are required' });
  }

  try {
    const query = `
      SELECT SUM(total_price) AS income
      FROM bookings
      WHERE MONTH(check_in) = ? AND YEAR(check_in) = ?
    `;
    const [rows] = await pool.query(query, [month, year]);
    res.json({ income: rows[0].income || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});




module.exports = router;