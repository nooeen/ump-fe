const express = require("express");
const router = express.Router();
const managerController = require("../controllers/manager");

router.get("/list", managerController.listManager);

router.get("/find", managerController.findManager);

router.get("/findfromstudent", managerController.findManagerFromStudent);

router.get("/list/classes", managerController.listManagerClasses);

module.exports = router;
