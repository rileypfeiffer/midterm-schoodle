const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("test");
    res.render("new-event");
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    res.redirect("/");
  });

  return router;
};



