const express = require('express');
const router = express.Router();
const { generateRandomString, getOrganizer, fetchAPI } = require('../helpers');

module.exports = (db) => {
  router.get("/", (req, res) => {

    let urlLookup = '3MshqBBNTOUknZmD3CDJ';
    // console.log(apiData);
    let query = `
      SELECT users.name as organizer_name, title, url, location, date, description, timeslot1, timeslot2, timeslot3
      FROM events
      JOIN users ON events.organizer_id = users.id
      WHERE url = ${urlLookup}
      ;`
    console.log(req.body)
    let values = [organizer_name, title, url, location, date, description, timeslot1, timeslot2, timeslot3];
    db.query(query, values)
      .then(result => {

        console.log('RESULT ROWS>>>>>>', result.rows)

      })
      .catch(err => {
        console.log(err);





      })
    res.render("invitation");
  });


  // Get new short URL page, error if shortURL doesnt match any in db and if user doesnt match/exist
  router.get("/invite/:randomUrl", (req, res) => {

    res.render("invite/:id", templateVars);
  });
  return router;
};


router.get("/invite/:url", (req, res) => {
  db.query(`SELECT * FROM users;`)
  let urlLookup = '3MshqBBNTOUknZmD3CDJ';
  let query = `
    SELECT users.name as organizer_name, title, url, location, date, description, timeslot1, timeslot2, timeslot3
    FROM events
    JOIN users ON events.organizer_id = users.id
    WHERE url = $1
    ;`
  db.query(query, [urlLookup])
    .then(result => {

      console.log('RESULT ROWS>>>>>>', result.rows[0].title)

    })
    .catch(err => {
      console.log(err);

    })

  // console.log("error page");
  res.render("error");
});


//   const templateVars = { user: users[req.session.user_id], shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]["longURL"], userURL: urlDatabase[req.params.shortURL] };
//   res.render("urls_show", templateVars);

