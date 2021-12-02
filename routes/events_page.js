const express = require('express');
const router  = express.Router();
// const { getEventInfo } = require('../helpers');
const { generateRandomString } = require('../helpers')

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("test");
    res.render("new-event");
  });

  // router.post("/", (req, res) => {


  //   res.redirect("/new-event");
  // });

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
      console.log('RESULT ROWS>>>>>>', result.rows)
      const updateArray = [result.rows[0].id, url]
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

// const title = req.body.title;
// const location = req.body.location;
// const date = req.body.date;
// const description = req.body.description;
// const timeslot1 = req.body.timeslot1;
// const timeslot2 = req.body.timeslot2;
// const timeslot3 = req.body.timeslot3;
// getEventInfo(title, location, date, description, timeslot1, timeslot2, timeslot3);



