const express = require('express');
const router = express.Router();
const { generateRandomString, getOrganizer, fetchAPI } = require('../helpers');
const request = require('request');

module.exports = (db) => {
  router.get("/", (req, res) => {
    // console.log("error page");
    fetchAPI("events").then((apiData) => {

      let eventTitle = ""
      let eventLocation = ""
      let eventDate = ""
      let eventtimeslot1 = ""
      let eventtimeslot2 = ""
      let eventtimeslot3 = ""
      let urlLookup = '3MshqBBNTOUknZmD3CDJ';
      // console.log(apiData);
      for (let data of apiData.events) {
        console.log("THISONE >>>>>>>>>", data.date);
        if (data.url === urlLookup) {
          eventTitle = data.title
          eventLocation = data.location
          eventDate = data.date
          eventtimeslot1 = data.timeslot1
          eventtimeslot2 = data.timeslot2
          eventtimeslot3 = data.timeslot3
        } else {
          res.render("error");
        }
      }



    })


    // console.log("error page");
    res.render("error");
  });
  return router;
};


