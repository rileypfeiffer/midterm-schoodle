const express = require('express');
const router = express.Router();
const { generateRandomString, getOrganizer, fetchAPI } = require('../helpers');
const request = require('request');

module.exports = (db) => {
  router.get("/", (req, res) => {

    let urlLookup = '3MshqBBNTOUknZmD3CDJ';
    // console.log(apiData);
    let query = `
      SELECT users.name as organizer_name, title, url, location, date, description, timeslot1, timeslot2, timeslot3
      FROM events
      JOIN users ON events.organizer_id = users.id
      WHERE url = $1
      ;`
    db.query(query, [urlLookup])
      .then(result => {

        console.log('RESULT ROWS>>>>>>', result.rows)

      })
      .catch(err => {
        console.log(err);

      })

    // console.log("error page");
    res.render("error");
  });
  return router;
};


