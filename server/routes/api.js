const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const isUser = require("../middlewares/isUser");
const isManager = require("../middlewares/isManager");
const classController = require("../controllers/class");
const managerController = require("../controllers/manager");
const studentController = require("../controllers/student");

router.get("/", function (req, res) {
  res.send("Welcome to UMP's API Server!");
});

router.get("/isUser", isUser, function (req, res) {
  res.status(200).send("You're an user!");
});

router.get("/isManager", isUser, isManager, function (req, res) {
  res.status(200).send("You're a manager!");
});

router.post("/register", registerController.register);

router.post("/login", loginController.login);

router.get("/manager/list", managerController.managerList);

router.get("/manager/find", managerController.managerFind);

router.get("/class/list", classController.studentList);

router.get("/student/list", studentController.studentList);

router.get("/student/find", studentController.findStudent);

// router.get("/student/calGpa", studentController.studentGpa);

//router.get("/student/calTpa", studentController.studentTpa);

// router.get("/student/credits", studentController.studentCredit);

module.exports = router;
