const express = require('express');
const router  = express.Router();
// const { getEventInfo } = require('../helpers');
const { generateRandomString } = require('../helpers')

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("test");
    res.render("new-event");
  });

  // Queries db and posts event information to new random URL
  router.post("/", (req, res) => {
    const { title, url, location, date, description, timeslot1, timeslot2, timeslot3} = req.body;
    let userID = req.session.user_id
    let query = `INSERT INTO events ( organizer_id, title, url, location, date, description, timeslot1, timeslot2, timeslot3) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
    console.log(req.body)
    let values = [userID, title, url, location, date, description, timeslot1, timeslot2, timeslot3];
    db.query(query, values)
    .then(result => {
      const url = generateRandomString()
      let updateQuery = `UPDATE events set url = $2 WHERE id = $1 `
      const updateArray = [result.rows[0].id, url]
      req.session.event_id = result.rows[0].id;
      console.log(req.session.event_id);
      db.query(updateQuery, updateArray)
      .then(result2 => {
        res.json({data: url})
      })
    })
    .catch(err => {
      console.log(err);

    })
  });

  return router;
};

