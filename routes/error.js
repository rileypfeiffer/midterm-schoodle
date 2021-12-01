const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("error page");
    res.render("error");
  });
  return router;
};


