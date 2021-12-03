const express = require('express');
const router  = express.Router();

// Renders responses API page
module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM responses`;
    console.log(query);
    db.query(query)
      .then(data => {
        const responses = data.rows;
        res.json({ responses });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {
    const {responder_id, timeslot_response1 , timeslot_response2, timeslot_response3} = req.body;
    let query = `INSERT INTO events (name, email)`;
    let values = [responder_id, timeslot_response1 , timeslot_response2, timeslot_response3];
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
