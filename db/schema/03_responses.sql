-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS responses CASCADE;
CREATE TABLE responses (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  responder_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  timeslot_response1 BOOLEAN NOT NULL,
  timeslot_response2 BOOLEAN NOT NULL,
  timeslot_response3 BOOLEAN NOT NULL
);
