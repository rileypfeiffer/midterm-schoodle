// Client facing scripts here
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


$(document).ready(function() {
  const createInvitation = function(url) {
    const values = [url]
    const queryString = `SELECT * FROM events WHERE url = $1`
    return pool
      .query(queryString, values)
      .then((result) => {
        return result.rows[0];
      })
      .catch((result) => {
        console.log(err.message);
      });
  };
});

exports.createInvitation = createInvitation;
