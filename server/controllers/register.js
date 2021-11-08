const User = require("../models/User.js");

function register(req, res) {
  const { username, password, role } = req.body;
  const user = new User({ username, password, role });
  user.save(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
}

module.exports = { register };
