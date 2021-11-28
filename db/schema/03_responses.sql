-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  responder_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  url VARCHAR(255) NOT NULL,
  location VARCHAR (255) NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  accepted_timeslot BOOLEAN NOT NULL,
);
