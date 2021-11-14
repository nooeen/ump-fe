const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

const isUser = function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};

module.exports = isUser;
