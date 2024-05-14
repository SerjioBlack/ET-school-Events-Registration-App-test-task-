const db = require('./db');

// Function to insert events into the database
const insertEvents = () => {
  const events = [];

  // Generate 24 events
  for (let i = 1; i <= 24; i++) {
    events.push({
      title: `Event ${i}`,
      description: `Description of Event ${i}`,
      event_date: '2024-05-15',
      organizer: `Organizer ${i}`
    });
  }

  // Insert events into the database
  const sql = `INSERT INTO events (title, description, event_date, organizer) VALUES (?, ?, ?, ?)`;
  events.forEach((event) => {
    db.run(sql, [event.title, event.description, event.event_date, event.organizer], (err) => {
      if (err) {
        console.error('Error inserting event:', err.message);
      } else {
        console.log(`Event '${event.title}' inserted successfully.`);
      }
    });
  });
};

// Execute insertion
insertEvents();
