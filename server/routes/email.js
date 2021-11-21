const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email");
const middlewares = require("../middlewares");

router.get(
  "/send",
  middlewares.isUser,
  middlewares.isManager,
  emailController.send
);

router.get(
  "/sendwarning",
  middlewares.isUser,
  middlewares.isManager,
  emailController.sendWarning
);

router.get(
  "/sendbonus",
  middlewares.isUser,
  middlewares.isManager,
  emailController.sendBonus
);

module.exports = router;
