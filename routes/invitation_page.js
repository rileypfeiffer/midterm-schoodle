const express = require('express');
const router = express.Router();
const { getOrganizer } = require('../helpers')

module.exports = (db) => {
  // router.get("/", (req, res) => {
  //   console.log("test");
  //   res.render("invitation");
  // });

  router.get("/:url", (req, res) => {
    db.query(`SELECT users.name, events.id, events.title, events.url, events.location, events.date, events.description, events.timeslot1, events.timeslot2, events.timeslot3 FROM events JOIN users ON events.organizer_id = users.id WHERE url = $1;`, [req.params.url])
      .then(data => {
        db.query(`SELECT users.name, users.email, responses.timeslot_response1, responses.timeslot_response2, responses.timeslot_response3 FROM responses JOIN users ON users.id = responses.responder_id WHERE event_id = $1;`, [data.rows[0].id])
          .then(data2 => {
            const templateVars = { name: data.rows[0].name, title: data.rows[0].title, url: data.rows[0].url, location: data.rows[0].location, date: data.rows[0].date, description: data.rows[0].description, timeslot1: data.rows[0].timeslot1, timeslot2: data.rows[0].timeslot2, timeslot3: data.rows[0].timeslot3, respondees: data2.rows };
            res.render("invitation", templateVars);
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  });

  router.post("/response", (req, res) => {
    const attName = req.body.name;
    const attEmail = req.body.email;
    getOrganizer(attName, attEmail)
      .then(result => {
        console.log('>>>>>>>>>>>>>>', result.id)
        req.session.att_id = attEmail;
        req.session.att_id = result.id})
          .then(results2 => {
            const { timeslot_response1, timeslot_response2, timeslot_response3 } = req.body;
            let attID = req.session.att_id;
            let eventID =  req.session.event_id;
            let query = `
            INSERT INTO responses (event_id, responder_id, timeslot_response1, timeslot_response2, timeslot_response3)
            VALUES ($1, $2, $3, $4, $5)
            ;
            `;
            let values = [eventID, attID, timeslot_response1, timeslot_response2, timeslot_response3 ];
            db.query(query, values)
            .then (results3 => {
              console.log(results3, "THIS ONE <<<<<<<");
              let query = `
            SELECT url
            FROM events
            WHERE id = ${eventID};
            ;
            `;
            })
            .catch (error => {
              console.log(error);
            })



  });


});
return router;
//PROMISE #1
// collect name and email
// store in DB using query
// collect the ID and use cookie to store
  // PROMISE #2
  // using the ID in cookie, assign to respondee_id
  // fill using timeslot check off

  // SELECT responder_id, timeslot_response2, timeslot_response2, timeslot_response3
  //           FROM responses
  //           INNER JOIN user ON  user.id = responses.responder_id
  //           RETURN
}
