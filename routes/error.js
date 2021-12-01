const express = require('express');
const router  = express.Router();
const { generateRandomString, getOrganizer, fetchAPI } = require('../helpers');
const request = require('request');

module.exports = (db) => {
  router.get("/", (req, res) => {
    // console.log("error page");
    fetchAPI("users").then ( (apiData)=> {

      // ************* HTML GOES HERE *****************

    } )


    // console.log("error page");
    res.render("error");
  });
  return router;
};


