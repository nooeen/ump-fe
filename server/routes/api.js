const express = require('express');
const router = express.Router();
const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const testController = require("../controllers/test");
const isUser = require("../middlewares/isUser");
const isManager = require("../middlewares/isManager");
const apiRoutes = require("./api.js");

router.get("/", function (req, res) {
    res.send("Welcome to UMP's API Server!");
});

router.get("/test/secretUser", isUser, function (req, res) {
    res.send("You're an user!");
});

router.get("/test/secretManager", isUser, isManager, function (req, res) {
    res.send("You're a manager!");
});

router.post("/register",registerController.register);

router.post("/login",loginController.login);

module.exports = router;