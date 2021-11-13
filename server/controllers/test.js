require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
// const loginHbs = require(".../src/resources/views/login.hbs");

function test(req, res, next) {
  res.send('test ok')
  return;
}

module.exports = { test };