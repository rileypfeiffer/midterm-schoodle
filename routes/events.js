const express = require('express');
const router  = express.Router();
const { generateRandomString, getOrganizer } = require('../helpers');

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM events`;
    console.log(query);
    db.query(query)
      .then(data => {
        const events = data.rows;
        res.json({ events});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {
    const {title, url, location, date, description, timeslot1, timeslot2, timeslot3} = req.body;
    let query = `INSERT INTO events (title, url, location, date, description, timeslot1, timeslot2, timeslot3) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
    console.log(req.body)
    let values = [title, url, location, date, description, timeslot1, timeslot2, timeslot3];
    db.query(query, values)
    .then(result => {
      const url = generateRandomString()
      let updateQuery = `UPDATE events set url = $2 WHERE id = $1 `
      console.log('RESULT ROWS>>>>>>', result.rows)
      const updateArray = [result.rows[0].id, url]
      db.query(updateQuery, updateArray)
      .then(result2 => {
        res.redirect('/')
      })
    })
    .catch(err => {
      console.log(err);
    })
  });
  return router;
};

