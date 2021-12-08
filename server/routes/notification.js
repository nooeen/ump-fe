const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification");
// const middlewares = require("../middlewares");

router.get("/list", notificationController.list);

router.post("/add", notificationController.add);

router.get("/delete", notificationController.delete);

router.post("/comment", notificationController.comment);

// router.get("/email", notificationController.email);

module.exports = router;
