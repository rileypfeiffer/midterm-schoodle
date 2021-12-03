const express = require('express');
const router  = express.Router();

// renders organizers API page
module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM users`;
    console.log(query);
    db.query(query)
      .then(data => {
        const organizer = data.rows;
        res.json({ organizer });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {
    const {name, email} = req.body;
    let query = `INSERT INTO users (name, email)`;
    let values = [name, email];
    db.query(query, values)
    .then(result => {
      return result.rows[0].id;
    })
    .catch(err => {
      console.log(err);
    })
  });
  return router;
};
