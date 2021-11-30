const express = require('express');
const router  = express.Router();
const { getEventInfo } = require('../helpers');

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("test");
    res.render("new-event");
  });

  router.post("/", (req, res) => {


    res.redirect("/new-event");
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



