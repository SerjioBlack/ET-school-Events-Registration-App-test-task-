const express = require('express');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get paginated and sorted list of events
app.get('/events', (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const offset = (page - 1) * limit;
  const sortBy = req.query.sortBy || 'title'; // Default sorting by title

  const sql = `SELECT * FROM events ORDER BY ${sortBy} LIMIT ? OFFSET ?`;
  db.all(sql, [limit, offset], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Route to handle event registration
app.post('/register', (req, res) => {
  const { full_name, email, dob, source } = req.body;

  const sql = `INSERT INTO registrations (full_name, email, dob, source) VALUES (?, ?, ?, ?)`;
  db.run(sql, [full_name, email, dob, source], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Registration successful' });
  });
});

app.get('/registrations', (req, res) => {
  const sql = `SELECT * FROM registrations`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/search', (req, res) => {
  const searchTerm = req.query.q.toLowerCase();
  const sql = `SELECT * FROM registrations WHERE lower(full_name) LIKE '%${searchTerm}%' OR lower(email) LIKE '%${searchTerm}%'`;
  db.all(sql, [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(rows);
  });
});

// Serve static files (index.html, app.js, styles.css)
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
