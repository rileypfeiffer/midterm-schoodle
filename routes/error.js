const express = require('express');
const router = express.Router();
const { generateRandomString, getOrganizer, fetchAPI } = require('../helpers');
const request = require('request');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("error");
  });
  return router;
};


