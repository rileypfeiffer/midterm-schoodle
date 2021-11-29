const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM events`;
    console.log(query);
    db.query(query)
      .then(data => {
        const events = data.rows;
        res.json({ events });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {
    const {organizer_id, url, location, date, description, timeslot1, timeslot2, timeslot3} = req.body;
    let query = `INSERT INTO events (organizer_id, url, location, date, description, timeslot1, timeslot2, timeslot3)`;
    let values = [organizer_id, url, location, date, description, timeslot1, timeslot2, timeslot3];
    db.query(query, values)
    .then(result => {
      return result.rows[0].id;
    });
  });
  return router;
};

