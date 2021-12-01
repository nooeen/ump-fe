require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

function login(req, res, next) {
  const { username, password } = req.body;
  const secret = process.env.SECRET;
  User.findOne({ username }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect username or password",
      });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect username or password",
          });
        } else {
          const payload = { username: username, role: user.role };
          const token = jwt.sign(payload, secret, {});
          res.status(200).json({ accessToken: token });
        }
      });
    }
  });
}

module.exports = { login };
