// Client facing scripts here
const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


const createInvitation = function(url) {
  const values = [url]
  const queryString = `SELECT * FROM events WHERE url = $1;`
  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((result) => {
      console.log(err.message);
    });
};

createInvitation(url);
exports.createInvitation = createInvitation;


