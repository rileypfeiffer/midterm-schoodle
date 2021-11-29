const express = require('express');
const router  = express.Router();


router.get("/", (req, res) => {
  const templateVars = {};
  res.render("/new-event", templateVars);
});
