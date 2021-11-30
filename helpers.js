// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect()
.then( ()=> {
  console.log("connected");
})
.catch( (err) => {
  console.log("failed to connect", err);
})

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

const generateRandomString = function() {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const getOrganizer = (name, email) => {
  return pool
    .query (`
    INSERT INTO users (
      name,
      email
    )
    VALUES ($1, $2)
    RETURNING *;`, [name, email])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
  };

module.exports = { generateRandomString, getOrganizer };
