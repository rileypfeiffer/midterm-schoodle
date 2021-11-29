const express = require('express');
const router  = express.Router();
const { generateRandomString } = require('../helpers');

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
    const {url, location, date, description, timeslot1, timeslot2, timeslot3} = req.body;
    let query = `INSERT INTO events (url, location, date, description, timeslot1, timeslot2, timeslot3)`;
    let values = [url, location, date, description, timeslot1, timeslot2, timeslot3];
    db.query(query, values)
    .then(result => {
      return result.rows[0].id;
    })
    .catch(err => {
      console.log(err);
    })
  });
  return router;
};

