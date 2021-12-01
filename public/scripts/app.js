// Client facing scripts here
const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


$(document).ready(function() {
  const createInvitation = function(url) {
    const values = [req.body[0].url]
    const queryString = `SELECT * FROM events WHERE url = $1;`
    return pool
      .query(queryString, values)
      .then((result) => {
        return result.rows[0].url;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
});



exports.createInvitation = createInvitation;
