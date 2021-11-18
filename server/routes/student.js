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

module.exports = router;
