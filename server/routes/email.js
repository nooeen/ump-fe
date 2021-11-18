const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email");

router.get("/send", emailController.send);

module.exports = router;