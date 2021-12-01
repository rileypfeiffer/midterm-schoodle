const express = require('express');
const router  = express.Router();
const { generateRandomString, getOrganizer, fetchAPI } = require('../helpers');
const request = require('request');

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("error page");
    const testData = fetchAPI("events");
    console.log(testData);
    res.render("error");
  });
  return router;
};


