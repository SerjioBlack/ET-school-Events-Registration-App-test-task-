const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./events.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the events database.');
  }
});

// Create events table if not exists
db.run(`CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  event_date TEXT,
  organizer TEXT
)`);

// Create registrations table if not exists
db.run(`CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT,
  email TEXT,
  dob TEXT,
  source TEXT
)`);

module.exports = db;
