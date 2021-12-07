const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");
const middlewares = require("../middlewares");

router.post(
  "/add",
  middlewares.isUser,
  middlewares.isManager,
  studentController.addStudent
);

router.get(
  "/delete",
  middlewares.isUser,
  middlewares.isManager,
  studentController.deleteStudent
);

router.post("/update", middlewares.isUser, studentController.updateStudent);

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

router.get(
  "/warn",
  middlewares.isUser,
  middlewares.isManager,
  studentController.studentWarning
);

router.get(
  "/bonus",
  middlewares.isUser,
  middlewares.isManager,
  studentController.studentBonus
);

router.get("/find", studentController.findStudent);

router.get("/calGPA", studentController.studentGPA);

router.get("/calTPA", studentController.studentTPA);

router.get("/credits", studentController.studentCredit);

router.get("/statistic", studentController.getStudentStatistic);

module.exports = router;
