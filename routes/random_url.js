const express = require('express');
const router = express.Router();
const { generateRandomString, getOrganizer, fetchAPI } = require('../helpers');

module.exports = (db) => {
  router.get("/", (req, res) => {
    fetchAPI("events").then((apiData) => {


      let urlLookup = '3MshqBBNTOUknZmD3CDJ';
      // console.log(apiData);
      for (let data of apiData.events) {
        console.log("THISONE >>>>>>>>>", data.date);
        if (data.url === urlLookup) {

          //****** use data.____ for variables */


        } else {
          res.render("error");
        }
      }



    })
    res.render("invitation");
  });


  // Get new short URL page, error if shortURL doesnt match any in db and if user doesnt match/exist
  router.get("/invite/:randomUrl", (req, res) => {

    res.render("invite/:id", templateVars);
  });
  return router;
};
