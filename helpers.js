// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("failed to connect", err);
  })

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const generateRandomString = function () {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const getOrganizer = (name, email) => {
  return pool
    .query(`
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

const getEventInfo = (title, location, date, description, timeslot1, timeslot2, timeslot3) => {

  return pool
    .query(`
      INSERT INTO events (
        title,
        location,
        date,
        description,
        timeslot1,
        timeslot2,
        timeslot3
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;`, [title, location, date, description, timeslot1, timeslot2, timeslot3])
    .then((result) => {

      result.rows
    })
    .catch((err) => {
      console.log(err.message);
    });

};

// const url = generateRandomString()
// let updateQuery = `UPDATE events set url = $2 WHERE id = $1 `
// console.log('RESULT ROWS>>>>>>', result.rows)
// const updateArray = [result.rows[0].id, url]
// db.query(updateQuery, updateArray)

module.exports = { generateRandomString, getOrganizer, getEventInfo };
