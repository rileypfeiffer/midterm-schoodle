const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("test");
    res.render("new-event");
  });

  return router;
};
