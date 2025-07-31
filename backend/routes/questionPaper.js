const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/save', (req, res) => {
  const {
    college,
    usn,
    subject,
    subject_code,
    semester,
    instructions
  } = req.body;

  const sql = `
    INSERT INTO question_papers 
    (college, usn, subject, subject_code, semester, instructions)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [college, usn, subject, subject_code, semester, instructions], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    res.status(200).json({ message: 'Question paper saved successfully!' });
  });
});

module.exports = router;
