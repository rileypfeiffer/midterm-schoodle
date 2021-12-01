const express = require('express');
const router  = express.Router();
const { generateRandomString, getOrganizer } = require('../helpers');

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM events`;
    console.log(query);
    db.query(query)
      .then(data => {
        const events = data.rows;
        res.json({ events});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

