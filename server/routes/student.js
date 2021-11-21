const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");
const middlewares = require("../middlewares");

router.get(
  "/listAll",
  middlewares.isUser,
  middlewares.isManager,
  studentController.studentListAll
);

router.get(
  "/list",
  middlewares.isUser,
  middlewares.isManager,
  studentController.studentList
);

router.get(
  "/listwarn",
  middlewares.isUser,
  middlewares.isManager,
  studentController.studentWarningList
);

router.get(
  "/listbonus",
  middlewares.isUser,
  middlewares.isManager,
  studentController.studentBonusList
);

router.get("/find", studentController.findStudent);

router.get("/calGPA", studentController.studentGpa);

router.get("/calTPA", studentController.studentTpa);

router.get("/credits", studentController.studentCredit);

router.get("/warn", studentController.studentWarning);

router.get("/bonus", studentController.studentBonus);

module.exports = router;
