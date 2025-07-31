const express = require('express');
const cors = require('cors');
const db = require('./db/connection');
const bodyParser = require('body-parser');




const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ensure table
const createTable = `
CREATE TABLE IF NOT EXISTS question_papers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(255),
  subject_code VARCHAR(100),
  usn VARCHAR(100),
  semester VARCHAR(50),
  college VARCHAR(255),
  instructions TEXT
)`;
db.query(createTable);

// POST endpoint
app.post('/submit-paper', (req, res) => {
  const { subject, subject_code, usn, semester, college, instructions } = req.body;
  const query = `INSERT INTO question_papers (subject, subject_code, usn, semester, college, instructions)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [subject, subject_code, usn, semester, college, instructions], (err, result) => {
    if (err) return res.status(500).send('Insert failed');
    res.status(200).send('Data submitted');
  });
});

// GET endpoint
app.get('/get-papers', (req, res) => {
  db.query('SELECT * FROM question_papers', (err, results) => {
    if (err) return res.status(500).send('Fetch failed');
    res.status(200).json(results);
  });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
