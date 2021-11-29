-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  organizer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  url VARCHAR(255) NOT NULL,
  location VARCHAR (255) NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  timeslot1 BOOLEAN NOT NULL
  timeslot2 BOOLEAN NOT NULL
  timeslot3 BOOLEAN NOT NULL,
);
