const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const middlewares = require("../middlewares");
const classController = require("../controllers/class");
const managerController = require("../controllers/manager");
const studentController = require("../controllers/student");

router.get("/", function (req, res) {
  res.send("Welcome to UMP's API Server!");
});

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

router.post("/register", registerController.register);

router.post("/login", loginController.login);

router.get("/manager/list", managerController.managerList);

router.get("/manager/find", managerController.managerFind);

router.get("/class/list", classController.studentList);

router.get("/student/listAll", studentController.studentListAll);

router.get("/student/list", studentController.studentList);

router.get("/student/find", studentController.findStudent);

router.get("/student/calGPA", studentController.studentGpa);

router.get("/student/calTPA", studentController.studentTpa);

router.get("/student/credits", studentController.studentCredit);

module.exports = router;
