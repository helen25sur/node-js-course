const express = require('express');

const pool = require('../db/pool');

const router = express.Router();

router.get('/students', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students');
    res.json(rows);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

router.get('/courses', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courses');
    res.json(rows);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

router.get('/enrollments', async (req, res) => {
  try {
    const query = `
      SELECT enrollments.id, students.name, courses.title, enrollments.grade FROM enrollments
      JOIN students ON enrollments.student_id = students.id
      JOIN courses ON enrollments.course_id = courses.id`
    const [rows] = await pool.query(query);
    res.json(rows);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

// Додай 3 студентів, 3 курси та кілька записів у Enrollments.
router.post('/add-student', async (req, res) => {
  try {
    console.log(req.body);
    const { name, email } = req.body;
    await pool.query('INSERT INTO students (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ message: 'Student added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

router.post('/add-course', async (req, res) => {
  try {
    console.log(req.body);
    const { title, text } = req.body;
    await pool.query('INSERT INTO courses ( title, text) VALUES (?, ?)', [title, text]);
    res.status(201).json({ message: 'Course added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

router.post('/enroll-student', async (req, res) => {
  try {
    console.log(req.body);
    const { student_id, course_id } = req.body;
    await pool.query('INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)', [student_id, course_id]);
    res.status(201).json({ message: 'Student enrolled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

// Виведи список усіх студентів із їх середнім балом по всіх курсах.
router.get('/average-grades', async (req, res) => {
  try {
    const query = `
      SELECT students.id, students.name,
      ROUND(AVG(enrollments.grade), 2) AS average_grade
      FROM students
      JOIN enrollments ON students.id = enrollments.student_id
      GROUP BY students.id, students.name;`
    const [rows] = await pool.query(query);
    res.json(rows);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

// Виведи список студентів, які записані на курс “SQL Basics”.
router.get('/students-sql-basics', async (req, res) => {
  try {
    const query = `
      SELECT students.id, students.name
      FROM students
      JOIN enrollments ON students.id = enrollments.student_id
      JOIN courses ON enrollments.course_id = courses.id
      WHERE courses.title = 'SQL Basics';`
    const [rows] = await pool.query(query);
    res.json(rows);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

// Виведи топ-1 студента з найвищим середнім балом.
router.get('/top-student', async (req, res) => {
  try {
    const query = `
      SELECT students.id, students.name,
      ROUND(AVG(enrollments.grade), 2) AS average_grade
      FROM students
      JOIN enrollments ON students.id = enrollments.student_id
      GROUP BY students.id, students.name
      ORDER BY average_grade DESC
      LIMIT 1;`
    const [rows] = await pool.query(query);
    res.json(rows);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

// Порахуй кількість студентів у кожному курсі.
router.get('/students-per-course', async (req, res) => {
  try {
    const query = `
      SELECT courses.id, courses.title,
      COUNT(enrollments.student_id) AS student_count
      FROM courses
      LEFT JOIN enrollments ON courses.id = enrollments.course_id
      GROUP BY courses.id, courses.title;`
    const [rows] = await pool.query(query);
    res.json(rows);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

// Виведи назви курсів, де середня оцінка > 85.
router.get('/courses-above-85', async (req, res) => {
  try {
    const query = `
      SELECT courses.id, courses.title,
      ROUND(AVG(enrollments.grade), 2) AS average_grade
      FROM courses
      JOIN enrollments ON courses.id = enrollments.course_id
      GROUP BY courses.id, courses.title
      HAVING average_grade > 85;`
    const [rows] = await pool.query(query);
    res.json(rows);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database Error' });
  }
});

module.exports = router;