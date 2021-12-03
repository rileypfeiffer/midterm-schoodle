// load .env data into process.env
require("dotenv").config();


// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session')
const { getOrganizer } = require('./helpers');



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

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ["key1", "key2", "key3, key4"],

}));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const eventsRoutes = require("./routes/events");
const organizersRoutes = require("./routes/organizers");
const responsesRoutes = require("./routes/responses");
const new_event = require("./routes/events_page");
const invite = require("./routes/invitation_page");
const error = require("./routes/error");
const random_url = require("./routes/random_url");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/events", eventsRoutes(db));
app.use("/api/organizers", organizersRoutes(db));
app.use("/api/responses", responsesRoutes(db));
app.use("/new-event", new_event(db));
app.use("/invite", invite(db));
app.use("/error", error(db));
// app.use("/invite/random_url", random_url(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

//grab organizer id

app.post("/organizer", (req, res) => {
  const orgName = req.body.name;
  const orgEmail = req.body.email;

  if (!orgName) {
    alert("Your name cannot be blank!");
  } else if (!orgEmail) {
    alert("Your email cannot be blank!");
  } else {

  getOrganizer(orgName, orgEmail)
  .then (result => {
    console.log('>>>>>>>>>>>>>>', result.id)
    req.session.org_id = orgEmail;
    req.session.user_id = result.id
    res.redirect(`/new-event`);
  })
  .catch(err => {
    console.log(err);

  })
  }

});

// Create new event

// app.post("new-event", (req, res) => {

// })


