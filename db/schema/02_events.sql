-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  organizer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  url VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  timeslot1 TIME NOT NULL,
  timeslot2 TIME NOT NULL,
  timeslot3 TIME NOT NULL
);
