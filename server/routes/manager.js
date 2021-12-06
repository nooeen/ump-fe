const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");
const managerController = require("../controllers/manager");

router.post(
  "/update",
  middlewares.isUser,
  middlewares.isManager,
  managerController.updateManager
);

router.get("/list", managerController.listManager);

router.get("/find", managerController.findManager);

router.get("/findfromstudent", managerController.findManagerFromStudent);

router.get("/list/classes", managerController.listManagerClasses);

module.exports = router;
