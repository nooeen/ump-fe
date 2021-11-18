const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");

router.get("/listAll", studentController.studentListAll);

router.get("/list", studentController.studentList);

router.get("/find", studentController.findStudent);

router.get("/calGPA", studentController.studentGpa);

router.get("/calTPA", studentController.studentTpa);

router.get("/credits", studentController.studentCredit);

router.get("/warn", studentController.studentWarning);

router.get("/listwarn", studentController.studentWarningList);

router.get("/bonus", studentController.studentBonus);

module.exports = router;
