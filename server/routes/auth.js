const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const middlewares = require("../middlewares");

router.post("/register", registerController.register);

router.post("/login", loginController.login);

router.get("/isUser", middlewares.isUser, function (req, res) {
  res.status(200).send("You're an user!");
});

router.get(
  "/isManager",
  middlewares.isUser,
  middlewares.isManager,
  function (req, res) {
    res.status(200).send("You're a manager!");
  }
);

module.exports = router;
